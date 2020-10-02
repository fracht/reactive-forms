import React from 'react';
import { CodeProps } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';

export const Code: React.FC<CodeProps> = ({ children }) => {
    return (
        <Highlight {...defaultProps} theme={theme} code={children} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
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
    );
};
