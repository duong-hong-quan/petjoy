import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Like } from "../../like/entities/like.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  profilePicture: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @OneToMany(() => Like, (like) => like.pet)
  likes: Like[];
}
