import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';

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
            create: jest.fn().mockResolvedValue(oneReport),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
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
});
