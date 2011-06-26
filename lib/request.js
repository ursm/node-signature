var crypto      = require('crypto'),
    querystring = require('querystring'),
    _           = require('underscore')._;

var Request = exports.Request = function(method, path, params) {
  this.method = method;
  this.path   = path;
  this.params = params;
};

Request.prototype.sign = function(token, timestamp) {
  var authHash = {
    auth_version:   '1.0',
    auth_key:       token.key,
    auth_timestamp: timestamp || Math.floor(new Date() / 1000),
  };

  authHash.auth_signature = this.signature(token, authHash);

  return authHash;
};

Request.prototype.signature = function(token, authHash) {
  return crypto.createHmac('sha256', token.secret).update(this.stringToSign(authHash)).digest('hex');
};

Request.prototype.stringToSign = function(authHash) {
  return [this.method, this.path, this.queryString(authHash)].join("\n");
};

Request.prototype.queryString = function(authHash) {
  var params = _.extend(this.params, authHash);
  var sorted = {};

  _.keys(params).sort().forEach(function(key) {
    sorted[key.toLowerCase()] = params[key];
  });

  return querystring.stringify(sorted);
};
