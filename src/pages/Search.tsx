import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "../components/SearchCard";
import Navbar from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import Spinner from "../components/Spinner";
import { clearVideos } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { HomePageVideos } from "../interfaces/types";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));

    }, []);


    useEffect(() => {
        dispatch(clearVideos());
        if (searchTerm === "") navigate("/");
        else {
            dispatch(getSearchPageVideos(false));
        }
    }, [dispatch, navigate, searchTerm]);

    return (
        <div className="max-h-screen overflow-hidden">
            <div style={{ height: "7.5vh" }}>
                <Navbar isDesktop={width > breakpoint} />
            </div>
            <div className="flex" style={{ height: "92.5vh" }}>
                <SideBar />
                {videos.length ? (
                    <div className="py-8 pl-8 flex flex-col gap-5 w-full">
                        <InfiniteScroll
                            dataLength={videos.length}
                            next={() => dispatch(getSearchPageVideos(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={600}
                        >
                            {videos.map((item: HomePageVideos) => {
                                return (
                                    <div className="my-5">
                                        <SearchCard data={item} key={item.videoId} />
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </div>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}

export default Search