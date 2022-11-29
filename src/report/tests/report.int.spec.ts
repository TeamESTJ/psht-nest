// import { HttpStatus } from '@nestjs/common';
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

        expect(response.status).toBe(201);
        expect(response.body.content).toEqual(reportContent);
      });

      // it('should create dog and save it to db', async () => {
      //   const given: CreateDogDto = {
      //     name: 'Dingo',
      //     age: 3,
      //     breed: 'Beagle',
      //   };

      //   const response = await makeRequest(app).post('/dogs').send(given);

      //   expect(response.status).toBe(HttpStatus.CREATED);
      //   expect(response.body.id).toBeDefined();

      //   // check if saved dog in database has same properties sent via POST request
      //   const found = await connection
      //     .getRepository(DogPostgresEntity)
      //     .findOne(response.body.id);

      //   expect(found).toMatchObject({
      //     id: response.body.id,
      //     name: given.name,
      //     age: given.age,
      //     breed: given.breed,
      //   });
      // });
    });
  });
});
