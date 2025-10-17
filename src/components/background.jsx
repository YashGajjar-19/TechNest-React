import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const background = () => {
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
            if (renderer) renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} id="webgl-canvas" />;
};

export default background;