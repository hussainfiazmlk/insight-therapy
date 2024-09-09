import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const NODE_ENV: string = config.get<string>("NODE_ENV");
  const PROTOCOL: string = config.get<string>("PROTOCOL");
  const HOST: string = config.get<string>("HOST");
  const PORT: number = config.get<number>("PORT");

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  if (NODE_ENV !== "production") {
    const options = new DocumentBuilder()
      .setTitle("Fiaz Hussain Assessments for Insight Therapy")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("docs", app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        docExpansion: "none",
      },
    });
  }

  await app.listen(PORT);

  Logger.log(`🚀 Application is running on: ${PROTOCOL}://${HOST}:${PORT}`);
}
bootstrap();
