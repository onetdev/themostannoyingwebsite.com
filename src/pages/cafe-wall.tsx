import { NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from '@/lib/utils/i18n';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import ColorPickerInput from '@/components/atoms/ColorPickerInput';
import TextInput from '@/components/atoms/TextInput';
import LabeledChild from '@/components/molecules/LabeledChild';

const defaultValues: CafeWallForm = {
  tileColorA: '#fe9aff',
  tileColorB: '#cd32ff',
  diamondColorA: '#04993b',
  diamondColorB: '#9dfc00',
  tileSize: 50,
  width: 8,
  height: 8,
  pattern: [true, false, false, true, false, true, true, false],
};

// Inspo: https://www.reddit.com/r/opticalillusions/comments/1cd0hlp/all_the_lines_are_straight/
const CafeWall: NextPage = () => {
  const { t } = useTranslation();
  const [config, setConfig] = useState(defaultValues);
  const { register, handleSubmit, reset, watch } = useForm<CafeWallForm>({
    defaultValues,
  });

  const formValues = watch();

  const bgImageSvg = useMemo(() => genImage(formValues), [formValues]);
  const bgImageData = useMemo(
    () => `data:image/svg+xml,${encodeURIComponent(bgImageSvg)}`,
    [bgImageSvg],
  );

  const onReset = () => {
    reset(defaultValues);
  };
  const onSubmit: SubmitHandler<CafeWallForm> = (data) => {
    setConfig(data);
  };

  return (
    <main>
      <h1>{t('cafeWall.title')}</h1>
      <p>{t('cafeWall.description')}</p>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
        className="grid grid-cols-4 gap-4 py-4">
        <div className="flex flex-col gap-4">
          <LabeledChild label={t('cafeWall.tileColorA')}>
            <ColorPickerInput
              {...register('tileColorA')}
              displayValue={formValues.tileColorA}
            />
          </LabeledChild>
          <LabeledChild label={t('cafeWall.tileColorA')}>
            <ColorPickerInput
              {...register('tileColorB')}
              displayValue={formValues.tileColorB}
            />
          </LabeledChild>
          <LabeledChild label={t('cafeWall.diamondColorA')}>
            <ColorPickerInput
              {...register('diamondColorA')}
              displayValue={formValues.diamondColorA}
            />
          </LabeledChild>
          <LabeledChild label={t('cafeWall.diamondColorA')}>
            <ColorPickerInput
              {...register('diamondColorB')}
              displayValue={formValues.diamondColorB}
            />
          </LabeledChild>
        </div>
        <div className="flex flex-col gap-4">
          <LabeledChild label={t('cafeWall.tileSize')} reverse>
            <TextInput
              type="number"
              min={1}
              {...register('tileSize', { value: 20, min: 1 })}
              value={formValues.tileSize}
            />
          </LabeledChild>
          <LabeledChild label={t('cafeWall.width')} reverse>
            <TextInput
              type="number"
              min={2}
              step={2}
              {...register('width', { value: 8, min: 1 })}
              value={formValues.width}
            />
          </LabeledChild>
          <LabeledChild label={t('cafeWall.height')} reverse>
            <TextInput
              type="number"
              min={2}
              step={2}
              {...register('height', { value: 8, min: 1 })}
              value={formValues.height}
            />
          </LabeledChild>
        </div>
        <div className="">
          <span>Pattern</span>
          {Array.from({ length: formValues.width }, (_, i) => i).map((i) => (
            <label key={i} className="flex items-center gap-3">
              <Checkbox
                {...register(`pattern.${i}`)}
                checked={formValues.pattern[i]}
              />
              <span>{i}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <Button type="reset" variant="tertiary">
            {t('common.reset')}
          </Button>
        </div>
      </form>
      <div
        className="relative w-full overflow-hidden bg-repeat pt-9/16 md:pt-16/9"
        style={{
          backgroundImage: `url('${bgImageData}')`,
        }}>
        <Image
          src={bgImageData}
          alt=""
          width={config.tileSize}
          height={config.tileSize}
          className="absolute top-0 size-full opacity-0"
        />
      </div>
    </main>
  );
};

const genImage = (config: CafeWallForm) => {
  const size = config.tileSize;
  // Magic number is related to the diamond group size
  const diamondScale = config.tileSize / 65;

  const diamond = (x: number, y: number, color: string) => `
    <g transform="translate(${x}, ${y}) rotate(0) scale(${diamondScale})" fill="${color}">
      <path d="M10 2 L15 10 L10 18 L5 10 Z" transform="translate(-10, -2)" />
      <path d="M10 2 L15 10 L10 18 L5 10 Z" transform="translate(2, -10) rotate(90)" />
      <path d="M10 2 L15 10 L10 18 L5 10 Z" transform="translate(10, 2) rotate(180)" />
      <path d="M10 2 L15 10 L10 18 L5 10 Z" transform="translate(-2, 10) rotate(270)" />
    </g>
  `;

  const rect = (x: number, y: number, color: string) => `
    <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" />
  `;

  const rectList = [];
  for (let i = 0; i < config.width; i++) {
    for (let j = 0; j < config.height; j++) {
      rectList.push(
        rect(
          i * size,
          j * size,
          (i + j) % 2 ? config.tileColorA : config.tileColorB,
        ),
      );
    }
  }

  const diamondList = [];
  for (let i = 0; i <= config.width; i++) {
    for (let j = 0; j <= config.height; j++) {
      const color = config.pattern[(i + j) % config.pattern.length]
        ? config.diamondColorA
        : config.diamondColorB;
      diamondList.push(diamond(i * size, j * size, color));
    }
  }

  return `
    <svg width="${size * config.width}" height="${size * config.height}" xmlns="http://www.w3.org/2000/svg">
      ${rectList.join('')}
      ${diamondList.join('')}
    </svg>
  `;
};

type CafeWallForm = {
  tileColorA: string;
  tileColorB: string;
  tileSize: number;
  diamondColorA: string;
  diamondColorB: string;
  height: number;
  width: number;
  pattern: boolean[];
};

export default CafeWall;
