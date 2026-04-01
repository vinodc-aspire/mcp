import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ['api'],
  out: './src/db',
  schema: './src/db/schema.ts',
} satisfies Config;
