import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';
import React, { FunctionComponent } from 'react';

import cssVars from '@/styles/css_vars';
import DimmerOverlay, {
  type DimmerOverlayProps,
} from '@/components/atoms/DimmerOverlay';

const Wrap = styled.div`
  background: ${cssVars.color.background};
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${cssVars.spacing.gap};
  min-width: min(400px, 100%);
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${cssVars.spacing.gap} ${cssVars.spacing.gap2x};
  border-bottom: 1px solid red;
  font-size: 1.5rem;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: bold;
`;
const CloseButton = styled.div`
  cursor: pointer;
`;
const Content = styled.div`
  padding: ${cssVars.spacing.gap} ${cssVars.spacing.gap2x};
  overflow: auto;
`;
const Actions = styled.div`
  padding: ${cssVars.spacing.gap} ${cssVars.spacing.gap2x};
`;

type ModalProps = DimmerOverlayProps & {
  title: string;
  actions: React.ReactNode;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  children,
  onClose: handleClose,
  actions,
  ...rest
}) => {
  return (
    <DimmerOverlay {...rest} onClose={handleClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose}>
            <FontAwesomeIcon icon={['fas', 'times']} />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
        {actions && <Actions>{actions}</Actions>}
      </Wrap>
    </DimmerOverlay>
  );
};

export default Modal;
