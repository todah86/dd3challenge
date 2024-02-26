import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor() {
    this.password = '';
    this.username = '';
  }
  
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'varchar', length: 255 }) // Aquí usamos varchar para username
  username: string;

  @Column()
  password: string;
}
