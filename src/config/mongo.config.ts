import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
    return { uri: getMongoString(configService), ...getMongoOptions };
};

const getMongoString = (configService: ConfigService): string => {
    const { host, port, base, login, password, database } = configService.get('mongo');

    return login && password
        ? `${base}${login}:${password}@${host}:${port}/${database}`
        : `${base}${host}:${port}/${database}`;
};

const getMongoOptions = (): object => {
    return { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
};
