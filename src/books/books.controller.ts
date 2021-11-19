import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateBooksDto } from "./dto/CreateBooksDto";
import { UpdateBooksDto } from "./dto/UpdateBooksDto";
import { AddBooksDto } from "./dto/AddBooksDto";
import { BooksService } from "./books.service";
import { Book } from "./books.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Books')
@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {
  }

  /** GET http://.../books  - get all Books */
  @ApiOperation({summary: 'Get all Books'})
  @ApiResponse({status: 200, type: [Book]})
  @Get()
  getAll(): Promise<Book[]>{
    return this.booksService.getAllBooks();
  }

  /** GET http://.../books/:id  - get Book by id */
  @ApiOperation({summary: 'Get Book by id'})
  @ApiResponse({status: 200, type: Book})
  @Get(":id")
  getById(@Param("id") id): Promise<Book> {
    return this.booksService.getById(id);
  }

  /** POST http://.../books  - create Book
   * Body
   * {
   *   "title": "_book_title_"
   * }
   * */
  @ApiOperation({summary: 'create Book'})
  @ApiResponse({status: 200, type: Book})
  @Post()
  createBook(@Body() createBookDto: CreateBooksDto): Promise<Book>{
    const book = new Book();
    book.title = createBookDto.title
    book.user = null;
    return this.booksService.create(book);
  }

  /** PUT http://.../books/return/:id  - return Book
   * Body
   * {
   *
   * }
   * */
  @ApiOperation({summary: 'return Book'})
  @ApiResponse({status: 200, type: Book})
  @Put("return/:id")
  returnBook(@Body() updateBookDto: UpdateBooksDto,@Param("id") id): Promise<Book> {
    return this.booksService.returnBook(id);
  }

  /** PUT http://.../books/add  - add Book to User with id = _user_id_
   * Body
   * {
   *   "user": "_user_id_"
   * }
   * */
  @ApiOperation({summary: 'Give Book to User'})
  @ApiResponse({status: 200, type: Book})
  @Put("add/:id")
  async addBook(@Body() addBookDto: AddBooksDto,@Param('id') id): Promise<Book> {
    return this.booksService.addBook(id, Number(addBookDto.user));
  }
}
