import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { Argv } from 'src/Argv';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import e = require('express');
import { LogTool } from 'src/Tool/LogTool';
import { Model } from 'mongoose';
import { UserSchema } from './user.schema';

var mongoose = require("mongoose")
var mc = mongoose.createConnection('mongodb://localhost/localtest', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, poolSize: 512 })
const MyModel = mc.model(Argv.conf.user_db, UserSchema);
@Injectable()
export class UserService {
    private _userModel2;
    constructor(@InjectModel(Argv.conf.user_db) private userModel: Model<User>, private readonly redis: RedisCacheService) {
        // this._userModel2 = new MyModel();
    }

    public async SaveUser(id: string, data: any) {
        return this.userModel.updateOne({ id: id }, { data: data }, { upsert: true }).exec();
    }

    public async GetUser(id: string, version: string = null) {
        return this.userModel.findOne({ id: id }).exec();
    }
}
