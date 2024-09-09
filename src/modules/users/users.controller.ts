import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { successResponse } from "src/common/functions";
import { AddUserDto, AddUserResponseDto, UpdateUserDto, UpdateUserResponseDto } from "./users.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: AddUserResponseDto })
  async addUser(@Body() payload: AddUserDto) {
    const response = await this.usersService.addUser(payload);

    return successResponse("user added", response);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async updateUser(@Param("id") id: string, @Body() payload: UpdateUserDto) {
    const response = await this.usersService.updateUser(id, payload);

    return successResponse("user updated", response);
  }

  @Delete(":id")
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async deleteUser(@Param("id") id: string) {
    await this.usersService.deleteUser(id);

    return successResponse("user deleted");
  }
}
