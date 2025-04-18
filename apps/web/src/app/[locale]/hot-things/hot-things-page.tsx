'use client';

import { useLogger } from '@maw/logger';
import { Icon, PageHeadline } from '@maw/ui-lib';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function HotThingsPage() {
  const logger = useLogger().child({ page: 'hot-things-page' });
  const [isCapable, setIsCapable] = useState(false);
  const t = useTranslations();
  const [_devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [stream, setStream] = useState<MediaStream>();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isDisallowed, setIsDisallowed] = useState(false);

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

    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setDevices((await navigator.mediaDevices.enumerateDevices()) || []);
      startStream({ video: videoConstraints });
    } catch (err) {
      logger.warn('Error accessing media devices.', err);
      setIsDisallowed(true);
    }
  };

  useEffect(() => {
    setIsCapable(
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    );
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [stream]);

  return (
    <>
      <PageHeadline>{t('navigation.hotThings')}</PageHeadline>
      <div className="pb-16per9 relative overflow-hidden">
        <Image
          className="absolute h-auto w-full"
          src="/assets/images/lava.webp"
          alt={t('messages.info.pictureOfYou')}
          width={1920}
          height={1080}
        />
        <video
          playsInline
          className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          ref={playerRef}
          autoPlay
        />
        {!isDisallowed && isCapable && (
          <button
            className="absolute top-1/2 left-1/2 -mt-9 -ml-9 text-7xl"
            onClick={onIntent}
            hidden={Boolean(stream)}>
            <Icon icon="play" size="5xl" />
          </button>
        )}
        {isDisallowed && (
          <div className="text-error absolute top-1/2 left-1/2 -mt-9 -ml-9 text-7xl">
            <Icon icon="failed" size="5xl" />
          </div>
        )}
      </div>
    </>
  );
}
