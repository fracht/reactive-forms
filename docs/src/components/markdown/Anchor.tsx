import React from 'react';
import { Icon, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import { HeadingLevel } from './Heading';

interface AnchorProps {
    id: string;
    level: HeadingLevel;
    className?: string;
}

const Anchor: React.FC<AnchorProps> = ({ level, id, className }) => (
    <Tooltip title="Copy link">
        <Icon className={classNames('anchor', className)} data-id={id} data-level={level}>
            link
        </Icon>
    </Tooltip>
);

export interface AnchorMeta {
    id: string;
    yOffset: number;
    level: HeadingLevel;
    title: string;
}

export const getAllAnchors = (): AnchorMeta[] => {
    const anchors = Array.from(document.getElementsByClassName('anchor'));

    return anchors.map((anchor) => ({
        id: anchor.getAttribute('data-id'),
        yOffset: anchor.parentElement.offsetTop,
        level: Number(anchor.getAttribute('data-level')) as HeadingLevel,
        title: anchor.parentElement.getElementsByClassName('content')[0].textContent
    }));
};

export default Anchor;
