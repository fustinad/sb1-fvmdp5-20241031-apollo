import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import './MapComparisonSlider.css';

interface MapComparisonSliderProps {
  children: React.ReactNode;
  className?: string;
}

export function MapComparisonSlider({ children, className = '' }: MapComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!map || !containerRef.current) return;

    const container = containerRef.current;
    const mapContainer = map.getContainer();
    
    // Set the container dimensions to match the map
    container.style.width = `${mapContainer.offsetWidth}px`;
    container.style.height = `${mapContainer.offsetHeight}px`;
  }, [map]);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(0, position), 100));
  };

  const startDragging = () => {
    isDragging.current = true;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-auto"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5" />
          <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5" />
        </div>
      </div>
    </div>
  );
}