import React, {useState} from 'react';
import MainLayouts from "../../layouts/MainLayouts";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState('');
    const [audio, setAudio] = useState('');
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()


    const back = () => {
        setActiveStep(prev => prev - 1)
    }
    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(next => next + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('https://spotify-cline-api.onrender.com/tracks', formData)
                .then(res => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    return (
        <MainLayouts title={'Spotify-clone - Загрузить трек'}>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <TextField
                            {...name}
                            label='Название'
                            fullWidth
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 20}}
                            label='Имя автора'
                            fullWidth
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 20}}
                            label='Текст песни'
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <FileUpload setFile={setPicture} accept='image/*'>
                            <Button variant='outlined'>Загрузить обложку</Button>
                        </FileUpload>
                    </Grid>
                }
                {activeStep === 2 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <FileUpload setFile={setAudio} accept='audio/*'>
                            <Button variant='outlined'>Загрузить аудио</Button>
                        </FileUpload>
                    </Grid>
                }
            </StepWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back} variant='outlined'>Назад</Button>
                <Button onClick={next} variant='outlined'>Далее</Button>
            </Grid>
        </MainLayouts>
    );
};

export default Create;