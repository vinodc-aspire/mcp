import { eq, isNull, asc } from 'drizzle-orm';
import { db } from '../db/client.js';
import {
  coursesInApi,
  unitsInApi,
  chaptersInApi,
  lessonsInApi,
} from '../db/schema.js';

export async function getCourses(): Promise<{ id: string; name: string }[]> {
  try {
    const rows = await db
      .select({
        id: coursesInApi.id,
        name: coursesInApi.name,
      })
      .from(coursesInApi)
      .where(isNull(coursesInApi.deletedAt))
      .orderBy(asc(coursesInApi.name));

    return rows.map((r) => ({ id: String(r.id), name: r.name }));
  } catch (error) {
    throw new Error(`Failed to fetch courses: ${(error as Error).message}`);
  }
}

export async function getUnitsWithChapters(
  courseId: string,
): Promise<
  {
    unit_id: string;
    unit_name: string;
    chapters: { chapter_id: string; chapter_name: string }[];
  }[]
> {
  try {
    const courseIdNum = Number(courseId);

    const units = await db
      .select({
        id: unitsInApi.id,
        name: unitsInApi.name,
      })
      .from(unitsInApi)
      .where(eq(unitsInApi.courseId, courseIdNum))
      .orderBy(asc(unitsInApi.order));

    const result = [];
    for (const unit of units) {
      const unitIdNum = Number(unit.id);
      const chapters = await db
        .select({
          id: chaptersInApi.id,
          name: chaptersInApi.name,
        })
        .from(chaptersInApi)
        .where(eq(chaptersInApi.unitId, unitIdNum))
        .orderBy(asc(chaptersInApi.order));

      result.push({
        unit_id: String(unit.id),
        unit_name: unit.name,
        chapters: chapters.map((c) => ({
          chapter_id: String(c.id),
          chapter_name: c.name,
        })),
      });
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to fetch units with chapters: ${(error as Error).message}`,
    );
  }
}

export async function getLessons(
  courseId: string,
  chapterId: string,
): Promise<{ lesson_id: string; lesson_name: string }[]> {
  try {
    const chapterIdNum = Number(chapterId);

    const rows = await db
      .select({
        id: lessonsInApi.id,
        name: lessonsInApi.name,
      })
      .from(lessonsInApi)
      .where(eq(lessonsInApi.chapterId, chapterIdNum))
      .orderBy(asc(lessonsInApi.order));

    return rows.map((r) => ({
      lesson_id: String(r.id),
      lesson_name: r.name,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch lessons: ${(error as Error).message}`);
  }
}
