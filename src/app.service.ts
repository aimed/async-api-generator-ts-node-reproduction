import { ApiProperty } from '@nestjs/swagger';
import { AsyncApiPub, AsyncApiService } from 'nestjs-asyncapi';

class AnySwaggerExampleDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly age: string;
}

@AsyncApiService()
export class AppService {
  @AsyncApiPub({
    channel: 'test',
    summary: 'Send test packet',
    description: 'method is used for test purposes',
    message: {
      name: 'test data',
      payload: {
        type: AnySwaggerExampleDto,
      },
    },
  })
  getHello(): string {
    return 'Hello World!';
  }
}
