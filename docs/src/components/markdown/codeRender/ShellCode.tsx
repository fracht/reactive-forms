import React from 'react';
import { Icon } from '@material-ui/core';

import { CopyButton } from 'src/components/CopyButton';
import { CodeProps } from './types';

import styles from './Code.module.scss';

const shellLanguages = ['bash', 'sh', 'fish'];

export const isShellLanguage = (lang: string) => shellLanguages.includes(lang);

export const ShellCode = ({ code }: CodeProps) => (
    <div className={styles['code-wrapper']}>
        <div className={styles['code']}>
            <pre>{code}</pre>
            <div className={styles['code__copy']}>
                <CopyButton text={code}>
                    <Icon>file_copy</Icon>
                </CopyButton>
            </div>
        </div>
    </div>
);
