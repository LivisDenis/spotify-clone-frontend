import React, {FC} from 'react';
import NavBar from "../components/NavBar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    title?: string
    keywords?: string
    description?: string
    children?: React.ReactNode | React.ReactChild
}

const MainLayouts: FC<MainLayoutProps> = ({children, title, keywords, description}) => {
    return (
        <>
            <Head>
                <title>{title || 'Spotify-clone'}</title>
                <meta name='description' content={'Лучшие треки всегда тут' || description}/>
                <meta name='keywords' content={keywords || 'Музыка, треки, альбомы'}/>
                <meta name='robots' content='index, follow'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>
            <NavBar/>
            <Container style={{marginBottom: 100}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayouts;