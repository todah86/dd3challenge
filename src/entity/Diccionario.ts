import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Diccionario {

  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  palabra: string = "";
}
