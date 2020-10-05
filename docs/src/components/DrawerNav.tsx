import React from 'react';
import { Drawer } from '@material-ui/core';

import { Nav, NavProps } from './Nav';

import styles from './DrawerNav.module.scss';

interface DrawerNavProps extends NavProps {
    handleOpenRef: React.MutableRefObject<() => void>;
}

export const DrawerNav: React.FC<DrawerNavProps> = ({ handleOpenRef, ...oth }) => {
    const [open, setOpen] = React.useState(false);

    handleOpenRef.current = React.useCallback(() => setOpen(true), [setOpen]);

    return (
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <div className={styles['main-wrapper']}>
                <Nav {...oth} />
            </div>
        </Drawer>
    );
};
