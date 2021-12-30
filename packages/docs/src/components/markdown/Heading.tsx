import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

import Anchor from './Anchor';

import styles from './Heading.module.scss';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
    level?: HeadingLevel;
    id: string;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, id, children }) => (
    <div className={styles['heading-wrapper']}>
        <span id={id} className={styles['offset-anchor']} />
        <Typography className="content" variant={`h${level}` as TypographyProps['variant']}>
            {children}
        </Typography>
        <Anchor className={styles['anchor']} level={level} id={id} />
    </div>
);

export const createHeadingComponent = (level?: 1 | 2 | 3 | 4 | 5 | 6) => {
    return (props: HeadingProps) => <Heading level={level} {...props} />;
};
