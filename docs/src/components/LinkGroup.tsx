import React, { useState } from 'react';
import { Button, Divider, Icon } from '@material-ui/core';
import classNames from 'classnames';

import { PageMeta } from 'src/types/Pages';
import ButtonLink from './ButtonLink';

import styles from './LinkGroup.module.scss';

interface LinkGroupProps {
    pageMeta: PageMeta;
}

export const LinkGroup: React.FC<LinkGroupProps> = ({ pageMeta }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleGroup = () => setExpanded(!expanded);

    return (
        <div>
            {pageMeta.children ? (
                <React.Fragment>
                    <Button
                        onClick={toggleGroup}
                        color="primary"
                        endIcon={
                            <Icon
                                className={classNames(styles['expand-icon'], {
                                    [styles['expand-icon_expanded']]: expanded
                                })}
                            >
                                expand_more
                            </Icon>
                        }
                    >
                        {pageMeta.title}
                    </Button>
                    {
                        <div
                            className={classNames(styles['group'], {
                                [styles['group_hidden']]: !expanded
                            })}
                        >
                            <Divider flexItem orientation="vertical" />
                            <div className={styles['group__children']}>
                                {pageMeta.children.map((childrenMeta, index) => (
                                    <LinkGroup key={index} pageMeta={childrenMeta} />
                                ))}
                            </div>
                        </div>
                    }
                </React.Fragment>
            ) : (
                <ButtonLink href={pageMeta.href}>{pageMeta.title}</ButtonLink>
            )}
        </div>
    );
};
