exports.slug = function (title) {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^آ-ی۰-۹a-zA-Z-]/g, "");
};
