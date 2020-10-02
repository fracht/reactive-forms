import React from 'react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Toc } from 'src/components/Toc';
import { LayoutProps } from './LayoutProps';
import { DocsFooter } from '../DocsFooter';

import styles from './LayoutDocs.module.scss';

export const LayoutDocs: React.FC<LayoutProps> = ({ children, meta }) => {
    const { pathname } = useRouter();

    const viewPage = React.useCallback(() => {
        window.open(`https://github.com/ArtiomTr/morfix/tree/master/docs/pages${pathname}.md`, '_blank');
    }, [pathname]);

    return (
        <React.Fragment>
            <Head>
                <title>{meta.title} | Morfix</title>
                <meta name="description" content={meta.description as string} />
            </Head>
            <div className={styles['docs']}>
                <div className={styles['docs-content']}>
                    <Tooltip title="View this page on GitHub">
                        <IconButton onClick={viewPage} className={styles['edit-button']}>
                            <Icon>visibility</Icon>
                        </IconButton>
                    </Tooltip>
                    {children}
                    <DocsFooter />
                </div>
                <div className={styles['docs-toc']}>
                    <Toc />
                </div>
            </div>
        </React.Fragment>
    );
};
