import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://petjoy-fe.vercel.app",
    ], // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("The API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(5001);
}
bootstrap();
