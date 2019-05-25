/* eslint-disable func-names, prefer-rest-params */
/**
 * This creates a debounced version of a function.
 *
 * Example usage:
 * Create the debounced version of search(query):
 *
 * const debouncedSearch = createDebouncedFunc((query) => {
 *   search(query);
 * }, 1000);
 *
 * Then to use it:
 *
 * functionThatGetsCalledOften(query) {
 *   debouncedSearch(query);
 * }
 *
 * @param {Function} fn  Function to debounce
 * @param {Number} time  How long to debounce
 * @returns {Function}
 */
export default function createDebouncedFunc(fn, time = 500) {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}
