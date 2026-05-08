import { Injectable } from '@nestjs/common';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import * as _ from 'lodash'
import * as schedule from 'node-schedule'
import { Argv } from 'src/Argv';
import { LogTool } from '../Tool/LogTool';

/**实时排行榜 */
var sub = 'subscribe';
var token: string;
const headers = { "Content-Type": "application/json;charset=UTF-8" }
const AppSecret = "Ak4E2M3mwiQkvlbIUWWE0L";

@Injectable()
export class RankService {
    constructor(private readonly redis: RedisCacheService) {
      
    }
}
