import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'

const Home = () => {
    const dispatch = useAppDispatch()
    const videos = useAppSelector(state => state.youtubeApp.videos)
    useEffect(() => {
        dispatch(getHomePageVideos(false))


    }, [])
    console.log("videos ", videos);
    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }}>
                <NavBar />
            </div>

            <div className="flex" style={{ height: '92.5vh' }}>
                <SideBar />
            </div>
            {JSON.stringify(videos, null, 4)}
        </div>

    )
}

export default Home