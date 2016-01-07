var crypto = require('crypto');

exports.isNullOrEmpty = function (str) {
    if (str) {
        if (str.length && str.length > 0) return false;
        if (str.length === 0) return true;
    }
    return true;
}

exports.isParamsNullOrEmpty = function (params) {
    var res = false;
    if (params) {
        for (var index = 0; index < params.length; index++) {
            if (isNullOrEmpty(params[index])) {
                res = true;
                break;
            }
        }
    } else {
        return true;
    }
    return res;
}

exports.hashIt = function (str) {
    var shasum = crypto.createHash('sha1');
    shasum.update(str);
    return (shasum.digest('hex'));
}


exports.notFound = function (res, str) {
    res.status(500) // HTTP status 404: NotFound
        .send((str || 'Server Issue Try agian later'));
}