import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726115065318 implements MigrationInterface {
    name = 'Migration1726115065318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
    }

}
