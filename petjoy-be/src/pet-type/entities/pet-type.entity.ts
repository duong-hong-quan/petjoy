import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "@/pet/entities/pet.entity";

@Entity()
export class PetType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.petType)
  pets: Pet[];

  @OneToMany(() => Pet, (pet) => pet.isHiringPetType)
  hiringPetTypes: Pet[];

  @OneToMany(() => Pet, (pet) => pet.filterPetType)
  filterPetTypes: Pet[];
}
