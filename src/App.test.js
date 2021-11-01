import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

import App from "./App";
import Tabs from "./components/Tabs";
import Table from "./components/Table";
import { GlobalContextProvider } from "./hooks/globalContextProvider";
import { tabsList } from "./utils/constants";
import { fetchUniqWebpages } from "./utils/index";

const pages = `
/help_page 126.318.035.038
/help_page/2 126.318.035.038
/help_page/1 126.318.035.038
/contact 184.123.665.067
/home 184.123.665.067
/about/2 444.701.448.104
`;

describe("App", () => {
  it("snapshot should match", () => {
    const tree = renderer
      .create(
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Tabs", () => {
  it("snapshot should match", () => {
    const tree = renderer
      .create(
        <GlobalContextProvider>
          <Tabs />
        </GlobalContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("first tab should be selected", () => {
    const rendered = render(
      <GlobalContextProvider>
        <Tabs />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText(tabsList[0]));
    const div = rendered.container.querySelector("div.Tab-item--selected");

    expect(div.innerHTML).toEqual(tabsList[0]);
  });

  it("second tab should be selected", () => {
    const rendered = render(
      <GlobalContextProvider>
        <Tabs />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText(tabsList[1]));
    const div = rendered.container.querySelector("div.Tab-item--selected");

    expect(div.innerHTML).toEqual(tabsList[1]);
  });
});

describe("Table", () => {
  it("snapshot should match", () => {
    const webpages = fetchUniqWebpages(pages);
    const tree = renderer
      .create(
        <GlobalContextProvider>
          <Table webpages={Object.entries(webpages)} />
        </GlobalContextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("sort by Views ASC", () => {
    const webpages = fetchUniqWebpages(pages);
    const rendered = render(
      <GlobalContextProvider>
        <Table webpages={Object.entries(webpages)} />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText("Views"));
    const div = rendered.container.querySelector("div.Sort--selected");

    expect(div.innerHTML).toEqual(
      'Views<span class="Sort-direction">(N..n)</span>'
    );
  });

  it("sort by Views DESC", () => {
    const webpages = fetchUniqWebpages(pages);
    const rendered = render(
      <GlobalContextProvider>
        <Table webpages={Object.entries(webpages)} />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText("Views"));
    userEvent.click(screen.getByText("Views"));
    const div = rendered.container.querySelector("div.Sort--selected");

    expect(div.innerHTML).toEqual(
      'Views<span class="Sort-direction">(n..N)</span>'
    );
  });

  it("sort by Webpage name DESC", () => {
    const webpages = fetchUniqWebpages(pages);
    const rendered = render(
      <GlobalContextProvider>
        <Table webpages={Object.entries(webpages)} />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText("Webpage name"));
    const div = rendered.container.querySelector("div.Sort--selected");

    expect(div.innerHTML).toEqual(
      'Webpage name<span class="Sort-direction">(Z..A)</span>'
    );
  });

  it("sort by Webpage name ASC", () => {
    const webpages = fetchUniqWebpages(pages);
    const rendered = render(
      <GlobalContextProvider>
        <Table webpages={Object.entries(webpages)} />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText("Webpage name"));
    userEvent.click(screen.getByText("Webpage name"));
    const div = rendered.container.querySelector("div.Sort--selected");

    expect(div.innerHTML).toEqual(
      'Webpage name<span class="Sort-direction">(A..Z)</span>'
    );
  });

  it("change sort parameter", () => {
    const webpages = fetchUniqWebpages(pages);
    const rendered = render(
      <GlobalContextProvider>
        <Table webpages={Object.entries(webpages)} />
      </GlobalContextProvider>
    );
    userEvent.click(screen.getByText("Webpage name"));
    userEvent.click(screen.getByText("Views"));
    const div = rendered.container.querySelector("div.Sort--selected");

    expect(div.innerHTML).toEqual(
      'Views<span class="Sort-direction">(N..n)</span>'
    );
  });
});
