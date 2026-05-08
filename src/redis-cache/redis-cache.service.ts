import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';
@Injectable()
export class RedisCacheService {
    public client: Redis.Redis;

    constructor(private redisService: RedisService) {
        this.getClient();
    }

    async getClient() {
        this.client = await this.redisService.getClient();
    }

    async checkClient() {
        if (!this.client) {
            await this.getClient();
        }
    }

    async set(key: string, value: any) {
        value = JSON.stringify(value);
        await this.checkClient();
        await this.client.set(key, value);
    }

    async get(key: string) {
        await this.checkClient();
        var data = await this.client.get(key);
        if (!data) return;
        return JSON.parse(data);
    }

    async hset(key: string, field: string, value: any) {
        value = JSON.stringify(value);
        await this.checkClient();
        await this.client.hset(key, field, value);
    }

    async hget(key: string, field: string) {
        await this.checkClient();
        var data = await this.client.hget(key, field);
        if (!data) return;
        return JSON.parse(data);
    }

    async hdel(key: string, field: string) {
        await this.checkClient();
        await this.client.hdel(key, field);
    }

    async hdelArr(key: string, field: string[]) {
        await this.checkClient();
        await this.client.hdel(key, ...field);
    }


    async hgetall(key: string) {
        await this.checkClient();
        var data = await this.client.hgetall(key);
        if (!data) return;
        return data;
    }

    async hscan(key: string, start: number, count: number) {
        await this.checkClient();
        var data = await this.client.hscan(key, start, "COUNT", count);
        if (!data) return;
        return data;
    }

    async del(...key: string[]) {
        await this.checkClient();
        await this.client.del(...key);
    }

    async zrevrange(key: string, start: number, stop: number) {
        await this.checkClient();
        return await this.client.zrevrange(key, start, stop);
    }

    async zadd(key: string, score: number, member: string) {
        await this.checkClient();
        await this.client.zadd(key, score.toString(), member)
    }

    async zrem(key: string, member: string) {
        await this.checkClient();
        await this.client.zrem(key, member);
    }

    async zrevrank(key: string, member: string) {
        await this.checkClient();
        return await this.client.zrevrank(key, member);
    }

    async zincrby(key: string, score: number, member: string) {
        await this.checkClient();
        return await this.client.zincrby(key, score, member);
    }

    async expire(key: string, timeStamp: number) {
        await this.checkClient();
        await this.client.expireat(key, timeStamp);
    }
}
