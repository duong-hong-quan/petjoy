import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Timestamp,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Like } from "../../like/entities/like.entity";
import { PetType } from "../../pet-type/entities/pet-type.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", default: "" })
  name: string;

  @Column()
  dob: Date;

  @Column()
  breed: string;

  @Column()
  profilePicture: string;

  @Column({})
  ownerId?: number;

  @Column()
  petTypeId: number;

  @Column()
  filterPetTypeId: number;

  @Column()
  isHiringPetTypeId: number;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @OneToMany(() => Like, (like) => like.likePet)
  likes: Like[];

  @OneToMany(() => Like, (like) => like.originPet)
  beLikes: Like[];

  @ManyToOne(() => PetType, (petType) => petType.hiringPetTypes)
  petType: PetType;

  @ManyToOne(() => PetType, (petType) => petType.filterPetTypes)
  filterPetType: PetType;

  @ManyToOne(() => PetType, (petType) => petType.pets)
  isHiringPetType: PetType;
}
