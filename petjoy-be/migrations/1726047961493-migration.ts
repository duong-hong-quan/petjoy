import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726047961493 implements MigrationInterface {
    name = 'Migration1726047961493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "name" text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT ''`);
    }

}
