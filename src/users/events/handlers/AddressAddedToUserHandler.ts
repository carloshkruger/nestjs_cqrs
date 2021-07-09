import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import MongoHelper from 'src/utils/MongoHelper';
import { AddressAddedToUserEvent } from '../AddressAddedToUserEvent';

@EventsHandler(AddressAddedToUserEvent)
export class AddressAddedToUserHandler
  implements IEventHandler<AddressAddedToUserEvent>
{
  async handle({ userAddress }: AddressAddedToUserEvent) {
    const { address, number, neighborhood, state, userId } = userAddress;
    const userAddressData = `${address}, ${number}, ${neighborhood}, ${state}`;

    const collection = await MongoHelper.getCollection('users');

    const userModel = await collection.findOne({ id: userAddress.userId });

    userModel.address = Array.isArray(userModel.address)
      ? [...userModel.address, userAddressData]
      : [userAddressData];

    await collection.updateOne(
      {
        id: userId,
      },
      {
        $set: {
          address: userModel.address,
        },
      },
    );
  }
}
