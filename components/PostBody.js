import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import { urlFor } from '../sanity/lib/image';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const { width, height } = getImageDimensions(value);
      const w = Math.min(width, 1440);
      return (
        <figure>
          <Image
            src={urlFor(value).width(w).fit('max').url()}
            alt={value.alt || ''}
            width={w}
            height={Math.round((height / width) * w)}
            sizes="(max-width: 760px) 100vw, 720px"
            style={{ width: '100%', height: 'auto' }}
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const external = value?.blank !== false && /^https?:/.test(value?.href || '');
      return (
        <a href={value?.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
      );
    },
  },
};

export default function PostBody({ value }) {
  return (
    <div className="post-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
