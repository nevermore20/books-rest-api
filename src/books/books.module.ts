import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from "./books.entity";
import { User } from "../users/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports:[TypeOrmModule.forFeature([Book, User])]
})
export class BooksModule {}
