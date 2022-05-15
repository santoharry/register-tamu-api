import { Card } from 'src/card/entities/card.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  nik: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  visitDate: string;

  @Column()
  timeIn: string;

  @Column({ nullable: true })
  timeOut: string;

  @ManyToOne(() => Card, (card: Card) => card.cardId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cardId', referencedColumnName: 'cardId' })
  card: Card;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
