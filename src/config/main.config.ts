export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongo: {
        base: process.env.MONGO_BASE,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        login: process.env.MONGO_LOGIN,
        password: process.env.MONGO_PASSWORD,
        database: process.env.MONGO_DATABASE
    }
});
