import React from 'react';
import { Container, MuiThemeProvider } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { materialComponents } from 'src/components/markdown';
import indexes from '../indexes/pages.json';
import Header from '../src/components/Header';
import { Nav } from '../src/components/Nav';
import { theme } from '../src/constants/theme';

import '../css/globals.css';
import styles from './App.module.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <MDXProvider components={materialComponents}>
                <Header />
                <Container maxWidth="lg">
                    <div className={styles['app-content']}>
                        <Nav pageMetas={indexes.children} />
                        <Component {...pageProps} />
                    </div>
                </Container>
            </MDXProvider>
        </MuiThemeProvider>
    );
};

export default MyApp;
