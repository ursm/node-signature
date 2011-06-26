vows   = require('vows')
assert = require('assert')

signature = require('../lib/signature')

vows.describe('Signature').addBatch(
  'from correct key':
    topic: ->
      token   = new signature.Token('key', 'secret')

      request = new signature.Request('POST', '/some/path',
        query: 'params'
        go:    'here'
      )

      {
        token:     token
        request:   request
        signature: request.sign(token, 1234)
      }

    'generate base64 encoded signature': (topic) ->
      assert.equal topic.request.stringToSign(), "POST\n/some/path\nauth_key=key&auth_timestamp=1234&auth_version=1.0&go=here&query=params"
      assert.equal topic.signature.auth_signature, '3b237953a5ba6619875cbb2a2d43e8da9ef5824e8a2c689f6284ac85bc1ea0db'

).export module
