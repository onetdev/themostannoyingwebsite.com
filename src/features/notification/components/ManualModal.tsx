'use client';

import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { cssVars } from '@/styles/theme';
import DimmerOverlay from '@/components/atoms/DimmerOverlay';
import Button from '@/components/atoms/Button';

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};
const ManualModal: FunctionComponent<ManualModalProps> = ({
  visible = false,
  onDismiss,
}) => {
  const { t } = useTranslation('common');

  return (
    <DimmerOverlay visible={visible}>
      <Wrapper>
        <Title>{t('experiences.notification_permission_manual.title')}</Title>
        <p>{t('experiences.notification_permission_manual.description')}</p>
        <Button onClick={onDismiss}>{t('actions.dismiss')}</Button>
      </Wrapper>
    </DimmerOverlay>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 1rem;
  left: 5rem;
  padding: 1rem 2rem;
  max-width: min(calc(100vw - 10rem), 30rem);
  background: ${cssVars.color.surface};
  color: ${cssVars.color.onSurface};
  border-radius: 0.5rem;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;

export default ManualModal;
