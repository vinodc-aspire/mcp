module.exports = {
  apps: [{
    name: 'mcp-server',
    script: 'dist/index.js',
    cwd: '/home/ubuntu/mcp-server',
    env: {
      NODE_ENV: 'production',
    },
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '256M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: '/home/ubuntu/mcp-server/logs/error.log',
    out_file: '/home/ubuntu/mcp-server/logs/output.log',
    merge_logs: true,
  }],
};
