export const mb_string_to_char_array = (input: string) => {
  const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|./g;
  return input.match(regex) || [];
};

export const mb_string_slice = (input: string, start: number, end?: number) => {
  return mb_string_to_char_array(input).slice(start, end).join('');
};
