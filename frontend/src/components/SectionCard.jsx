import React, { useState } from 'react';

const SectionCard = ({ title, content, icon }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card hover-glow animate-slide-up">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            {icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                            title="Copy section"
                        >
                            {copied ? (
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-dark-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )}
                        </button>

                        {/* Expand/Collapse Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            <svg
                                className={`w-5 h-5 text-dark-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                {isExpanded && (
                    <div className="prose prose-invert max-w-none">
                        {content ? (
                            <div className="text-dark-200 leading-relaxed space-y-2">
                                {content.split('\n').map((line, index) => (
                                    <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
                                        {line || '\u00A0'}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-dark-500 italic">No content generated for this section.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionCard;
