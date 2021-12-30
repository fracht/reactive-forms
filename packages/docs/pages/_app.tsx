import React from 'react';
import { Container, Hidden, MuiThemeProvider } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { DrawerNav } from 'src/components/DrawerNav';
import { materialComponents } from 'src/components/markdown';
import indexes from '../indexes/pages.json';
import Header from '../src/components/Header';
import { Nav } from '../src/components/Nav';
import { theme } from '../src/constants/theme';

import '../css/globals.css';
import styles from './App.module.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const handleOpenRef = React.useRef(() => {
        /* default value is empty */
    });

    return (
        <MuiThemeProvider theme={theme}>
            <MDXProvider components={materialComponents}>
                <Header openDrawer={() => handleOpenRef.current()} />
                <Container maxWidth="lg">
                    <div className={styles['app-content']}>
                        <Hidden xsDown>
                            <Nav pageMetas={indexes.children} />
                        </Hidden>
                        <Hidden smUp>
                            <DrawerNav handleOpenRef={handleOpenRef} pageMetas={indexes.children} />
                        </Hidden>
                        <Component {...pageProps} />
                    </div>
                </Container>
            </MDXProvider>
        </MuiThemeProvider>
    );
};

export default MyApp;
