import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto{
  @ApiProperty({example: "Oleg", description:"user name"})
  readonly name:string;
}