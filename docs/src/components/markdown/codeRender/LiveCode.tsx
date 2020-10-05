import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Icon, Tooltip, Typography } from '@material-ui/core';
import * as mrfx from 'morfix';

import { theme } from 'src/constants/prismTheme';
import { CodeSandboxLink } from './CodeSandboxLink';
import { CodeProps } from './types';
import { Link } from '../Link';

import styles from './Code.module.scss';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong...</h1>;
        }

        return this.props.children;
    }
}

const getScope = () => {
    const { default: Morfix, ...oth } = mrfx;

    return {
        Morfix,
        ...oth
    };
};

const LiveEditorHelp = () => (
    <Tooltip
        interactive
        title={
            <div>
                <Typography variant="h6">This is live preview.</Typography>
                <Typography variant="body1">
                    Try editing code and see instant result!{' '}
                    <Link href="/documentation-details#live-preview">Learn more</Link>
                </Typography>
            </div>
        }
    >
        <Icon fontSize="small" className={styles['code__live-icon']} color="inherit">
            whatshot
        </Icon>
    </Tooltip>
);

export const LiveCode = ({ code, meta: { preview, codesandbox } }: CodeProps) => {
    return (
        <ErrorBoundary>
            <LiveProvider
                disabled={!!preview}
                className={styles['main-wrapper']}
                code={code}
                theme={theme}
                language="jsx"
                scope={getScope()}
            >
                <ErrorBoundary>
                    <LivePreview className={styles['preview']} />
                </ErrorBoundary>
                <div className={styles['code-wrapper']}>
                    {!preview && <LiveEditorHelp />}
                    <LiveEditor className={styles['code']} />
                    {codesandbox && typeof codesandbox === 'string' && <CodeSandboxLink link={codesandbox} />}
                </div>
                <LiveError className={styles['error-wrapper']} />
            </LiveProvider>
        </ErrorBoundary>
    );
};

export const isLiveCode = (language: string, meta: Record<string, string | boolean>) =>
    (meta.live || meta.preview) && language === 'jsx';
