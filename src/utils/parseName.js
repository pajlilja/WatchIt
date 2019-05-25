/**
 * Function that converts a_string_like_this to A string like this
 */
export default name =>
  (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, " ");
