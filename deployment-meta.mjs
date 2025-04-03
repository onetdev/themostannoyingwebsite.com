import manifest from './package.json' assert { type: 'json' };

const boolMap = { true: ['true', '1'], false: ['false', '0'] };
const toBool = (value) =>
  Object.entries(boolMap).find(([, v]) => v.includes(value))?.[0];

const isLocalDevelopment = toBool(process.env.NEXT_PUBLIC_IS_DEV) || false;
let publicUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themostannoyingwebsite.com';

if (isLocalDevelopment) {
  publicUrl = `https://localhost:${process.env.PORT || 3000}`;
} else if (process.env.VERCEL_ENV === 'preview') {
  publicUrl = `https://${process.env.VERCEL_BRANCH_URL}`;
} else if (process.env.VERCEL_ENV === 'production') {
  publicUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
}

const deploymentMeta = {
  githubUrl: manifest.repository.url,
  contactEmail: manifest.bugs.email,
  publicUrl,
  isLocalDevelopment,
  environment: process.env.VERCEL_ENV || 'development',

  // Sentry won't accept branch names with "/" so this line aims to replace
  // all non-alphanumeric characters with "-"
  release:
    (process.env.VERCEL_GIT_COMMIT_REF || '').replace(/[^a-z0-9._-]/gi, '-') ||
    'UNKNOWN_RELEASE',
};

export default deploymentMeta;
