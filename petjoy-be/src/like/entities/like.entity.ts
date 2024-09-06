import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pet, (pet) => pet.likes)
  pet: Pet;

  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  @Column({ default: false })
  isMatch: boolean;
}
