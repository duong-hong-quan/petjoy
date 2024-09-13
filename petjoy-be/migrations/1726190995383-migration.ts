import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726190995383 implements MigrationInterface {
    name = 'Migration1726190995383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isBanned" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isBanned"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "date"`);
    }

}
