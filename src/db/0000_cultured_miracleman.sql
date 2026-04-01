-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "schools" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "schools_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"utis_code" bigint NOT NULL,
	"address" varchar(500) NOT NULL,
	"region_id" integer NOT NULL,
	"region_name" varchar(100) NOT NULL,
	"school_kind" varchar(100) NOT NULL,
	"school_kind_id" integer NOT NULL,
	"school_type" varchar(100) NOT NULL,
	"school_type_id" integer NOT NULL,
	"subjection" varchar(255) NOT NULL,
	"subjection_id" integer NOT NULL,
	CONSTRAINT "schools_utis_code_unique" UNIQUE("utis_code")
);

*/