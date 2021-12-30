import React from 'react';
import { useRouter } from 'next/router';

import { PageMeta } from 'src/types/Pages';
import { LayoutProps } from './LayoutProps';
import pagesMap from '../../../indexes/pages-map.json';

export const LayoutList: React.FC<LayoutProps> = ({ meta }) => {
    const { pathname } = useRouter();

    const childPages = Object.keys(pagesMap)
        .filter((page) => page.indexOf(pathname) !== -1)
        .map((key) => (pagesMap as Record<string, PageMeta>)[key]);

    return (
        <div>
            <h1>{meta.title}</h1>
            {childPages.map((child, index) => (
                <div key={index}>{child.title}</div>
            ))}
        </div>
    );
};
