import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { FirebaseAuthGuard } from "./config/firebase-auth-guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  @UseGuards(FirebaseAuthGuard)
  getProtectedResource() {
    return { message: "This is a protected resource" };
  }
}
