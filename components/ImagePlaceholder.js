'use client';
export default function ImagePlaceholder({ label, shape = 'rect', radius = 0 }) {
  const borderRadius = shape === 'circle' ? '999px' : shape === 'rounded' ? radius + 'px' : '0px';
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius,
        background:
          'repeating-linear-gradient(135deg, rgba(120,130,160,0.12) 0px, rgba(120,130,160,0.12) 10px, rgba(120,130,160,0.04) 10px, rgba(120,130,160,0.04) 20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#586181',
        padding: '12px',
      }}
    >
      {label}
    </div>
  );
}
