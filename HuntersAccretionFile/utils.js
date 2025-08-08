// Generates an array of values evenly spaced from 0 to 'max' with the specified 'length'
const lspace = (length, max = 1) =>
  generate(length + 1, (i, nb) => (i / length) * max);

// Creates an array of length 'nb' by mapping over the keys of a newly created array
const generate = (nb, generator) =>
  [...Array(nb).keys()].map((i) => generator(i, nb));

// 'lspace' and 'generate' are utility functions for generating sequences of values
