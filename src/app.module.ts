import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { SitesModule } from './modules/sites/sites.module';
import { getMongoConfig } from './config/mongo.config';
import { AppController } from './app.controller';
import mainConfig from './config/main.config';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [mainConfig] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        UsersModule,
        SitesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
