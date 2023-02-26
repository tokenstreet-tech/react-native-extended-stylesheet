import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures/HomepageFeatures';
import { HomepageHeader } from '@site/src/components/HomepageHeader/HomepageHeader';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import React from 'react';

export default function Home(): ReactElement {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title={siteConfig.title} description={siteConfig.tagline}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
