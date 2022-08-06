import { DataSource } from 'typeorm/data-source';
import databaseConfig from './db-config';

export const AppDataSource = new DataSource(databaseConfig);
