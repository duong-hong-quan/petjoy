import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725941419553 implements MigrationInterface {
  name = "Migration1725941419553";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_a09edead80f81163914f8402ee1"`
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`
    );
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "petId"`);
    await queryRunner.query(`ALTER TABLE "like" ADD "originPetId" integer `);
    await queryRunner.query(`ALTER TABLE "like" ADD "likePetId" integer`);
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_3b893bcd45a9dd9c116da02fe46" FOREIGN KEY ("originPetId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_20a8317927a058e378fdc3f35a8" FOREIGN KEY ("likePetId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_20a8317927a058e378fdc3f35a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_3b893bcd45a9dd9c116da02fe46"`
    );
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "likePetId"`);
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "originPetId"`);
    await queryRunner.query(`ALTER TABLE "like" ADD "petId" integer `);
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_a09edead80f81163914f8402ee1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
