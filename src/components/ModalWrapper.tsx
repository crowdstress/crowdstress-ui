import React, { useRef } from 'react';
import styled from 'styled-components';

import IconClose from '@/assets/svg/close.svg';
import { Portal } from '@/components/Portal';
import { PRIMARY_COLOR } from '@/components/ui/colors';
import { fontPrimarySemibold } from '@/components/ui/fonts';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .15);
  z-index: 9;
`;

const Modal = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, .15);
  min-width: 25rem;
`;

const ModalHeader = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.div`
  color: ${PRIMARY_COLOR};
  ${fontPrimarySemibold(20)};
`;

const ModalBody = styled.div`
  padding: 0 2rem 2rem;
`;

interface ModalWrapperProps {
  onClose?: () => void;
  title?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> =
    ({ title, onClose, children }) => {
      const wrapper = useRef<HTMLDivElement>(null);

      const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();

        if (e.target === wrapper.current && onClose) {
          onClose();
        }
      };

      const handleModalClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        onClose && onClose();
      };

      return <Portal>
        <Wrapper ref={wrapper} className="flx-aic-jcc" onClick={handleWrapperClick}>
          <Modal>
            <ModalHeader className="flx-aic-jcsb">
              <ModalTitle>{title}</ModalTitle>
              <button onClick={handleModalClick}>
                <div className="icon-wrapper-s">
                  <IconClose />
                </div>
              </button>
            </ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
          </Modal>
        </Wrapper>
      </Portal>;
    };
