import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  start_address: string;

  @Column({
    nullable: false,
    default: '',
  })
  destination_address: string;

  @Column({
    type: 'decimal',
    nullable: false,
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({
    type: 'date',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({
    nullable: false,
    default: 0,
  })
  distance_meters: number;
}
