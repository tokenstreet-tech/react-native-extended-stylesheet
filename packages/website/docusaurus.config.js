/*
 * @ts-check
 * Note: type annotations allow type checking and IDEs autocompletion
 */

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const injectTypeDocSidebar = (items) =>
    items.map((item) => {
        if (item.link?.id === 'api/index') {
            return {
                ...item,
                items: require('./docs/api/typedoc-sidebar.cjs'),
            };
        }
        return item;
    });

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'React Native Extended StyleSheet',
    tagline:
        'Drop-in replacement of React Native StyleSheet with media-queries, variables, dynamic themes, relative units, percents, math operations, scaling and other styling stuff.',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://tokenstreet-tech.github.io',
    /*
     * Set the /<baseUrl>/ pathname under which your site is served
     * For GitHub pages deployment, it is often '/<projectName>/'
     */
    baseUrl: '/react-native-extended-stylesheet/',

    /*
     * GitHub pages deployment config.
     * If you aren't using GitHub pages, you don't need these.
     */
    organizationName: 'tokenstreet-tech', // Usually your GitHub org/user name.
    projectName: 'react-native-extended-stylesheet', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    /*
     * Even if you don't use internalization, you can use this field to set useful
     * metadata like html lang. For example, if your site is Chinese, you may want
     * to replace "en" with "zh-Hans".
     */
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    /*
                     * Please change this to your repo.
                     * Remove this to remove the "edit this page" links.
                     */
                    editUrl:
                        'https://github.com/tokenstreet-tech/react-native-extended-stylesheet/tree/main/packages/website/',
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    sidebarItemsGenerator: async ({ defaultSidebarItemsGenerator, ...args }) =>
                        injectTypeDocSidebar(await defaultSidebarItemsGenerator(args)),
                },
                blog: {
                    showReadingTime: true,
                    /*
                     * Please change this to your repo.
                     * Remove this to remove the "edit this page" links.
                     */
                    editUrl:
                        'https://github.com/tokenstreet-tech/react-native-extended-stylesheet/tree/main/packages/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'React Native Extended StyleSheet',
                logo: { alt: 'tokenstreet Logo', src: 'img/logo.svg', srcDark: 'img/logoDark.svg' },
                items: [
                    { type: 'doc', docId: 'installation', position: 'left', label: 'Docs' },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        href: 'https://github.com/tokenstreet-tech/react-native-extended-stylesheet',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [],
                    },
                    {
                        title: 'Company',
                        items: [
                            { label: 'Website', href: 'https://en.tokenstreet.com/' },
                            { label: 'Career', href: 'https://en.tokenstreet.com/career' },
                            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tokenstreet-com/' },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            { label: 'Blog', to: '/blog' },
                            { label: 'Medium', href: 'https://medium.com/tokenstreet-tech' },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/tokenstreet-tech/react-native-extended-stylesheet',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} tokenstreet GmbH`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
    plugins: [
        [
            'docusaurus-plugin-typedoc',
            {
                // Plugin options
                entryPoints: ['../core/src/index.ts'],
                tsconfig: '../core/tsconfig.json',
                sidebar: {
                    position: 4,
                },
                entryFileName: 'index',

                // TypeDoc options
                excludePrivate: true,
            },
        ],
    ],
};

module.exports = config;
