
ALTER TABLE "public"."reports" ADD COLUMN "ids" int4;
ALTER TABLE "public"."reports" ALTER COLUMN "ids" DROP NOT NULL;

alter table "public"."reports" drop constraint "reports_pkey";
alter table "public"."reports"
    add constraint "reports_pkey" 
    primary key ( "ids" );

ALTER TABLE "public"."reports" DROP COLUMN "id";

alter table "public"."reports" rename column "ids" to "id";

ALTER TABLE "public"."reports" ALTER COLUMN "date" TYPE integer;
alter table "public"."reports" rename column "id" to "date";

ALTER TABLE "public"."tasks" ADD COLUMN "reportDate" int4;
ALTER TABLE "public"."tasks" ALTER COLUMN "reportDate" DROP NOT NULL;

alter table "public"."tasks" drop constraint "tasks_reportDateText_fkey";

ALTER TABLE "public"."tasks" DROP COLUMN "reportDateText";

alter table "public"."tasks" add foreign key ("reportDate") references "public"."reports"("date") on update restrict on delete restrict;

ALTER TABLE "public"."reports" DROP COLUMN "dateText";

alter table "public"."reports" rename column "updatedAt" to "updatedat";

ALTER TABLE "public"."reports" ALTER COLUMN "createdat" TYPE timestamp without time zone;
alter table "public"."reports" rename column "createdAt" to "createdat";

alter table "public"."tasks" drop constraint "tasks_reportDate_fkey";

alter table "public"."tasks" rename column "reportDate" to "reportId";
