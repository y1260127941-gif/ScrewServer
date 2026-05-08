import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { RedisCacheService } from './redis-cache/redis-cache.service';
import { RankService } from './rank/rank.service';
import { UserService } from './user/user.service';
import RedisOptions from './RedisOptions';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/user.schema';
import conf from './conf'
import { Argv } from './Argv';

@Module({
  imports: [RedisModule.register(RedisOptions),
  MongooseModule.forRoot(
    // process.argv[3] == 'localdb' ? 'mongodb://localhost/localtest' : 'mongodb://mongouser:GTSfFy3Uh5lpMewY@172.21.255.4:27017,172.21.255.10:27017,172.21.255.12:27017/admin',
    'mongodb://localhost/localtest',
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, poolSize: 512 }),
  MongooseModule.forFeature([{ name: Argv.conf.user_db, schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService, RedisCacheService, RankService, UserService],

})
export class AppModule { }
