import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    modulePathIgnorePatterns: ['<rootDir>/lib/'],
    preset: 'react-native',
    reporters: ['default', 'github-actions'],
};

export default config;
