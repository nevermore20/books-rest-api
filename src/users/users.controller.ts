import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUsersDto } from "./dto/CreateUsersDto";
import { UpdateUsersDto } from "./dto/UpdateUsersDto";
import { BooksService } from "../books/books.service";
import { UsersService } from "./users.service";
import { User } from "./users.entity";

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  getAllUsers(): Promise<User[]>{
    return this.usersService.getAllUsers();
  }

  @Get(":id")
  getById(@Param("id") id): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUsersDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.subscription = false;
    return this.usersService.create(user);
  }

  @Put(":id")
  updateUser(@Body() updateUserDto: UpdateUsersDto, @Param('id') id): Promise<User>  {
      const user = new User();
      user.name = updateUserDto.name;
      user.subscription = updateUserDto.subscription;
      return this.usersService.updateUser(id, user);
  }

  @Put("/subscription/:id")
  addUserSubscription(@Body() updateUserDto: UpdateUsersDto, @Param('id') id) : Promise<User>{
    return this.usersService.addSubscription(id);
  }


  @Delete(":id")
  removeUser(@Param('id') id): Promise<void>{
    return this.usersService.remove(id);
  }

}
