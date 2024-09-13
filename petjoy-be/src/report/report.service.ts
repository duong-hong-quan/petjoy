import { Injectable } from "@nestjs/common";
import { AppActionResultDto } from "../common/dto/app-action-result.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Between, Repository } from "typeorm";
import { Payment } from "../payment/entities/payment.entity";

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}
  async getReport(from: Date, to: Date): Promise<AppActionResultDto> {
    const userCount = await this.userRepository.count();
    const paymentCount = await this.paymentRepository.count({
      where: {
        paymentDate: Between(from, to),
      },
    });

    const monthlyPaymentCounts = await this.getMonthlyPaymentCounts(from, to);
    const paymentCountsByStatus = await this.getPaymentCountsByStatus();
    const totalPaymentAmount = await this.getTotalPaymentAmount(from, to);

    return {
      data: {
        totalUsers: userCount,
        totalPayments: paymentCount,
        totalPaymentAmount: totalPaymentAmount,
        monthlyPayments: monthlyPaymentCounts,
        paymentsByStatus: paymentCountsByStatus,
      },
      message: ["Report generated successfully"],
      isSuccess: true,
    };
  }

  private async getMonthlyPaymentCounts(
    from: Date | undefined | null,
    to: Date | undefined | null
  ): Promise<{ month: string; count: number }[]> {
    console.log(from);

    const queryOptions: any = {};

    if (from && to) {
      queryOptions.where = {
        paymentDate: Between(from, to),
      };
    }

    const payments = await this.paymentRepository.find(queryOptions);

    // Process payments to get the monthly counts
    const monthlyCounts = payments.reduce(
      (acc, payment) => {
        const month = new Date(payment.paymentDate)
          .toLocaleDateString("en-GB", { month: "2-digit", year: "numeric" })
          .replace("/", "/"); // Format to mm/yyyy
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month]++;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(monthlyCounts).map(([month, count]) => ({
      month,
      count,
    }));
  }
  private async getTotalPaymentAmount(
    from: Date | undefined | null,
    to: Date | undefined | null
  ): Promise<number> {
    console.log(from);

    const queryOptions: any = {};

    if (from && to) {
      queryOptions.where = {
        paymentDate: Between(from, to),
        status: true,
      };
    }

    const payments = await this.paymentRepository.find(queryOptions);

    // Calculate the total payment amount
    const totalAmount = payments.reduce((acc, payment) => {
      acc += Number(payment.amount); // Convert payment.amount to a number before adding
      return acc;
    }, 0);

    return totalAmount;
  }
  async getPaymentCountsByStatus(): Promise<{ [status: string]: number }> {
    const query = `
      SELECT status, COUNT(*) as count
      FROM payment
      GROUP BY status
    `;

    const result = await this.paymentRepository.query(query);
    const paymentCountsByStatus: { [status: string]: number } = {};

    result.forEach((row: { status: string; count: string }) => {
      paymentCountsByStatus[row.status] = parseInt(row.count, 10);
    });

    return paymentCountsByStatus;
  }
}
