import { FC, useEffect, useState } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  minimumMs?: number;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading, minimumMs = 400 }) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    let timeoutId: number;

    if (isLoading) {
      setVisible(true);
    } else {
      timeoutId = window.setTimeout(() => setVisible(false), minimumMs);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, minimumMs]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden={!isLoading}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/95 backdrop-blur-xl transition-opacity duration-500 ${
        isLoading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center gap-8 text-center text-white">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-t-4 border-indigo-400 animate-spin" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 blur-xl" />
          <div className="absolute inset-9 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-indigo-100/80">
            Preparing marketplace
          </p>
          <h2 className="text-2xl font-semibold">Syncing curated inventory</h2>
        </div>

        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="h-2 w-2 rounded-full bg-white/80"
              style={{
                animation: `loading-dot 1.2s ease-in-out ${index * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes loading-dot {
            0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingOverlay;
