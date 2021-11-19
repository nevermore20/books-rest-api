import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "../books/books.entity";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>


  ) {}
  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async getById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id)
    user.books = await this.booksRepository.find({where: { user : user }})
    return user
  }

  create(user: User): Promise<User> {
    delete user.id
    return this.usersRepository.save(user)
  }

  async updateUser(id: number, userUp: User): Promise<User> {
    const user = await this.usersRepository.findOne(id)
    user.name = userUp.name;
    user.subscription = userUp.subscription;
    return this.usersRepository.save(user)
  }

  async addSubscription(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id)
    user.subscription = true;
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
