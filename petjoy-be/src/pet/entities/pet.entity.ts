import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Like } from "../../like/entities/like.entity";
import { PetType } from "@/pet-type/entities/pet-type.entity";

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

  @ManyToOne(() => PetType, (petType) => petType.hiringPetTypes)
  petType: PetType;

  @ManyToOne(() => PetType, (petType) => petType.filterPetTypes)
  filterPetType: PetType;

  @ManyToOne(() => PetType, (petType) => petType.pets)
  isHiringPetType: PetType;
}
