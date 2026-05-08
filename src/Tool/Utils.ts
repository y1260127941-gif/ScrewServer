import pako = require("pako");
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

class InvalidCharacterError extends Error {
    name = 'InvalidCharacterError';
}


export class Utils {
    public static parseCommonTime(localDate: number) {
        let serverDate = new Date(localDate);
        return serverDate.getFullYear() + "_" + serverDate.getMonth() + "_" + serverDate.getDate();
    }


    //打乱
    public static shuffle(arr) {
        let i = arr.length
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    }

    //去重
    public static unique(arr) {
        return Array.from(new Set(arr))
    }

    //个位数补齐十位数
    public static setTimeDateFmt(s) {
        return s < 10 ? "0" + s : s;
    }

    public static Zip(str: string): string {
        return pako.deflate(encodeURIComponent(str), { to: 'string' });
    }

    public static Unzip(code: string): string {
        var strData = code;
        var charData = strData.split('').map(x => x.charCodeAt(0));
        var binData = new Uint8Array(charData);
        var data = pako.inflate(binData);
        strData = String.fromCharCode.apply(null, new Uint16Array(data));
        return decodeURIComponent(strData);
    }

    public static btoa(input: any) {
        var str = String(input);
        for (
            // initialize result and counter
            var block, charCode, idx = 0, map = chars, output = '';
            // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1);
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = str.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            block = block << 8 | charCode;
        }
        return output;
    }

    public static atob(input: any) {
        var str = (String(input)).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
        if (str.length % 4 === 1) {
            throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
            // initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = '';
            // get next character
            buffer = str.charAt(idx++); // eslint-disable-line no-cond-assign
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }


    /**
     * 时间转化为标准字符串
     * @param date 
     * @returns 
     */
    public static formatDateTime(date: Date) {
        let y: number = date.getFullYear();
        let m: number = date.getMonth() + 1;
        let mStr: string = m < 10 ? ('0' + m) : (m + '');
        let d: number = date.getDate();
        let dStr = d < 10 ? ('0' + d) : (d + '');
        let h: number = date.getHours();
        let hStr = h < 10 ? ('0' + h) : (h + '');
        let minute: number = date.getMinutes();
        let minStr = minute < 10 ? ('0' + minute) : (minute + '');
        let second: number = date.getSeconds();
        let secStr = second < 10 ? ('0' + second) : (second + '');
        return y + '-' + mStr + '-' + dStr + ' ' + hStr + ':' + minStr + ':' + secStr;
    }

    private static crypto = require('crypto');

    /**生成sign */
    public static creatSha1Sign(args, secret: string) {
        //object转string,用于签名计算
        var keys = Object.keys(args)
        keys = keys.sort() //参数名ASCII码从小到大排序（字典序）；
        var newArgs = {}
        keys.forEach(function (key) {
            if (args[key] != "" && args[key] != 'undefined' && args[key] != "sign") {  //如果参数的值为空或sign值不参与签名；
                newArgs[key] = args[key]  //参数名区分大小写；
            }
        })
        var str = ''
        for (var k in newArgs) {
            str += '&' + k + '=' + newArgs[k]
        }
        str = str.substr(1) + secret;//拼接key
        var m = this.crypto.createHash('sha1');
        m.update(str, 'utf8');
        let _sign = m.digest("hex");
        return _sign;
    }

    /**
     * 生成微信sha1签名
     * @param obj 
     * @param secrte 
     * @returns 
     */
    public static createWXSha256Sign(str: string, secrte: string) {
        var m = this.crypto.createHmac('sha256', secrte);
        m.update(str);
        let _sign = m.digest("hex");
        return _sign;
    }

    private static dic = {
        "O": "0",
        "b": "1",
        "c": "2",
        "d": "3",
        "z": "4",
        "f": "5",
        "g": "6",
        "m": "7",
        "i": "8",
        "j": "9",
        "0": "O",
        "1": "b",
        "2": "c",
        "3": "d",
        "4": "z",
        "5": "f",
        "6": "g",
        "7": "m",
        "8": "i",
        "9": "j"
    }

    //判断是否压缩过
    public static isZip(s: string) {
        return typeof s == 'string' && s.startsWith('zip');
    }

    // 字符串解密
    public static lzw_decode(str) {
        str = str.substring(3);
        var s = "";  //定义临时变量
        for (var i = 0; i < str.length; i++) {  //遍历字符串
            if (this.dic[str[i]]) {
                s += this.dic[str[i]];
            } else {
                s += str[i];
            }
        }
        return s;  //返回被解密的字符串
    }

    //判断是否压缩过
    public static isEZip(s: string) {
        return typeof s == 'string' && s.startsWith('ezip');
    }

    /**
     * 解密
     * @param dataStr 
     * @param iv 
     * @param key 
     * @returns 
     */
    public static decrypt(dataStr: string, iv: string, key: string) {
        dataStr = dataStr.substring(4);
        var crypto = require('crypto');
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(dataStr, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    }

    /**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
    public static encrypt(dataStr: string, iv: string, key: string) {
        var crypto = require('crypto');
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(dataStr, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        return "ezip" + cipherChunks.join('');
    };

    /**
     * 判断是否是json文件
     * @param dataStr 
     * @returns 
     */
    public static isJson(dataStr: string) {
        try {
            JSON.parse(dataStr);
            return true;
        } catch (error) {
            return false;
        }
    }

}