import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../users/entities/User';

enum OperationType {
  TRANSFER = 'transfer'
}

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  sender_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'sender_id' })
  sender_user: User;

  @Column('uuid')
  receiver_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'receiver_id' })
  receiver_user: User;

  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
