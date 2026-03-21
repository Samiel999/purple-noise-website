import React, {useCallback, useEffect, useRef, useState} from "react";

export const Pictures = ({images, interval}: { images: string[], interval: number }) => {
    const [currentPicture, setCurrentPicture] = useState<number>(0);
    const [paused] = useState<boolean>(false);
    const startX = useRef<number | null>(null);
    const timerRef = useRef<number | undefined>(undefined);

    const next = useCallback(() => {
        setCurrentPicture((c => (c + 1) % images.length))
    }, [images.length]);
    const prev = useCallback(() => {
        setCurrentPicture((c => (c - 1 + images.length) % images.length))
    }, [images.length]);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(next, interval);
        return () => clearInterval(timerRef.current);
    }, [paused, interval, next]);

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
        startX.current = e.touches[0].clientX;
    }

    const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
        if (startX.current === null) return;
        const diff = startX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
        startX.current = null;
    }

    return (
        <section
            id="home"
            aria-roledescription={`picture carousel`}
            aria-label={`Galerie Purple Noise`}
            className={`relative top-0 overflow-hidden group w-full justify-center`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className={`max-h-[66vh] flex transition-transform duration-700 ease-in-out`}
                style={{transform: `translateX(-${currentPicture * 100}%)`}}
            >
                {images.map((src: string) => (
                    <img
                        key={src}
                        src={`images/${src}`}
                        alt=""
                        className={`aspect-3/2 shrink object-scale-down object-center`}
                    />
                ))}
            </div>

            <button
                onClick={prev}
                className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition`}
            >
                ‹
            </button>

            <button
                onClick={next}
                className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition`}
            >
                ›
            </button>

            <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition`}
            >
                {images.map((src: string, index: number) => (
                    <button
                        key={src}
                        onClick={() => setCurrentPicture(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                            index === currentPicture ? "bg-white scale-125" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
