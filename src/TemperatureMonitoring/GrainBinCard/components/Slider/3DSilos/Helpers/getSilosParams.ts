export const silosParams = {
  position: [0, 0, 0],
  width: 16,
  height: 32,
  doorPosition: [0, 0, 0],
  ladderPosition: [0, 0, 0],
};

export const radii = (circles: number) =>  {
  
  const baseRadius =  ( silosParams.width)  / (circles+1 );

  return {
  '-1': 0,
  0: baseRadius,
  1: baseRadius * 2,
  2: baseRadius * 3,
  }
}

const yPosition = {
  '-1': silosParams.height * 0.1,
  0: silosParams.height * 0.05,
  1: silosParams.height * 0,
  2: 0,
};

export const calculateColumnSensorsPosition = (
  position: number[],
  r: number,
  theta: number,
  suspensionPosition: any,
) => {
  const thetaRadians = (theta * Math.PI) / 180;
  const x = position[0] + r * Math.cos(thetaRadians);
  const y = position[1] + yPosition[suspensionPosition];
  const z = position[2] + r * Math.sin(thetaRadians);
  return [x, y, z];
};

export const getColumnSensorsHeight = (suspensionPosition: any) =>
  // eslint-disable-next-line no-nested-ternary
  suspensionPosition === 0
    ? silosParams.height * 0.9
    : suspensionPosition === 1
    ? silosParams.height * 0.8
    : silosParams.height;
