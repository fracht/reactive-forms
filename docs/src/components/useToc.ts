import { useEffect, useLayoutEffect, useState } from 'react';

import { AnchorMeta, getAllAnchors } from './markdown/Anchor';
import { useScrollY } from './useScrollY';

export const useToc = (): [AnchorMeta[], number] => {
    const [anchors, setAnchors] = useState<AnchorMeta[]>([]);
    const [activeAnchor, setActiveAnchor] = useState(0);

    const scrollY = useScrollY();

    useLayoutEffect(() => {
        setAnchors(getAllAnchors());
    }, []);

    useEffect(() => {
        const foundTopIndex = anchors.findIndex(
            (meta, index) => scrollY > meta.yOffset && scrollY < (anchors[index + 1]?.yOffset ?? Infinity)
        );
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight;
        const scrollBottomY = windowHeight + scrollY;
        const foundBottomIndex = anchors.findIndex(
            (meta, index) =>
                windowHeight > bodyHeight - meta.yOffset &&
                scrollBottomY > meta.yOffset &&
                scrollBottomY < (anchors[index + 1]?.yOffset ?? Infinity)
        );

        setActiveAnchor(foundBottomIndex === -1 ? (foundTopIndex === -1 ? 0 : foundTopIndex) : foundBottomIndex);
    }, [scrollY, anchors]);

    return [anchors, activeAnchor];
};
