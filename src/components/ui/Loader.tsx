import React from 'react';
import styled from 'styled-components';

const LoaderSpinner = styled.div`

`;

export const Loader: React.FC = () =>
  <div className="flx-aic-jcc flx-item-1">
    <LoaderSpinner>Loading...</LoaderSpinner>
  </div>;
