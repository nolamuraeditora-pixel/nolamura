
import React from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
    videos: Video[];
    onVideoSelect: (video: Video) => void;
    isAutoplayEnabled: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoSelect, isAutoplayEnabled }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {videos.map((video) => (
                <div key={video.id} className="rounded-xl overflow-hidden cursor-pointer" onClick={() => onVideoSelect(video)}>
                    <VideoCard video={video} isAutoplayEnabled={isAutoplayEnabled} />
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;