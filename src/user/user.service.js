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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var request = require("request");
var mongoose_1 = require("@nestjs/mongoose");
var Argv_1 = require("src/Argv");
var user = 'user';
/*测试服请求地址 */
var testServer = "http://test.gw.leuok.com/gl-ms-wxchat-pay-admin/api/qqpay/hbpay";
/**正式服请求地址 */
var server = "http://gw.gameley.com/gl-ms-wxchat-pay-admin/api/qqpay/hbpay";
/**支付Key(渠道提供) */
var payKey = "gnwYsnrFSjJ9z5CF07D85H5z4lMF5LLW";
/**qq现金红包请求头*/
var headers = { "Content-Type": "application/json;charset=UTF-8" };
/** QQ其他渠道请求地址 */
var serverOther = "http://gw.gameley.com/gl-ms-wxchat-pay-admin/api/qqpay/uinEpay";
var UserService = /** @class */ (function () {
    function UserService(userModel) {
        this.userModel = userModel;
    }
    UserService.prototype.SaveUser = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel.updateOne({ id: id }, { data: data }, { upsert: true }).exec()];
            });
        });
    };
    UserService.prototype.GetUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel.findOne({ id: id }).exec()];
            });
        });
    };
    UserService.prototype.DelUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel.remove({ id: id }).exec()];
            });
        });
    };
    UserService.prototype.Login = function (code, code2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (r, e) {
                        switch (Argv_1.Argv.platform) {
                            case 'wx': {
                                request("https://api.weixin.qq.com/sns/jscode2session?appid=wxb1b328b4ffeb615a&secret=aac80df739f975a89735ae171cefbbf2&js_code=" + code + "&grant_type=authorization_code", function (err, res, body) {
                                    if (err == null) {
                                        r(body);
                                    }
                                    else {
                                        r('null');
                                    }
                                });
                                break;
                            }
                            case 'qq': {
                                request("https://api.q.qq.com/sns/jscode2session?appid=1110469562&secret=sCx8pRs9STGSIdoq&js_code=" + code + "&grant_type=authorization_code", function (err, res, body) {
                                    if (err == null) {
                                        r(body);
                                    }
                                    else {
                                        r('null');
                                    }
                                });
                                break;
                            }
                            case 'tt': {
                                var url;
                                if (code != null && code != 'null') {
                                    url = "https://developer.toutiao.com/api/apps/jscode2session?appid=ttcfc3b97e50e97656&secret=0a809a2cebb945eaf4bc197dc99210c453b2921c&anonymous_code=" + code2 + "&code=" + code;
                                }
                                else {
                                    url = "https://developer.toutiao.com/api/apps/jscode2session?appid=ttcfc3b97e50e97656&secret=0a809a2cebb945eaf4bc197dc99210c453b2921c&anonymous_code=" + code2;
                                }
                                request(url, function (err, res, body) {
                                    if (err == null) {
                                        r(body);
                                    }
                                    else {
                                        r('null');
                                    }
                                });
                                break;
                            }
                            case 'bd': {
                                request("https://spapi.baidu.com/oauth/jscode2sessionkey?client_id=XXobERNPa6DP9GDFSbglOGy4hDOMQT0T&code=" + code + "&sk=QhVaGxpgngGruVgaS2oLxboaQ4SLtghk", function (err, res, body) {
                                    if (err == null) {
                                        r(body);
                                    }
                                    else {
                                        r('null');
                                    }
                                });
                                break;
                            }
                        }
                    })];
            });
        });
    };
    UserService.prototype.sendData = function (amount, openid, playerName, channelId) {
        return __awaiter(this, void 0, void 0, function () {
            var crypto, request, ts, mon, month, date, day, billNo, data, curServer, str, m, sign;
            return __generator(this, function (_a) {
                crypto = require('crypto');
                request = require('request');
                ts = Math.round(new Date().getTime() / 1000);
                mon = new Date().getMonth() + 1;
                month = (mon.toString().length == 1) ? "0" + mon : mon.toString();
                date = new Date().getDate();
                day = (date.toString().length == 1) ? "0" + date : date.toString();
                billNo = new Date().getFullYear() + month + day + ts;
                if (parseInt(channelId) == 2005) {
                    curServer = server;
                    data = {
                        gameId: 988,
                        channelId: channelId,
                        openid: openid,
                        amount: amount,
                        ts: ts,
                        billNo: billNo,
                        sign: "",
                        wishing: "夏日偶像祝你游戏愉快!",
                        actName: "夏日偶像红包",
                        iconId: 863,
                        minValue: 1,
                        maxValue: 5000
                    };
                }
                else {
                    curServer = serverOther;
                    data = {
                        gameId: 988,
                        channelId: channelId,
                        openid: openid,
                        amount: amount,
                        ts: ts,
                        billNo: billNo,
                        sign: "",
                        reUserName: playerName
                    };
                }
                str = this.creatSign(data);
                m = crypto.createHash('md5');
                m.update(str, 'utf8');
                sign = m.digest("hex").toUpperCase();
                data.sign = sign;
                return [2 /*return*/, new Promise(function (r, e) {
                        return request({
                            url: "" + curServer,
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(data)
                        }, function (error, response, body) {
                            // console.log(error, response, body)
                            if (response != null) {
                                switch (response.statuscode) {
                                    case 200: //
                                        r(body);
                                        break;
                                    default:
                                        r(body);
                                        break;
                                }
                            }
                            else {
                                var obj = {
                                    error: error,
                                    response: response,
                                    body: body
                                };
                                r(obj);
                            }
                        });
                    })];
            });
        });
    };
    /**生成sign */
    UserService.prototype.creatSign = function (args) {
        //object转string,用于签名计算
        var keys = Object.keys(args);
        keys = keys.sort(); //参数名ASCII码从小到大排序（字典序）；
        var newArgs = {};
        keys.forEach(function (key) {
            if (args[key] != "" && args[key] != 'undefined' && args[key] != "sign") { //如果参数的值为空或sign值不参与签名；
                newArgs[key] = args[key]; //参数名区分大小写；
            }
        });
        var str = '';
        for (var k in newArgs) {
            str += '&' + k + '=' + newArgs[k];
        }
        str = str.substr(1) + "&key=" + payKey; //拼接key
        return str;
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(Argv_1.Argv.conf.user_db))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
