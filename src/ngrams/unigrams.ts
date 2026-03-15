// Log-probabilities of English letter unigrams.
// Derived from bigram frequencies (sum of P(xy) over all y for each x).
// Original bigram source: Peter Norvig, Google Web Trillion Word Corpus (public domain)
// http://norvig.com/ngrams/count_2l.txt
export const UNIGRAM_LOG_PROB: Record<string, number> = {
  e: -2.186224,
  a: -2.448764,
  t: -2.47288,
  o: -2.501531,
  i: -2.516878,
  n: -2.681277,
  r: -2.700564,
  s: -2.800337,
  l: -3.133597,
  c: -3.206786,
  h: -3.266123,
  d: -3.428238,
  u: -3.464367,
  m: -3.543925,
  p: -3.613343,
  f: -3.87574,
  g: -3.926056,
  b: -4.025837,
  w: -4.158706,
  y: -4.284818,
  v: -4.386163,
  k: -4.895394,
  x: -5.875251,
  j: -5.90304,
  q: -6.558017,
  z: -6.560645,
};

export const MIN_UNIGRAM_LOG_PROB = -11.560645;
