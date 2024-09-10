import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725942812938 implements MigrationInterface {
  name = "Migration1725942812938";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_3b893bcd45a9dd9c116da02fe46"`
    );
    await queryRunner.query(
      `ALTER TABLE "like" DROP CONSTRAINT "FK_20a8317927a058e378fdc3f35a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "originPetId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "likePetId" SET NOT NULL`
    );
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
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "likePetId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ALTER COLUMN "originPetId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_20a8317927a058e378fdc3f35a8" FOREIGN KEY ("likePetId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_3b893bcd45a9dd9c116da02fe46" FOREIGN KEY ("originPetId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "like" ADD "userId" integer NOT NULL`);
  }
}
