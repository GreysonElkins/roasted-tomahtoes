import {
  render,
  getByPlaceholderText,
  getByText,
  getByRole,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import MoviePage from "./MoviePage";
import "@testing-library/jest-dom";
