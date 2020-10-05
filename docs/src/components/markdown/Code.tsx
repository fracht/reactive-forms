import React from 'react';
import { CodeProps as MDXCodeProps } from '@mdx-js/react';

import { DefaultCode } from './codeRender/DefaultCode';
import { isLiveCode, LiveCode } from './codeRender/LiveCode';
import { isShellLanguage, ShellCode } from './codeRender/ShellCode';
import { CodeProps } from './codeRender/types';

export const Code = (props: MDXCodeProps) => {
    const { children, className, metastring, ...other } = props;

    const language = className?.replace('language-', '');

    const normalizedProps: CodeProps = {
        code: children.trim(),
        metastring,
        language,
        meta: other
    };

    let CodeComponent: React.ComponentType<CodeProps> = DefaultCode;

    if (isShellLanguage(language)) {
        CodeComponent = ShellCode;
    }

    if (isLiveCode(language, normalizedProps.meta)) {
        CodeComponent = LiveCode;
    }

    return <CodeComponent {...normalizedProps} />;
};
