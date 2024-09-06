import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { Match } from "../../match/entities/match.entity";
import { Message } from "../../message/entities/message.entity";
import { Payment } from "../../payment/entities/payment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  profilePicture: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Match, (match) => match.user1)
  matches1: Match[];

  @OneToMany(() => Match, (match) => match.user2)
  matches2: Match[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
