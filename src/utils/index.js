const lineRegex = /\/.*/g;
const viewsRegex = /\d+/g;
export const divideByLines = (text) => text.match(lineRegex);
export const matchViews = (text) => text.match(viewsRegex);
export const fetchViews = (text) => Number.parseInt(matchViews(text).join(""));
export const sortByPageName = (list) =>
  list.sort(([a], [b]) => {
    if (b > a) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  });
export const sortByViews = (list) => list.sort(([, a], [, b]) => b - a);
export const fetchUniqWebpages = (content) => {
  const pages = {};
  divideByLines(content).forEach((line) => {
    const strings = line.split(" ");
    const webpageName = strings[0];
    const views = fetchViews(strings[1]);
    pages[webpageName] = (pages[webpageName] || 0) + views;
  });
  return pages;
};
export const fetchWebpages = (content) => {
  const pages = {};
  content.forEach(([key, views]) => {
    const webpageName = `/${key.split("/")[1]}`;
    pages[webpageName] = (pages[webpageName] || 0) + views;
  });
  return pages;
};
