import config from './config'
import { DES3ECBDecrypt, md5, rasPrivateKeySign, rasPublicKeyVerify } from './crypto'

describe.skip('Sign and Verify', () => {
  test('sign', () => {
    expect(
      rasPrivateKeySign({
        origin: '1530092994',
        privateKeyPath: config.rsaKey.private,
      }),
    ).toBe(
      'tT+SG8EBXNhTjCbzEE3pKVVU7VzP+PKxrpNbbIA9u2SCZ72im+sfE2nJiYk6/sih+qgA5T2OGyd5IsbzMkdiUxH5nifeB6hkUS+nVPC1mwLElBOSsjQbb6zkphjD9hl8gWz6lH14y1053rQVv3KQofUHxGUWe9Ea9RUSjZIUanBAhWHX0ZOP4T5ozsiatb2G1/xuEYaHf/NxlUhH8D4aCs/bvZXw9TyRyw97QP/18XO14+1FjpJ/9jB2Gn3j1wdJANHDYoUaHSM7os5xCphhuiWktOOEYFnrk7zesj2BiQuwxjk11HhOB9sCK0Pcwq388s6TlnYHtC/iOLDwFpJ1rw==',
    )
  })

  test('verify', () => {
    expect(
      rasPublicKeyVerify({
        origin: '1530092994',
        signature:
          'tT+SG8EBXNhTjCbzEE3pKVVU7VzP+PKxrgpNbbIA9u2SCZ72im+sfE2nJiYk6/sih+qgA5T2OGyd5IsbzMkdiUxH5nifeB6hkUS+nVPC1mwLElBOSsjQbb6zkphjD9hl8gWz6lH14y1053rQVv3KQofUHxGUWe9Ea9RUSjZIUanBAhWHX0ZOP4T5ozsiatb2G1/xuEYaHf/NxlUhH8D4aCs/bvZXw9TyRyw97QP/18XO14+1FjpJ/9jB2Gn3j1wdJANHDYoUaHSM7os5xCphhuiWktOOEYFnrk7zesj2BiQuwxjk11HhOB9sCK0Pcwq388s6TlnYHtC/iOLDwFpJ1rw==',
        publicKeyPath: config.rsaKey.public,
      }),
    ).toBe(true)
  })
})

describe('DES3', () => {
  test('DES3Decrypt', () => {
    expect(
      DES3ECBDecrypt({
        key: '',
        toDecrypt: 'LGNuCB8rY5Q=fdsfasdfsf',
      }),
    ).toBe('9668833')
  })
})

test('hash', () => {
  expect(md5('test7.easeua.t.xianghuanji.com')).toBe('14231da6d19015270078d164d92e792f')
})
