import React, { useState } from 'react';
import { ModalType } from '../types';
import { ICONS } from '../constants';

interface AuthModalProps {
    modalType: ModalType;
    onClose: () => void;
    onLogin: (credentials?: { email: string; password: string }) => void;
    onSwitchToSignUp: () => void;
    onSwitchToSignIn: () => void;
    t: (key: string) => string;
}

const AuthModal: React.FC<AuthModalProps> = ({ modalType, onClose, onLogin, onSwitchToSignIn, onSwitchToSignUp, t }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const isSignIn = modalType === ModalType.SignIn;

    const title = isSignIn ? t('logIntoAccount') : t('createYourAccount');
    const switchText = isSignIn ? t('dontHaveAccount') : t('alreadyHaveAccount');
    const switchActionText = isSignIn ? t('signUp') : t('signIn');
    const switchAction = isSignIn ? onSwitchToSignUp : onSwitchToSignIn;

    const googleButtonText = isSignIn ? t('loginWithGoogle') : t('signUpWithGoogle');
    const xButtonText = isSignIn ? t('loginWithX') : t('signUpWithX');
    const twitchButtonText = isSignIn ? t('loginWithTwitch') : t('signUpWithTwitch');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignIn) {
            onLogin({ email, password });
        } else {
            // In a real app, this would call a separate onSignUp function
            console.log('Signing up with:', { name, email, password });
            onLogin({ email, password }); // For now, just log in after signing up
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl w-full max-w-sm text-center text-gray-800 dark:text-dark-text" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                    {ICONS.close}
                </button>
                <h2 className="text-2xl font-bold mb-6">{title}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isSignIn && (
                        <input
                            type="text"
                            placeholder={t('name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-sm py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder={t('email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        placeholder={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-sm py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        autoComplete={isSignIn ? "current-password" : "new-password"}
                    />
                    <button type="submit" className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        <span>{isSignIn ? t('signIn') : t('signUp')}</span>
                    </button>
                </form>
                
                <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-dark-text-secondary text-xs">{t('or')}</span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                <div className="space-y-3">
                    <button onClick={() => onLogin()} className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                        {ICONS.google}
                        <span>{googleButtonText}</span>
                    </button>
                    <button onClick={() => onLogin()} className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                        {ICONS.x}
                        <span>{xButtonText}</span>
                    </button>
                     <button onClick={() => onLogin()} className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-100 dark:bg-dark-surface-hover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                        {ICONS.twitch}
                        <span>{twitchButtonText}</span>
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500 dark:text-dark-text-secondary">
                    {switchText} <button onClick={switchAction} className="font-semibold text-indigo-600 hover:underline">{switchActionText}</button>
                </p>
                <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
                    {t('tos')}
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
