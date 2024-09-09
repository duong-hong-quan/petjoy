import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725894493647 implements MigrationInterface {
    name = 'Migration1725894493647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" RENAME COLUMN "age" TO "dob"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "dob" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "dob" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pet" RENAME COLUMN "dob" TO "age"`);
    }

}
