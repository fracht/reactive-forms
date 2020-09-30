import React from 'react';

import { LinkGroup } from './LinkGroup';
import { PageMeta } from '../types/Pages';

import styles from './Nav.module.scss';

interface NavProps {
    pageMetas: PageMeta[];
}

export const Nav: React.FC<NavProps> = ({ pageMetas }) => (
    <nav className={styles['navigation']}>
        {pageMetas.map((meta, key) => (
            <LinkGroup pageMeta={meta} key={key} />
        ))}
    </nav>
);
