import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrcSet, setImageSrcSet] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Generate srcset for picsum.photos URLs that use the /seed/ format
    if (src.includes('picsum.photos/seed/')) {
      const urlParts = src.split('/');
      const seedAndDimensionsIndex = urlParts.findIndex(part => part === 'seed') + 1;
      
      if (seedAndDimensionsIndex > 0 && urlParts.length >= seedAndDimensionsIndex + 3) {
        const seed = urlParts[seedAndDimensionsIndex];
        const baseWidth = parseInt(urlParts[seedAndDimensionsIndex + 1], 10);
        const baseHeight = parseInt(urlParts[seedAndDimensionsIndex + 2], 10);
        
        if (!isNaN(baseWidth) && !isNaN(baseHeight) && baseWidth > 0) {
          const aspectRatio = baseHeight / baseWidth;
          const widths = [200, 400, 600, 800, 1200];
          const srcSet = widths
            .map(w => {
              const h = Math.round(w * aspectRatio);
              return `https://picsum.photos/seed/${seed}/${w}/${h} ${w}w`;
            })
            .join(', ');
          setImageSrcSet(srcSet);
        }
      }
    }
  }, [src]);

  return (
    <img
      src={src}
      srcSet={imageSrcSet}
      alt={alt}
      className={`${className} transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      {...props}
    />
  );
};

export default OptimizedImage;
