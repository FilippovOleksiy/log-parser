import {
  divideByLines,
  matchViews,
  fetchViews,
  sortByPageName,
  sortByViews,
  fetchUniqWebpages,
  fetchWebpages,
} from "./index";

const webpagesList = [
  ["/home", 30],
  ["/about", 1],
  ["/basket", 20],
];

const pages = `
/help_page 126.318.035.038
/help_page/2 126.318.035.038
/help_page/1 126.318.035.038
/contact 184.123.665.067
/home 184.123.665.067
/about/2 444.701.448.104
`;

const uniqPages = {
  "/about/2": 444701448104,
  "/contact": 184123665067,
  "/help_page": 126318035038,
  "/help_page/1": 126318035038,
  "/help_page/2": 126318035038,
  "/home": 184123665067,
};

const views = "126.318.035.038";
const viewsNumber = 126318035038;

describe("divideByLines", () => {
  it("should return lines", () => {
    const lines = divideByLines(pages);
    expect(lines.length).toEqual(6);
  });

  it("should return null", () => {
    const lines = divideByLines("");
    expect(lines).toEqual(null);
  });
});

describe("matchViews", () => {
  it("should return a matched views", () => {
    const matchedViews = matchViews(views);
    expect(matchedViews).toEqual(["126", "318", "035", "038"]);
  });

  it("should return null", () => {
    const matchedViews = matchViews("test string");
    expect(matchedViews).toEqual(null);
  });
});

describe("fetchViews", () => {
  it("should return a number of views", () => {
    const fetchedViews = fetchViews(views);
    expect(fetchedViews).toEqual(viewsNumber);
  });

  it("should throw an error", () => {
    expect(() => fetchViews("test string")).toThrow(TypeError);
  });
});

describe("sortByPageName", () => {
  it("should sort alphabetical", () => {
    const sortedList = sortByPageName(webpagesList);
    expect(sortedList).toEqual([
      ["/about", 1],
      ["/basket", 20],
      ["/home", 30],
    ]);
  });
});

describe("sortByViews", () => {
  it("should sort ASC", () => {
    const sortedList = sortByViews(webpagesList);
    expect(sortedList).toEqual([
      ["/home", 30],
      ["/basket", 20],
      ["/about", 1],
    ]);
  });
});

describe("fetchUniqWebpages", () => {
  it("should fetch uniq pages", () => {
    const fetchedUniqPages = fetchUniqWebpages(pages);
    expect(fetchedUniqPages).toEqual({
      "/about/2": 444701448104,
      "/contact": 184123665067,
      "/help_page": 126318035038,
      "/help_page/1": 126318035038,
      "/help_page/2": 126318035038,
      "/home": 184123665067,
    });
  });
});

describe("fetchWebpages", () => {
  it("should fetch pages", () => {
    const fetchedPages = fetchWebpages(Object.entries(uniqPages));
    expect(fetchedPages).toEqual({
      "/about": 444701448104,
      "/contact": 184123665067,
      "/help_page": 378954105114,
      "/home": 184123665067,
    });
  });
});
