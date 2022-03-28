import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import { ValidationErrorFilter } from './filters/validation-error.filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new ValidationErrorFilter());
    app.enableVersioning({ type: VersioningType.URI });

    await app.listen(process.env.PORT);
}
bootstrap().catch(console.trace);
