import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetModule } from "./pet/pet.module";
import { PaymentModule } from "./payment/payment.module";
import { PaymentPackageModule } from "./payment-package/payment-package.module";
import { LikeModule } from "./like/like.module";
import { UserModule } from "./user/user.module";
import { config as envConfig } from "dotenv";
import { PetTypeModule } from "./pet-type/pet-type.module";
import { FirebaseAuthGuard } from "./config/firebase-auth-guard";
import { JwtService } from "@nestjs/jwt";
import { ReportModule } from './report/report.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { BanReportModule } from './ban-report/ban-report.module';
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
    UserModule,
    LikeModule,
    PaymentPackageModule,
    PaymentModule,
    PetTypeModule,
    ReportModule,
    BlogModule,
    CategoryModule,
    BanReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthGuard, JwtService],
})
export class AppModule {}
