import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ExceptionsFilter } from "src/common/filters";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 1000, limit: 10 }]),
    DatabaseModule,
    UsersModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule {}
