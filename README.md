# Signature

Port of [mloughran/signature](https://github.com/mloughran/signature) to Node.

## Example

    var signature = require('signature');
    var params = {some: 'parameters'};

    var token = new signature.Token('my_key', 'my_secret');
    var request = new signature.Request('POST', '/api/thing', params)

    var auth = request.sign(token);

    console.log(auth);
    // { auth_version: '1.0',
    //   auth_key: 'my_key',
    //   auth_timestamp: 1309886832,
    //   auth_signature: '01a07f74e284012fbafc2ed1a07c91d5234431c82ab429f0069d9594cfd8dd96' }

## License

MIT
