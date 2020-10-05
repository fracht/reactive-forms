import React from 'react';
import { Hidden } from '@material-ui/core';
import Head from 'next/head';

import { Toc } from 'src/components/Toc';
import { LayoutProps } from './LayoutProps';
import { DocsFooter } from '../DocsFooter';

import styles from './LayoutDocs.module.scss';

export const LayoutDocs: React.FC<LayoutProps> = ({ children, meta }) => (
    <React.Fragment>
        <Head>
            <title>{meta.title} | Morfix</title>
            <meta name="description" content={meta.description as string} />
        </Head>
        <div className={styles['docs']}>
            <div className={styles['docs-content']}>
                {children}
                <DocsFooter />
            </div>
            <Hidden smDown>
                <div className={styles['docs-toc']}>
                    <Toc />
                </div>
            </Hidden>
        </div>
    </React.Fragment>
);
