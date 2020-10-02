import React from 'react';
import { Button, Divider, Icon } from '@material-ui/core';
import { useRouter } from 'next/router';

import indexes from '../../indexes/pages-map.json';

import styles from './DocsFooter.module.scss';

export const DocsFooter = () => {
    const { pathname, push } = useRouter();

    const currentPage = React.useMemo(
        () =>
            Object.prototype.hasOwnProperty.call(indexes, pathname)
                ? indexes[pathname as keyof typeof indexes]
                : undefined,
        [pathname]
    );

    const nextPage = React.useMemo(
        () => Object.values(indexes).find((value) => value.index === currentPage.index + 1),
        [currentPage]
    );

    const prevPage = React.useMemo(
        () => Object.values(indexes).find((value) => value.index === currentPage.index - 1),
        [currentPage]
    );

    return (
        <div className={styles['footer']}>
            <Divider />
            <div className={styles['footer__nav-buttons']}>
                {prevPage && (
                    <Button
                        variant="outlined"
                        color="primary"
                        className={styles['prev-button']}
                        onClick={() => push(prevPage.href)}
                        startIcon={<Icon>chevron_left</Icon>}
                    >
                        {prevPage.title}
                    </Button>
                )}
                {nextPage && (
                    <Button
                        className={styles['next-button']}
                        variant="outlined"
                        onClick={() => push(nextPage.href)}
                        color="primary"
                        endIcon={<Icon>chevron_right</Icon>}
                    >
                        {nextPage.title}
                    </Button>
                )}
            </div>
            <Divider />
        </div>
    );
};
