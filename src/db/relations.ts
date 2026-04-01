import { relations } from "drizzle-orm/relations";
import { lessonsInApi, testsInApi, coursesInApi, chaptersInApi, unitsInApi, classroomsInApi, classroomCourseInApi, profilesInApi, classroomStudentInApi, usersInApi, countriesInApi, companiesInApi, companyTemplatesInApi, templatesInApi, competitionsInApi, competitionRegistrationsInApi, schoolsInApi, courseProfileInApi, categoriesInApi, curatorsInApi, curatorLogsInApi, logTypesInApi, emailNotificationsInApi, dimTestCoursesInApi, dimTestsInApi, examInApi, examResultsInApi, dimQuestionsInApi, dimTestResultsInApi, homeworksInApi, lessonCaptionsInApi, gamesInApi, lessonProfileInApi, platformsInApi, gameCurrentLevelsInApi, homeworkLessonInApi, notesInApi, materialsInApi, profileDownloadLogsInApi, profileQuizLogsInApi, mailTypesInApi, reportRatingsInApi, ratingsInApi, reportTypesInApi, ratingLikesInApi, studentProgressInApi, searchLogsInApi, paymentPlansInApi, stripePricesInApi, studentQuizProgressInApi, additionalSignupDataInApi, contributorsInApi, contributorCourseInApi, dimOptionsInApi, examQuestionsInApi, mailTypeRulesInApi, paymentHistoryInApi, userLogsInApi, userActivitiesInApi } from "./schema.js";

export const testsInApiRelations = relations(testsInApi, ({one, many}) => ({
	lessonsInApi: one(lessonsInApi, {
		fields: [testsInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	profileQuizLogsInApis: many(profileQuizLogsInApi),
}));

export const lessonsInApiRelations = relations(lessonsInApi, ({one, many}) => ({
	testsInApis: many(testsInApi),
	lessonCaptionsInApis: many(lessonCaptionsInApi),
	gamesInApis: many(gamesInApi),
	lessonProfileInApis: many(lessonProfileInApi),
	homeworkLessonInApis: many(homeworkLessonInApi),
	notesInApis: many(notesInApi),
	profileDownloadLogsInApis: many(profileDownloadLogsInApi),
	studentProgressInApis: many(studentProgressInApi),
	chaptersInApi: one(chaptersInApi, {
		fields: [lessonsInApi.chapterId],
		references: [chaptersInApi.id]
	}),
	coursesInApi: one(coursesInApi, {
		fields: [lessonsInApi.courseId],
		references: [coursesInApi.id]
	}),
	dimTestsInApi: one(dimTestsInApi, {
		fields: [lessonsInApi.dimTestId],
		references: [dimTestsInApi.id]
	}),
	unitsInApi: one(unitsInApi, {
		fields: [lessonsInApi.unitId],
		references: [unitsInApi.id]
	}),
}));

export const chaptersInApiRelations = relations(chaptersInApi, ({one, many}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [chaptersInApi.courseId],
		references: [coursesInApi.id]
	}),
	unitsInApi: one(unitsInApi, {
		fields: [chaptersInApi.unitId],
		references: [unitsInApi.id]
	}),
	lessonsInApis: many(lessonsInApi),
}));

export const coursesInApiRelations = relations(coursesInApi, ({one, many}) => ({
	chaptersInApis: many(chaptersInApi),
	classroomCourseInApis: many(classroomCourseInApi),
	classroomsInApis: many(classroomsInApi),
	courseProfileInApis: many(courseProfileInApi),
	categoriesInApi: one(categoriesInApi, {
		fields: [coursesInApi.categoryId],
		references: [categoriesInApi.id]
	}),
	emailNotificationsInApis: many(emailNotificationsInApi),
	dimTestCoursesInApis: many(dimTestCoursesInApi),
	notesInApis: many(notesInApi),
	materialsInApis: many(materialsInApi),
	ratingsInApis: many(ratingsInApi),
	unitsInApis: many(unitsInApi),
	lessonsInApis: many(lessonsInApi),
	contributorCourseInApis: many(contributorCourseInApi),
}));

export const unitsInApiRelations = relations(unitsInApi, ({one, many}) => ({
	chaptersInApis: many(chaptersInApi),
	coursesInApi: one(coursesInApi, {
		fields: [unitsInApi.courseId],
		references: [coursesInApi.id]
	}),
	lessonsInApis: many(lessonsInApi),
}));

export const classroomCourseInApiRelations = relations(classroomCourseInApi, ({one}) => ({
	classroomsInApi: one(classroomsInApi, {
		fields: [classroomCourseInApi.classroomId],
		references: [classroomsInApi.id]
	}),
	coursesInApi: one(coursesInApi, {
		fields: [classroomCourseInApi.courseId],
		references: [coursesInApi.id]
	}),
}));

export const classroomsInApiRelations = relations(classroomsInApi, ({one, many}) => ({
	classroomCourseInApis: many(classroomCourseInApi),
	coursesInApi: one(coursesInApi, {
		fields: [classroomsInApi.courseId],
		references: [coursesInApi.id]
	}),
	classroomStudentInApis: many(classroomStudentInApi),
	homeworksInApis: many(homeworksInApi),
}));

export const classroomStudentInApiRelations = relations(classroomStudentInApi, ({one}) => ({
	profilesInApi: one(profilesInApi, {
		fields: [classroomStudentInApi.profileId],
		references: [profilesInApi.id]
	}),
	classroomsInApi: one(classroomsInApi, {
		fields: [classroomStudentInApi.classroomId],
		references: [classroomsInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [classroomStudentInApi.studentId],
		references: [usersInApi.id]
	}),
}));

export const profilesInApiRelations = relations(profilesInApi, ({one, many}) => ({
	classroomStudentInApis: many(classroomStudentInApi),
	courseProfileInApis: many(courseProfileInApi),
	emailNotificationsInApis: many(emailNotificationsInApi),
	lessonProfileInApis: many(lessonProfileInApi),
	gameCurrentLevelsInApis: many(gameCurrentLevelsInApi),
	notesInApis: many(notesInApi),
	profileDownloadLogsInApis: many(profileDownloadLogsInApi),
	profileQuizLogsInApis: many(profileQuizLogsInApi),
	reportRatingsInApis: many(reportRatingsInApi),
	ratingLikesInApis: many(ratingLikesInApi),
	studentProgressInApis: many(studentProgressInApi),
	usersInApi: one(usersInApi, {
		fields: [profilesInApi.userId],
		references: [usersInApi.id]
	}),
	ratingsInApis: many(ratingsInApi),
	searchLogsInApis: many(searchLogsInApi),
	userLogsInApis: many(userLogsInApi),
}));

export const usersInApiRelations = relations(usersInApi, ({one, many}) => ({
	classroomStudentInApis: many(classroomStudentInApi),
	curatorLogsInApis: many(curatorLogsInApi),
	emailNotificationsInApis: many(emailNotificationsInApi),
	studentProgressInApis: many(studentProgressInApi),
	profilesInApis: many(profilesInApi),
	additionalSignupDataInApis: many(additionalSignupDataInApi),
	paymentHistoryInApis: many(paymentHistoryInApi, {
		relationName: "paymentHistoryInApi_userId_usersInApi_id"
	}),
	userLogsInApis: many(userLogsInApi),
	companiesInApi: one(companiesInApi, {
		fields: [usersInApi.companyId],
		references: [companiesInApi.id]
	}),
	countriesInApi: one(countriesInApi, {
		fields: [usersInApi.countryId],
		references: [countriesInApi.id]
	}),
	paymentHistoryInApi: one(paymentHistoryInApi, {
		fields: [usersInApi.paymentHistoryId],
		references: [paymentHistoryInApi.id],
		relationName: "usersInApi_paymentHistoryId_paymentHistoryInApi_id"
	}),
	paymentPlansInApi: one(paymentPlansInApi, {
		fields: [usersInApi.paymentPlanId],
		references: [paymentPlansInApi.id]
	}),
}));

export const companiesInApiRelations = relations(companiesInApi, ({one, many}) => ({
	countriesInApi: one(countriesInApi, {
		fields: [companiesInApi.countryId],
		references: [countriesInApi.id]
	}),
	companyTemplatesInApis: many(companyTemplatesInApi),
	curatorsInApis: many(curatorsInApi),
	usersInApis: many(usersInApi),
}));

export const countriesInApiRelations = relations(countriesInApi, ({many}) => ({
	companiesInApis: many(companiesInApi),
	competitionRegistrationsInApis: many(competitionRegistrationsInApi),
	schoolsInApis: many(schoolsInApi),
	usersInApis: many(usersInApi),
}));

export const companyTemplatesInApiRelations = relations(companyTemplatesInApi, ({one}) => ({
	companiesInApi: one(companiesInApi, {
		fields: [companyTemplatesInApi.companyId],
		references: [companiesInApi.id]
	}),
	templatesInApi: one(templatesInApi, {
		fields: [companyTemplatesInApi.templateId],
		references: [templatesInApi.id]
	}),
}));

export const templatesInApiRelations = relations(templatesInApi, ({one, many}) => ({
	companyTemplatesInApis: many(companyTemplatesInApi),
	mailTypesInApi: one(mailTypesInApi, {
		fields: [templatesInApi.mailTypeId],
		references: [mailTypesInApi.id]
	}),
}));

export const competitionRegistrationsInApiRelations = relations(competitionRegistrationsInApi, ({one}) => ({
	competitionsInApi: one(competitionsInApi, {
		fields: [competitionRegistrationsInApi.competitionId],
		references: [competitionsInApi.id]
	}),
	countriesInApi: one(countriesInApi, {
		fields: [competitionRegistrationsInApi.countryId],
		references: [countriesInApi.id]
	}),
	schoolsInApi: one(schoolsInApi, {
		fields: [competitionRegistrationsInApi.schoolId],
		references: [schoolsInApi.id]
	}),
}));

export const competitionsInApiRelations = relations(competitionsInApi, ({many}) => ({
	competitionRegistrationsInApis: many(competitionRegistrationsInApi),
}));

export const schoolsInApiRelations = relations(schoolsInApi, ({one, many}) => ({
	competitionRegistrationsInApis: many(competitionRegistrationsInApi),
	countriesInApi: one(countriesInApi, {
		fields: [schoolsInApi.countryId],
		references: [countriesInApi.id]
	}),
}));

export const courseProfileInApiRelations = relations(courseProfileInApi, ({one}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [courseProfileInApi.courseId],
		references: [coursesInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [courseProfileInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const categoriesInApiRelations = relations(categoriesInApi, ({many}) => ({
	coursesInApis: many(coursesInApi),
}));

export const curatorLogsInApiRelations = relations(curatorLogsInApi, ({one}) => ({
	curatorsInApi: one(curatorsInApi, {
		fields: [curatorLogsInApi.curatorId],
		references: [curatorsInApi.id]
	}),
	logTypesInApi: one(logTypesInApi, {
		fields: [curatorLogsInApi.logTypeId],
		references: [logTypesInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [curatorLogsInApi.userId],
		references: [usersInApi.id]
	}),
}));

export const curatorsInApiRelations = relations(curatorsInApi, ({one, many}) => ({
	curatorLogsInApis: many(curatorLogsInApi),
	companiesInApi: one(companiesInApi, {
		fields: [curatorsInApi.companyId],
		references: [companiesInApi.id]
	}),
}));

export const logTypesInApiRelations = relations(logTypesInApi, ({many}) => ({
	curatorLogsInApis: many(curatorLogsInApi),
}));

export const emailNotificationsInApiRelations = relations(emailNotificationsInApi, ({one}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [emailNotificationsInApi.courseId],
		references: [coursesInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [emailNotificationsInApi.profileId],
		references: [profilesInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [emailNotificationsInApi.userId],
		references: [usersInApi.id]
	}),
}));

export const dimTestCoursesInApiRelations = relations(dimTestCoursesInApi, ({one}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [dimTestCoursesInApi.courseId],
		references: [coursesInApi.id]
	}),
	dimTestsInApi: one(dimTestsInApi, {
		fields: [dimTestCoursesInApi.dimTestId],
		references: [dimTestsInApi.id]
	}),
}));

export const dimTestsInApiRelations = relations(dimTestsInApi, ({many}) => ({
	dimTestCoursesInApis: many(dimTestCoursesInApi),
	dimQuestionsInApis: many(dimQuestionsInApi),
	dimTestResultsInApis: many(dimTestResultsInApi),
	lessonsInApis: many(lessonsInApi),
}));

export const examResultsInApiRelations = relations(examResultsInApi, ({one}) => ({
	examInApi: one(examInApi, {
		fields: [examResultsInApi.examId],
		references: [examInApi.id]
	}),
}));

export const examInApiRelations = relations(examInApi, ({many}) => ({
	examResultsInApis: many(examResultsInApi),
	examQuestionsInApis: many(examQuestionsInApi),
}));

export const dimQuestionsInApiRelations = relations(dimQuestionsInApi, ({one, many}) => ({
	dimTestsInApi: one(dimTestsInApi, {
		fields: [dimQuestionsInApi.dimTestId],
		references: [dimTestsInApi.id]
	}),
	dimOptionsInApis: many(dimOptionsInApi),
}));

export const dimTestResultsInApiRelations = relations(dimTestResultsInApi, ({one}) => ({
	dimTestsInApi: one(dimTestsInApi, {
		fields: [dimTestResultsInApi.dimTestId],
		references: [dimTestsInApi.id]
	}),
}));

export const homeworksInApiRelations = relations(homeworksInApi, ({one, many}) => ({
	classroomsInApi: one(classroomsInApi, {
		fields: [homeworksInApi.classroomId],
		references: [classroomsInApi.id]
	}),
	homeworkLessonInApis: many(homeworkLessonInApi),
	studentProgressInApis: many(studentProgressInApi),
}));

export const lessonCaptionsInApiRelations = relations(lessonCaptionsInApi, ({one}) => ({
	lessonsInApi: one(lessonsInApi, {
		fields: [lessonCaptionsInApi.lessonId],
		references: [lessonsInApi.id]
	}),
}));

export const gamesInApiRelations = relations(gamesInApi, ({one, many}) => ({
	lessonsInApi: one(lessonsInApi, {
		fields: [gamesInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	gameCurrentLevelsInApis: many(gameCurrentLevelsInApi),
}));

export const lessonProfileInApiRelations = relations(lessonProfileInApi, ({one}) => ({
	lessonsInApi: one(lessonsInApi, {
		fields: [lessonProfileInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	platformsInApi: one(platformsInApi, {
		fields: [lessonProfileInApi.platformId],
		references: [platformsInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [lessonProfileInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const platformsInApiRelations = relations(platformsInApi, ({many}) => ({
	lessonProfileInApis: many(lessonProfileInApi),
	profileDownloadLogsInApis: many(profileDownloadLogsInApi),
	profileQuizLogsInApis: many(profileQuizLogsInApi),
}));

export const gameCurrentLevelsInApiRelations = relations(gameCurrentLevelsInApi, ({one}) => ({
	gamesInApi: one(gamesInApi, {
		fields: [gameCurrentLevelsInApi.gameId],
		references: [gamesInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [gameCurrentLevelsInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const homeworkLessonInApiRelations = relations(homeworkLessonInApi, ({one}) => ({
	homeworksInApi: one(homeworksInApi, {
		fields: [homeworkLessonInApi.homeworkId],
		references: [homeworksInApi.id]
	}),
	lessonsInApi: one(lessonsInApi, {
		fields: [homeworkLessonInApi.lessonId],
		references: [lessonsInApi.id]
	}),
}));

export const notesInApiRelations = relations(notesInApi, ({one}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [notesInApi.courseId],
		references: [coursesInApi.id]
	}),
	lessonsInApi: one(lessonsInApi, {
		fields: [notesInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [notesInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const materialsInApiRelations = relations(materialsInApi, ({one, many}) => ({
	coursesInApi: one(coursesInApi, {
		fields: [materialsInApi.courseId],
		references: [coursesInApi.id]
	}),
	profileDownloadLogsInApis: many(profileDownloadLogsInApi),
}));

export const profileDownloadLogsInApiRelations = relations(profileDownloadLogsInApi, ({one}) => ({
	lessonsInApi: one(lessonsInApi, {
		fields: [profileDownloadLogsInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	materialsInApi: one(materialsInApi, {
		fields: [profileDownloadLogsInApi.materialId],
		references: [materialsInApi.id]
	}),
	platformsInApi: one(platformsInApi, {
		fields: [profileDownloadLogsInApi.platformId],
		references: [platformsInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [profileDownloadLogsInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const profileQuizLogsInApiRelations = relations(profileQuizLogsInApi, ({one}) => ({
	platformsInApi: one(platformsInApi, {
		fields: [profileQuizLogsInApi.platformId],
		references: [platformsInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [profileQuizLogsInApi.profileId],
		references: [profilesInApi.id]
	}),
	testsInApi: one(testsInApi, {
		fields: [profileQuizLogsInApi.testId],
		references: [testsInApi.id]
	}),
}));

export const mailTypesInApiRelations = relations(mailTypesInApi, ({many}) => ({
	templatesInApis: many(templatesInApi),
	mailTypeRulesInApis: many(mailTypeRulesInApi),
}));

export const reportRatingsInApiRelations = relations(reportRatingsInApi, ({one}) => ({
	profilesInApi: one(profilesInApi, {
		fields: [reportRatingsInApi.profileId],
		references: [profilesInApi.id]
	}),
	ratingsInApi: one(ratingsInApi, {
		fields: [reportRatingsInApi.ratingId],
		references: [ratingsInApi.id]
	}),
	reportTypesInApi: one(reportTypesInApi, {
		fields: [reportRatingsInApi.reportTypeId],
		references: [reportTypesInApi.id]
	}),
}));

export const ratingsInApiRelations = relations(ratingsInApi, ({one, many}) => ({
	reportRatingsInApis: many(reportRatingsInApi),
	ratingLikesInApis: many(ratingLikesInApi),
	profilesInApi: one(profilesInApi, {
		fields: [ratingsInApi.profileId],
		references: [profilesInApi.id]
	}),
	ratingsInApi_ratingId: one(ratingsInApi, {
		fields: [ratingsInApi.ratingId],
		references: [ratingsInApi.id],
		relationName: "ratingsInApi_ratingId_ratingsInApi_id"
	}),
	ratingsInApis_ratingId: many(ratingsInApi, {
		relationName: "ratingsInApi_ratingId_ratingsInApi_id"
	}),
	coursesInApi: one(coursesInApi, {
		fields: [ratingsInApi.courseId],
		references: [coursesInApi.id]
	}),
	ratingsInApi_parentId: one(ratingsInApi, {
		fields: [ratingsInApi.parentId],
		references: [ratingsInApi.id],
		relationName: "ratingsInApi_parentId_ratingsInApi_id"
	}),
	ratingsInApis_parentId: many(ratingsInApi, {
		relationName: "ratingsInApi_parentId_ratingsInApi_id"
	}),
}));

export const reportTypesInApiRelations = relations(reportTypesInApi, ({many}) => ({
	reportRatingsInApis: many(reportRatingsInApi),
}));

export const ratingLikesInApiRelations = relations(ratingLikesInApi, ({one}) => ({
	profilesInApi: one(profilesInApi, {
		fields: [ratingLikesInApi.profileId],
		references: [profilesInApi.id]
	}),
	ratingsInApi: one(ratingsInApi, {
		fields: [ratingLikesInApi.ratingId],
		references: [ratingsInApi.id]
	}),
}));

export const studentProgressInApiRelations = relations(studentProgressInApi, ({one, many}) => ({
	homeworksInApi: one(homeworksInApi, {
		fields: [studentProgressInApi.homeworkId],
		references: [homeworksInApi.id]
	}),
	lessonsInApi: one(lessonsInApi, {
		fields: [studentProgressInApi.lessonId],
		references: [lessonsInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [studentProgressInApi.userId],
		references: [usersInApi.id]
	}),
	profilesInApi: one(profilesInApi, {
		fields: [studentProgressInApi.profileId],
		references: [profilesInApi.id]
	}),
	studentQuizProgressInApis: many(studentQuizProgressInApi),
}));

export const searchLogsInApiRelations = relations(searchLogsInApi, ({one}) => ({
	profilesInApi: one(profilesInApi, {
		fields: [searchLogsInApi.profileId],
		references: [profilesInApi.id]
	}),
}));

export const stripePricesInApiRelations = relations(stripePricesInApi, ({one}) => ({
	paymentPlansInApi: one(paymentPlansInApi, {
		fields: [stripePricesInApi.paymentPlanId],
		references: [paymentPlansInApi.id]
	}),
}));

export const paymentPlansInApiRelations = relations(paymentPlansInApi, ({many}) => ({
	stripePricesInApis: many(stripePricesInApi),
	paymentHistoryInApis: many(paymentHistoryInApi),
	usersInApis: many(usersInApi),
}));

export const studentQuizProgressInApiRelations = relations(studentQuizProgressInApi, ({one}) => ({
	studentProgressInApi: one(studentProgressInApi, {
		fields: [studentQuizProgressInApi.studentProgressId],
		references: [studentProgressInApi.id]
	}),
}));

export const additionalSignupDataInApiRelations = relations(additionalSignupDataInApi, ({one}) => ({
	usersInApi: one(usersInApi, {
		fields: [additionalSignupDataInApi.userId],
		references: [usersInApi.id]
	}),
}));

export const contributorCourseInApiRelations = relations(contributorCourseInApi, ({one}) => ({
	contributorsInApi: one(contributorsInApi, {
		fields: [contributorCourseInApi.contributorId],
		references: [contributorsInApi.id]
	}),
	coursesInApi: one(coursesInApi, {
		fields: [contributorCourseInApi.courseId],
		references: [coursesInApi.id]
	}),
}));

export const contributorsInApiRelations = relations(contributorsInApi, ({many}) => ({
	contributorCourseInApis: many(contributorCourseInApi),
}));

export const dimOptionsInApiRelations = relations(dimOptionsInApi, ({one}) => ({
	dimQuestionsInApi: one(dimQuestionsInApi, {
		fields: [dimOptionsInApi.questionId],
		references: [dimQuestionsInApi.id]
	}),
}));

export const examQuestionsInApiRelations = relations(examQuestionsInApi, ({one}) => ({
	examInApi: one(examInApi, {
		fields: [examQuestionsInApi.examId],
		references: [examInApi.id]
	}),
}));

export const mailTypeRulesInApiRelations = relations(mailTypeRulesInApi, ({one}) => ({
	mailTypesInApi: one(mailTypesInApi, {
		fields: [mailTypeRulesInApi.mailTypeId],
		references: [mailTypesInApi.id]
	}),
}));

export const paymentHistoryInApiRelations = relations(paymentHistoryInApi, ({one, many}) => ({
	paymentPlansInApi: one(paymentPlansInApi, {
		fields: [paymentHistoryInApi.paymentPlanId],
		references: [paymentPlansInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [paymentHistoryInApi.userId],
		references: [usersInApi.id],
		relationName: "paymentHistoryInApi_userId_usersInApi_id"
	}),
	usersInApis: many(usersInApi, {
		relationName: "usersInApi_paymentHistoryId_paymentHistoryInApi_id"
	}),
}));

export const userLogsInApiRelations = relations(userLogsInApi, ({one, many}) => ({
	profilesInApi: one(profilesInApi, {
		fields: [userLogsInApi.profileId],
		references: [profilesInApi.id]
	}),
	usersInApi: one(usersInApi, {
		fields: [userLogsInApi.userId],
		references: [usersInApi.id]
	}),
	userActivitiesInApis: many(userActivitiesInApi),
}));

export const userActivitiesInApiRelations = relations(userActivitiesInApi, ({one}) => ({
	userLogsInApi: one(userLogsInApi, {
		fields: [userActivitiesInApi.userLogId],
		references: [userLogsInApi.id]
	}),
}));