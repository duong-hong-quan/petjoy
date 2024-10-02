import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727855538112 implements MigrationInterface {
    name = 'Migration1727855538112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ban_report" DROP COLUMN "resolvedBy"`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "isResolved" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "resolvedAt" SET DEFAULT '"2024-10-02T07:52:19.732Z"'`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "createdAt" SET DEFAULT '"2024-10-02T07:52:19.732Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "resolvedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "isResolved" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ban_report" ADD "resolvedBy" integer NOT NULL`);
    }

}
