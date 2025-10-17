import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import anime from 'animejs';
import { FileText, Rss, GitPullRequest, LogIn, ArrowRightCircle, Award, Send, Shield, PlayCircle, BookOpen, Users, Mail, Twitter, Github, Dribbble, File } from 'react-feather';

// A self-contained component for the animated background for better stability
const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        let stars;
        const starGeo = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < 6000; i++) {
            positions.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
        }
        starGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const sprite = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");
        stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7, map: sprite, transparent: true }));
        scene.add(stars);

        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = e.clientX - window.innerWidth / 2;
            mouseY = e.clientY - window.innerHeight / 2;
        };
        document.addEventListener("mousemove", handleMouseMove);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            stars.rotation.y += 0.0001;
            camera.position.x += (mouseX * 0.00005 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.00005 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousemove", handleMouseMove);
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} id="webgl-canvas"></canvas>;
};


const Home = () => {
    useEffect(() => {
        const header = document.getElementById("main-header");
        const hamburgerBtn = document.getElementById("hamburger-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (!header || !hamburgerBtn || !mobileMenu) return;

        const handleScroll = () => {
            header.classList.toggle("scrolled", window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const toggleMenu = () => {
            hamburgerBtn.classList.toggle("open");
            mobileMenu.classList.toggle("open");
        };
        hamburgerBtn.addEventListener("click", toggleMenu);

        const closeMenuOnLinkClick = (e) => {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                hamburgerBtn.classList.remove("open");
                mobileMenu.classList.remove("open");
            }
        };
        mobileMenu.addEventListener("click", closeMenuOnLinkClick);

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.querySelector('.char')) {
            heroTitle.innerHTML = heroTitle.textContent.replace(/\S/g, "<span class='char'>$&</span>");
        }

        const masterTimeline = anime.timeline({ easing: "easeOutExpo", duration: 1200 });
        masterTimeline
            .add({ targets: "#main-header .anim-el", translateY: [-30, 0], opacity: [0, 1], delay: anime.stagger(100) })
            .add({ targets: ".hero-title .char", translateY: [115, 0], delay: anime.stagger(25) }, "-=1000")
            .add({ targets: ".hero-content p, .hero-content a, .iso-phone-container", translateY: [30, 0], opacity: [0, 1], delay: anime.stagger(100) }, "-=1000");

        const sectionsToObserve = document.querySelectorAll("main section, footer");
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target.querySelectorAll(".anim-el"),
                        translateY: [30, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(150, { start: 200 }),
                        easing: "easeOutExpo",
                        duration: 1200,
                    });
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionsToObserve.forEach((section) => animObserver.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            hamburgerBtn.removeEventListener("click", toggleMenu);
            mobileMenu.removeEventListener("click", closeMenuOnLinkClick);
            animObserver.disconnect();
        };
    }, []);

    return (
        <div>
            <AnimatedBackground />
            <div id="content-wrapper">
                <header id="main-header" className="glass-nav fixed top-0 left-0 right-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <a href="#home" className="flex items-center gap-3 anim-el">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">TechArena</span>
                        </a>
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                            <a href="#reviews" className="nav-link text-text-secondary anim-el flex items-center"><FileText className="w-4 h-4 mr-2" />Reviews</a>
                            <a href="#news" className="nav-link text-text-secondary anim-el flex items-center"><Rss className="w-4 h-4 mr-2" />News</a>
                            <a href="#compare" className="nav-link text-text-secondary anim-el flex items-center"><GitPullRequest className="w-4 h-4 mr-2" />Compare</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="cta-button px-5 py-2 rounded-lg text-sm font-semibold hidden md:block anim-el flex items-center">
                                <LogIn className="w-4 h-4 mr-2" />Sign In
                            </Link>
                            <button id="hamburger-btn" className="md:hidden z-50 space-y-1.5">
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                                <span className="block w-6 h-0.5 bg-white"></span>
                            </button>
                        </div>
                    </div>
                </header>

                <div id="mobile-menu" className="fixed top-0 right-0 h-full w-64 bg-surface/95 backdrop-blur-lg z-40 p-8 flex flex-col items-center justify-center">
                    <nav className="flex flex-col items-center gap-8 text-lg font-semibold">
                        <a href="#reviews" className="nav-link text-text-secondary">Reviews</a>
                        <a href="#news" className="nav-link text-text-secondary">News</a>
                        <a href="#compare" className="nav-link text-text-secondary">Compare</a>
                        <Link to="/login" className="cta-button px-8 py-3 rounded-lg mt-8">Sign In</Link>
                    </nav>
                </div>

                <main className="max-w-7xl mx-auto px-6">
                    <section id="home" className="hero-section">
                        <div className="grid md:grid-cols-2 items-center gap-16">
                            <div className="hero-content z-10 text-center md:text-left">
                                <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 hero-title">
                                    Clarity in Complexity
                                </h1>
                                <p className="text-lg lg:text-xl text-text-secondary max-w-xl mb-10 mx-auto md:mx-0 anim-el">
                                    The definitive source for mobile technology. We cut through the noise to bring you reviews and analysis you can trust.
                                </p>
                                <a href="#reviews" className="cta-button px-8 py-4 rounded-xl font-semibold text-white inline-flex items-center anim-el">
                                    <ArrowRightCircle className="w-5 h-5 mr-2" />Explore Latest Reviews
                                </a>
                            </div>
                            <div className="iso-phone-container hidden md:flex items-center justify-center anim-el">
                                <svg viewBox="0 0 95 105" fill="none" xmlns="http://www.w3.org/2000/svg" height="400" width="400" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12.2998 14.2752L13.6998 13.5752C13.2198 13.7752 12.7598 14.0152 12.2998 14.2752Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M69.66 60.2153C68.94 57.8753 68.11 55.5753 67.18 53.3153C65.78 49.8753 64.14 46.5353 62.26 43.2853C62.22 43.2053 62.18 43.1253 62.13 43.0453C60.58 40.3753 58.9 37.8053 57.08 35.3353C55.18 32.7553 53.14 30.2953 50.95 27.9453C46.66 23.3553 42.09 19.6453 37.21 16.8353C36.16 16.2253 35.12 15.6753 34.1 15.1953C30.94 13.6653 27.91 12.6953 25.01 12.2653C24.49 12.1853 23.99 12.1253 23.48 12.0853C19.81 11.7853 16.55 12.2753 13.7 13.5753L12.3 14.2753C9.13 16.0753 6.62 18.9053 4.77 22.7553C2.92 26.6053 2 31.3253 2 36.9153C2 42.5053 2.92 48.2953 4.77 54.2753C6.62 60.2553 9.13 65.9853 12.3 71.4553C15.47 76.9153 19.2 81.9453 23.48 86.5453C27.76 91.1353 32.34 94.8453 37.21 97.6553C42.09 100.465 46.66 102.055 50.95 102.405C55.23 102.755 58.96 102.025 62.13 100.225C65.16 98.4953 67.59 95.8253 69.41 92.2253C69.5 92.0653 69.58 91.9053 69.66 91.7353C70.82 89.3253 71.61 86.5653 72.04 83.4653C72.3 81.6253 72.43 79.6553 72.43 77.5753C72.43 71.9853 71.51 66.2053 69.66 60.2153ZM64.15 82.6853C63.31 85.3553 62.04 87.5653 60.32 89.3053C59.42 90.2453 58.37 91.0453 57.2 91.7153C51.74 94.8253 45.08 94.1153 37.21 89.5753C29.35 85.0353 22.69 78.0553 17.23 68.6353C11.77 59.2253 9.04 50.0053 9.04 40.9853C9.04 31.9653 11.77 25.8853 17.23 22.7753C18.84 21.8553 20.56 21.2653 22.39 21.0253C24.83 20.6853 27.46 20.9453 30.28 21.8053C32.48 22.4853 34.79 23.5153 37.21 24.9153C41.89 27.6153 46.15 31.1853 49.97 35.6153C50.01 35.6553 50.05 35.6953 50.07 35.7353C51.91 37.8653 53.64 40.1853 55.28 42.7153C55.93 43.7153 56.56 44.7553 57.18 45.8253C57.19 45.8353 57.19 45.8453 57.2 45.8553C58.26 47.6853 59.22 49.5053 60.07 51.3153C61.3 53.9153 62.31 56.4953 63.1 59.0553C63.15 59.2053 63.2 59.3653 63.24 59.5153C64.68 64.2353 65.39 68.8953 65.39 73.5153C65.39 77.0153 64.98 80.0753 64.15 82.6853Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M63.2401 59.5152L44.4801 68.8952L44.0801 69.0952L44.3001 68.6852L49.7601 58.5152L54.8901 48.9652L55.2501 48.2952L56.3601 46.2352L57.1801 45.8252C57.1801 45.8252 57.1901 45.8452 57.2001 45.8552C58.2601 47.6852 59.2201 49.5052 60.0701 51.3152C61.3001 53.9152 62.3101 56.4952 63.1001 59.0552C63.1501 59.2052 63.2001 59.3652 63.2401 59.5152Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M57.1802 45.8252L56.3602 46.2352L53.7602 46.1152H53.7402L44.7602 45.6952H44.6202L31.2102 45.0652L30.4502 45.0252L31.1002 44.7152L49.9702 35.6152C50.0102 35.6552 50.0502 35.6952 50.0702 35.7352C51.9102 37.8652 53.6402 40.1852 55.2802 42.7152C55.9302 43.7152 56.5602 44.7552 57.1802 45.8252Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M53.7602 46.1154H53.7402L44.7602 45.6954H44.6202L31.2102 45.0654L30.4502 45.0254L30.2002 45.5054L27.2102 51.0954L19.1702 66.1454L18.1602 68.0454L20.2402 68.1254L37.1002 68.8154L44.0802 69.0954L44.3002 68.6854L49.7602 58.5154L54.8902 48.9654L55.2502 48.2954L56.3602 46.2354L53.7602 46.1154ZM39.7202 61.5754C39.5402 61.6754 39.3502 61.7454 39.1502 61.7754C38.5902 61.8754 37.9402 61.7154 37.2102 61.2854C36.2202 60.7154 35.3802 59.8454 34.7102 58.6754C34.0302 57.5154 33.6902 56.3554 33.6902 55.2154C33.6902 54.2854 33.9102 53.6054 34.3602 53.1754C34.4602 53.0754 34.5802 52.9854 34.7102 52.9154C35.3802 52.5354 36.2202 52.6254 37.2102 53.2054C38.1102 53.7254 38.8902 54.4954 39.5202 55.4954C39.5902 55.5954 39.6602 55.7054 39.7202 55.8154C40.1802 56.5954 40.4802 57.3754 40.6302 58.1454C40.7002 58.5254 40.7402 58.9054 40.7402 59.2754C40.7402 60.4254 40.4002 61.1854 39.7202 61.5754Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M64.15 82.6849C63.31 85.3549 62.04 87.5649 60.32 89.3049C59.42 90.2449 58.37 91.0449 57.2 91.7149C51.74 94.8249 45.08 94.1149 37.21 89.5749C29.35 85.0349 22.69 78.0549 17.23 68.6349C11.77 59.2249 9.04004 50.0049 9.04004 40.9849C9.04004 31.9649 11.77 25.8849 17.23 22.7749C18.84 21.8549 20.56 21.2649 22.39 21.0249C24.83 20.6849 27.46 20.9449 30.28 21.8049C29.45 24.4149 29.04 27.4749 29.04 30.9849C29.04 35.5049 29.73 40.0849 31.1 44.7049L30.45 45.0249L30.2 45.5049L27.21 51.0949L19.17 66.1449L18.16 68.0449L20.24 68.1249L37.1 68.8149L44.08 69.0949L44.48 68.8949C48.29 73.3149 52.54 76.8749 57.21 79.5749C59.64 80.9749 61.95 82.0149 64.15 82.6849Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M92.4302 67.5751C92.4302 73.1651 91.5102 77.8851 89.6602 81.7351C87.8102 85.5851 85.3002 88.4151 82.1302 90.2251C81.8202 90.4051 81.5102 90.5651 81.1902 90.7151L62.1302 100.225C65.1602 98.4951 67.5902 95.8251 69.4102 92.2251C69.5002 92.0651 69.5802 91.9051 69.6602 91.7351C70.8202 89.3251 71.6102 86.5651 72.0402 83.4651C72.3002 81.6251 72.4302 79.6551 72.4302 77.5751C72.4302 71.9851 71.5102 66.2051 69.6602 60.2151C68.9402 57.8751 68.1102 55.5751 67.1802 53.3151C65.7802 49.8751 64.1402 46.5351 62.2602 43.2851C62.2202 43.2051 62.1802 43.1251 62.1302 43.0451C60.5802 40.3751 58.9002 37.8051 57.0802 35.3351C55.1802 32.7551 53.1402 30.2951 50.9502 27.9451C46.6602 23.3551 42.0902 19.6451 37.2102 16.8351C36.1602 16.2251 35.1202 15.6751 34.1002 15.1951C30.9402 13.6651 27.9102 12.6951 25.0102 12.2651C24.4902 12.1851 23.9902 12.1251 23.4802 12.0851C19.8102 11.7851 16.5502 12.2751 13.7002 13.5751L32.3002 4.27506C35.4702 2.46506 39.2002 1.73507 43.4802 2.08507C47.7602 2.44507 52.3402 4.02507 57.2102 6.83507C62.0902 9.64507 66.6602 13.3551 70.9502 17.9451C75.2302 22.5451 78.9602 27.5751 82.1302 33.0451C85.3002 38.5051 87.8102 44.2351 89.6602 50.2151C91.5102 56.2051 92.4302 61.9851 92.4302 67.5751Z" stroke="#39D4DF" strokeLinejoin="round" />
                                    <path d="M40.7404 59.2751C40.7404 60.4251 40.4004 61.1851 39.7204 61.5751C39.5404 61.6751 39.3504 61.7451 39.1504 61.7751C38.5904 61.8751 37.9404 61.7152 37.2104 61.2852C36.2204 60.7152 35.3804 59.8452 34.7104 58.6752C34.0304 57.5152 33.6904 56.3551 33.6904 55.2151C33.6904 54.2851 33.9104 53.6052 34.3604 53.1752C34.4604 53.0752 34.5804 52.9852 34.7104 52.9152C35.3804 52.5352 36.2204 52.6252 37.2104 53.2052C38.1104 53.7252 38.8904 54.4951 39.5204 55.4951C39.5904 55.5951 39.6604 55.7052 39.7204 55.8152C40.1804 56.5952 40.4804 57.3752 40.6304 58.1452C40.7004 58.5252 40.7404 58.9051 40.7404 59.2751Z" stroke="#39D4DF" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;