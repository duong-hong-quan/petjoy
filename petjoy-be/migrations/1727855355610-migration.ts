import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727855355610 implements MigrationInterface {
    name = 'Migration1727855355610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ban_report" ("id" SERIAL NOT NULL, "reason" character varying NOT NULL, "reporterId" integer NOT NULL, "reportedId" integer NOT NULL, "isResolved" boolean NOT NULL, "resolvedBy" integer NOT NULL, "resolvedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_229fb77a3180f36a9d8700aed40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ban_report" ADD CONSTRAINT "FK_d2a690910c684975d208cfbd4cd" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ban_report" ADD CONSTRAINT "FK_db4d5c4440f39b3aa5d55684b3f" FOREIGN KEY ("reportedId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ban_report" DROP CONSTRAINT "FK_db4d5c4440f39b3aa5d55684b3f"`);
        await queryRunner.query(`ALTER TABLE "ban_report" DROP CONSTRAINT "FK_d2a690910c684975d208cfbd4cd"`);
        await queryRunner.query(`DROP TABLE "ban_report"`);
    }

}
