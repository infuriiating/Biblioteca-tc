import { useState, forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ImageSkeleton = forwardRef(({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  onLoad,
  ...props 
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton Background */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-bg-surface ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
      )}
      
      {/* Actual Image */}
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
});

export default ImageSkeleton;
