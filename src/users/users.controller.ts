import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUsersDto } from "./dto/CreateUsersDto";
import { UpdateUsersDto } from "./dto/UpdateUsersDto";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  /** GET http://.../users  - get all Users */
  @ApiOperation({summary: 'Get all Users'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAllUsers(): Promise<User[]>{
    return this.usersService.getAllUsers();
  }
  /** GET http://.../users/:id  - get User with books */
  @ApiOperation({summary: 'Get User by id with users books'})
  @ApiResponse({status: 200, type: User})
  @Get(":id")
  getById(@Param("id") id): Promise<User> {
    return this.usersService.getById(id);
  }
  /** POST http://.../users  - create User
   * Body
   * {
   *   "name" : "_user_name_"
   * }
   * */
  @ApiOperation({summary: 'create User'})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() createUserDto: CreateUsersDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.subscription = false;
    return this.usersService.create(user);
  }

  /** PUT http://.../users/:id  - update User
   * Body
   * {
   *   "name" : "_new_user_name_",
   *   "subscription" : "_new_user_subscription_"
   * }
   * */
  @ApiOperation({summary: 'update User'})
  @ApiResponse({status: 200, type: User})
  @Put(":id")
  updateUser(@Body() updateUserDto: UpdateUsersDto, @Param('id') id): Promise<User>  {
      const user = new User();
      user.name = updateUserDto.name;
      user.subscription = updateUserDto.subscription;
      return this.usersService.updateUser(id, user);
  }

    /** PUT http://.../users/subscription/:id  - get subscription by User
     * body
     * {
     *
     * }
     * */
    @ApiOperation({summary: 'Get subscription by User'})
    @ApiResponse({status: 200, type: User})
    @Put("/subscription/:id")
    addUserSubscription(@Body() updateUserDto: UpdateUsersDto, @Param('id') id) : Promise<User>{
      return this.usersService.addSubscription(id);
    }

    /** DELETE http://.../users/:id  - delete User */
    @ApiOperation({summary: 'delete User'})
    @ApiResponse({status: 200, type: 'void'})
    @Delete(":id")
    removeUser(@Param('id') id): Promise<void>{
      return this.usersService.remove(id);
    }

}
