/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const withOptimizedImages = require('next-optimized-images');

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

module.exports = withOptimizedImages({
    assetPrefix: isProd ? '/morfix/' : undefined,
    basePath: isProd ? '/morfix' : undefined,
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
});
