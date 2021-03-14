import React from 'react';
import styled from 'styled-components';

import { BLACK_COLOR, BORDER_COLOR, GRAY_COLOR, WHITE_COLOR } from '@/components/ui/colors';
import { fontPrimaryLight, fontPrimaryRegular } from '@/components/ui/fonts';

interface CardProps {
  description?: string;
  onClick?: () => void;
  title?: string;
}

const CardContainer = styled.div`
  background: ${WHITE_COLOR};
  padding: 2rem;
  border: 1px solid ${BORDER_COLOR};
  border-radius: .5rem;
  cursor: pointer;
  user-select: none;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.div`
  color: ${BLACK_COLOR};
  margin-bottom: 1rem;
  ${fontPrimaryRegular(16)};
`;

const CardDescription = styled.div`
  color: ${GRAY_COLOR};
  ${fontPrimaryLight(14)};
`;

export const Card: React.FC<CardProps> = ({ title, description, onClick }) =>
  <CardContainer onClick={onClick}>
    <CardTitle>{ title }</CardTitle>
    <CardDescription>{ description }</CardDescription>
  </CardContainer>;
