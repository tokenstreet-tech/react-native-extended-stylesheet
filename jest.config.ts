import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    rootDir: 'src',
    preset: 'react-native',
    modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/lib/'],
};

export default config;
