import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, LogIn } from 'react-feather';
import AnimatedBackground from '../components/background.jsx'; // Import the new component

const Register = () => {
    return (
        <div>
            <AnimatedBackground />
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="grid md:grid-cols-2 items-center gap-16 max-w-6xl w-full fade-in">
                    <div className="hidden md:block text-left content-wrapper">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">TechArena</span>
                        </Link>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Join the Arena.</h1>
                        <p className="text-lg text-text-secondary">Create your account to get started on the definitive source for mobile tech.</p>
                    </div>

                    <div className="form-wrapper p-8 rounded-2xl w-full max-w-md md:max-w-full">
                        <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                        <p className="text-text-secondary mb-8">Join TechArena today.</p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="fullname" className="block mb-2 text-sm font-semibold">Full Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input type="text" id="fullname" placeholder="John Doe" required className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input type="email" id="email" placeholder="you@example.com" required className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-semibold">Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input type="password" id="password" placeholder="••••••••" required className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary" />
                                </div>
                            </div>
                            <button type="submit" className="cta-button w-full py-3 text-base font-bold text-white rounded-lg flex items-center justify-center">
                                <UserPlus className="w-5 h-5 mr-2" /> Create Account
                            </button>
                            <p className="text-center text-sm text-text-secondary pt-4">
                                Already have an account?
                                <Link to="/login" className="font-bold text-primary hover:underline ml-1 inline-flex items-center">Sign in<LogIn className="w-4 h-4 ml-1" /></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;