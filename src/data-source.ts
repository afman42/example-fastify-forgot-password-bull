import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./modules/auth/user.entity"
import 'dotenv/config'
import { User1654059818002 } from './migrations'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATASOURCE_HOST,
    port: parseInt(process.env.DATASOURCE_PORT),
    username: process.env.DATASOURCE_DB_USERNAME,
    password: process.env.DATASOURCE_DB_PASSWORD,
    database: process.env.DATASOURCE_DB_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV == 'development',
    entities: [User],
    migrations: [
        User1654059818002
    ],
    subscribers: [],
})
