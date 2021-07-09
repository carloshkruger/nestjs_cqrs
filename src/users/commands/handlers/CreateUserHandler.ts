import { ConflictException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserCreatedEvent } from 'src/users/events/UserCreatedEvent';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserCommand } from '../CreateUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private eventBus: EventBus,
  ) {}

  async execute({ name, email, password }: CreateUserCommand) {
    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userByEmail) {
      throw new ConflictException('E-mail already in use.');
    }

    const user = this.usersRepository.create({ name, email, password });

    user.id = v4();

    await this.usersRepository.save(user);

    await this.eventBus.publish(new UserCreatedEvent(user));

    return {
      id: user.id,
    };
  }
}
