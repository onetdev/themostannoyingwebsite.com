import { mb_string_to_char_array } from '@/utils/string';

type StringMarqueeOpts = {
  width?: number;
  gapLength?: number;
  gapChar?: string;
};
const string_marquee = (
  text: string,
  t = 0,
  { width = 30, gapLength = 5, gapChar = ' ' }: StringMarqueeOpts = {},
) => {
  const source = [
    ...mb_string_to_char_array(text),
    ...new Array(gapLength).fill(gapChar),
  ];
  const tModulo = t % source.length;
  let output = '';
  for (let i = 0; i < width; i++) {
    output += source[(tModulo + i) % source.length];
  }

  return output;
};

export default string_marquee;
