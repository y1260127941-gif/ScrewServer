import { Controller, Get, Param, Query, Post, Body, Req, HttpCode, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RankService } from './rank/rank.service';
import { UserService } from './user/user.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  adHack: boolean = false;
  constructor(private readonly appService: AppService, private readonly rank: RankService, private readonly user: UserService) { }

  @Get('/')
  index() {
    return this.appService.getHello();
  }

  // //打点内购玩家 system 1安卓 2ios 3h5
  // @HttpCode(200)
  // @Post('test')
  // async _test(@Body('start') start: number, @Body('count') count: number) {
  //   // return await this.user.clearCode(start, count);
  // }

  // @Get('signCode')
  // async _signCode(@Query('type') type: string) {
  //   return await this.user.addCode(type);
  // }

  // @Get('activityCode')
  // async _activityCode(@Query('type') type: string) {
  //   return await this.user.addRandCode(type);
  // }

  // @HttpCode(200)
  // @Post('testDB')
  // async _testDB(@Body('data') data: any, @Body('id') id: string) {
  //   // console.log("testDB:" + Date.now());
  //   // this.user.testDB(data, id);
  // }

  // @HttpCode(200)
  // @Post('getDB')
  // async _getDB(@Body('type') type: string) {
  //   return await this.user.getGdtLog(type);
  //   // let data = await this.user.getDB(uid);
  //   // return data ? data : "fail";
  // }

  // @HttpCode(200)
  // @Post('saveDb')
  // async _saveDb(@Body('id') id: string, @Body('data') data: any) {
  //   // this.user.postDb(id, data);
  // }

  // @Get('testValue')
  // async _testValue() {
  //   return await this.user.testValue();
  // }

  @HttpCode(200)
  @Post('getUserData')
  async _getUserData(@Body('openid') openid: string) {
    var user = await this.user.GetUser(openid);
    if (user != null) {
      return JSON.parse(user.data);
    } else {
      return null;
    }
  }

  @HttpCode(200)
  @Post('saveUserData')
  async _saveUserData(@Body('openid') openid: string, @Body('data') data: any) {
    await this.user.SaveUser(openid, JSON.stringify(data));
    return { code: 1 };
  }

  @HttpCode(200)
  @Post('delUser')
  async _delUser(@Body('openid') openid: string) {
    await this.user.DelUser(openid);
    return { code: 1 };
  }
}
