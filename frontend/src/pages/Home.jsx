import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IdeaInput from '../components/IdeaInput';
import GenerateButton from '../components/GenerateButton';
import Loader from '../components/Loader';

const Home = () => {
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGenerate = async () => {
        if (!idea.trim()) {
            setError('Please enter your startup idea');
            return;
        }

        if (idea.trim().length < 10) {
            setError('Please provide a more detailed description');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/generate`, { idea });

            // Navigate to results page with the generated data
            navigate('/results', {
                state: {
                    data: response.data.data,
                    idea: idea
                }
            });
        } catch (err) {
            console.error('Error generating requirements:', err);
            setError(
                err.response?.data?.message ||
                'Failed to generate requirements. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleGenerate();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-block mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary-500/50">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
                        AI Requirement Generator
                    </h1>

                    <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                        Transform your startup ideas into structured product requirements instantly
                    </p>
                </div>

                {/* Main Card */}
                <div className="glass-card p-8 md:p-12 animate-slide-up">
                    {loading ? (
                        <Loader message="Analyzing your idea and generating comprehensive requirements..." />
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-white mb-3">
                                    Describe Your Startup Idea
                                </label>
                                <IdeaInput
                                    value={idea}
                                    onChange={(e) => {
                                        setIdea(e.target.value);
                                        setError('');
                                    }}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Example: An app that helps gym beginners create personalized workout plans and track their progress with AI-powered form correction..."
                                />
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                    <p className="text-red-400 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <GenerateButton
                                    onClick={handleGenerate}
                                    loading={loading}
                                    disabled={!idea.trim() || idea.trim().length < 10}
                                />

                                <p className="text-sm text-dark-400">
                                    Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">Enter</kbd> to generate
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ),
                            title: 'User Personas',
                            description: 'Detailed user profiles with goals and pain points'
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            ),
                            title: 'User Stories',
                            description: 'Structured requirements in standard format'
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            title: 'Acceptance Criteria',
                            description: 'Clear, testable conditions for each feature'
                        }
                    ].map((feature, index) => (
                        <div key={index} className="glass-card p-6 text-center hover-glow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-dark-400 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
