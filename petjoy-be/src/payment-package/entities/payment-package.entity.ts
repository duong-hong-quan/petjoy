import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PaymentPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column()
  description: string;

  @Column()
  duration: number; // Duration in days
}
