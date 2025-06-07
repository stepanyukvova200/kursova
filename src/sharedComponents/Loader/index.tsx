import React from 'react';
import { Spinner } from 'reactstrap';
import './style.scss';

interface IProps {
  size?: 'sm';
}

const Loader: React.FC<IProps> = ({ size }) => (
  <div className="loaderWrapper">
    <Spinner animation="border" size={size} />
  </div>
);

export default Loader;
