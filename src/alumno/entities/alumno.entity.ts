/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  nombre: string;

  @Column('text', {
    unique: true,
  })
  materia: string;

  @Column('int', {
    default: 0,
  })
  edad: number;

  @Column({ type: 'character varying', nullable: false, unique: true })
  cedula: string;

  @BeforeInsert()
  validarAntesDeInsertar() {
    if (this.edad < 0) {
      throw new Error('La edad debe ser un número positivo');
    }
  }

  @BeforeUpdate()
  validarAntesDeActualizar() {
    if (this.edad < 0) {
      throw new Error('La edad debe ser un número positivo');
    }

  }
}
