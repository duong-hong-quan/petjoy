import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetModule } from "./pet/pet.module";
import { PaymentModule } from "./payment/payment.module";
import { PaymentPackageModule } from "./payment-package/payment-package.module";
import { MessageModule } from "./message/message.module";
import { MatchModule } from "./match/match.module";
import { LikeModule } from "./like/like.module";
import { UserModule } from "./user/user.module";
import { config as envConfig } from "dotenv";
import { PetTypeModule } from "./pet-type/pet-type.module";
import { FirebaseAuthGuard } from "./config/firebase-auth-guard";
import { JwtService } from "@nestjs/jwt";
envConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      migrations: [__dirname + "/migrations/*{.ts,.js}"],
      synchronize: false, // Set to false in production environments
      logging: true, // Enable logging if needed,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
    }),
    PetModule,
    MatchModule,
    UserModule,
    LikeModule,
    MessageModule,
    PaymentPackageModule,
    PaymentModule,
    PetTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthGuard, JwtService],
})
export class AppModule {}
