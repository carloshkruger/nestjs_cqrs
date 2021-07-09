import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressEntity } from 'src/users/entities/user-address.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { AddressAddedToUserEvent } from 'src/users/events/AddressAddedToUserEvent';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { AddAddressToUserCommand } from '../AddAddressToUserCommand';

@CommandHandler(AddAddressToUserCommand)
export class AddAddressToUserHandler
  implements ICommandHandler<AddAddressToUserCommand>
{
  constructor(
    @InjectRepository(UserAddressEntity)
    private userAddressRepository: Repository<UserAddressEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private eventBus: EventBus,
  ) {}

  async execute({
    address,
    number,
    neighborhood,
    state,
    userId,
  }: AddAddressToUserCommand) {
    const userById = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userById) {
      throw new NotFoundException('User not found');
    }

    const userAddress = this.userAddressRepository.create({
      address,
      number,
      neighborhood,
      state,
      userId,
    });

    userAddress.id = v4();

    await this.userAddressRepository.save(userAddress);

    await this.eventBus.publish(new AddressAddedToUserEvent(userAddress));
  }
}
