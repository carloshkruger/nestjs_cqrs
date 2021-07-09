import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_address')
export class UserAddressEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column()
  address: string;

  @Column({ type: 'integer' })
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.address)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
