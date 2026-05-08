"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var Argv_1 = require("./Argv");
var AppController = /** @class */ (function () {
    function AppController(appService, rank, user) {
        this.appService = appService;
        this.rank = rank;
        this.user = user;
        this.adHack = false;
    }
    AppController.prototype.index = function () {
        return this.appService.getHello();
    };
    AppController.prototype.argv = function () {
        return { 'plat': Argv_1.Argv.platform, 'conf': Argv_1.Argv.conf };
    };
    AppController.prototype.getTime = function () {
        return new Date().getTime();
    };
    AppController.prototype.getAdHack = function () {
        return { 'hack': this.adHack };
    };
    AppController.prototype.openHack = function (key) {
        if (key == 'everthingis42') {
            this.adHack = true;
        }
        else if (key == 'whoisyourdady') {
            this.adHack = false;
        }
        return { 'hack': this.adHack };
    };
    AppController.prototype.getTest = function (id) {
        console.log('test');
        return true;
    };
    AppController.prototype.getCheckRank = function (id, score) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rank.checkRank(id, Number(score))];
            });
        });
    };
    AppController.prototype.postAddToRank = function (id, score, info, data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (info == null || info == '' || JSON.parse(info).name == null) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.rank.addToRank(id, Number(score), info, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        console.log(info);
                        return [2 /*return*/, e_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype.cacheRankList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id == 'testopenid')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rank.CacheRankList()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    AppController.prototype.catRankList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id == 'testopenid')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rank.CatDynamicRankList()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype.getRankList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rank.getRankList()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype.getAuth = function (code, code2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.Login(code, code2)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AppController.prototype._getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.GetUser(id)];
                    case 1:
                        user = _a.sent();
                        if (user != null) {
                            return [2 /*return*/, user.data];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype._getTestUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.GetUser(id)];
                    case 1:
                        user = _a.sent();
                        if (user != null) {
                            return [2 /*return*/, user.data];
                        }
                        else {
                            return [2 /*return*/, "newUser"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype._saveUser = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.SaveUser(id, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { 'hack': this.adHack }];
                }
            });
        });
    };
    AppController.prototype._delUser = function (id, id2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id == '_ymk9527')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.user.DelUser(id2)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype._withDraw = function (amount, openid, channelId, playerName) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!amount || amount == 0 || !openid || openid == "") {
                            return [2 /*return*/, { state: -100, msg: "参数错误:" + "amount|" + amount + "   openid|" + openid + "channelId|" + channelId + "   playerName|" + playerName }];
                        }
                        channelId = channelId ? channelId : "2005";
                        return [4 /*yield*/, this.user.sendData(amount, openid, playerName, channelId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AppController.prototype._review = function (platform, version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!platform) {
                    return [2 /*return*/, { state: -100, msg: "参数错误:" + "platform|" + platform }];
                }
                if (platform == 2 && version == "1.7") {
                    return [2 /*return*/, { state: 0, 'review': false }];
                }
                else {
                    return [2 /*return*/, { state: 0, 'review': true }];
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        common_1.Get('/')
    ], AppController.prototype, "index");
    __decorate([
        common_1.Get('/argv')
    ], AppController.prototype, "argv");
    __decorate([
        common_1.Get('time')
    ], AppController.prototype, "getTime");
    __decorate([
        common_1.Get('adHack')
    ], AppController.prototype, "getAdHack");
    __decorate([
        common_1.Get('setHack'),
        __param(0, common_1.Query('key'))
    ], AppController.prototype, "openHack");
    __decorate([
        common_1.Get('test'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "getTest");
    __decorate([
        common_1.Get('checkRank'),
        __param(0, common_1.Query('id')), __param(1, common_1.Query('score'))
    ], AppController.prototype, "getCheckRank");
    __decorate([
        common_1.HttpCode(200),
        common_1.Post('addToRank'),
        __param(0, common_1.Query('id')), __param(1, common_1.Query('score')), __param(2, common_1.Body('info')), __param(3, common_1.Body('data'))
    ], AppController.prototype, "postAddToRank");
    __decorate([
        common_1.Get('cacheRank'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "cacheRankList");
    __decorate([
        common_1.Get('catRank'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "catRankList");
    __decorate([
        common_1.Get('getRankList'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "getRankList");
    __decorate([
        common_1.Get('auth'),
        __param(0, common_1.Query('code')), __param(1, common_1.Query('code2'))
    ], AppController.prototype, "getAuth");
    __decorate([
        common_1.Get('getUser'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "_getUser");
    __decorate([
        common_1.Get('getTestUser'),
        __param(0, common_1.Query('id'))
    ], AppController.prototype, "_getTestUser");
    __decorate([
        common_1.HttpCode(200),
        common_1.Post('saveUser'),
        __param(0, common_1.Query('id')), __param(1, common_1.Body('data'))
    ], AppController.prototype, "_saveUser");
    __decorate([
        common_1.Get('delUser'),
        __param(0, common_1.Query('id')), __param(1, common_1.Query('id2'))
    ], AppController.prototype, "_delUser");
    __decorate([
        common_1.Get('withDraw'),
        __param(0, common_1.Query('amount')), __param(1, common_1.Query('openid')), __param(2, common_1.Query('channelId')), __param(3, common_1.Query('playerName'))
    ], AppController.prototype, "_withDraw");
    __decorate([
        common_1.Get("review"),
        __param(0, common_1.Query('platform')), __param(1, common_1.Query('version'))
    ], AppController.prototype, "_review");
    AppController = __decorate([
        common_1.Controller()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
