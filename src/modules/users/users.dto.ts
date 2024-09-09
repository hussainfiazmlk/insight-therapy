import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddUserDto {
  @ApiProperty({
    type: String,
    example: "Fiaz Hussain",
    required: true,
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    example: "hussainfiazmlk@gmail.com",
    required: false,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    example: "password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AddUserResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({ example: "user added" })
  message: string;

  @ApiProperty({
    example: {
      id: "0852cd5b-32e0-4a70-ba62-0ef092543ff3",
      name: "Fiaz Hussain",
      email: "hussainfiazmlk@gmail.com",
    },
  })
  data: [];
}

export class UpdateUserDto extends PartialType(AddUserDto) {}

export class UpdateUserResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({ example: "user updated" })
  message: string;

  @ApiProperty({
    example: {
      id: "0852cd5b-32e0-4a70-ba62-0ef092543ff3",
      name: "Fiaz Hussain",
      email: "hussainfiazmlk@gmail.com",
    },
  })
  data: [];
}
