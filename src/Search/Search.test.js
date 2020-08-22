import { screen, render, fireEvent } from "@testing-library/react"
import React from "react"
import Search from "./Search"
import "@testing-library/jest-dom"

describe("Search", () => {
  let mockSearchMovies;

  beforeEach(() => {
    mockSearchMovies = jest.fn();
    render(<Search searchMovies={mockSearchMovies} />);
  });

  it("should have a search button button", () => {
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("should have input field", () => {
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by title, genre, year")
    ).toBeInTheDocument();
  });

  it("Should run the search function when the search button is clicked", () => {
    const searchButton = screen.getByRole('button', {name: 'Search'})
    fireEvent.click(searchButton, {target: {value: "Birdman"}})
    expect(mockSearchMovies).toBeCalledTimes(1);
  });
});
