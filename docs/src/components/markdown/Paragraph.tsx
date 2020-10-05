import React from 'react';
import { Typography } from '@material-ui/core';

export const Paragraph: React.FC = ({ children }) => (
    <Typography paragraph variant="body1">
        {children}
    </Typography>
);
