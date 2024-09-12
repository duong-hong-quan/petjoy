import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726121836495 implements MigrationInterface {
    name = 'Migration1726121836495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    }

}
