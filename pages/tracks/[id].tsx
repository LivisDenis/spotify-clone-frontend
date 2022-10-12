import MainLayouts from "../../layouts/MainLayouts";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useState} from "react";
import {ITrack} from "../../types/track";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";

const TrackPage = ({serverTrack}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('https://spotify-cline-api.onrender.com/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id,
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayouts
            title={'Spotify-clone - ' + track.name}
            keywords={`${track.name}, ${track.artist}`}
        >
            <Button variant='outlined' onClick={() => router.push('/tracks')}>К списку</Button>
            <Grid container style={{marginTop: 50}}>
                <img src={'http://localhost:5000/' + track.picture} height={150} width={150}/>
                <div style={{marginLeft: 35}}>
                    <h1>{track.name}</h1>
                    <div>Автор - {track.artist}</div>
                    <div>Прослушиваний - {track.listens}</div>
                </div>
            </Grid>
            <div>
                <h1>Текст</h1>
                <p>{track.text}</p>
            </div>
            <Grid style={{marginTop: 40}}>
                <TextField
                    {...username}
                    label='Ваше имя'
                    fullWidth
                />
                <TextField
                    {...text}
                    label='Комментарий'
                    style={{marginTop: 25}}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button
                    onClick={addComment}
                    style={{marginTop: 25}}
                    variant='outlined'
                >
                    Отправить
                </Button>
            </Grid>
            <div style={{marginTop: 40}}>
                {track.comments.map(comment =>
                    <div key={comment._id} style={{marginTop: 25}}>
                        <div>{comment.username}</div>
                        <p>{comment.text}</p>
                    </div>
                )}
            </div>
        </MainLayouts>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        },
    }
}