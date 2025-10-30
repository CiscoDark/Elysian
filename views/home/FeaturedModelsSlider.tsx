import React, { useRef, useEffect, useCallback } from 'react';
import { MODELS } from '../../constants';

const FeaturedModelsSlider: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    // Fix: Initialize useRef with an initial value as it expects one argument.
    const requestRef = useRef<number | undefined>(undefined);
    const isInteracting = useRef(false);
    // Fix: Initialize useRef with an initial value as it expects one argument.
    const interactionTimeout = useRef<any>(undefined);

    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const extendedModels = [...MODELS, ...MODELS];

    const animate = useCallback(() => {
        if (sliderRef.current && !isInteracting.current) {
            sliderRef.current.scrollLeft += 1.5; // Increased speed
            if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
                sliderRef.current.scrollLeft = 0;
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        const slider = sliderRef.current;

        if (!slider) return;

        const startInteraction = (pageX: number) => {
            isInteracting.current = true;
            isDown.current = true;
            slider.classList.add('active');
            startX.current = pageX - slider.offsetLeft;
            scrollLeft.current = slider.scrollLeft;
        };

        const endInteraction = () => {
            isInteracting.current = false;
            isDown.current = false;
            slider.classList.remove('active');
        };

        const moveInteraction = (pageX: number) => {
            if (!isDown.current) return;
            const x = pageX - slider.offsetLeft;
            const walk = (x - startX.current) * 2.5; // Scroll multiplier
            slider.scrollLeft = scrollLeft.current - walk;
        };

        const handleMouseDown = (e: MouseEvent) => startInteraction(e.pageX);
        const handleMouseUp = endInteraction;
        const handleMouseLeave = endInteraction;
        const handleMouseMove = (e: MouseEvent) => moveInteraction(e.pageX);

        const handleTouchStart = (e: TouchEvent) => startInteraction(e.touches[0].pageX);
        const handleTouchEnd = endInteraction;
        const handleTouchMove = (e: TouchEvent) => moveInteraction(e.touches[0].pageX);

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
            isInteracting.current = true;
            clearTimeout(interactionTimeout.current);
            interactionTimeout.current = setTimeout(() => {
                isInteracting.current = false;
            }, 1500);
        };

        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mousemove', handleMouseMove);

        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd);
        slider.addEventListener('touchmove', handleTouchMove, { passive: true });

        slider.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            clearTimeout(interactionTimeout.current);
            
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mousemove', handleMouseMove);
            
            slider.removeEventListener('touchstart', handleTouchStart);
            slider.removeEventListener('touchend', handleTouchEnd);
            slider.removeEventListener('touchmove', handleTouchMove);
            
            slider.removeEventListener('wheel', handleWheel);
        };
    }, [animate]);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide cursor-grab"
            >
                {extendedModels.map((model, index) => (
                    <div key={`${model.id}-${index}`} className="flex-shrink-0 w-64 h-96 mx-4 relative rounded-lg overflow-hidden shadow-lg select-none">
                        <img draggable="false" src={model.imageUrl} alt={model.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-xl font-bold text-white tracking-wide">{model.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {/* Fades for edges */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
    );
};

export default FeaturedModelsSlider;
