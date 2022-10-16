import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import Spinner from '../components/Spinner'
import { HomePageVideos } from '../interfaces/types'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'

const Home = () => {
    const dispatch = useAppDispatch()
    const videos = useAppSelector(state => state.youtubeApp.videos)
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));

    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearVideos())
        }

    }, [dispatch])

    useEffect(() => {
        dispatch(getHomePageVideos(false))
    }, [])
    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: '7.5vh' }}>
                <NavBar isDesktop={width > breakpoint} />
            </div>

            <div className="flex items-center w-full justify-center" style={{ height: '92.5vh' }}>
                {
                    width > breakpoint && <SideBar />
                }
                {videos.length ? (
                    <InfiniteScroll

                        dataLength={videos.length}
                        next={() => dispatch(getHomePageVideos(true))}
                        hasMore={videos.length < 500}
                        loader={<Spinner />}
                        height={650}
                    >
                        <div className="grid gap-y-14 gap-x-8 lg:grid-cols-4 p-8 md:grid-cols-3">
                            {videos.map((item: HomePageVideos) => {
                                return <Card data={item} key={item.videoId + Math.random()} />;
                            })}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <Spinner />
                )}
            </div>

        </div>

    )
}

export default Home