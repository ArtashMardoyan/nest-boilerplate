import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { SitesModule } from './modules/sites/sites.module';
import { AuthModule } from './modules/auth/auth.module';
import { getMongoConfig } from './config/mongo.config';
import mainConfig from './config/main.config';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [mainConfig] }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig
        }),
        UsersModule,
        SitesModule,
        AuthModule
    ]
})
export class AppModule {}
