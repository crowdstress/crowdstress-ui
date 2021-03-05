import React from 'react';
import styled from 'styled-components';

import { BORDER_COLOR, WHITE_COLOR } from '@/components/ui/colors';

interface WidgetProps {
  title?: string;
}

const WidgetContainer = styled.div`
  width: 30rem;
  background: ${WHITE_COLOR};
  padding: 2rem;
  border: 1px solid ${BORDER_COLOR};
  border-radius: .5rem;
`;

const WidgetTitle = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const Widget: React.FC<WidgetProps> = ({ title, children }) =>
  <WidgetContainer>
    <WidgetTitle>{ title }</WidgetTitle>
    { children }
  </WidgetContainer>;
