import { createMuiTheme, darken, fade } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import transitions from '@material-ui/core/styles/transitions';

const palette = createPalette({
    primary: {
        main: '#98C9A3',
        light: '#EDEEC9',
        dark: '#77BFA3'
    }
});

export const theme = createMuiTheme({
    palette,
    typography: {
        fontFamily: "'Epilogue', sans-serif",
        h1: {
            fontSize: '2.9rem',
            fontWeight: 'bold'
        },
        h2: {
            fontSize: '2.4rem',
            fontWeight: 'bold'
        },
        h3: {
            fontSize: '2.2rem',
            fontWeight: 'bold'
        },
        h4: {
            fontSize: '1.9rem',
            fontWeight: 'bold'
        },
        h5: {
            fontSize: '1.7rem',
            fontWeight: 'bold'
        },
        h6: {
            fontSize: '1.5rem',
            fontWeight: 'bold'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 800,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    overrides: {
        MuiIconButton: {
            sizeSmall: {
                padding: 8
            }
        },
        MuiLink: {
            root: {
                cursor: 'pointer',
                color: palette.primary.dark,
                fontWeight: 'bold',
                transition: transitions.create(['color'], { duration: 200 }),
                '&:hover': {
                    color: darken(palette.primary.main, 0.2)
                }
            }
        },
        MuiButton: {
            root: {
                transition: transitions.create(['color', 'background-color', 'box-shadow', 'border'], { duration: 250 })
            },
            text: {
                borderRadius: '0 50px 50px 0',
                borderLeft: '2px solid',
                textTransform: 'initial',
                padding: '4px 32px',
                fontSize: '1rem',
                margin: '5px 0'
            },
            textPrimary: {
                backgroundColor: fade(palette.primary.light, 0.2),
                color: palette.primary.contrastText,
                '&:hover': {
                    color: palette.primary.dark,
                    backgroundColor: fade(palette.primary.light, 0.4)
                },
                '&:active,&.active': {
                    color: palette.primary.dark,
                    backgroundColor: fade(palette.primary.light, 0.6)
                }
            }
        }
    }
});
