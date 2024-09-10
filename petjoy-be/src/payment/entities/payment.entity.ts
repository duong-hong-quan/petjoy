import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { PaymentPackage } from "../../payment-package/entities/payment-package.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @Column()
  paymentPackageId: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => PaymentPackage)
  paymentPackage: PaymentPackage;

  @Column("decimal")
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  paymentDate: Date;
}
