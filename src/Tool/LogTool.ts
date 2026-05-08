import * as fs from "fs";
export class LogTool {
    public static async getGdtLog(time: string) {
        try {
            // read contents of the file
            var dataStr = fs.readFileSync('../log/testCode/code' + time + ".log", 'UTF-8');
            var lines = dataStr.split(/\r?\n/);
            return lines;
        } catch (err) {
            // console.error(err);
            return null;
        }
    }

    public static logValue(openid: string, msg, platForm) {
        // 写入文件内容（如果文件不存在会创建一个文件）
        // 传递了追加参数 { 'flag': 'a' }
        var date = new Date();
        let y = date.getFullYear();
        let mo = date.getMonth() + 1;
        let d = date.getDate();

        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        let exists: boolean = fs.existsSync(".../log/" + platForm);
        if (!exists) {
            fs.mkdirSync("../log/" + platForm, { recursive: true });
        } else {
        }
        var fileName = "../log/" + platForm + "/" + y + "-" + mo + "-" + d + ".log";
        var rMsg = msg + "\n";
        fs.writeFile(fileName, rMsg, { 'flag': 'a' }, function (err) {
            if (err) {
                throw err;
            }
        });
    }

    public static log(openid: string, msg, platForm) {
        // 写入文件内容（如果文件不存在会创建一个文件）
        // 传递了追加参数 { 'flag': 'a' }
        var date = new Date();
        let y = date.getFullYear();
        let mo = date.getMonth() + 1;
        let d = date.getDate();

        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        let exists: boolean = fs.existsSync(".../log/" + platForm);
        if (!exists) {
            fs.mkdirSync("../log/" + platForm, { recursive: true });
        } else {
        }
        var fileName = "../log/" + platForm + "/" + y + "-" + mo + "-" + d + ".log";
        var rMsg = "-[" + h + ":" + m + ":" + s + "]-:" + "id:" + openid + "-" + msg + "\n";
        fs.writeFile(fileName, rMsg, { 'flag': 'a' }, function (err) {
            if (err) {
                throw err;
            }
        });
    }

    /**
     * 
     */
    public static async logCode(msg, platForm, type) {
        // 写入文件内容（如果文件不存在会创建一个文件）
        // 传递了追加参数 { 'flag': 'a' }
        var date = new Date();
        let y = date.getFullYear();
        let mo = date.getMonth() + 1;
        let d = date.getDate();
        let exists: boolean = fs.existsSync(".../log/" + platForm);
        if (!exists) {
            fs.mkdirSync("../log/" + platForm, { recursive: true });
        } else {
        }
        var fileName = "../log/" + platForm + "/" + "code" + type + ".log";
        var rMsg = msg + "\n";
        fs.writeFile(fileName, rMsg, { 'flag': 'a' }, function (err) {
            if (err) {
                throw err;
            }
        });

    }


}