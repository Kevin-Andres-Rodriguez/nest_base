import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly productRepository: Repository<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    try {
      const alumno = this.productRepository.create(createAlumnoDto);
      await this.productRepository.save(alumno);
      return alumno;
    } catch (error) {
      console.log(error);
      throw new Error('NO se pudo realizar el ingreso a la base de datos');
    }
  }

  findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const alumno = await this.productRepository.findOne({ where: { id } });

    if (!alumno) {
      throw new NotFoundException(`Alumno con el ID ${id} no encontrado`);
    }

    return alumno;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno = await this.productRepository.preload({
      id: id,
      ...updateAlumnoDto,
    });
    if (!Alumno) throw new NotAcceptableException('No se pudo eliminar');
    await this.productRepository.save(alumno);
    return alumno;
  }

  async remove(id: number) {
    const alumnoEliminado = await this.productRepository.findOne({
      where: { id },
    });

    if (!alumnoEliminado) {
      throw new NotFoundException(
        `No se encontró ningún alumno con el ID ${id}`,
      );
    }

    await this.productRepository.remove(alumnoEliminado);
    return `Alumno con ID ${id} ha sido eliminado exitosamente`;
  }
}
