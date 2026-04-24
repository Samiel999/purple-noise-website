import { type JSX, type RefObject, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { type Slide } from '../data/slides';

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
export default function Hero(): JSX.Element {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const intervalRef: RefObject<NodeJS.Timeout | null> = useRef(null);
    const heroRef: RefObject<HTMLElement | null> = useRef(null);

    useEffect(() => {
        const loadSlides = async (): Promise<void> => {
            const response: Response = await fetch('/data/slides.json');
            const data = await response.json() as Slide[];
            setSlides(data);
        };

        void loadSlides();
    }, []);

    const nextSlide = useCallback((): void => {
        if (slides.length === 0) {
            return;
        }
        setActiveSlide((prev: number): number => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback((): void => {
        if (slides.length === 0) {
            return;
        }
        setActiveSlide((prev: number): number => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const goToSlide = useCallback((index: number): void => {
        setActiveSlide(index);
    }, []);

    // Auto-advance slides with pause on hover
    useEffect(() => {
        if (slides.length === 0) {
            return;
        }

        const startInterval = (): void => {
            if (!isPaused) {
                intervalRef.current = setInterval(nextSlide, 5000);
            }
        };

        startInterval();

        return (): void => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, nextSlide, slides.length]);

    useEffect(() => {
        if (slides.length > 0 && activeSlide > slides.length - 1) {
            setActiveSlide(0);
        }
    }, [activeSlide, slides.length]);

    const handleKeyDown = useCallback((e: ReactKeyboardEvent<HTMLElement>): void => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }, [nextSlide, prevSlide]);

    return (
        <section
            id="hero"
            className="relative h-screen overflow-hidden"
            ref={heroRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Hero Carousel"
        >
            {/* Slides */}
            {slides.map((slide) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        slide.id - 1 === activeSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={slide.id - 1 !== activeSlide}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${slide.alt} ${slide.id} of ${slides.length}`}
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
                {slides.map((slide) => (
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
