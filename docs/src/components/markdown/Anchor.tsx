import React, { useEffect } from 'react';
import { Icon } from '@material-ui/core';
import classNames from 'classnames';

import { HeadingLevel } from './Heading';
import { CopyButton } from '../CopyButton';

import styles from './Anchor.module.scss';

interface AnchorProps {
    id: string;
    level: HeadingLevel;
    className?: string;
}

const Anchor: React.FC<AnchorProps> = ({ level, id, className }) => {
    const [link, setLink] = React.useState('');

    useEffect(() => {
        setLink(`${window.location.origin}${window.location.pathname}#${id}`);
    }, [id]);

    return (
        <CopyButton
            className={classNames(styles['anchor'], className, 'anchor')}
            data-id={id}
            data-level={level}
            text={link}
        >
            <Icon>link</Icon>
        </CopyButton>
    );
};

export interface AnchorMeta {
    id: string;
    yOffset: number;
    level: HeadingLevel;
    title: string;
}

export const getAllAnchors = (): AnchorMeta[] => {
    const anchors = Array.from(document.getElementsByClassName('anchor'));

    return anchors.map((anchor) => ({
        id: anchor.getAttribute('data-id'),
        yOffset: anchor.parentElement.offsetTop,
        level: Number(anchor.getAttribute('data-level')) as HeadingLevel,
        title: anchor.parentElement.getElementsByClassName('content')[0].textContent
    }));
};

export default Anchor;
