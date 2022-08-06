import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../entities/*.entity.ts'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true
};

export default databaseConfig;