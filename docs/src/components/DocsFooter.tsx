import React from 'react';
import { Button, Divider, Icon } from '@material-ui/core';

import styles from './DocsFooter.module.scss';

export const DocsFooter = () => {
    return (
        <div className={styles['footer']}>
            <Divider />
            <div className={styles['footer__nav-buttons']}>
                <Button variant="outlined" color="primary" startIcon={<Icon>chevron_left</Icon>}>
                    Prev
                </Button>
                <Button variant="outlined" color="primary" startIcon={<Icon>chevron_right</Icon>}>
                    Next
                </Button>
            </div>
            <Divider />
        </div>
    );
};
