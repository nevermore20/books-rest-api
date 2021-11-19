
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

interface CreateBookAttrs {
  name: string;
}

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => User, user => user.books, {nullable: true})
  user: User;
}