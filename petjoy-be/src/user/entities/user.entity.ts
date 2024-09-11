import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { Payment } from "../../payment/entities/payment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "text", default: "" })
  name: string;

  @Column({ default: "" })
  profilePicture: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
