import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressEntity } from './entities/user-address.entity';
import { UserEntity } from './entities/user.entity';
import { commandHandlers } from './commands/handlers';
import { eventHandlers } from './events/handlers';
import { queryHandlers } from './queries/handlers';

import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserAddressEntity]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [...commandHandlers, ...eventHandlers, ...queryHandlers],
})
export class UsersModule {}
