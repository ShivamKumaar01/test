import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { Bus } from 'src/bus/entities/bus.entity';
import { Ride } from 'src/ride/entities/ride.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

dotenv.config();


const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'final-project',
  synchronize: true,
  logging:true,
  entities: [User,Owner,Bus,Ride,Reservation],
  migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],

});