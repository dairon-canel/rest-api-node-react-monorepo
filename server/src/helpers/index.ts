import crypto from 'crypto';

const SECRET_API_STRING = 'SECRET_STRING';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET_API_STRING)
    .digest('hex');
};
