import React from 'react';

const Loader = ({ message = 'Generating your requirements...' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-24 h-24 border-4 border-primary-500/20 rounded-full"></div>

                {/* Spinning ring */}
                <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>

                {/* Inner pulsing circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-500/20 rounded-full animate-pulse-slow"></div>
            </div>

            <p className="mt-6 text-lg text-dark-300 animate-pulse">{message}</p>

            <div className="mt-4 flex gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
};

export default Loader;
