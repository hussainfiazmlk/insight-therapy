import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "src/database/repositories";
import { AddUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async addUser(payload: AddUserDto) {
    try {
      payload.password = await bcrypt.hash(payload.password, 12);

      const response = await this.userRepository.create(payload);

      response.password = undefined;

      return response;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") throw new BadRequestException("User already exists");

      throw new HttpException(error?.message?.split(":")[0] || error, error?.status || error?.statusCode);
    }
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    try {
      if (payload.password) payload.password = await bcrypt.hash(payload.password, 12);

      let response = await this.userRepository.findOne({ where: { id: id } });

      if (!response) throw new BadRequestException("User not found");

      response = await this.userRepository.save({ ...response, ...payload });

      response.password = undefined;

      return response;
    } catch (error) {
      throw new HttpException(error?.message?.split(":")[0] || error, error?.status || error?.statusCode);
    }
  }

  async deleteUser(id: string) {
    try {
      let response = await this.userRepository.findOne({ where: { id: id } });

      if (!response) throw new BadRequestException("User not found");

      response = await this.userRepository.deleteOne(response);

      return response;
    } catch (error) {
      throw new HttpException(error?.message?.split(":")[0] || error, error?.status || error?.statusCode);
    }
  }
}
