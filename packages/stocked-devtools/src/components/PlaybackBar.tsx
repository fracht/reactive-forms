import { useState } from 'react';
import { IconButton, Slider } from '@mui/material';
import clsx from 'clsx';

import { PauseOutline } from './icons/PauseOutline';
import { PlayOutline } from './icons/PlayOutline';
import { TrashOutline } from './icons/TrashOutline';

import classes from './PlaybackBar.module.scss';
export type PlaybackBarProps = {
    className?: string;
};

export const PlaybackBar = ({ className }: PlaybackBarProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className={clsx(className, classes['playback-bar'])}>
            <div>
                <IconButton onClick={() => setIsPlaying((d) => !d)}>
                    {isPlaying ? <PauseOutline /> : <PlayOutline />}
                </IconButton>
            </div>
            <div className={classes['slider-wrapper']}>
                <Slider valueLabelDisplay="auto" marks min={0} max={10} size="small" />
            </div>
            <div>
                <IconButton>
                    <TrashOutline />
                </IconButton>
            </div>
        </div>
    );
};
