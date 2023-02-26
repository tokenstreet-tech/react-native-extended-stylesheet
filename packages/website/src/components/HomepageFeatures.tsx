import { useColorMode } from '@docusaurus/theme-common';
import type { IFeatureItem } from '@site/src/components/FeatureItem';
import { FeatureItem } from '@site/src/components/FeatureItem';
import dependabot from '@site/static/img/dependabot.svg';
import maintenance from '@site/static/img/maintenance.svg';
import maintenanceDark from '@site/static/img/maintenanceDark.svg';
import typescript from '@site/static/img/typescript.svg';
import type { FC } from 'react';
import React, { useMemo } from 'react';

import styles from './HomepageFeatures.module.css';

export const HomepageFeatures: FC = () => {
    const { isDarkTheme } = useColorMode();

    const FeatureList = useMemo<Array<IFeatureItem>>(
        () => [
            {
                Svg: typescript,
                description: (
                    <a href="https://github.com/vitalets/react-native-extended-stylesheet/issues/118">
                        CSS intellisense not working #118
                    </a>
                ),
                title: 'IntelliSense IDE integration',
            },
            {
                Svg: isDarkTheme ? maintenanceDark : maintenance,
                description: (
                    <a href="https://github.com/vitalets/react-native-extended-stylesheet/issues/154">
                        Is this repo active? #154
                    </a>
                ),
                title: 'Maintained',
            },
            {
                Svg: dependabot,
                description: <>Latest dependencies - Secured by Dependabot</>,
                title: 'Always up to date',
            },
        ],
        [isDarkTheme]
    );

    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <FeatureItem key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
};
