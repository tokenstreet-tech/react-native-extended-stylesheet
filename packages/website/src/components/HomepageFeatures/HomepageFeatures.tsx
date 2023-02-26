import { useColorMode } from '@docusaurus/theme-common';
import type { IFeatureItem } from '@site/src/components/HomepageFeatures/FeatureItem';
import { FeatureItem } from '@site/src/components/HomepageFeatures/FeatureItem';
import dependabot from '@site/static/img/dependabot.svg';
import maintenance from '@site/static/img/maintenance.svg';
import maintenanceDark from '@site/static/img/maintenanceDark.svg';
import typescript from '@site/static/img/typescript.svg';
import type { FC } from 'react';
import React from 'react';

import styles from './HomepageFeatures.module.css';

export const HomepageFeatures: FC = () => {
    const { isDarkTheme } = useColorMode();

    const FeatureList: Array<IFeatureItem> = [
        {
            Svg: typescript,
            description: (
                <>
                    Docusaurus was designed from the ground up to be easily installed and used to get your website up
                    and running quickly.
                </>
            ),
            title: 'IntelliSense IDE integration',
        },
        {
            Svg: isDarkTheme ? maintenanceDark : maintenance,
            description: (
                <>
                    Latest dependencies of the IDnow <a href="https://github.com/idnow/de.idnow.ios">iOS</a> and{' '}
                    <a href="https://github.com/idnow/de.idnow.android">Android</a> SDKs. Secured by Dependabot.
                </>
            ),
            title: 'Always up to date',
        },
        {
            Svg: dependabot,
            description: (
                <>
                    Strong type declarations are included in this package. There isn&apos;t a single <code>any</code>.
                </>
            ),
            title: 'First class TypeScript support',
        },
    ];

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
