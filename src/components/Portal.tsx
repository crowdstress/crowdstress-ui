import React from 'react';
import { MODAL_NODE_ID } from '@/config';
import ReactDOM from 'react-dom';

const modalNode = document.getElementById(MODAL_NODE_ID);

export const Portal: React.FC = ({ children }) => {
  return modalNode ? ReactDOM.createPortal(children, modalNode) : null;
};
