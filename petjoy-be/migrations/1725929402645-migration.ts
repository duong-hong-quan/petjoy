import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1725929402645 implements MigrationInterface {
    name = 'Migration1725929402645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "petId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ab82e82013700949b482416f64f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "matchUserId" integer NOT NULL, "petId" integer NOT NULL, "matchDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "breed" character varying NOT NULL, "profilePicture" character varying NOT NULL, "ownerId" integer NOT NULL, "petTypeId" integer NOT NULL, "filterPetTypeId" integer NOT NULL, "isHiringPetTypeId" integer NOT NULL, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_package" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_94b3ce14c6d01318825a78d715a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "paymentPackageId" integer NOT NULL, "amount" numeric NOT NULL, "paymentDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "profilePicture" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_a09edead80f81163914f8402ee1" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_e6fd1aa5e4a710f9a8614db7fc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_15951706be867b56e1ffe58bdbe" FOREIGN KEY ("matchUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_6507b5f54e86d6ff2385df1de74" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_e280727b18f2d1cf2cd29e4f521" FOREIGN KEY ("petTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_4a66fc5321cdc3512da25c12f84" FOREIGN KEY ("filterPetTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_465212f844b9b574e199f7b60ae" FOREIGN KEY ("isHiringPetTypeId") REFERENCES "pet_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_bed3263d8711e0c66745d11a343" FOREIGN KEY ("paymentPackageId") REFERENCES "payment_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_bed3263d8711e0c66745d11a343"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_465212f844b9b574e199f7b60ae"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_4a66fc5321cdc3512da25c12f84"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_e280727b18f2d1cf2cd29e4f521"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_6507b5f54e86d6ff2385df1de74"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_15951706be867b56e1ffe58bdbe"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_e6fd1aa5e4a710f9a8614db7fc5"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_a09edead80f81163914f8402ee1"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "payment_package"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "pet_type"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
