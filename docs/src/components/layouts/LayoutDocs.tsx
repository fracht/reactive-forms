import React from 'react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';

import { Toc } from 'src/components/Toc';
import { LayoutProps } from './LayoutProps';
import { DocsFooter } from '../DocsFooter';

import styles from './LayoutDocs.module.scss';

export const LayoutDocs: React.FC<LayoutProps> = ({ children, meta }) => {
    return (
        <div className={styles['docs']}>
            <div className={styles['docs-content']}>
                <Tooltip title="Edit this page">
                    <IconButton className={styles['edit-button']}>
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                {children}
                <DocsFooter />
            </div>
            <div className={styles['docs-toc']}>
                <Toc />
            </div>
        </div>
    );
};
