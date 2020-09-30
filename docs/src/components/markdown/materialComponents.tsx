import { Components } from '@mdx-js/react';

import { createHeadingComponent } from './Heading';
import { Link } from './Link';
import { Paragraph } from './Paragraph';

export const materialComponents: Components = {
    a: Link,
    h1: createHeadingComponent(1),
    h2: createHeadingComponent(2),
    h3: createHeadingComponent(3),
    h4: createHeadingComponent(4),
    h5: createHeadingComponent(5),
    h6: createHeadingComponent(6),
    p: Paragraph
};
