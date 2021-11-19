import { ApiProperty } from "@nestjs/swagger";

export class AddBooksDto{
  @ApiProperty({example: "1", description:"user id"})
  readonly user: string;
}