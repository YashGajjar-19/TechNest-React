// Add Link to your imports
import {Link} from 'react-router-dom';
import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {User, Mail, Lock, UserPlus, LogIn} from 'react-feather';

const Register = () => {
    // ... (keep all the existing useEffect and background code the same) ...
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        let stars;
        const starGeo = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < 6000; i++) {
            positions.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
        }
        starGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        let sprite = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");
        stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7,
            map: sprite,
            transparent: true
        }));
        scene.add(stars);

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event) => {
            mouseX = event.clientX - window.innerWidth / 2;
            mouseY = event.clientY - window.innerHeight / 2;
        };

        document.addEventListener('mousemove', onMouseMove, false);

        const animate = () => {
            requestAnimationFrame(animate);
            stars.rotation.y += 0.0001;

            camera.position.x += (mouseX * 0.00005 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.00005 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener('mousemove', onMouseMove, false);
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="webgl-canvas"></canvas>

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="grid md:grid-cols-2 items-center gap-16 max-w-6xl w-full fade-in">
                    <div className="hidden md:block text-left content-wrapper">
                        <a href="index.html" className="flex items-center gap-3 mb-6">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"
                                          strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">TechArena</span>
                        </a>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Join the Arena.</h1>
                        <p className="text-lg text-text-secondary">Create your account to get started on the definitive
                            source for mobile tech.</p>

                    </div>

                    <div className="form-wrapper p-8 rounded-2xl w-full max-w-md md:max-w-full">
                        <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                        <p className="text-text-secondary mb-8">Join TechArena today.</p>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="fullname" className="block mb-2 text-sm font-semibold">Full Name</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="w-5 h-5 text-gray-400"/>
                                    </span>
                                    <input type="text" id="fullname" placeholder="John Doe" required
                                           className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary"/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email
                                    Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="w-5 h-5 text-gray-400"/>
                                    </span>
                                    <input type="email" id="email" placeholder="you@example.com" required
                                           className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary"/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-semibold">Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="w-5 h-5 text-gray-400"/>
                                    </span>
                                    <input type="password" id="password" placeholder="••••••••" required
                                           className="form-input w-full pl-10 px-4 py-3 rounded-lg placeholder:text-text-secondary"/>
                                </div>
                            </div>

                            <button type="submit"
                                    className="cta-button w-full py-3 text-base font-bold text-white rounded-lg flex items-center justify-center">
                                <UserPlus className="w-5 h-5 mr-2"/> Create Account
                            </button>

                            <p className="text-center text-sm text-text-secondary pt-4">
                                Already have an account?
                                {/* Replace <a> with <Link> */}
                                <Link to="/login"
                                      className="font-bold text-primary hover:underline ml-1 inline-flex items-center">Sign
                                    in<LogIn className="w-4 h-4 ml-1"/></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;