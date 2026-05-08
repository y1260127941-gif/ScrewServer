export class WXBizDataCrypt {
  public static decryptData(encryptedData, iv, sessionKey) {
    var crypto = require('crypto')
    // base64 decode
    var sessionKey2 = Buffer.from(sessionKey, 'base64');
    var encryptedData2 = Buffer.from(encryptedData, 'base64')
    var iv2 = Buffer.from(iv, 'base64')

    try {
      // 解密
      var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey2, iv2)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      var decoded = decipher.update(encryptedData2, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      decoded = JSON.parse(decoded)
    } catch (err) {
      return null;
    }
    return decoded;
    if (decoded.watermark.appid !== "wx5d8b43cff4812594") {
      return "error4";
    }

    return decoded;
  }
}
