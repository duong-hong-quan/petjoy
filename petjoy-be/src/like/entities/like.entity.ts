import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Pet } from "../../pet/entities/pet.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  originPetId: number;
  @Column()
  likePetId: number;
  @Column({ default: false })
  isLike: boolean;
  @ManyToOne(() => Pet, (pet) => pet.likes)
  originPet: Pet;

  @ManyToOne(() => Pet, (pet) => pet.beLikes)
  likePet: Pet;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
