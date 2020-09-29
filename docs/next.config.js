/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const remarkPlugins = [
    require('remark-slug'),
    [
        require('remark-toc'),
        {
            skip: 'Reference',
            maxDepth: 6
        }
    ]
];

module.exports = {
    assetPrefix: isProd ? '/morfix/' : undefined,
    pageExtensions: ['tsx', 'mdx', 'md'],
    webpack: (config, { defaultLoaders }) => {
        config.module.rules.push({
            test: /.mdx?$/,
            use: [
                defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        remarkPlugins
                    }
                },
                path.join(__dirname, './src/utils/md-loader')
            ]
        });
        return config;
    }
};
