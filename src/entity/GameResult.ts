import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GameResult {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  userId: number = 0;

  @Column()
  jugadas: number = 0;

  @Column()
  victorias: number = 0;

  @Column()
  intentos: number = 0;

  @Column()
  palabraSeleccionada: string = '';

  @Column()
  tiempoSeleccion: Date = new Date();
}
