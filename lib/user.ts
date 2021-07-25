import crypto from 'crypto';
import { Document } from 'mongodb';

import connect from './db';

type UserAuth = {
  username: string;
  password?: string;
};

type User = {
  createdAt: number;
  username: string;
  hash: string;
  salt: string;
};

export async function createUser({ username, password }: UserAuth) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password || '', salt, 1000, 64, 'sha512')
    .toString('hex');
  const user: User = {
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };

  const { db } = await connect();

  await db.collection('users').insertOne(user);

  return user;
}

export function validatePassword(user: Document, password: string) {
  const inputHash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.hash === inputHash;

  return passwordsMatch;
}

export async function findUser({ username }: UserAuth) {
  const { db } = await connect();

  return await db.collection('users').findOne({ username });
}
