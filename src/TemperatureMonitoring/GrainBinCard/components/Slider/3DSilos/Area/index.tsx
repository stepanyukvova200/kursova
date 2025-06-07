import React, { FC } from 'react';

import { CylinderGeometry, Mesh, MeshStandardMaterial } from 'three';

interface AreaProps {
  position: [x: number, y: number, z: number];
  width: number;
  height: number;
  transparent?: boolean;
  opacity?: number;
  color: string;
}

export const Area: FC<AreaProps> = ({
  position,
  width,
  height,
  transparent,
  opacity,
  color,
}) => {
  const areaMesh = new Mesh(
    new CylinderGeometry(width - 0.1, width - 0.05, height, 32, 32),
    new MeshStandardMaterial({ transparent, opacity, color })
  );
  areaMesh.position.set(...position);

  // @ts-ignore
  return <primitive object={areaMesh} />;
};
