import React, { useCallback, useState } from 'react';
import { Icon, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';

import { HeadingLevel } from './Heading';

import styles from './Anchor.module.scss';

interface AnchorProps {
    id: string;
    level: HeadingLevel;
    className?: string;
}

const ANIMATION_DURATION_MS = 3000;

const Anchor: React.FC<AnchorProps> = ({ level, id, className }) => {
    const [copied, setCopied] = useState(false);

    const timeout = React.useRef<NodeJS.Timeout | null>(null);

    const clearCurrentTimeout = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
    }, []);

    const copyLink = useCallback(() => {
        clearCurrentTimeout();
        copy(`${window.location.origin}${window.location.pathname}#${id}`);
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), ANIMATION_DURATION_MS);
    }, [clearCurrentTimeout, id]);

    return (
        <Tooltip title={copied ? 'Link copied!' : 'Copy link'}>
            <span
                onClick={copyLink}
                className={classNames(
                    styles['anchor'],
                    {
                        [styles['anchor_copied']]: copied
                    },
                    className,
                    'anchor'
                )}
                data-id={id}
                data-level={level}
            >
                <span className={styles['anchor__copied-icon']} role="img" aria-label="sign of the horns">
                    🤘
                </span>
                <Icon className={styles['anchor__icon']}>link</Icon>
            </span>
        </Tooltip>
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
