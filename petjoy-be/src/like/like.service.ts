import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { Like } from "./entities/like.entity";
import { LessThan, MoreThanOrEqual, Repository } from "typeorm";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { User } from "../user/entities/user.entity";
import { Pet } from "../pet/entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { buildError } from "../common/utility";
import { Payment } from "../payment/entities/payment.entity";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly repository: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}
  async create(createLikeDto: CreateLikeDto): Promise<AppActionResultDto> {
    try {
      const [originPet, likePetDb] = await Promise.all([
        this.petRepository.findOne({
          where: { id: createLikeDto.originPetId },
          relations: ["owner"],
        }),
        this.petRepository.findOne({
          where: { id: createLikeDto.likePetId },
        }),
      ]);

      if (!originPet || !likePetDb) {
        return buildError("Pet not found");
      }

      const existingLike = await this.repository.findOne({
        where: {
          originPetId: createLikeDto.originPetId,
          likePetId: createLikeDto.likePetId,
        },
      });

      if (existingLike) {
        return buildError("You already like this pet");
      }

      const [paymentDb, paymentDbMonth] = await this.getPaymentRecords(
        originPet.ownerId
      );
console.log("paymentDb", paymentDb);
console.log("paymentDbMonth", paymentDbMonth);
      if (paymentDb || paymentDbMonth) {
        return await this.createLikeAndCheckMatch(createLikeDto);
      } else {
        const likeCount = await this.getLikeCount(createLikeDto.originPetId);
 console.log("likeCount", likeCount);
        if (likeCount > 5) {
          return buildError("Like limit exceeded");
        }

        return await this.createLikeAndCheckMatch(createLikeDto);
      }
    } catch (error) {
      return buildError(error.message);
    }
  }

  private async getPaymentRecords(userId: number): Promise<[Payment, Payment]> {
    const today = new Date();
    const todayPlus7 = new Date(today);
    todayPlus7.setDate(today.getDate() - 7);
    todayPlus7.setHours(0, 0, 0, 0);

    const todayMinus1Months = new Date(today);
    todayMinus1Months.setMonth(today.getMonth() - 1);
    todayMinus1Months.setHours(0, 0, 0, 0);

    return await Promise.all([
      this.paymentRepository.findOne({
        where: {
          userId,
          paymentDate: todayPlus7,
        },
      }),
      this.paymentRepository.findOne({
        where: {
          userId,
          paymentDate: todayMinus1Months,
        },
      }),
    ]);
  }

  private async getLikeCount(originPetId: number): Promise<number> {
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const count = await this.repository.createQueryBuilder('like')
        .where('like.originPetId = :originPetId', { originPetId })
        .andWhere('like.date >= :todayStart', { todayStart })
        .andWhere('like.date < :tomorrowStart', { tomorrowStart })
        .getCount();

    return count;
}
  private async createLikeAndCheckMatch(
    createLikeDto: CreateLikeDto
  ): Promise<AppActionResultDto> {
    const like = this.repository.create(createLikeDto);
    await this.repository.save(like);

    const [data, fullLike] = await Promise.all([
      this.repository.findOne({
        where: {
          originPetId: createLikeDto.likePetId,
          likePetId: createLikeDto.originPetId,
        },
      }),
      this.repository.findOne({
        where: { id: like.id },
        relations: ["originPet", "likePet"],
      }),
    ]);

    if (data) {
      return {
        data: fullLike,
        message: ["Matchingggg"],
        isSuccess: true,
      };
    }
    return {
      data: fullLike,
      message: ["Like created successfully"],
      isSuccess: true,
    };
  }
  async findAll(): Promise<AppActionResultDto> {
    const data = await this.repository.find({ relations: ["user", "pet"] });
    return {
      data,
      message: ["Data retrieved successfully"],
      isSuccess: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
