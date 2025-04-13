'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Icon, PageHeadline } from '@maw/ui';
import { useTranslations } from 'next-intl';

export default function HotThingsPage() {
  const [isCapable, setIsCapable] = useState(false);
  const t = useTranslations();
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
    <main role="main">
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
        {isCapable && (
          <button
            className="absolute top-1/2 left-1/2 -mt-9 -ml-9 text-7xl"
            onClick={onIntent}
            hidden={Boolean(stream)}>
            <Icon icon="play" size="5xl" />
          </button>
        )}
      </div>
    </main>
  );
}
