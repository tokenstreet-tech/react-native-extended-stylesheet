import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'jest-expo',
    reporters: ['default', 'github-actions'],
};

export default config;
