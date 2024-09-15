import { Category } from "../../category/entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blogName: string;

  @Column()
  blogImg: string;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column()
  categoryId: number;
  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
  @ManyToOne(() => Category, (user) => user.blogs)
  category: Category;
}
