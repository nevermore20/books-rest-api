
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Book {

  @ApiProperty({example: 1, description:"unique id"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Master and Margarita', description:"book title"})
  @Column()
  title: string;

  @ApiProperty({example: {"id": 1,
  "name": "Oleg",
  "subscription": true,
  "books": [
    {
      "id": 1,
      "title": "NewBook"
    },
    {
      "id": 2,
      "title": "Imperore"
    }
  ]}, description:"User who took this book"})
  @ManyToOne(type => User, user => user.books, {nullable: true})
  user: User;
}