import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
    preset: 'react-native',
    reporters: ['default', 'github-actions'],
};

export default config;
