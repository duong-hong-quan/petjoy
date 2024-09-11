import {
  ExecutionContext,
  Get,
  Injectable,
  Query,
  Redirect,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginRequestDto } from "./dto/login-request.dto";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { buildError } from "../common/utility";
import { firebaseAdmin } from "@/config/firebase-admin";
import axios from "axios";
import { config as envConfig } from "dotenv";

envConfig();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AppActionResultDto> {
    const user = await this.repository.create(createUserDto);
    await this.repository.save(user);
    return {
      data: user,
      message: ["User created successfully"],
      isSuccess: true,
    };
  }

  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find();
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  async findOne(id: number): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({ where: { id } });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<AppActionResultDto> {
    await this.repository.update(id, updateUserDto);
    return {
      data: updateUserDto,
      message: ["Data updated successfully"],
      isSuccess: true,
    };
  }

  async remove(id: number) {
    await this.repository.delete(id);
    return { deleted: true };
  }

  async login(request: LoginRequestDto): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({
      where: {
        email: request.username,
        password: request.password,
      },
    });
    return {
      data,
      message: data ? ["Login success"] : ["Login failed"],
      isSuccess: !!data,
    };
  }

  async getUserByEmail(email: string): Promise<AppActionResultDto> {
    const data = await this.repository.findOne({ where: { email } });
    if (!data) {
      return buildError("User not found");
    }
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }
  async signUpWithGoogleToken(token: string): Promise<AppActionResultDto> {
    if (!token) {
      return buildError("Token not found");
    }

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    try {
      const { email, name, picture } = decodedToken;

      const newUser = new User();
      newUser.email = email;
      newUser.name = name;
      newUser.password = "google123@";
      newUser.profilePicture = picture;

      const createdUser = await this.create(newUser);
      return {
        data: createdUser.data,
        message: ["User created successfully"],
        isSuccess: true,
      };
    } catch (error) {
      return buildError(error.message);
    }
  }

  async getGoogleTokens(code: string) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const response = await axios.post(tokenUrl, {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const { id_token } = response.data;
    return { id_token };
  }
}
