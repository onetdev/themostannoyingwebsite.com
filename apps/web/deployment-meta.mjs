import packageJson from '../../package.json' with { type: 'json' };

const toBool = (value, defaultValue = false) =>
  [
    [true, ['true', '1']],
    [false, ['false', '0']],
  ].find(([, data]) => data.includes(value))?.[0] ?? defaultValue;

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

const commitRef = (process.env.VERCEL_GIT_COMMIT_REF || '').replace(
  /[^a-z0-9._-]/gi,
  '-',
);

const commitSha = (process.env.VERCEL_GIT_COMMIT_SHA || 'NOSHA').substring(
  0,
  10,
);

const deploymentMeta = {
  author: packageJson.author,
  githubUrl: packageJson.repository.url,
  contactEmail: packageJson.bugs.email,
  version: packageJson.version,
  publicUrl,
  isLocalDevelopment,
  environment: process.env.VERCEL_ENV || 'development',

  // Sentry won't accept branch names with "/" so this line aims to replace
  // all non-alphanumeric characters with "-"
  release: `${commitRef || 'UNKNOWN_RELEASE'}-${commitSha}@${packageJson.version}`,
};

export default deploymentMeta;
