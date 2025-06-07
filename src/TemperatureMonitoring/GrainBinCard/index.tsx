import React from 'react';
import { GrainBinContainer } from './components/GrainBinContainer';
import { GrainBinLayout } from './components/GrainBinLayout';
import RightSidebar from './components/RightSidebar';

const GrainBinCard = () => (
  <GrainBinLayout>
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '0', paddingBottom: '24px', height: '100%' }}>
      <GrainBinContainer />
    </div>
    <RightSidebar />
  </GrainBinLayout>
);

export default GrainBinCard;
