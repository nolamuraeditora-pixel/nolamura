
import React, { useRef, useEffect, useContext } from 'react';
import { Video } from '../types';
import { ScrollContainerContext } from '../App';

interface VideoCardProps {
    video: Video;
    isAutoplayEnabled: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isAutoplayEnabled }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainer = useContext(ScrollContainerContext);

    useEffect(() => {
        const videoElement = videoRef.current;
        const containerElement = containerRef.current;

        if (!videoElement || !containerElement || !scrollContainer) {
            return;
        }

        const options = {
            root: scrollContainer,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && isAutoplayEnabled) {
                    const playPromise = videoElement.play();
                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            if (error.name !== 'AbortError') {
                                console.warn(`Autoplay was prevented for video: ${video.id}`, error);
                            }
                        });
                    }
                } else {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
            },
            options,
        );

        observer.observe(containerElement);

        return () => {
            observer.disconnect();
        };
    }, [isAutoplayEnabled, video.id, scrollContainer]);

    return (
        <div ref={containerRef} className="relative w-full aspect-[9/16] bg-gray-200 dark:bg-dark-surface rounded-xl overflow-hidden group">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={video.url}
                loop
                muted
                playsInline
                poster={video.thumbnailUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-50"></div>
             <div className="absolute bottom-0 left-0 p-3 text-white w-full">
                <h3 className="font-bold truncate text-sm">{video.title}</h3>
                <p className="text-xs font-semibold text-green-400">${video.price.toFixed(2)}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

export default VideoCard;
