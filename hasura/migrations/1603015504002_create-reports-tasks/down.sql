
alter table "public"."reports" rename column "updatedAt" to "updated_at";

alter table "public"."reports" rename column "createdAt" to "created_at";

alter table "public"."tasks" drop constraint "tasks_reportDateText_fkey";

ALTER TABLE "public"."reports" ALTER COLUMN "dateText" SET NOT NULL;
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_dateText_key";

ALTER TABLE "public"."reports" ALTER COLUMN "updated_at" TYPE timestamp with time zone;

ALTER TABLE "public"."reports" ALTER COLUMN "created_at" TYPE timestamp with time zone;

alter table "public"."reports" drop constraint "reports_pkey";
alter table "public"."reports"
    add constraint "reports_pkey" 
    primary key ( "dateText" );

alter table "public"."tasks" add foreign key ("reportDateText") references "public"."reports"("dateText") on update restrict on delete restrict;

ALTER TABLE "public"."reports" DROP COLUMN "id";

ALTER TABLE "public"."articles" ADD COLUMN "ids" int4;
ALTER TABLE "public"."articles" ALTER COLUMN "ids" DROP NOT NULL;
ALTER TABLE "public"."articles" ALTER COLUMN "ids" SET DEFAULT nextval('articles_id_seq'::regclass);

alter table "public"."articles" drop constraint "articles_pkey";
alter table "public"."articles"
    add constraint "articles_pkey" 
    primary key ( "ids" );

ALTER TABLE "public"."articles" DROP COLUMN "id";

alter table "public"."articles" rename column "ids" to "id";

alter table "public"."articles" drop constraint "articles_author_id_fkey";

ALTER TABLE "public"."users" ADD COLUMN "ids" int4;
ALTER TABLE "public"."users" ALTER COLUMN "ids" DROP NOT NULL;
ALTER TABLE "public"."users" ALTER COLUMN "ids" SET DEFAULT nextval('users_id_seq'::regclass);

alter table "public"."users" drop constraint "users_pkey";
alter table "public"."users"
    add constraint "users_pkey" 
    primary key ( "ids" );

ALTER TABLE "public"."users" DROP COLUMN "id";

alter table "public"."users" rename column "ids" to "id";

DROP TABLE "public"."articles";

alter table "public"."users" rename column "display_id" to "displayId";

alter table "public"."users" rename column "displayId" to "display_id";

DROP TABLE "public"."users";

ALTER TABLE "public"."hours" ALTER COLUMN "hours" TYPE integer;

DROP TABLE "public"."tasks";

DROP TABLE "public"."categories";

DROP TABLE "public"."hours";

DROP TABLE "public"."reports";

ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_reportDateText_key" UNIQUE ("reportDateText");


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

DROP TABLE "public"."reports";

create table reports
(date integer not null,
createdAt timestamp not null,
updatedAt timestamp,
primary key (date)
);


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
