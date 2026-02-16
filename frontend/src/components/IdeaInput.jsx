import React from 'react';

const IdeaInput = ({ value, onChange, placeholder }) => {
    const maxLength = 2000;
    const charCount = value.length;
    const percentage = (charCount / maxLength) * 100;

    return (
        <div className="w-full">
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                rows={8}
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl 
                   text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 
                   focus:border-transparent transition-all duration-300 resize-none custom-scrollbar
                   text-lg leading-relaxed"
            />
            <div className="mt-3 flex justify-between items-center text-sm">
                <span className="text-dark-400">
                    Describe your startup idea in detail for better results
                </span>
                <span className={`font-medium ${percentage > 90 ? 'text-red-400' :
                        percentage > 70 ? 'text-yellow-400' :
                            'text-dark-400'
                    }`}>
                    {charCount} / {maxLength}
                </span>
            </div>
        </div>
    );
};

export default IdeaInput;
