import type { IFeatureItem } from '@site/src/components/HomepageFeatures/FeatureItem';
import { FeatureItem } from '@site/src/components/HomepageFeatures/FeatureItem';
import type { FC } from 'react';
import React from 'react';

import styles from './HomepageFeatures.module.css';

const FeatureList: Array<IFeatureItem> = [
    {
        title: 'Easy to Use',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and used to get your website up and
                running quickly.
            </>
        ),
    },
    {
        title: 'Focus on What Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your docs into
                the <code>docs</code> directory.
            </>
        ),
    },
    {
        title: 'Powered by React',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the
                same header and footer.
            </>
        ),
    },
];

export const HomepageFeatures: FC = () => (
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
