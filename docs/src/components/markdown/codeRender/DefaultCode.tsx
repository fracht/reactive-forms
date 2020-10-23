import React from 'react';
import { Icon } from '@material-ui/core';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import { CopyButton } from 'src/components/CopyButton';
import { theme } from 'src/constants/prismTheme';
import { CodeSandboxLink } from './CodeSandboxLink';
import { CodeProps } from './types';

import styles from './Code.module.scss';

export const DefaultCode = ({ code, language, meta: { codesandbox, copy } }: CodeProps) => (
    <div className={styles['code-wrapper']}>
        <Highlight {...defaultProps} theme={theme} code={code} language={language as Language}>
            {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre className={styles['code']} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line })} key={i}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token })} key={key} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
        {copy && (
            <div className={styles['code__copy']}>
                <CopyButton text={code}>
                    <Icon>file_copy</Icon>
                </CopyButton>
            </div>
        )}
        {codesandbox && typeof codesandbox === 'string' && <CodeSandboxLink link={codesandbox} />}
    </div>
);
