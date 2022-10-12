import React, {FC} from 'react';

interface TrackProgressProps {
    left: number
    right: number
    width: number
    onChange?: (e) => void
}

const TrackProgress: FC<TrackProgressProps> = ({left, right, onChange, width}) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
                style={{display: 'block', width}}
            />
            <div style={{marginLeft: '15px', whiteSpace: 'nowrap', width: '70px'}}>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;