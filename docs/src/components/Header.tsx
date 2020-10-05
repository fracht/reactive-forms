import React from 'react';
import { Container, Divider, Hidden, Icon, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';

import GithubLogo from '../images/github-logo.svg';

import styles from './Header.module.scss';

interface HeaderProps {
    openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
    const { push } = useRouter();

    const goToMainPage = React.useCallback(() => push('/'), [push]);

    const theme = useTheme();

    return (
        <header className={styles['header']}>
            <Container maxWidth="lg">
                <div className={styles['header-content']}>
                    <div className={styles['flex-center']}>
                        <Hidden smUp>
                            <IconButton onClick={openDrawer} className={styles['hamburger']} size="small">
                                <Icon fontSize="small">menu</Icon>
                            </IconButton>
                        </Hidden>
                        <Typography
                            style={{ cursor: 'pointer', lineHeight: 'inherit' }}
                            onClick={goToMainPage}
                            variant="h6"
                        >
                            Morfix
                        </Typography>
                        <span style={{ color: theme.palette.primary.dark }} className={styles['version']}>
                            v0.1.0
                        </span>
                    </div>
                    <Tooltip title="View github repository">
                        <a
                            className={styles['github']}
                            href="https://github.com/ArtiomTr/morfix"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <img className={styles['github-logo']} src={GithubLogo} alt="Github logo" />
                        </a>
                    </Tooltip>
                </div>
            </Container>
            <Divider />
        </header>
    );
};

export default Header;
