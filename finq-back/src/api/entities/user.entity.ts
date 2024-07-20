import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  birthYear: number;

  @Column()
  streetName: string;

  @Column()
  streetNumber: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
