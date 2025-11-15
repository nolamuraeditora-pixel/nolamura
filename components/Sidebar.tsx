import React, { useState } from 'react';
import { User, ModalType, Theme, LanguageCode } from '../types';
import { CATEGORIES, ICONS } from '../constants';
import SettingsPopover from './SettingsPopover';

type DeviceView = 'desktop' | 'smartphone';

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isLoggedIn: boolean;
    user: User | null;
    onOpenModal: (type: ModalType) => void;
    onLogout: () => void;
    onToggleTheme: () => void;
    currentTheme: Theme;
    t: (key: string) => string;
    language: LanguageCode;
    setLanguage: (code: LanguageCode) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string | null;
    onCategorySelect: (categoryKey: string | null) => void;
    isAutoplayEnabled: boolean;
    onToggleAutoplay: () => void;
    deviceView: DeviceView;
    setDeviceView: (view: DeviceView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isCollapsed, onToggleCollapse, isLoggedIn, user, onOpenModal, onLogout, onToggleTheme, currentTheme, t, language, setLanguage,
    searchQuery, onSearchChange, selectedCategory, onCategorySelect, isAutoplayEnabled, onToggleAutoplay,
    deviceView, setDeviceView
}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <aside className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-dark-text-secondary border-r border-gray-200 dark:border-dark-border flex flex-col transition-all duration-300 z-30 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex-1 flex flex-col p-2 space-y-4">
                {/* Logo and Search */}
                <div className={`flex items-center space-x-4 px-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                    <div className="flex-shrink-0">{ICONS.logo}</div>
                    {!isCollapsed && <h1 className="text-xl font-bold text-gray-800 dark:text-dark-text">{t('imagine')}</h1>}
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{ICONS.search}</div>
                    <input
                        type="text"
                        placeholder={isCollapsed ? '' : t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={`w-full bg-gray-200 dark:bg-dark-bg border border-transparent dark:border-dark-border rounded-full py-2 ${isCollapsed ? 'pl-10' : 'pl-10 pr-4'} text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                </div>

                {/* Categories */}
                <nav className="flex-1 space-y-1">
                    {CATEGORIES.map((category) => {
                        if (category.key === 'myPlaylist' && !isLoggedIn) {
                            return null;
                        }
                        return (
                            <button
                                key={category.key}
                                onClick={() => onCategorySelect(category.key === 'home' ? null : category.key)}
                                className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-surface-hover transition-colors text-left ${
                                    (selectedCategory === category.key || (selectedCategory === null && category.key === 'home')) 
                                    ? 'bg-gray-300 dark:bg-dark-surface-hover font-semibold text-gray-900 dark:text-dark-text' 
                                    : ''
                                }`}
                            >
                                {category.key === 'home' ? ICONS.home : category.key === 'myPlaylist' ? ICONS.playlist : ICONS.category}
                                {!isCollapsed && <span>{t(`categories.${category.key}`)}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>
            
            {/* Bottom section */}
            <div className="p-2 border-t border-gray-200 dark:border-dark-border">
                {isLoggedIn && user ? (
                    <div className="relative">
                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-surface-hover ${isCollapsed ? 'justify-center' : ''}`}>
                            <img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            {!isCollapsed && <span className="text-sm font-medium text-gray-800 dark:text-dark-text truncate">{user.name}</span>}
                        </button>
                        {isSettingsOpen && (
                            <div className="absolute bottom-14 left-0 w-64">
                                <SettingsPopover 
                                    isLoggedIn={true} 
                                    user={user} 
                                    onLogout={onLogout} 
                                    onToggleTheme={onToggleTheme} 
                                    currentTheme={currentTheme}
                                    onClose={() => setIsSettingsOpen(false)}
                                    t={t}
                                    language={language}
                                    setLanguage={setLanguage}
                                    isAutoplayEnabled={isAutoplayEnabled}
                                    onToggleAutoplay={onToggleAutoplay}
                                    deviceView={deviceView}
                                    setDeviceView={setDeviceView}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`space-y-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                         <div className="relative">
                           <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="w-full flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-surface-hover justify-center">
                               {ICONS.settings}
                           </button>
                            {isSettingsOpen && (
                            <div className="absolute bottom-12 left-0 w-64">
                                <SettingsPopover 
                                    isLoggedIn={false} 
                                    user={null}
                                    onLogout={() => {}} 
                                    onToggleTheme={onToggleTheme} 
                                    currentTheme={currentTheme}
                                    onClose={() => setIsSettingsOpen(false)}
                                    t={t}
                                    language={language}
                                    setLanguage={setLanguage}
                                    isAutoplayEnabled={isAutoplayEnabled}
                                    onToggleAutoplay={onToggleAutoplay}
                                    deviceView={deviceView}
                                    setDeviceView={setDeviceView}
                                />
                            </div>
                            )}
                        </div>
                        <button onClick={() => onOpenModal(ModalType.SignIn)} className={`w-full text-sm py-2 px-4 rounded-lg ${isCollapsed ? '' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                           {isCollapsed ? t('signIn').charAt(0) : t('signIn')}
                        </button>
                        <button onClick={() => onOpenModal(ModalType.SignUp)} className={`w-full text-sm py-2 px-4 rounded-lg ${isCollapsed ? '' : 'bg-gray-200 dark:bg-dark-surface-hover text-gray-800 dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                           {isCollapsed ? t('signUp').charAt(0) : t('signUp')}
                        </button>
                    </div>
                )}
            </div>
            
            <button onClick={onToggleCollapse} className="absolute -right-3 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-full p-1.5 focus:outline-none hover:bg-gray-200 dark:hover:bg-dark-surface-hover">
                {isCollapsed ? ICONS.chevronRight : ICONS.chevronLeft}
            </button>
        </aside>
    );
};

export default Sidebar;