import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import conf from './conf'
import { Argv } from './Argv';

async function bootstrap() {
  Argv.platform = process.argv[2];
  Argv.conf = conf[Argv.platform] || conf.wx;
  const app = await NestFactory.create(AppModule);
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '1000kb' }));
  app.use(bodyParser.urlencoded({ limit: '1000kb', extended: true }));
  await app.listen(Argv.conf.port);
}
bootstrap();
