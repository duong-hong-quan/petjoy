import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.matches1)
  user1: User;

  @ManyToOne(() => User, (user) => user.matches2)
  user2: User;

  @Column()
  matchDate: Date;
}
