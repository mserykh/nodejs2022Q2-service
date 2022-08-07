import { DataSource } from 'typeorm';
import databaseConfig from './db-config';

export const AppDataSource = new DataSource(databaseConfig);
