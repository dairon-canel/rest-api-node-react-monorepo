import express from 'express';
import crypto from 'crypto';

const SECRET_API_STRING = 'SECRET_STRING';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET_API_STRING)
    .digest('hex');
};
export const handleValidationErrors = (res: express.Response, error: any) => {
  if (error.name !== 'ValidationError') return;

  const errors: string[] = [];

  Object.keys(error.errors).forEach(key => {
    if (error?.errors[key]?.properties?.message) {
      errors.push(error?.errors[key]?.properties?.message || '');
    }
  });
  console.log(errors);

  return errors;
};
