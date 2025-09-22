import {useRef, useEffect} from 'react';

function LazyImage({src, alt, width, height}: {src: string; alt?: string; width?: number; height?: number}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer: IntersectionObserver | null = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            obs.unobserve(entry.target);
          }
        });
      },
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        backgroundColor: '#eee',
        objectFit: 'cover',
      }}
      src=""
    />
  );
}

export default LazyImage;
