# Aspire MCP Server

An MCP (Model Context Protocol) server that connects Claude Cowork to a PostgreSQL database, enabling course navigation (course → unit → chapter → lesson) and LaTeX quiz file import. Parsed quiz questions are inserted into the `dim_questions` and `dim_options` tables linked to lessons via `dim_tests`.

## Prerequisites

- Node.js 20+
- PostgreSQL database with the Aspire `api` schema

## Setup

```bash
cd mcp-server
npm install
cp .env.example .env
# Edit .env with your real DATABASE_URL
npx drizzle-kit pull   # generates src/db/schema.ts from live DB
npm run dev
```

## Connect Cowork

Add MCP server URL: `http://localhost:3100/mcp`

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_courses` | Fetch all available courses |
| `get_units_with_chapters` | Fetch units and chapters for a course |
| `get_lessons` | Fetch lessons for a chapter |
| `import_quizzes` | Parse a LaTeX file and insert quiz questions for a lesson |

## LaTeX File Format

Each question uses a `\question` macro with 4 brace-delimited arguments:

```latex
\question
    {Question text here}
    {\item choice1\item choice2\item choice3\item choice4}
    {Explanation (ignored)}
    {A) choice1}
```

## Assumptions

- The database uses the `api` schema (not `public`)
- IDs are bigint (not UUID) — passed as strings in MCP tool parameters
- Quiz questions map to `dim_questions` + `dim_options` (normalized), not a flat table
- If a lesson has no `dim_test`, one is created automatically during import
- Only the first 4-5 answer choices are stored; option E is included if present
