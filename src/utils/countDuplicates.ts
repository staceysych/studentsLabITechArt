export const countDuplicates = (values) =>
  values.reduce((acc, cur) => {
    acc[cur.id] = ++acc[cur.id] || 1;
    return acc;
  }, {});
