import { NestFactory } from '@nestjs/core';
import {
  AsyncApiDocumentBuilder,
  AsyncApiModule,
  AsyncServerObject,
} from 'nestjs-asyncapi';
import { AppModule } from './app.module';

const docRelPath = '/async-api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const asyncApiServer: AsyncServerObject = {
    url: 'ws://localhost:4001',
    protocol: 'socket.io',
    protocolVersion: '4',
    description:
      'Allows you to connect using the websocket protocol to our Socket.io server.',
    security: [{ 'user-password': [] }],
    variables: {
      port: {
        description: 'Secure connection (TLS) is available through port 443.',
        default: '443',
      },
    },
    bindings: {},
  };

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Cats SocketIO')
    .setDescription('Cats SocketIO description here')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('cats-server', asyncApiServer)
    .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup(docRelPath, app, asyncapiDocument);

  await app.listen(3000);
}
bootstrap();
