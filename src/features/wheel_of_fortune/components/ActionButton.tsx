import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';
import { styled, keyframes } from 'styled-components';

import { cssVars } from '@/styles/theme';
import DimmerOverlay from '@/components/atoms/DimmerOverlay';

import ModalContent from './ModalContent';

const zIndexBase = 30;

const wiggleAnim = keyframes`
  0% { transform: rotate(0deg); }
  90% { transform: rotate(0deg); }
  92% { transform: rotate(8deg); }
  94% { transform: rotate(-8deg); }
  96% { transform: rotate(8deg); }
  98% { transform: rotate(-8deg); }
  100% { transform: rotate(0deg); }
`;
const Wrap = styled.div`
  position: fixed;
  left: 0;
  top: 50%;
  z-index: ${zIndexBase};
`;
const Icon = styled.div`
  padding: 1rem 1rem 1rem 3rem;
  margin-left: -3rem;
  background: ${cssVars.color.error};
  color: ${cssVars.color.onError};
  opacity: 0.8;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  animation-name: ${wiggleAnim};
  animation-duration: 8s;
  animation-iteration-count: infinite;
  &:hover {
    margin-left: -1rem;
    opacity: 1;
  }
`;

const ActionButton: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrap>
      <DimmerOverlay
        show={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnClickOutside={false}
        closeOnEsc>
        <div onClick={(e) => e.stopPropagation()} hidden={!isOpen}>
          <ModalContent onClose={() => setIsOpen(false)} />
        </div>
      </DimmerOverlay>
      <Icon onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={['fas', 'tags']} />
      </Icon>
    </Wrap>
  );
};

export default ActionButton;
