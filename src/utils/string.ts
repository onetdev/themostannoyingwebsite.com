import sanitizeHtml from 'sanitize-html';

import { mergeIntervals } from './array';

export const mb_string_to_char_array = (input: string) => {
  const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|./g;
  return input.match(regex) || [];
};

export const mb_string_slice = (input: string, start: number, end?: number) => {
  return mb_string_to_char_array(input).slice(start, end).join('');
};

export const first_letter_capitalize = (input: string) => {
  const letters = mb_string_to_char_array(input);
  if (letters.length === 0) {
    return '';
  }

  return letters[0]!.toUpperCase() + letters.slice(1).join('');
};

/**
 * Jaro-Winkler similarity between two strings
 * https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
 */
export const string_closeness = (s1: string, s2: string): number => {
  // If the strings are identical, similarity is 1
  if (s1 === s2) return 1.0;

  const s1Len = s1.length;
  const s2Len = s2.length;

  // If either string is empty, similarity is 0
  if (s1Len === 0 || s2Len === 0) return 0.0;

  // Define match window range
  const matchWindow = Math.floor(Math.max(s1Len, s2Len) / 2) - 1;
  const s1Matches = new Array(s1Len).fill(false);
  const s2Matches = new Array(s2Len).fill(false);

  // Count matches
  let matches = 0;
  for (let i = 0; i < s1Len; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, s2Len);

    for (let j = start; j < end; j++) {
      if (!s2Matches[j] && s1[i] === s2[j]) {
        s1Matches[i] = true;
        s2Matches[j] = true;
        matches++;
        break;
      }
    }
  }

  // If there are no matches, similarity is 0
  if (matches === 0) return 0.0;

  // Count transpositions
  let t = 0;
  let k = 0;
  for (let i = 0; i < s1Len; i++) {
    if (s1Matches[i]) {
      while (!s2Matches[k]) k++;
      if (s1[i] !== s2[k]) t++;
      k++;
    }
  }
  const transpositions = t / 2;

  // Calculate Jaro similarity
  const jaroSimilarity =
    (matches / s1Len + matches / s2Len + (matches - transpositions) / matches) /
    3.0;

  // Apply Winkler's prefix bonus
  let prefixLength = 0;
  for (let i = 0; i < Math.min(4, s1Len, s2Len); i++) {
    if (s1[i] === s2[i]) prefixLength++;
    else break;
  }

  const prefixScale = 0.1;
  const jaroWinklerSimilarity =
    jaroSimilarity + prefixLength * prefixScale * (1 - jaroSimilarity);

  return jaroWinklerSimilarity;
};

const string_cleanup = (raw: string) => {
  const string = sanitizeHtml(raw, { allowedTags: [], allowedAttributes: {} });
  return string
    .trim()
    .replace(/\t|\r|\n/g, ' ')
    .replace(/\s+/g, ' ');
};

export const fuzzy_search = ({
  contextRadiusLimit = 60,
  highlightCount = 3,
  highlightLength = 240,
  query,
  text,
  threshold = 0.87,
}: {
  contextRadiusLimit?: number;
  highlightCount?: number;
  highlightLength?: number;
  query: string;
  text: string;
  threshold?: number;
}) => {
  if (query === '') {
    return null;
  }

  const cleanText = string_cleanup(text);
  const queryTokens = string_cleanup(query).split(' ');

  const tokens: { text: string; score: number; offset: number }[] = [];
  const words = cleanText.split(' ');
  let offset = 0;
  for (let i = 0; i < words.length; i++) {
    tokens.push({
      offset: offset,
      score: 0,
      text: words[i],
    });
    offset += words[i].length + 1;
  }

  // Token scoring (multiple match scores can be applied to each token)
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    for (let j = 0; j < queryTokens.length; j++) {
      const queryToken = queryTokens[j];
      const score = string_closeness(
        token.text.toLowerCase(),
        queryToken.toLowerCase(),
      );

      if (score < threshold) {
        continue;
      }

      token.score += score;
    }
  }

  // We only need to apply scaling if the max value is greater than 1 which
  // might happens if a token has multiple matching query tokens.
  const stats = tokens.reduce(
    ({ maxScore, cumScore }, { score }) => ({
      maxScore: Math.max(maxScore, score),
      cumScore: cumScore + score,
    }),
    { maxScore: 1, cumScore: 0 },
  );

  const matches = tokens
    .map((token, index) => {
      const normalScore = token.score / stats.maxScore;
      return normalScore >= threshold
        ? {
            ...token,
            index,
            normalScore,
            onEdge: index === 0 || index === tokens.length - 1,
          }
        : null;
    })
    .filter((index) => index !== null)
    .sort((a, b) => b.normalScore - a.normalScore)
    .slice(0, highlightCount);

  if (matches.length === 0) {
    return null;
  }

  const edgeMatchCount = matches.filter(({ onEdge }) => onEdge).length;
  const matchStringLength = matches.reduce(
    (acc, { text }) => acc + text.length,
    0,
  );
  const availableSpread = Math.max(
    0,
    (highlightLength - matchStringLength) /
      (matches.length * 2 - edgeMatchCount),
  );
  const contextSpread = Math.min(availableSpread, contextRadiusLimit);

  const slices = matches.map(
    (token) =>
      [
        Math.max(0, token.offset - contextSpread),
        Math.min(cleanText.length, token.offset + contextSpread),
      ] as [number, number],
  );

  const normalSlices = mergeIntervals(slices);
  const resultUnmarked = normalSlices
    .map(([start, end]) => cleanText.slice(start, end))
    .join('[...]');

  const resultUnsafeMarked = matches.reduce(
    (carry, { text }) => carry.replaceAll(text, `<mark>${text}</mark>`),
    resultUnmarked,
  );

  // Cleanup nested <mark>s.
  // PS: I need to 🤮, but I don't have the luxury of time here :/
  const result = flattenSameTagNesting(resultUnsafeMarked, 'mark');

  return {
    tokens,
    matches,
    result,
    stats,
  };
};

const flattenSameTagNesting = (raw: string, tag: string) => {
  let depth = 0;
  const matcher = new RegExp(`(<${tag}>|</${tag}>)`, 'g');
  return raw.replaceAll(matcher, (match) => {
    if (match === `<${tag}>`) {
      depth++;
      return depth === 1 ? match : '';
    } else if (match === `</${tag}>`) {
      depth--;
      return depth === 0 ? match : '';
    }

    return '';
  });
};
