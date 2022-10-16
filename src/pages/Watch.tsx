import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../store/reducers/getVideosDetail";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import WatchCard from "../components/WatchCard";

const Watch = () => {
    const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;
    const [witthDesk, setWitthDesk] = useState(0)
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentPlaying = useAppSelector(
        (state) => state.youtubeApp.currentPlaying
    );
    const recommendedVideos = useAppSelector(
        (state) => state.youtubeApp.recommendedVideos
    );

    useEffect(() => {
        if (id) {
            dispatch(getVideoDetails(id));
            setShowMoreStatus(false);
        } else {
            navigate("/");
        }
    }, [id, navigate, dispatch]);

    useEffect(() => {
        if (currentPlaying && id) dispatch(getRecommendedVideos(id));
    }, [currentPlaying, dispatch, id]);


    return (
        <>
            {currentPlaying && currentPlaying?.videoId === id && (
                <div className="max-h-screen overflow-hidden">
                    <div style={{ height: "7.5vh" }}>
                        <Navbar isDesktop={width > breakpoint} />
                    </div>
                    {/* <div className="flex w-full " > */}
                    <div style={{ height: "92.5vh" }} className="flex bg-slate-600  gap-y-10 gap-x-5 lg:p-7 lg:mx-20 lg:mr-0 w-full overflow-auto">
                        <div style={{ maxWidth: `${width > breakpoint}` ? "800px" : "100vh" }}>
                            <div>
                                <iframe
                                    width={`${width > breakpoint ? "800" : width}px`}
                                    height={`${width > breakpoint ? "502" : "250"}px`}
                                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                                <div className="mt-5 px-1">
                                    <p className="md:text-xl text-sm">{currentPlaying.videoTitle}</p>
                                    <div className="flex justify-between flex-col md:flex-row  mt-1 mb-1">
                                        <div className="text-sm text-gray-400">
                                            <span className="after:content-['•'] after:mx-1">
                                                {currentPlaying.videoViews} views
                                            </span>
                                            <span> {currentPlaying.videoAge} ago</span>
                                        </div>
                                        <div className="flex items-center gap-4 uppercase">
                                            <div className="flex items-center gap-1 cursor-pointer">
                                                <BiLike className="md:text-xl text-base" />
                                                <strong>{currentPlaying.videoLikes}</strong>
                                            </div>
                                            <div className="flex items-center gap-1 cursor-pointer">
                                                <BiDislike className="md:text-xl text-base" />
                                                <strong>dislike</strong>
                                            </div>
                                            <div className="flex items-center gap-1 cursor-pointer">
                                                <FaShare className="md:text-xl text-sm" />
                                                <strong>share</strong>
                                            </div>
                                            {
                                                width > breakpoint && (<>
                                                    <div className="flex items-center gap-1 cursor-pointer">
                                                        <HiScissors className="md:text-xl text-base" />
                                                        <strong>clip</strong>
                                                    </div>
                                                    <div className="flex items-center gap-1 cursor-pointer">
                                                        <MdOutlinePlaylistAdd className="md:text-xl text-base" />
                                                        <strong>save</strong>
                                                    </div>
                                                </>

                                                )
                                            }

                                            <div className="flex items-center gap-1 cursor-pointer">
                                                <BsThreeDots className="md:text-xl text-base" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                                        <div className="flex items-center gap-5 mr-5 mt-4">

                                            <div>
                                                <img
                                                    src={currentPlaying.channelInfo.image}
                                                    alt=""
                                                    className="rounded-full h-12 w-12"
                                                />
                                            </div>

                                            <div className="w-5/6">
                                                <h5 className="text-sm">
                                                    <strong>{currentPlaying.channelInfo.name}</strong>
                                                </h5>
                                                <h6 className="text-gray-400 text-xs">
                                                    {currentPlaying.channelInfo.subscribers} subscribers
                                                </h6>
                                            </div>
                                            {
                                                width > breakpoint && (
                                                    <div>
                                                        <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                                                            subscribe
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div
                                            className={`${!showMoreStatus ? "max-h-16 overflow-hidden" : ""
                                                } text-sm w-11/12`}
                                        >
                                            <pre
                                                style={{
                                                    fontFamily: `"Roboto", sans-serif`,
                                                }}
                                                className="whitespace-pre-wrap"
                                            >
                                                {currentPlaying.videoDescription}
                                            </pre>
                                        </div>
                                        <div>
                                            <button
                                                className="uppercase text-sm cursor-pointer"
                                                onClick={() => setShowMoreStatus(!showMoreStatus)}
                                            >
                                                Show {showMoreStatus ? "less" : "more"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            width > breakpoint && (
                                <div className="mr-24 flex flex-col gap-3">
                                    {getRecommendedVideos.length &&
                                        recommendedVideos.map((item) => {
                                            return <WatchCard data={item} key={item.videoId} />;
                                        })}
                                </div>
                            )
                        }

                    </div>
                </div>
                // </div>
            )}
        </>
    )
}

export default Watch