import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || '';
const expiresIn = 8 * 60 * 60;

export function encode(data: string | Object | Buffer) {
  return jwt.sign(data, TOKEN_SECRET, { expiresIn });
}

export function decode(token: string) {
  return jwt.decode(token);
}

export function verify(token: string) {
  return jwt.verify(token, TOKEN_SECRET);
}
