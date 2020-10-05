import React, { useCallback } from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import { useRouter } from 'next/router';

interface LinkProps {
    href: string;
}

export const Link: React.FC<LinkProps> = ({ href, children }) => {
    const { push } = useRouter();

    const onClick = useCallback(() => {
        push(href);
    }, [href, push]);

    return (
        <MaterialLink underline="none" onClick={onClick}>
            {children}
        </MaterialLink>
    );
};
