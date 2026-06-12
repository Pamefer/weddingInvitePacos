// Carousel.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.css';
import foto1 from './static/DSC_0757.jpg';
import foto3 from './static/DSC_0770.jpg';
import foto4 from './static/DSC_0911.jpg';
import foto7 from './static/DSC_0937.jpg';

const images = [
    foto1, foto3, foto4, foto7

];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    // Optional autoplay
    useEffect(() => {
        const interval = setInterval(next, 5000); // every 5 sec
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);
    return (
        <div className="carousel">
            <button className="nav prev" onClick={prev}>‹</button>
            <div className="carousel-image-wrapper">
                <AnimatePresence >
                    <motion.img
                        key={images[current]}
                        src={images[current]}
                        alt={`Slide ${current + 1}`}
                        className="carousel-image"
                        initial={{ opacity: 0, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                    />
                </AnimatePresence>
            </div>
            <button className="nav next" onClick={next}>›</button>
        </div>
    );
}
