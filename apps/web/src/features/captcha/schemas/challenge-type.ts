import * as z from 'zod';

export const ChallengeTypeList = ['emoji', 'tile', 'grid'];

export const ChallengeTypeSchema = z.enum(ChallengeTypeList);

export type ChallengeType = (typeof ChallengeTypeList)[number];
