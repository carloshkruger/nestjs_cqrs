import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '11235813',
      database: 'testedb',
      migrations: ['src/database/migrations/*.js'],
      logging: false,
      logger: 'file',
      autoLoadEntities: true,
      migrationsRun: true,
      cli: {
        migrationsDir: './src/database/migrations',
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
