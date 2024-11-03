import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730642717167 implements MigrationInterface {
    name = 'Migration1730642717167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "resolvedAt" SET DEFAULT '"2024-11-03T14:05:18.824Z"'`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "createdAt" SET DEFAULT '"2024-11-03T14:05:18.824Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-02 07:52:19.732'`);
        await queryRunner.query(`ALTER TABLE "ban_report" ALTER COLUMN "resolvedAt" SET DEFAULT '2024-10-02 07:52:19.732'`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "isDeleted"`);
    }

}
