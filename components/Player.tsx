import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import {Grid, IconButton} from "@mui/material";
import styles from '../styles/Player.module.scss';
import TrackProgress from "./TrackProgress";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../hooks/useTypeSelector";
import React, {useEffect} from "react";

let audio

const Player = () => {
    const track = {_id: 1, name: 'track 1', artist: 'artist 1', text: 'text about track 1', listens: 0, picture: 'https://spotify-cline-api.onrender.com/image/714c6f25-8b44-4022-b606-5e769ff675ab.jpeg', audio: 'https://spotify-cline-api.onrender.com/audio/620c2e0e-9614-4cf0-ac4a-d8906b069ced.mp3', comments: []}
    const {active, duration, volume, pause, currentTime} = useTypeSelector(state => state.player)
    const {playTrack, pauseTrack, setActiveTrack, setDuration, setVolume, setCurrentTime} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        }else {
            setAudio()
            if (pause) {
                playTrack()
            }else {
                pauseTrack()
            }
        }
    }, [active]);

    const setAudio = () => {
        if (active) {
            audio.src = 'https://spotify-cline-api.onrender.com/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        }else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if (!active) return null

    return (
        <div className={styles.player}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <IconButton onClick={play}>
                    {pause
                        ? <PlayArrow/>
                        : <Pause/>
                    }
                </IconButton>
                <img src={'https://spotify-cline-api.onrender.com/' + active?.picture} height={70} width={70} style={{marginLeft: '20px'}}/>
                <Grid container direction='column' style={{marginLeft: '20px', width: '120px'}}>
                    <div style={{fontSize: 18}}>{active?.name}</div>
                    <div style={{fontSize: 12}}>{active?.artist}</div>
                </Grid>
            </div>
            <TrackProgress left={currentTime} right={duration} width={350} onChange={changeCurrentTime}/>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div onClick={() => audio.volume = 0}>
                    <VolumeUp/>
                </div>
                <TrackProgress left={volume} right={100} width={100} onChange={changeVolume}/>
            </div>
        </div>
    );
};

export default Player;