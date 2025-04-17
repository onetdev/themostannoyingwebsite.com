import config from '@maw/config-eslint/react-internal';
import storybook from 'eslint-plugin-storybook';

export default [...config, ...storybook.configs['flat/recommended']];
