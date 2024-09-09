import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Logs, User } from "./entities";
import { UserRepository } from "./repositories";
import { subscribers } from "./subscribers";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, Logs],
        subscribers: subscribers,
        synchronize: true,
        poolSize: 3,
      }),
    }),
    TypeOrmModule.forFeature([User, Logs]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
