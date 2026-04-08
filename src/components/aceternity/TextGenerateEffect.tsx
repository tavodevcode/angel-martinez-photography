import { useEffect, useMemo, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
}

export default function TextGenerateEffect({ text, speed = 32 }: Props) {
  const words = useMemo(() => text.split(' '), [text]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setVisibleCount((value) => {
        if (value >= words.length) {
          window.clearInterval(id);
          return value;
        }
        return value + 1;
      });
    }, speed);

    return () => window.clearInterval(id);
  }, [speed, words.length]);

  return (
    <p className="text-base text-white/70 lg:text-lg">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`mr-1.5 inline-block transition duration-500 ${
            index < visibleCount ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
