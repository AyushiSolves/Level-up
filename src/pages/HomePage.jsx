import React from 'react';
import { SanctuaryWorld } from '../components/SanctuaryWorld';

export const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pb-12 pt-1">
      {/* Immersive RPG Sanctuary World Viewport matching reference design */}
      <section className="w-full flex justify-center">
        <SanctuaryWorld />
      </section>
    </div>
  );
};
