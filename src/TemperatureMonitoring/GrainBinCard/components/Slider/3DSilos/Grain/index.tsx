import React, { FC } from 'react';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { BufferGeometry } from 'three/src/Three.Core';

interface GrainProps {
  points: number[][];
  transparent?: boolean;
  opacity?: number;
  color: string;
}

export const Grain: FC<GrainProps> = ({ points, transparent, opacity, color }) => {
  const vertices = points.map(p => new Vector3(...p));
  const grainMesh = new Mesh(new ConvexGeometry(vertices) as BufferGeometry, new MeshStandardMaterial({ transparent, opacity, color }));

  return <primitive object={grainMesh} />;

  // return (
  //   <mesh geometry={new ConvexGeometry(vertices) as BufferGeometry}>
  //     <meshStandardMaterial color={color} transparent={transparent} opacity={opacity} />
  //   </mesh>
  // );
};
