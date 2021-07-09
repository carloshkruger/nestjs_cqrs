import { UserAddressEntity } from '../entities/user-address.entity';

export class AddressAddedToUserEvent {
  constructor(public readonly userAddress: UserAddressEntity) {}
}
