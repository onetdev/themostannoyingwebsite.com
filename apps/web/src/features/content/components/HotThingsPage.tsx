'use client';

import { useLogger } from '@maw/logger';
import { Icon, PageHeadline } from '@maw/ui-lib';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useAppConfig } from '@/contexts/AppConfig';

export function HotThingsPage() {
  const config = useAppConfig();
  const logger = useLogger().getSubLogger({ name: 'hot-things-page' });
  const [isCapable, setIsCapable] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
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
      logger.warn(err, 'Error accessing media devices.');
      setIsDisallowed(true);
    }
  };

  useEffect(() => {
    setIsCapable(
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    );
    return () =>
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
  }, [stream]);

  return (
    <>
      <PageHeadline>{t('navigation.hotThings')}</PageHeadline>
      <div className="pb-16per9 relative overflow-hidden">
        <Image
          className="absolute h-auto w-full"
          src={config.content.assets.lavaImage}
          alt={t('hotThings.pictureOfYou')}
          width={1920}
          height={1080}
        />
        <video
          playsInline
          className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          ref={playerRef}
          autoPlay
        >
          <track
            default
            kind="captions"
            srcLang={locale}
            src={
              config.content.assets.hotThingsVtt[locale] ??
              config.content.assets.hotThingsVtt.en
            }
            label={t('hotThings.hotThingsVtt')}
          />
        </video>
        {!isDisallowed && isCapable && (
          <button
            type="button"
            className="absolute top-1/2 left-1/2 translate-[-50%] cursor-pointer text-7xl"
            onClick={onIntent}
            hidden={Boolean(stream)}
            aria-label={t('hotThings.playVideo')}
          >
            <Icon icon="play" />
          </button>
        )}
        {isDisallowed && (
          <div
            role="alert"
            className="text-error absolute top-1/2 left-1/2 translate-[-50%] text-7xl"
          >
            <Icon
              icon="failed"
              aria-label={t('hotThings.videoPlaybackFailed')}
            />
          </div>
        )}
      </div>
    </>
  );
}
