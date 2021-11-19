
import { Book } from "../books/books.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @ApiProperty({example: 1, description:"unique id"})
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({example: "Oleg", description:"user name"})
  @Column()
  name: string;
  @ApiProperty({example: true, description:"user subscription status"})
  @Column()
  subscription: boolean
  @ApiProperty({example: [
      {
        "id": 1,
        "title": "NewBook"
      },
      {
        "id": 2,
        "title": "Imperore"
      },
      {
        "id": 3,
        "title": "NewWorld"
      },
      {
        "id": 4,
        "title": "Master And Margarita"
      }
    ], description:"books that the user took"})
  @OneToMany(type => Book, book => book.user, {})
  books: Book[]
}