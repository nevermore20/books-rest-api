import { ApiProperty } from "@nestjs/swagger";

export class CreateBooksDto{
  @ApiProperty({example: "Master and Margarita", description:"book title"})
  readonly title: string
}