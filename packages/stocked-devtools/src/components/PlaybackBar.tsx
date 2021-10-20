import { useState } from 'react';
import { IconButton, Slider, Tooltip } from '@mui/material';
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

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    return (
        <div className={clsx(className, classes['playback-bar'])}>
            <div className={classes['playback-bar__buttons']}>
                {isPlaying ? (
                    <Tooltip title="Pause">
                        <IconButton onClick={pause}>
                            <PauseOutline />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Play">
                        <IconButton onClick={play}>
                            <PlayOutline />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <div className={classes['playback-bar__slider']}>
                <Slider
                    valueLabelFormat={(value) => `${value} / 10`}
                    valueLabelDisplay="auto"
                    marks
                    min={0}
                    max={10}
                    size="small"
                />
            </div>
            <div className={classes['playback-bar__']}>
                <IconButton>
                    <TrashOutline />
                </IconButton>
            </div>
        </div>
    );
};
