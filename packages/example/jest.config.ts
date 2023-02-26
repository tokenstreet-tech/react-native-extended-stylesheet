import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'react-native',
    reporters: ['default', 'github-actions'],
};

export default config;
