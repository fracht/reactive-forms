import React from 'react';
import classNames from 'classnames';

import { useToc } from './useToc';

import styles from './Toc.module.scss';

export const Toc = () => {
    const [tocHeadings, activeIndex] = useToc();

    return (
        <div className={styles['toc']}>
            <h5 className={styles['toc__heading']}>Contents</h5>
            {tocHeadings.map((heading, index) => (
                <a
                    key={heading.id}
                    style={{ paddingLeft: (heading.level - 1) * 15 }}
                    className={classNames(styles['toc__link'], {
                        [styles['toc__link_active']]: index === activeIndex
                    })}
                    href={`#${heading.id}`}
                >
                    {heading.title}
                </a>
            ))}
        </div>
    );
};
