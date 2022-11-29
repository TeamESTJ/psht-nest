import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TestModule } from '../test.module';

type Imports = Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
>;

interface TestApp {
  dataSource: DataSource;
  app: NestExpressApplication;
}

export async function createTestApp(imports: Imports): Promise<TestApp> {
  const testingModule = await Test.createTestingModule({
    imports: [TestModule, ...imports],
  }).compile();

  const app = await testingModule
    .createNestApplication<NestExpressApplication>()
    .init();

  const dataSource = testingModule.get<DataSource>(DataSource);
  return {
    app,
    dataSource,
  };
}
