import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface ButtonLinkProps {
    href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children }) => {
    const { push, pathname } = useRouter();

    const handleClick = useCallback(() => {
        push(href);
    }, [href, push]);

    return (
        <Button
            color="primary"
            className={classNames({
                active: pathname === href
            })}
            onClick={handleClick}
        >
            {children}
        </Button>
    );
};

export default ButtonLink;
