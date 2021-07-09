import { IsNotEmpty } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Number is required' })
  number: number;

  @IsNotEmpty({ message: 'Neighborhood is required' })
  neighborhood: string;

  @IsNotEmpty({ message: 'State is required' })
  state: string;
}
