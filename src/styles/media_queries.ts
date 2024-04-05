export const breakpoints = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

const cssRulePrefix = '@media screen and';
const cssRuleMinMax = (min: string, max: string) =>
  `(min-width: ${min}) and (max-width: ${max})`;

const mediaQueries = {
  // Strictly targeted dimensions
  xs: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xs, breakpoints.sm)}`,
  sm: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.sm, breakpoints.md)}`,
  md: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.md, breakpoints.lg)}`,
  lg: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.lg, breakpoints.xl)}`,
  xl: `${cssRulePrefix} ${cssRuleMinMax(breakpoints.xl, breakpoints.xxl)}`,
  xxl: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without uppper limit
  xsUp: `${cssRulePrefix} (min-width: ${breakpoints.xs})`,
  smUp: `${cssRulePrefix} (min-width: ${breakpoints.sm})`,
  mdUp: `${cssRulePrefix} (min-width: ${breakpoints.md})`,
  lgUp: `${cssRulePrefix} (min-width: ${breakpoints.lg})`,
  xlUp: `${cssRulePrefix} (min-width: ${breakpoints.xl})`,
  xxlUp: `${cssRulePrefix} (min-width: ${breakpoints.xxl})`,
  // Targeting without lower limit
  xsDown: `${cssRulePrefix} (max-width: ${breakpoints.sm})`,
  smDown: `${cssRulePrefix} (max-width: ${breakpoints.md})`,
  mdDown: `${cssRulePrefix} (max-width: ${breakpoints.lg})`,
  lgDown: `${cssRulePrefix} (max-width: ${breakpoints.xl})`,
  xlDown: `${cssRulePrefix} (max-width: ${breakpoints.xxl})`,
  xxlDown: `${cssRulePrefix}`,
};

export default mediaQueries;
