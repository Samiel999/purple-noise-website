import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { carouselSlides} from '../data/slides';

/**
 * Hero Carousel Component
 * Displays a full-screen image carousel with auto-advance and manual navigation.
 *
 * Features:
 * - Auto-advances slides every 5 seconds
 * - Pauses on hover for user interaction
 * - Keyboard navigation support
 * - Accessible with ARIA labels
 */
export default function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const nextSlide = useCallback(() => {
        setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
    }, []);

    const goToSlide = useCallback((index) => {
        setActiveSlide(index);
    }, []);

    // Auto-advance slides with pause on hover
    useEffect(() => {
        const startInterval = () => {
            if (!isPaused) {
                intervalRef.current = setInterval(nextSlide, 5000);
            }
        };

        startInterval();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, nextSlide]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        };

        globalThis.addEventListener('keydown', handleKeyDown);
        return () => globalThis.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <section
            id="hero"
            className="relative h-screen overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Hero Carousel"
        >
            {/* Slides */}
            {carouselSlides.map((slide) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        slide.id - 1 === activeSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={slide.id - 1 !== activeSlide}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${slide.alt} ${slide.id} of ${carouselSlides.length}`}
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                    >
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10" role="tablist" aria-label="Slide navigation">
                {carouselSlides.map((slide) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(slide.id - 1)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            slide.id - 1 === activeSlide
                                ? 'bg-(--color-accent) w-8'
                                : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${slide.id}`}
                        aria-selected={slide.id - 1 === activeSlide}
                        role="tab"
                    />
                ))}
            </div>

            {/* Previous Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 p-2 z-10"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Next Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 p-2 z-10"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </section>
    );
}
