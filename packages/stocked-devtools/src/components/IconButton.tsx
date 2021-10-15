import { PropsWithChildren } from 'react';

import classes from './IconButton.module.scss';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ children, ...other }: IconButtonProps) => {
    return (
        <button {...other} className={classes['button']}>
            {children}
        </button>
    );
};
