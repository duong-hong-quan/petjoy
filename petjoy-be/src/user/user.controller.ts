import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
  @Post("login")
  async login(@Body() body: LoginRequestDto) {
    const data = await this.userService.login(body);
    if (data.isSuccess) {
      return {
        data: {
          url: this.googleAuth().url,
          user: data.data,
        },
        isSuccess: true,
        message: ["Login success"],
      };
    } else {
      return data;
    }
  }
  @Post("sign-up-with-gg-token")
  @ApiBody({
    schema: { type: "object", properties: { token: { type: "string" } } },
  })
  signUpWithGGToken(@Body() body: { token: string }) {
    return this.userService.signUpWithGoogleToken(body.token);
  }

  @Get("email/:email")
  getUserByEmail(@Param("email") email: string) {
    console.log(email);
    return this.userService.getUserByEmail(email);
  }
  @Get("google")
  @Redirect()
  googleAuth() {
    const clientId =
      "729364707171-5n9093hp5a9951q89mknr3hioei7r2es.apps.googleusercontent.com";
    const redirectUri = "http://localhost:5001/user/google/callback";
    const scope = "email profile";
    const responseType = "code";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    console.log(authUrl);
    return { url: authUrl };
  }
  @Get("google/callback")
  @Redirect()
  async googleCallback(@Query("code") code: string) {
    const tokens = await this.userService.getGoogleTokens(code);
    const token = tokens.id_token; // Assuming you want to use the access token
    const redirectUrl = `http://localhost:3000/login?token=${token}`;
    return { url: redirectUrl };
  }
}
