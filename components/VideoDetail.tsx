import React, { useState } from 'react';
import { Video } from '../types';
import { ICONS } from '../constants';

interface VideoDetailProps {
    video: Video;
    onGoBack: () => void;
    t: (key: string) => string;
    isInPlaylist: boolean;
    onTogglePlaylist: (video: Video) => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ video, onGoBack, t, isInPlaylist, onTogglePlaylist }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const handleShare = () => {
        const shareUrl = window.location.href; // In a real app, this would be a dedicated video URL
        navigator.clipboard.writeText(shareUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    };

    const DESCRIPTION_CHAR_LIMIT = 150;
    const isDescriptionLong = video.description.length > DESCRIPTION_CHAR_LIMIT;

    const descriptionText = isDescriptionLong && !isDescriptionExpanded
        ? `${video.description.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
        : video.description;

    return (
        <div className="p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-dark-text">
            <button
                onClick={onGoBack}
                className="mb-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                {React.cloneElement(ICONS.chevronLeft, { className: "w-4 h-4" })}
                <span>{t('backToGrid')}</span>
            </button>
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                    <video
                        src={video.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        poster={video.thumbnailUrl}
                    />
                </div>
                
                <div>
                    <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
                    <div className="text-gray-600 dark:text-dark-text-secondary mb-6">
                        <p className="whitespace-pre-wrap">{descriptionText}</p>
                        {isDescriptionLong && (
                            <button 
                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                className="font-semibold text-indigo-500 hover:underline mt-2 text-sm"
                            >
                                {isDescriptionExpanded ? t('showLess') : t('showMore')}
                            </button>
                        )}
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">{t('gallery')}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                        {[...Array(10)].map((_, i) => (
                             <img key={i} src={`https://picsum.photos/seed/${video.id + i + 1}/200/200`} alt={`Gallery image ${i+1}`} className="rounded-lg object-cover w-full h-full aspect-square" loading="lazy" />
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-dark-surface p-6 rounded-2xl">
                    <p className="text-3xl font-bold text-center mb-1">${video.price.toFixed(2)}</p>
                    <p className="text-sm text-center text-gray-600 dark:text-dark-text-secondary mb-4">{t('oneTimePurchase')}</p>
                     <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors mb-3">
                        {t('buyPackageNow')}
                    </button>
                    <div className="flex gap-3 mb-3">
                        <button 
                            onClick={() => onTogglePlaylist(video)}
                            className="w-full flex items-center justify-center font-semibold py-3 rounded-xl border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-surface-hover transition-colors"
                        >
                            {React.cloneElement(ICONS.heart, { className: `w-5 h-5 mr-2 transition-colors ${isInPlaylist ? 'fill-red-500 stroke-red-500' : 'fill-none'}`})}
                            <span>{isInPlaylist ? t('removeFromPlaylist') : t('addToPlaylist')}</span>
                        </button>
                        <button 
                            onClick={handleShare}
                            className="w-full flex items-center justify-center font-semibold py-3 rounded-xl border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-surface-hover transition-colors"
                        >
                            {React.cloneElement(ICONS.share, { className: 'w-5 h-5 mr-2'})}
                            <span>{isCopied ? t('copied') : t('share')}</span>
                        </button>
                    </div>
                    <button className="w-full bg-transparent border border-indigo-500 text-indigo-500 font-semibold py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-center">
                        {t('subscribeLong')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;