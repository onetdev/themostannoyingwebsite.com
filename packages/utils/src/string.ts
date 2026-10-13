export const mb_string_to_char_array = (input: string) => {
  const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|./g;
  return input.match(regex) || [];
};
