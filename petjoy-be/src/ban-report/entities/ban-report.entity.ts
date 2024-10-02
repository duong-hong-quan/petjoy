import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class BanReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  reporterId: number;

  @Column()
  reportedId: number;

  @Column({ default: false })
  isResolved: boolean;

  @Column({ default: new Date() })
  resolvedAt: Date;

  @Column({ default: new Date() })
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.reporter)
  reporter: User;

  @ManyToOne(() => User, (user: User) => user.reported)
  reported: User;
}
