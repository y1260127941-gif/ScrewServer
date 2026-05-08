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
exports.RedisCacheService = void 0;
var common_1 = require("@nestjs/common");
var RedisCacheService = /** @class */ (function () {
    function RedisCacheService(redisService) {
        this.redisService = redisService;
        this.getClient();
    }
    RedisCacheService.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.redisService.getClient()];
                    case 1:
                        _a.client = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.checkClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.client) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = JSON.stringify(value);
                        return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.set(key, value)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.get(key)];
                    case 2:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/];
                        return [2 /*return*/, JSON.parse(data)];
                }
            });
        });
    };
    RedisCacheService.prototype.hset = function (key, field, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = JSON.stringify(value);
                        return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.hset(key, field, value)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.hget = function (key, field) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.hget(key, field)];
                    case 2:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/];
                        return [2 /*return*/, JSON.parse(data)];
                }
            });
        });
    };
    RedisCacheService.prototype.hdel = function (key, field) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.hdel(key, field)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.hgetall = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.hgetall(key)];
                    case 2:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/];
                        return [2 /*return*/, data];
                }
            });
        });
    };
    RedisCacheService.prototype.del = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, (_a = this.client).del.apply(_a, key)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.zrevrange = function (key, start, stop) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.zrevrange(key, start, stop, "WITHSCORES")];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RedisCacheService.prototype.zadd = function (key, score, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.zadd(key, score.toString(), member)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.zrem = function (key, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.zrem(key, member)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RedisCacheService.prototype.zrevrank = function (key, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkClient()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.zrevrank(key, member)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RedisCacheService = __decorate([
        common_1.Injectable()
    ], RedisCacheService);
    return RedisCacheService;
}());
exports.RedisCacheService = RedisCacheService;
