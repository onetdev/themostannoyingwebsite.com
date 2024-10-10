import { NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/atoms/Icon';
import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/utils/i18n';

const HotThings: NextPage = () => {
  const [isCapable, setIsCapable] = useState(false);
  const { t } = useTranslation('common');
  const [_devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [stream, setStream] = useState<MediaStream>();
  const playerRef = useRef<HTMLVideoElement>(null);

  const videoConstraints = {
    width: {
      ideal: 1920,
      max: 2560,
    },
    height: {
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
    setStream(stream);
  };

  const onIntent = async () => {
    if (!isCapable) {
      return;
    }

    await navigator.mediaDevices.getUserMedia({ video: true });
    setDevices((await navigator.mediaDevices.enumerateDevices()) || []);
    startStream({ video: videoConstraints });
  };

  useEffect(() => {
    setIsCapable(
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    );
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [stream]);

  return (
    <main>
      <SiteTitle>{t('navigation.hotThings')}</SiteTitle>
      <h2>{t('navigation.hotThings')}</h2>
      <div className="relative overflow-hidden pb-16/9">
        <Image
          className="absolute h-auto w-full"
          src="/assets/images/lava.jpg"
          alt="Picture of you"
          width={1920}
          height={1080}
        />
        <video
          playsInline
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          ref={playerRef}
          autoPlay
        />
        {isCapable && (
          <button
            className="absolute left-1/2 top-1/2 -ml-9 -mt-9 text-7xl"
            onClick={onIntent}
            hidden={Boolean(stream)}>
            <Icon icon="faPlayCircle" size="5xl" />
          </button>
        )}
      </div>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default HotThings;
