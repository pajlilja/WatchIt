/**
 * Takes in an element and smooth scrolls horizontally it to scrollTarget.
 * Taken from: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
 *
 * Usage:
 * smoothScroll(element, 400, 300); <-- scroll to 400px from the left
 *
 * smoothScroll(element, element.scrollLeft + 300, 300); <-- scroll 300px from current position
 *
 * @param {Element} element
 * @param {Number} scrollTarget
 * @param {Number} animDuration
 */
export default function smoothScrollTo(element, scrollTarget, animDuration) {
  /* eslint-disable no-param-reassign */
  /* need to disable this rule so we can reassign element.scrollLeft */
  const target = Math.round(scrollTarget);
  const duration = Math.round(animDuration);

  if (duration < 0) {
    return Promise.reject(new Error("bad duration"));
  }
  if (duration === 0) {
    element.scrollLeft = target;
    return Promise.resolve();
  }

  const startTime = Date.now();
  const endTime = startTime + duration;

  const startTop = element.scrollLeft;
  const distance = target - startTop;

  // based on http://en.wikipedia.org/wiki/Smoothstep
  const smoothStep = (start, end, point) => {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    const x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  };

  return new Promise(resolve => {
    // This is to keep track of where the element's scrollLeft is
    // supposed to be, based on what we're doing
    let previousTop = element.scrollLeft;

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (element.scrollLeft !== previousTop) {
        // reject(new Error("interrupted"));
        // ^ can be used if you need to detect if
        // scroll has been interrupted
        return;
      }

      // set the scrollLeft for this frame
      const now = Date.now();
      const point = smoothStep(startTime, endTime, now);
      const frameTop = Math.round(startTop + distance * point);
      element.scrollLeft = frameTop;

      // check if we're done!
      if (now >= endTime) {
        resolve();
        return;
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        element.scrollLeft === previousTop &&
        element.scrollLeft !== frameTop
      ) {
        resolve();
        return;
      }
      previousTop = element.scrollLeft;

      // schedule next frame for execution
      setTimeout(scrollFrame, 0);
    };

    // boostrap the animation process
    setTimeout(scrollFrame, 0);
  });
}
