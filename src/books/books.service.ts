import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>

  ) {}
  getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find();
  }
  getById(id: number): Promise<Book> {
    return this.booksRepository.findOne(id)
  }

  create(book: Book): Promise<Book> {
    delete book.id
    return this.booksRepository.save(book)
  }

  async returnBook(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne(id)
    book.user = null;
    return this.booksRepository.save(book)
  }

  async addBook(id: number, user: number): Promise<Book> {
    const book = await this.booksRepository.findOne(id)
    book.user = await this.usersRepository.findOne(user);
    if (book.user.subscription){
      return this.booksRepository.save(book)
    } else {
      return null
    }
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
