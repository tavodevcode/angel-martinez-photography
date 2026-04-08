import { useMemo } from 'react';

interface Props {
  blur?: number;
}

export default function Spotlight({ blur = 90 }: Props) {
  const style = useMemo(() => ({
    background:
      'radial-gradient(560px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,.2), rgba(255,255,255,0) 48%)',
    filter: `blur(${blur}px)`,
  }), [blur]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      onMouseMove={(event) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = `${((event.clientX - rect.left) / rect.width) * 100}%`;
        const y = `${((event.clientY - rect.top) / rect.height) * 100}%`;
        target.style.setProperty('--x', x);
        target.style.setProperty('--y', y);
      }}
    >
      <div className="h-full w-full" style={style} />
    </div>
  );
}
