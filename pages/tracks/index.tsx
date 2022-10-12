import MainLayouts from "../../layouts/MainLayouts";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import * as React from 'react';
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTracks} from "../../store/action-creators/track";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useState} from "react";
import {useDispatch} from "react-redux";

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypeSelector(state => state.tracks)
    const [query, setQuery] = useState('')
    const dispatch = useDispatch() as NextThunkDispatch
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    if (error) {
        return <MainLayouts>
                <h1>{error}</h1>
            </MainLayouts>

    }

    return (
        <MainLayouts title={'Spotify-clone - Список треков'}>
                <Grid container justifyContent='center'>
                    <Card style={{width: 900}}>
                        <Box p={3}>
                            <Grid container justifyContent='space-between'>
                                <h1>Список треков</h1>
                                <Button onClick={() => router.push('/tracks/create')}>
                                    Загрузить
                                </Button>
                            </Grid>
                        </Box>
                        <hr/>
                        <TextField
                            value={query}
                            onChange={search}
                            label='Поиск'
                            fullWidth
                        />
                        <hr/>
                        <TrackList tracks={tracks}/>
                    </Card>
                </Grid>
        </MainLayouts>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps( async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch( await fetchTracks());
});