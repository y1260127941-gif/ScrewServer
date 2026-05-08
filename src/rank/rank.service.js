"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RankService = void 0;
var common_1 = require("@nestjs/common");
var _ = require("lodash");
var schedule = require("node-schedule");
var Argv_1 = require("src/Argv");
/**实时排行榜 */
var rank = 'leaderboard';
/**排行榜快照 */
var rankSnapshot = 'rankList';
/**用户表{info(昵称,头像),data(装扮...dengdeng)} */
var userInfoData = 'userKey';
var RankService = /** @class */ (function () {
    function RankService(redis) {
        var _this = this;
        this.redis = redis;
        this.rankList = '{}';
        rank = Argv_1.Argv.platform + rank;
        rankSnapshot = Argv_1.Argv.platform + rankSnapshot;
        userInfoData = Argv_1.Argv.platform + userInfoData;
        var rule = new schedule.RecurrenceRule();
        rule.hour = [0, 8, 10, 12, 14, 16, 18, 20, 22];
        rule.minute = 0;
        schedule.scheduleJob('CacheRankList', rule, function () {
            console.log('cache rank list', new Date());
            _this.CacheRankList();
        });
    }
    RankService.prototype.checkRank = function (id, score) {
        return __awaiter(this, void 0, void 0, function () {
            var oldRank, items, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.redis.zrevrank(rank, id)];
                    case 1:
                        oldRank = _b.sent();
                        if (oldRank != null) {
                            return [2 /*return*/, true];
                        }
                        _a = this.parseLeaderboard;
                        return [4 /*yield*/, this.redis.zrevrange(rank, 99, 99)];
                    case 2:
                        items = _a.apply(this, [_b.sent()]);
                        if (items.length == 0) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, items[0].score < score];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RankService.prototype.addToRank = function (id, score, info, data) {
        return __awaiter(this, void 0, void 0, function () {
            var oldRank, items, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.redis.zrevrank(rank, id)];
                    case 1:
                        oldRank = _b.sent();
                        if (!(oldRank != null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.redis.zadd(rank, score, id)];
                    case 2:
                        _b.sent();
                        if (!(info != null && data != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.redis.hset(userInfoData, id, { info: info, data: data })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, true];
                    case 5:
                        _a = this.parseLeaderboard;
                        return [4 /*yield*/, this.redis.zrevrange(rank, 99, 99)];
                    case 6:
                        items = _a.apply(this, [_b.sent()]);
                        if (!(items.length == 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.redis.zadd(rank, score, id)];
                    case 7:
                        _b.sent();
                        if (!(info != null && data != null)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.redis.hset(userInfoData, id, { info: info, data: data })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, true];
                    case 10:
                        item = items[0];
                        if (!(item.score < score)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.redis.zrem(rank, item.id)];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, this.redis.zadd(rank, score, id)];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, this.redis.hdel(userInfoData, item.id)];
                    case 13:
                        _b.sent();
                        if (!(info != null && data != null)) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.redis.hset(userInfoData, id, { info: info, data: data })];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15: return [2 /*return*/, true];
                    case 16: return [2 /*return*/, false];
                }
            });
        });
    };
    RankService.prototype.getRankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redis.hgetall(rankSnapshot)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    RankService.prototype.CacheRankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, _a, i, item, infoData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseLeaderboard;
                        return [4 /*yield*/, this.redis.zrevrange(rank, 0, 99)];
                    case 1:
                        items = _a.apply(this, [_b.sent()]);
                        if (items == null)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.redis.del(rankSnapshot)];
                    case 2:
                        _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < items.length)) return [3 /*break*/, 7];
                        item = items[i];
                        return [4 /*yield*/, this.redis.hget(userInfoData, item.id)];
                    case 4:
                        infoData = _b.sent();
                        item['info'] = infoData.info;
                        item['data'] = infoData.data;
                        return [4 /*yield*/, this.redis.hset(rankSnapshot, item.id, item)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7: return [4 /*yield*/, this.redis.del(rank, userInfoData)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    RankService.prototype.CatDynamicRankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseLeaderboard;
                        return [4 /*yield*/, this.redis.zrevrange(rank, 0, 99)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    RankService.prototype.parseLeaderboard = function (leaderboard) {
        return _.chunk(leaderboard, 2).map(function (item, index) {
            return {
                rank: index + 1,
                id: item[0],
                score: parseInt(item[1])
            };
        });
    };
    RankService.prototype.parseRankList = function (rankList) {
        var ret = {};
        Object.keys(rankList).map(function (key) {
            ret[key] = JSON.parse(rankList[key]);
        });
        return ret;
    };
    RankService = __decorate([
        common_1.Injectable()
    ], RankService);
    return RankService;
}());
exports.RankService = RankService;
