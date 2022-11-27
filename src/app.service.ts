import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): string {
    return 'Hello World!';
  }
  getHello(): string {
    return 'hello test one two';
  }
}
