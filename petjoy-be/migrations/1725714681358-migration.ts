import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725714681358 implements MigrationInterface {
    name = 'Migration1725714681358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pet_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ab82e82013700949b482416f64f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "petTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "filterPetTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "isHiringPetTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_e280727b18f2d1cf2cd29e4f521" FOREIGN KEY ("petTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_4a66fc5321cdc3512da25c12f84" FOREIGN KEY ("filterPetTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_465212f844b9b574e199f7b60ae" FOREIGN KEY ("isHiringPetTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_465212f844b9b574e199f7b60ae"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_4a66fc5321cdc3512da25c12f84"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_e280727b18f2d1cf2cd29e4f521"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "isHiringPetTypeId"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "filterPetTypeId"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "petTypeId"`);
        await queryRunner.query(`DROP TABLE "pet_type"`);
    }

}
