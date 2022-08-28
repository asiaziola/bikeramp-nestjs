import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'trip_id',
  })
  id: number;

  @Column({
    name: 'start_address',
    nullable: false,
    default: '',
  })
  startAddress: string;

  @Column({
    name: 'destination_address',
    nullable: false,
    default: '',
  })
  destinationAddress: string;

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
}
