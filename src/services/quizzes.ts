import { readFile } from 'node:fs/promises';
import { db } from '../db/client.js';
import { parseLatex } from '../lib/latex.js';
import { testsInApi } from '../db/schema.js';

interface ImportResult {
  success: boolean;
  inserted: number;
  total: number;
  lesson_id: string;
  message: string;
  errors: string[];
}

export async function importQuizzes(
  filePath: string,
  lessonId: string,
): Promise<ImportResult> {
  const lessonIdNum = Number(lessonId);

  let content: string;
  try {
    content = await readFile(filePath, 'utf-8');
  } catch {
    return {
      success: false,
      inserted: 0,
      total: 0,
      lesson_id: lessonId,
      message: `File not found: ${filePath}`,
      errors: [`File not found: ${filePath}`],
    };
  }

  if (!content.includes('\\question')) {
    return {
      success: false,
      inserted: 0,
      total: 0,
      lesson_id: lessonId,
      message:
        'Invalid LaTeX file structure. Could not find question markers (\\question).',
      errors: [
        'Invalid LaTeX file structure. Could not find question markers (\\question).',
      ],
    };
  }

  const parsed = parseLatex(content);

  if (parsed.length === 0) {
    return {
      success: false,
      inserted: 0,
      total: 0,
      lesson_id: lessonId,
      message: 'No questions could be parsed from the LaTeX file.',
      errors: ['No questions could be parsed from the LaTeX file.'],
    };
  }

  let successCount = 0;
  const errors: string[] = [];
  const now = new Date().toISOString();

  for (const questionData of parsed) {
    // Skip questions with no options
    if (Object.keys(questionData.options).length === 0) {
      errors.push(
        `Question ${questionData.number ?? 'unknown'} has no options.`,
      );
      continue;
    }

    // Skip questions where correct_answer not in option keys
    const optionKeys = Object.keys(questionData.options);
    if (
      !questionData.correct_answer ||
      !optionKeys.includes(questionData.correct_answer)
    ) {
      errors.push(
        `Question ${questionData.number ?? 'unknown'} has invalid correct answer key.`,
      );
      continue;
    }

    let answerId = 1;
    const answers = Object.entries(questionData.options).map(
      ([key, optionText]) => ({
        id: answerId++,
        value: optionText,
        correct: key === questionData.correct_answer,
      }),
    );

    try {
      await db.insert(testsInApi).values({
        lessonId: lessonIdNum,
        title: questionData.text,
        description: '',
        answers,
        explanation: questionData.explanation ?? 'NA',
        audio: null,
        type: 'latex',
        createdAt: now,
        updatedAt: now,
      });
      successCount++;
    } catch (ex) {
      errors.push(
        `Question ${questionData.number ?? 'unknown'} could not be saved: ${(ex as Error).message}`,
      );
    }
  }

  if (errors.length > 0 || successCount === 0) {
    const msg = [
      `Inserted ${successCount} out of ${parsed.length} quiz questions.`,
    ];
    if (successCount === 0) {
      msg.push(
        'No quiz questions were inserted. Please check your LaTeX file for formatting errors.',
      );
    }
    return {
      success: false,
      inserted: successCount,
      total: parsed.length,
      lesson_id: lessonId,
      message: msg.join(' '),
      errors: [...msg, ...errors],
    };
  }

  return {
    success: true,
    inserted: successCount,
    total: parsed.length,
    lesson_id: lessonId,
    message: `LaTeX file uploaded. Inserted ${successCount} out of ${parsed.length} quiz questions.`,
    errors: [],
  };
}
