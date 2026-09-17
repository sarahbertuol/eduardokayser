import Image from 'next/image';

export default function RealPhoto({ src, alt, priority = false, fit = 'cover', loading, objectPosition = 'center' }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : loading}
        style={{ objectFit: fit, objectPosition }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
