import crypto from 'crypto'
import fs from 'fs'

export enum RSAType {
  SHA1,
  SHA256,
}

// sign with rsa private key
interface Sign {
  origin: string
  privateKeyPath: string
  type?: number
}

export function rasPrivateKeySign({ origin, privateKeyPath, type = RSAType.SHA1 }: Sign): string {
  const privateKey = fs.readFileSync(privateKeyPath, { encoding: 'utf8' })
  const algorithm = type === RSAType.SHA1 ? 'RSA-SHA1' : 'RSA-SHA256'
  const sign = crypto.createSign(algorithm)
  sign.update(origin, 'utf8')
  return sign.sign(privateKey, 'base64')
}

interface Verify {
  origin: string
  signature: string
  publicKeyPath: string
  type?: number
}

// verify with rsa public key
export function rasPublicKeyVerify({ origin, signature, publicKeyPath, type = RSAType.SHA1 }: Verify): boolean {
  const publicKey = fs.readFileSync(publicKeyPath, { encoding: 'utf8' })
  const algorithm = type === RSAType.SHA1 ? 'RSA-SHA1' : 'RSA-SHA256'
  const verify = crypto.createVerify(algorithm)
  verify.update(origin, 'utf8')
  return verify.verify(publicKey, signature, 'base64')
}

interface Encrypt {
  publicKeyPath: string
  toEncrypt: string
}

// encrypt with public key
export function publicEncrypt({ publicKeyPath, toEncrypt }: Encrypt): string {
  const publicKey = fs.readFileSync(publicKeyPath, { encoding: 'utf8' })
  const buffer = Buffer.from(toEncrypt)
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

interface Decrypt {
  privateKeyPath: string
  toDecrypt: string
}

// decrypt with private key
export function privateDecrypt({ privateKeyPath, toDecrypt }: Decrypt): string {
  const privateKey = fs.readFileSync(privateKeyPath, { encoding: 'utf8' })
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(privateKey, buffer)
  return decrypted.toString('utf8')
}

interface DES3Decrypt {
  key: string
  toDecrypt: string
}

// 3DES 解密 ECB 模式
export function DES3ECBDecrypt({ key, toDecrypt }: DES3Decrypt): string {
  key = key.padEnd(24, '0')
  const decipher = crypto.createDecipheriv('des-ede3', key, '')
  let received = decipher.update(toDecrypt, 'base64', 'utf8')
  received += decipher.final('utf8')
  return received
}

export function md5(message: string): string {
  const hash = crypto.createHash('md5')
  hash.update(message)
  return hash.digest('hex')
}
