import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { formatDateToDateAndHour } from 'src/utils/formatDateToDateAndHour';
import MongoHelper from 'src/utils/MongoHelper';
import { UserCreatedEvent } from '../UserCreatedEvent';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  async handle({ user }: UserCreatedEvent) {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: [],
      created_at: formatDateToDateAndHour(user.created_at),
      updated_at: formatDateToDateAndHour(user.updated_at),
    };
    const collection = await MongoHelper.getCollection('users');

    await collection.insertOne(userData);
  }
}
