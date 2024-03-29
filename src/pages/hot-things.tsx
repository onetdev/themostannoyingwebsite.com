import { MouseEventHandler, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { makeI18nStaticProps } from '@/utils/i18n';
import SiteTitle from '@/components/atoms/SiteTitle';

const IconWrap = styled.div`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  font-size: 80px;
  z-index: 2;
  cursor: pointer;
`;
const Placeholder = styled.div`
  display: block;
  position: relative;
`;
const PlayerWrap = styled.div`
  position: relative;
`;
const VideoPlayer = styled.video`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const PlaceholderImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const HotThings: NextPage = () => {
  const [isCapable] = useState(
    'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
  );
  const { t } = useTranslation('common');
  const [_devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isStreamStarted, setStreamStarted] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  const videoConstraints = {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
    facingMode: 'user',
  };

  const startStream = async (constraints: MediaStreamConstraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  };

  const handleStream = (stream: MediaStream) => {
    if (!playerRef.current) {
      return;
    }

    playerRef.current.srcObject = stream;
    setStreamStarted(true);
  };

  const onIntent: MouseEventHandler<HTMLDivElement> = async () => {
    if (!isCapable) {
      return;
    }

    await navigator.mediaDevices.getUserMedia({ video: true });
    setDevices((await navigator.mediaDevices.enumerateDevices()) || []);
    startStream({ video: videoConstraints });
  };

  return (
    <main>
      <SiteTitle>{t('navigation.hotThings')}</SiteTitle>
      <h1>{t('navigation.hotThings')}</h1>
      <PlayerWrap>
        <Placeholder hidden={!isStreamStarted}>
          <IconWrap onClick={onIntent} hidden={isStreamStarted}>
            <FontAwesomeIcon icon={['fas', 'play-circle']} />
          </IconWrap>
          <PlaceholderImage
            src="/assets/images/lava.jpg"
            alt="Picture of you"
            width={1920}
            height={1080}
          />
        </Placeholder>
        <VideoPlayer ref={playerRef} autoPlay />
      </PlayerWrap>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['common']);
export default HotThings;
