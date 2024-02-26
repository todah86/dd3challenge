import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor() {
    this.password = '';
  }
  
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  username: string | undefined;

  @Column()
  password: string;
}
