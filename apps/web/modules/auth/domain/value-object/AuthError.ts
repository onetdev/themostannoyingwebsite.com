import { z } from 'zod';

export const AuthErrorList = ['IMPOSSIBLE_PATH', 'UNKNOWN_ERROR'] as const;

export const AuthErrorSchema = z.enum(AuthErrorList);

export type AuthErrorType = (typeof AuthErrorList)[number];
