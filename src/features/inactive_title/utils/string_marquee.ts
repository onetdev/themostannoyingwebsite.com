type StringMarqueeOpts = {
  width?: number;
  loopSpace?: number;
  separatorChar?: string;
};
const string_marquee = (
  input: string,
  t = 0,
  { width = 30, loopSpace = 5, separatorChar = ' ' }: StringMarqueeOpts = {},
) => {
  const requiredRepeats = Math.ceil(width / (input.length + loopSpace));
  const inputSpaced = input
    .padEnd(input.length + loopSpace, separatorChar)
    .repeat(requiredRepeats);
  const tLocal = t % (input.length + loopSpace);

  let output = inputSpaced.slice(tLocal, tLocal + width);
  const lengthDiff = Math.abs(output.length - width);
  if (lengthDiff > 0) {
    output += inputSpaced.slice(0, lengthDiff);
  }

  return output;
};

export default string_marquee;
