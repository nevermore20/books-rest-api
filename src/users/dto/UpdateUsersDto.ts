import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsersDto{
  @ApiProperty({example: "Oleg", description:"user name"})
  readonly name: string;
  @ApiProperty({example: true, description:"user subscription status"})
  readonly subscription: boolean;
}