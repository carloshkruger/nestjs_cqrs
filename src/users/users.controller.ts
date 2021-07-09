import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddAddressToUserCommand } from './commands/AddAddressToUserCommand';
import { CreateUserCommand } from './commands/CreateUserCommand';
import { CreateAddressDTO } from './dto/create-address.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { RetrieveAllUserDataQuery } from './queries/RetrieveAllUserDataQuery';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  create(@Body() { name, email, password }: CreateUserDTO) {
    return this.commandBus.execute(
      new CreateUserCommand(name, email, password),
    );
  }

  @Post(':id/address')
  createAddress(
    @Param('id') userId: string,
    @Body() { address, number, neighborhood, state }: CreateAddressDTO,
  ) {
    return this.commandBus.execute(
      new AddAddressToUserCommand(address, number, neighborhood, state, userId),
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new RetrieveAllUserDataQuery(id));
  }
}
