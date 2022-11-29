import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { makeRequest } from '../../../test/utils/make-request';
import { DataSource } from 'typeorm';
import { clearAllTables } from '../../../test/utils/clear-all-tables';
import { createTestApp } from '../../../test/utils/create-test-app.util';
import { ReportModule } from '../report.module';

const reportContent = 'spotted on the 3rd floor';

describe('Report module', () => {
  let app: NestExpressApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testApp = await createTestApp([ReportModule]);

    dataSource = testApp.dataSource;
    app = testApp.app;
  });

  afterEach(async () => {
    await clearAllTables(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('POST /report', () => {
    describe('201', () => {
      it('should create report and return id', async () => {
        const response = await makeRequest(app).post('/reports').send({
          content: reportContent,
        });

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.content).toEqual(reportContent);
      });
    });
  });
});
