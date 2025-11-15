import React, { useState } from 'react';
import { User, Theme, LanguageCode } from '../types';
import { ICONS, LANGUAGES } from '../constants';

type DeviceView = 'desktop' | 'smartphone';

interface SettingsPopoverProps {
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    onToggleTheme: () => void;
    currentTheme: Theme;
    onClose: () => void;
    t: (key: string) => string;
    language: LanguageCode;
    setLanguage: (code: LanguageCode) => void;
    isAutoplayEnabled: boolean;
    onToggleAutoplay: () => void;
    deviceView: DeviceView;
    setDeviceView: (view: DeviceView) => void;
}

const SettingsPopover: React.FC<SettingsPopoverProps> = ({ 
    isLoggedIn, user, onLogout, onToggleTheme, currentTheme, onClose, t, language, setLanguage,
    isAutoplayEnabled, onToggleAutoplay, deviceView, setDeviceView
}) => {
    const [showLanguages, setShowLanguages] = useState(false);
    const currentLanguageName = LANGUAGES.find(l => l.code === language)?.name || 'English';

    const handleLanguageSelect = (code: LanguageCode) => {
        setLanguage(code);
        setShowLanguages(false);
    }

    return (
        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-dark-border p-2 w-64 text-gray-800 dark:text-dark-text">
            {isLoggedIn && user && (
                <div className="p-2 border-b border-gray-200 dark:border-dark-border mb-2">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{user.email}</p>
                </div>
            )}

            {showLanguages ? (
                <div>
                    <button onClick={() => setShowLanguages(false)} className="w-full text-left p-2 mb-2 flex items-center space-x-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-hover">
                       {React.cloneElement(ICONS.chevronLeft, { className: 'w-4 h-4' })}
                        <span>{t('settingsPopover.language')}</span>
                    </button>
                    <div className="max-h-32 overflow-y-auto">
                    {LANGUAGES.map(lang => (
                        <button 
                          key={lang.code} 
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-hover ${language === lang.code ? 'font-bold text-indigo-600' : ''}`}
                        >
                          {lang.name}
                        </button>
                    ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="p-2">
                        <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">{t('settingsPopover.appearance')}</p>
                        <div className="flex items-center justify-around bg-gray-100 dark:bg-dark-bg p-1 rounded-lg">
                            <button onClick={onToggleTheme} className={`p-1.5 rounded-md ${currentTheme === Theme.Light ? 'bg-white dark:bg-dark-surface' : ''}`}>{ICONS.sun}</button>
                            <button onClick={onToggleTheme} className={`p-1.5 rounded-md ${currentTheme === Theme.Dark ? 'bg-white dark:bg-dark-surface' : ''}`}>{ICONS.moon}</button>
                        </div>
                    </div>
                     <div className="p-2">
                        <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">{t('settingsPopover.viewFormat')}</p>
                        <div className="flex items-center justify-around bg-gray-100 dark:bg-dark-bg p-1 rounded-lg">
                            <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded-md ${deviceView === 'desktop' ? 'bg-white dark:bg-dark-surface' : ''}`}>{ICONS.desktop}</button>
                            <button onClick={() => setDeviceView('smartphone')} className={`p-1.5 rounded-md ${deviceView === 'smartphone' ? 'bg-white dark:bg-dark-surface' : ''}`}>{ICONS.smartphone}</button>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm">{t('settingsPopover.autoplay')}</p>
                            <button
                                onClick={onToggleAutoplay}
                                aria-pressed={isAutoplayEnabled}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-surface ${
                                    isAutoplayEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-dark-bg'
                                }`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                                        isAutoplayEnabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                    <button onClick={() => setShowLanguages(true)} className="w-full text-left flex items-center justify-between p-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-hover">
                        <span>{t('settingsPopover.language')}</span>
                        <span className="flex items-center space-x-1 text-gray-500 dark:text-dark-text-secondary">
                          <span>{currentLanguageName}</span>
                          {ICONS.chevronRight}
                        </span>
                    </button>

                    {isLoggedIn && (
                        <>
                            <div className="my-2 border-t border-gray-200 dark:border-dark-border"></div>
                            <div className="p-2">
                                <p className="text-sm font-semibold mb-2">{t('settingsPopover.subscribeTitle')}</p>
                                <p className="text-xs text-gray-500 dark:text-dark-text-secondary mb-3">{t('settingsPopover.subscribeDescription')}</p>
                                <button className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700">
                                    {t('settingsPopover.subscribeButtonAnnual')}
                                </button>
                            </div>
                            <div className="my-2 border-t border-gray-200 dark:border-dark-border"></div>
                            <button onClick={() => { onLogout(); onClose(); }} className="w-full text-left p-2 text-sm text-red-500 rounded-md hover:bg-gray-100 dark:hover:bg-dark-surface-hover">
                                {t('settingsPopover.logOut')}
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SettingsPopover;