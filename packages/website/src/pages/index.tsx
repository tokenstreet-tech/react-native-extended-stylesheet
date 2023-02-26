import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageFeatures } from '@site/src/components/HomepageFeatures/HomepageFeatures';
import { HomepageHeader } from '@site/src/components/HomepageHeader/HomepageHeader';
import Layout from '@theme/Layout';
import type { FC } from 'react';
import React from 'react';

const Home: FC = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout description={siteConfig.tagline} title={siteConfig.title}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
};

export default Home;
