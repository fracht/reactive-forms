import { useState } from 'react';
import { PauseOutline, PlayOutline, PlaySkipBackOutline, PlaySkipForwardOutline, TrashOutline } from 'react-ionicons';
import clsx from 'clsx';

import { IconButton } from './IconButton';

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
                {/* <PlaySkipBackOutline />
                <PlaySkipForwardOutline /> */}
            </div>
            <div className={classes['slider-wrapper']}>
                <input
                    style={{
                        width: '100%'
                    }}
                    className={classes['slider']}
                    min={0}
                    max={10}
                    type="range"
                />
            </div>
            <div>
                <TrashOutline />
            </div>
        </div>
    );
};
