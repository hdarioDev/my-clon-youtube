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
    }, [dispatch])
    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }}>
                <NavBar />
            </div>

            <div className="flex" style={{ height: '92.5vh' }}>
                <SideBar />
            </div>
        </div>

    )
}

export default Home