import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  getCourses,
  getUnitsWithChapters,
  getLessons,
} from '../services/courses.js';
import { importQuizzes } from '../services/quizzes.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'aspire-mcp-server',
    version: '1.0.0',
  });

  // Tool 1: get_courses
  server.registerTool(
    'get_courses',
    {
      description: 'Fetch all available courses from the database',
    },
    async () => {
      try {
        const courses = await getCourses();
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(courses, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${(error as Error).message}` }],
          isError: true,
        };
      }
    },
  );

  // Tool 2: get_units_with_chapters
  server.registerTool(
    'get_units_with_chapters',
    {
      description: 'Fetch all units and their chapters for a given course',
      inputSchema: {
        course_id: z.string().describe('The ID of the course'),
      },
    },
    async ({ course_id }) => {
      try {
        const units = await getUnitsWithChapters(course_id);
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(units, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${(error as Error).message}` }],
          isError: true,
        };
      }
    },
  );

  // Tool 3: get_lessons
  server.registerTool(
    'get_lessons',
    {
      description: 'Fetch all lessons for a given chapter within a course',
      inputSchema: {
        course_id: z.string().describe('The ID of the course'),
        chapter_id: z.string().describe('The ID of the chapter'),
      },
    },
    async ({ course_id, chapter_id }) => {
      try {
        const lessons = await getLessons(course_id, chapter_id);
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(lessons, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${(error as Error).message}` }],
          isError: true,
        };
      }
    },
  );

  // Tool 4: import_quizzes
  server.registerTool(
    'import_quizzes',
    {
      description: 'Parse a LaTeX quiz file and insert all questions into the database linked to a lesson',
      inputSchema: {
        file_path: z.string().describe('Absolute path to the .tex file on disk'),
        lesson_id: z.string().describe('The ID of the lesson to link quizzes to'),
      },
    },
    async ({ file_path, lesson_id }) => {
      try {
        const result = await importQuizzes(file_path, lesson_id);
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
          isError: !result.success,
        };
      } catch (error) {
        return {
          content: [
            { type: 'text' as const, text: `Error: ${(error as Error).message}` },
          ],
          isError: true,
        };
      }
    },
  );

  return server;
}
