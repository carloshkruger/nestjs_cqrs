import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoHelper from 'src/utils/MongoHelper';
import { RetrieveAllUserDataQuery } from '../RetrieveAllUserDataQuery';

@QueryHandler(RetrieveAllUserDataQuery)
export class RetrieveAllUserDataHandler
  implements IQueryHandler<RetrieveAllUserDataQuery>
{
  async execute({ id }: RetrieveAllUserDataQuery) {
    const collection = await MongoHelper.getCollection('users');

    const data = await collection.findOne({
      id,
    });

    return data;
  }
}
