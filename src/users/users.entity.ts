
import { Book } from "../books/books.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HasMany } from "sequelize-typescript";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  subscription: boolean

  @OneToMany(type => Book, book => book.user, {})
  books: Book[]
}