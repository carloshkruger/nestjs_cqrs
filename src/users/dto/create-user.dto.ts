import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsNotEmpty({ message: 'E-mail is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
