import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    createReportDto.create_date = new Date();
    return this.reportRepository.save(createReportDto);
  }

  findAll() {
    return this.reportRepository.find();
  }

  findOne(id: number) {
    return this.reportRepository.findOneBy({ id });
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update(id, updateReportDto);
  }

  remove(id: number) {
    return this.reportRepository.delete(id);
  }
}
