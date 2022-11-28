import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { ReportService } from '../report.service';

const testId = 4;
const testContent1 = 'content test';
const testDate1 = new Date('2000-01-01');

const reportArray: Report[] = [
  new Report(testContent1, testDate1),
  new Report('test1', new Date()),
  new Report('test2', new Date()),
];

const oneReport = new Report(testContent1, testDate1);

describe('ReportService', () => {
  let service: ReportService;
  let repo: Repository<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            find: jest.fn().mockResolvedValue(reportArray),
            findOne: jest.fn().mockResolvedValue(oneReport),
            save: jest.fn().mockResolvedValue(oneReport),
            update: jest.fn().mockResolvedValue(oneReport),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
    repo = module.get<Repository<Report>>(getRepositoryToken(Report));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reports', async () => {
      const reports = await service.findAll();
      expect(reports).toEqual(reportArray);
    });
  });

  describe('create', () => {
    it('should return the created report and call the save method', async () => {
      const createdReport = await service.create({
        content: testContent1,
        create_date: testDate1,
      });
      expect(createdReport).toEqual(oneReport);
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call update method', async () => {
      const report = await service.update(testId, {
        content: testContent1,
        create_date: testDate1,
      });

      expect(report).toEqual(oneReport);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(testId, {
        content: testContent1,
        create_date: testDate1,
      });
    });
  });

  describe('remove', () => {
    it('should call delete with appropriate id', async () => {
      await service.remove(testId);
      expect(repo.delete).toBeCalledTimes(1);
      expect(repo.delete).toBeCalledWith(testId);
    });
  });
});
