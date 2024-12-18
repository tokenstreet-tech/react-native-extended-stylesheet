import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import type { FC } from 'react';
import React from 'react';

import styles from './HomepageHeader.module.css';

export const HomepageHeader: FC = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/docs/installation">
                        Getting started
                    </Link>
                </div>
            </div>
        </header>
    );
};
