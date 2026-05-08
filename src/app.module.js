"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var nestjs_redis_1 = require("nestjs-redis");
var redis_cache_service_1 = require("./redis-cache/redis-cache.service");
var rank_service_1 = require("./rank/rank.service");
var user_service_1 = require("./user/user.service");
var RedisOptions_1 = require("./RedisOptions");
var mongoose_1 = require("@nestjs/mongoose");
var user_schema_1 = require("./user/user.schema");
var Argv_1 = require("./Argv");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [nestjs_redis_1.RedisModule.register(RedisOptions_1["default"]),
                mongoose_1.MongooseModule.forRoot(process.argv[3] == 'localdb' ? 'mongodb://localhost/localtest' : 'mongodb://mongouser:GTSfFy3Uh5lpMewY@172.21.255.4:27017,172.21.255.10:27017,172.21.255.12:27017/admin', { useUnifiedTopology: true, useNewUrlParser: true }),
                mongoose_1.MongooseModule.forFeature([{ name: Argv_1.Argv.conf.user_db, schema: user_schema_1.UserSchema }])],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, redis_cache_service_1.RedisCacheService, rank_service_1.RankService, user_service_1.UserService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
