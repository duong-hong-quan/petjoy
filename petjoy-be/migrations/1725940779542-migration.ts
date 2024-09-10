import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725940779542 implements MigrationInterface {
    name = 'Migration1725940779542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" ADD "isLike" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "isLike"`);
    }

}
