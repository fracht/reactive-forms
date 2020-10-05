import React, { useCallback, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';

import styles from './CopyButton.module.scss';

const DEFAULT_ANIMATION_DURATION = 3000;

type CopyButtonProps = {
    text: string;
    className?: string;
    copiedIcon?: React.ReactNode;
    animationDuration?: number;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export const CopyButton: React.FC<CopyButtonProps> = ({
    text,
    className,
    children,
    copiedIcon,
    animationDuration,
    ...other
}) => {
    const [copied, setCopied] = useState(false);

    const timeout = React.useRef<NodeJS.Timeout | null>(null);

    const clearCurrentTimeout = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
    }, []);

    const copyText = useCallback(() => {
        clearCurrentTimeout();
        copy(text);
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), animationDuration ?? DEFAULT_ANIMATION_DURATION);
    }, [clearCurrentTimeout, text, animationDuration]);

    return (
        <Tooltip title={copied ? 'Copied!' : 'Click to copy'}>
            <div
                onClick={copyText}
                className={classNames(
                    styles['copy-button'],
                    {
                        [styles['copy-button_copied']]: copied
                    },
                    className
                )}
                {...other}
            >
                <span className={styles['copy-button__icon']}>{children}</span>
                <span className={styles['copy-button__copied-icon']}>{copiedIcon ?? '🤘'}</span>
            </div>
        </Tooltip>
    );
};
