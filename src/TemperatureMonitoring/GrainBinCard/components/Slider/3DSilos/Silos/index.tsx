import { useLoader } from '@react-three/fiber';
import React, { FC } from 'react';
import {
  CylinderGeometry,
  DoubleSide,
  TextureLoader,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  TorusGeometry,
  Vector2,
  Vector3,
} from 'three';
import { CSG } from 'three-csg-ts';

interface SilosProps {
  position: [x: number, y: number, z: number];
  width: number;
  height: number;
  transparent?: boolean;
  opacity?: number;
  color?: string;
}

export const Silos: FC<SilosProps> = ({ position, width, height, transparent, opacity, color }) => {
  const k = 0.8;
  const silosBaseHeight = k * height;
  const silosCoverHeight = height * (1 - k);
  const silosCoverWidth = width * (1 - k);

  const standartMaterial = new MeshStandardMaterial({
    color,
    transparent,
    opacity,
    // side: DoubleSide,
  });

  // земля
  const groundWidth = 1.1 * width;
  const groundHeigth = 0.1 * height;
  const groundSegments = 64;
  const groundMesh = new Mesh(
    new CylinderGeometry(groundWidth, groundWidth, groundHeigth, groundSegments, groundSegments),
    standartMaterial
  );

  groundMesh.position.set(position[0], position[1] - silosBaseHeight / 2 - groundHeigth / 2, position[2]);

  // основа
  const silosBaseSegments = 64;
  const silosBaseMesh = new Mesh(
    new CylinderGeometry(width, width, silosBaseHeight, silosBaseSegments, silosBaseSegments),
    standartMaterial
  );

  silosBaseMesh.position.set(...position);

  // кришка
  const silosCoverPoints = [];
  // @ts-ignore
  silosCoverPoints.push(new Vector2(0, silosBaseHeight / 2));
  // @ts-ignore
  silosCoverPoints.push(new Vector2(width, silosBaseHeight / 2));
  // @ts-ignore
  silosCoverPoints.push(new Vector2(silosCoverWidth, silosBaseHeight / 2 + silosCoverHeight));
  // @ts-ignore
  silosCoverPoints.push(new Vector2(0, silosBaseHeight / 2 + silosCoverHeight));

  const silosCoverSegments = 64;
  const silosCoverMesh = new Mesh(new LatheGeometry(silosCoverPoints, silosCoverSegments), standartMaterial);

  silosCoverMesh.position.set(...position);

  const torusCoverMesh3Radius = width + 0.1;
  const torusCoverMesh3Tube = 0.25;
  const torusCoverMesh3Segments = 64;
  const torusCoverMesh3 = new Mesh(
    new TorusGeometry(torusCoverMesh3Radius, torusCoverMesh3Tube, torusCoverMesh3Segments, torusCoverMesh3Segments),
    standartMaterial
  );
  torusCoverMesh3.rotateX(Math.PI / 2);
  torusCoverMesh3.position.set(position[0], position[1] + silosBaseHeight / 2, position[2]);

  const torusCoverMesh2Radius = (2 * width) / 3 + 0.12 * width;
  const torusCoverMesh2Tube = 0.2;
  const torusCoverMesh2Segments = 64;
  const torusCoverMesh2 = new Mesh(
    new TorusGeometry(torusCoverMesh2Radius, torusCoverMesh2Tube, torusCoverMesh2Segments, torusCoverMesh2Segments),
    standartMaterial
  );
  torusCoverMesh2.rotateX(Math.PI / 2);
  torusCoverMesh2.position.set(position[0], position[1] + silosBaseHeight / 2 + silosCoverHeight / 3, position[2]);

  const torusCoverMesh1Radius = width / 3 + 0.18 * width;
  const torusCoverMesh1Tube = 0.15;
  const torusCoverMesh1Segments = 64;
  const torusCoverMesh1 = new Mesh(
    new TorusGeometry(torusCoverMesh1Radius, torusCoverMesh1Tube, torusCoverMesh1Segments, torusCoverMesh1Segments),
    standartMaterial
  );
  torusCoverMesh1.rotateX(Math.PI / 2);
  torusCoverMesh1.position.set(position[0], position[1] + silosBaseHeight / 2 + (2 * silosCoverHeight) / 3, position[2]);

  const getAgnleCylinder = (i: number) => {
    const start = new Vector3(
      width * Math.cos((2 * i * Math.PI) / 12) * 0.99,
      (silosBaseHeight / 2) * 0.99,
      width * Math.sin((2 * i * Math.PI) / 12) * 0.99
    );
    const end = new Vector3(
      silosCoverWidth * Math.cos((2 * i * Math.PI) / 12) * 0.99,
      (silosBaseHeight / 2 + silosCoverHeight) * 0.99,
      silosCoverWidth * Math.sin((2 * i * Math.PI) / 12) * 0.99
    );
    const mid = new Vector3().lerpVectors(start, end, 0.5);
    const len = start.distanceTo(end);
    const direction = new Vector3().subVectors(end, start).normalize();
    const quaternion = new Quaternion();
    quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction);

    return { position: mid, len, quaternion };
  };
  const silosCoverCylinderRT = 0.2;
  const silosCoverCylinderRB = 0.4;
  const silosCoverCylinderSegments = 64;
  const silosCoverCylinderArray = Array.from({ length: 12 }).map((_, i) => {
    const element = new Mesh(
      new CylinderGeometry(silosCoverCylinderRT, silosCoverCylinderRB, getAgnleCylinder(i).len, silosCoverCylinderSegments),
      standartMaterial
    );
    element.position.set(
      position[0] + getAgnleCylinder(i).position.x,
      position[1] + getAgnleCylinder(i).position.y,
      position[2] + getAgnleCylinder(i).position.z
    );
    element.quaternion.set(
      getAgnleCylinder(i).quaternion.x,
      getAgnleCylinder(i).quaternion.y,
      getAgnleCylinder(i).quaternion.z,
      getAgnleCylinder(i).quaternion.w
    );

    return element;
  });
  const silosCoverTopHeigh = 0.08 * silosCoverHeight;
  const silosCoverTopSegments = 64;
  const silosCoverTopMesh = new Mesh(
    new CylinderGeometry(silosCoverWidth, silosCoverWidth, silosCoverTopHeigh, silosCoverTopSegments),
    standartMaterial
  );

  silosCoverTopMesh.position.set(position[0], position[1] + silosBaseHeight / 2 + silosCoverHeight + silosCoverTopHeigh / 2, position[2]);

  // драбина
  const ladderSideRadius = 0.17;
  const ladderSideSegments = 64;
  const ladderSideMesh1 = new Mesh(
    new CylinderGeometry(ladderSideRadius, ladderSideRadius, silosBaseHeight, ladderSideSegments),
    standartMaterial
  );

  ladderSideMesh1.position.set(position[0] - 1.2, position[1], position[2] + width + 0.7);

  const ladderSideMesh2 = new Mesh(
    new CylinderGeometry(ladderSideRadius, ladderSideRadius, silosBaseHeight, ladderSideSegments),
    standartMaterial
  );

  ladderSideMesh2.position.set(position[0] + 1.2, position[1], position[2] + width + 0.7);

  const ladderFrontRadius = 0.07;
  const ladderFrontSegments = 64;
  const ladderFrontMeshArray = Array.from({ length: 18 }).map((_, i) => {
    const element = new Mesh(new CylinderGeometry(ladderFrontRadius, ladderFrontRadius, 2.4, ladderFrontSegments), standartMaterial);

    element.rotateZ(Math.PI / 2);

    element.position.set(position[0], position[1] - silosBaseHeight / 2 + ((i + 1.5) * silosBaseHeight) / 19, position[2] + width + 0.75);

    return element;
  });

  const ladderTorusSideMesh1 = new Mesh(new TorusGeometry(1.2, 0.17, 32, 4, (7 * Math.PI) / 8), standartMaterial);
  ladderTorusSideMesh1.rotateY(-Math.PI / 2);
  ladderTorusSideMesh1.position.set(position[0] - 1.2, position[1] + silosBaseHeight / 2, position[2] + width + 0.7 - 1.2);

  const ladderTorusSideMesh2 = new Mesh(new TorusGeometry(1.2, 0.17, 32, 4, (7 * Math.PI) / 8), standartMaterial);
  ladderTorusSideMesh2.rotateY(-Math.PI / 2);
  ladderTorusSideMesh2.position.set(position[0] + 1.2, position[1] + silosBaseHeight / 2, position[2] + width + 0.7 - 1.2);

  const ladderTorusFrontMeshArray = Array.from({ length: 6 }).map((_, i) => {
    const element = new Mesh(new TorusGeometry(1.2, 0.15, 32, 16, Math.PI), standartMaterial);
    element.rotateX(Math.PI / 2);
    element.position.set(
      position[0],
      position[1] - silosBaseHeight / 2 + ((i + 1.5) * silosBaseHeight) / 7,
      position[2] + width + 0.7 + 0.17
    );

    return element;
  });

  const ladderCableMeshArray = Array.from({ length: 5 }).map((_, i) => {
    const element = new Mesh(new CylinderGeometry(0.04, 0.04, (5 * silosBaseHeight) / 7, 64), standartMaterial);

    element.position.set(
      position[0] + 1.2 * Math.cos(((i + 1) * Math.PI) / 6),
      position[1] - silosBaseHeight / 2 + (1.5 * silosBaseHeight) / 7 + (5 * silosBaseHeight) / 14,
      position[2] + width + 0.7 + 0.17 + 1.2 * Math.sin(((i + 1) * Math.PI) / 6)
    );

    return element;
  });

  //   const mergeMeshes = (arr: Mesh[]) => {
  //     const len = arr.length;
  //     let res = CSG.union(silosBaseMesh, silosCoverMesh);
  //     for (let i = 0; i < len; i += 1) {
  //       arr[i].updateMatrix();
  //       res = CSG.union(res, arr[i]);
  //     }

  //     return res;
  //   };

  const res = CSG.union(silosBaseMesh, silosCoverMesh);

  return (
    <>
      <primitive object={torusCoverMesh1} />
      <primitive object={torusCoverMesh2} />
      <primitive object={torusCoverMesh3} />
      {silosCoverCylinderArray.map((el, i) => (
        <primitive key={i} object={el} />
      ))}
      <primitive object={silosCoverTopMesh} />
      {/* <primitive object={silosCoverMesh} />
      <primitive object={silosBaseMesh} /> */}
      <primitive object={groundMesh} />

      <primitive object={ladderSideMesh1} />
      <primitive object={ladderSideMesh2} />
      <primitive object={ladderTorusSideMesh1} />
      <primitive object={ladderTorusSideMesh2} />
      {ladderFrontMeshArray.map((el, i) => (
        <primitive key={i} object={el} />
      ))}
      {ladderCableMeshArray.map((el, i) => (
        <primitive key={i} object={el} />
      ))}
      {ladderTorusFrontMeshArray.map((el, i) => (
        <primitive key={i} object={el} />
      ))}
      <primitive object={res} />
    </>
  );
};
