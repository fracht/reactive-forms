import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

import codesandboxLogo from 'src/images/codesandbox-logo.svg';

import styles from './CodeSandboxLink.module.scss';

interface CodeSandboxLinkProps {
    link: string;
}

export const CodeSandboxLink = ({ link }: CodeSandboxLinkProps) => (
    <div className={styles['codesandbox']}>
        <Tooltip title="Edit on CodeSandbox">
            <IconButton onClick={() => window.open(link, '_blank')} color="inherit">
                <img src={codesandboxLogo} alt="Edit on CodeSandbox" />
            </IconButton>
        </Tooltip>
    </div>
);
