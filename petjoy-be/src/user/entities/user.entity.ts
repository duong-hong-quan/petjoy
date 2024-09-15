import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { Blog } from "../../blog/entities/blog.entity";

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
  @Column({ default: false })
  isAdmin: boolean;
  @Column({ default: false })
  isBanned: boolean;
  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
