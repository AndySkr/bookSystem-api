const crypto = require('crypto');

const str = '18072702145_5933_token';
const hash = crypto.createHash('md5');
const token = hash.update(str);
