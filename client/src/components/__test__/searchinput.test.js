import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../Form/SearchInput";
import { SearchProvider } from "../../context/search";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("SearchInput component", () => {
    test("renders a form with an input and a button", () => {
        render(
            <BrowserRouter>
                <SearchProvider>
                    <SearchInput />
                </SearchProvider>
            </BrowserRouter>
        );
        // expect(screen.getByRole("search")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    test("updates the input value on change", () => {
        render(
            <BrowserRouter>
                <SearchProvider>
                    <SearchInput />
                </SearchProvider>
            </BrowserRouter>
        );
        const input = screen.getByPlaceholderText("Search");
        fireEvent.change(input, { target: { value: "react" } });
        expect(input.value).toBe("react");
    });

    test("submits the form and calls the API with the input value", async () => {
        render(
            <BrowserRouter>
                <SearchProvider>
                    <SearchInput />
                </SearchProvider>
            </BrowserRouter>
        );
        const input = screen.getByPlaceholderText("Search");
        const button = screen.getByRole("button", { name: /search/i });
        fireEvent.change(input, { target: { value: "react" } });
        fireEvent.click(button);
        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API}/api/v1/product/search/react`
        );
    });
});
