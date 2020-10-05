import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import { theme } from 'src/constants/prismTheme';
import { CodeSandboxLink } from './CodeSandboxLink';
import { CodeProps } from './types';

import styles from './Code.module.scss';

export const DefaultCode = ({ code, language, meta: { codesandbox } }: CodeProps) => (
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
        {codesandbox && typeof codesandbox === 'string' && <CodeSandboxLink link={codesandbox} />}
    </div>
);
