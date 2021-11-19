import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateBooksDto } from "./dto/CreateBooksDto";
import { UpdateBooksDto } from "./dto/UpdateBooksDto";
import { AddBooksDto } from "./dto/AddBooksDto";
import { BooksService } from "./books.service";
import { Book } from "./books.entity";
import { UsersService} from "../users/users.service";

@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {
  }

  @Get()
  getAll(): Promise<Book[]>{
    return this.booksService.getAllBooks();
  }

  @Get(":id")
  getById(@Param("id") id): Promise<Book> {
    return this.booksService.getById(id);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBooksDto): Promise<Book>{
    const book = new Book();
    book.title = createBookDto.title
    book.user = null;
    return this.booksService.create(book);
  }

  @Put("return/:id")
  returnBook(@Body() updateBookDto: UpdateBooksDto,@Param("id") id): Promise<Book> {
    return this.booksService.returnBook(id);
  }

  @Put("add/:id")
  async addBook(@Body() addBookDto: AddBooksDto,@Param('id') id): Promise<Book> {
    return this.booksService.addBook(id, Number(addBookDto.user));
  }
}
