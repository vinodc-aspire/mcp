import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer } from './mcp/tools.js';

const HOST = process.env.MCP_HOST ?? '0.0.0.0';
const PORT = parseInt(process.env.MCP_PORT ?? '3100', 10);

const fastify = Fastify({ logger: true });
await fastify.register(cors, { origin: true });
const mcpServer = createMcpServer();

// Health check
fastify.get('/health', async () => ({
  status: 'ok' as const,
  timestamp: new Date().toISOString(),
}));

// MCP endpoint — POST (stateless JSON-RPC)
fastify.post('/mcp', async (request, reply) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  reply.raw.once('close', () => {
    transport.close().catch(() => {});
  });

  await mcpServer.connect(transport);
  await transport.handleRequest(
    request.raw,
    reply.raw,
    request.body as Record<string, unknown>,
  );

  return reply.hijack();
});

// MCP endpoint — GET (SSE not supported in stateless mode)
fastify.get('/mcp', async (_request, reply) => {
  return reply
    .code(405)
    .header('Allow', 'POST')
    .send({ error: 'Method Not Allowed. Use POST for MCP requests.' });
});

// MCP endpoint — DELETE (session termination not supported in stateless mode)
fastify.delete('/mcp', async (_request, reply) => {
  return reply
    .code(405)
    .header('Allow', 'POST')
    .send({ error: 'Session termination not supported in stateless mode.' });
});

// Graceful shutdown
const shutdown = async (signal: string) => {
  fastify.log.info(`Received ${signal}, shutting down gracefully...`);
  await fastify.close();
  process.exit(0);
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

// Start server
try {
  await fastify.listen({ host: HOST, port: PORT });
  fastify.log.info(`MCP server running at http://${HOST}:${PORT}`);
  fastify.log.info(`MCP endpoint: http://${HOST}:${PORT}/mcp`);
  fastify.log.info(`Health check: http://${HOST}:${PORT}/health`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
