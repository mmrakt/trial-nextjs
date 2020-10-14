
ALTER TABLE "public"."reports" ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "public"."reports" DROP COLUMN "date";

alter table "public"."tasks" rename column "ticketTitle" to "taskTitle";

alter table "public"."reports" rename column "updatedAt" to "updated_at";

alter table "public"."reports" rename column "createdAt" to "created_at";

alter table "public"."tasks" rename column "categoryId" to "classificationId";

alter table "public"."tasks" rename column "classificationId" to "categoryId";

ALTER TABLE "public"."tasks" ADD COLUMN "backlogId" text;
ALTER TABLE "public"."tasks" ALTER COLUMN "backlogId" DROP NOT NULL;

alter table "public"."tasks" drop constraint "tasks_categoryId_fkey";

alter table "public"."tasks" drop constraint "tasks_hourId_fkey";

DROP TABLE "public"."categories";

DROP TABLE "public"."hours";

DROP TABLE "public"."tasks";

DROP TABLE "public"."reports";


DROP TABLE "public"."articles";

DROP TABLE "public"."users";
