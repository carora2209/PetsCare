
import Footer from "../Layout/Footer";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'

// Test that the component renders correctly.
test("Footer renders correctly", () => {
    const component = render(<BrowserRouter><Footer /></BrowserRouter>);

    // Expect the component to have the correct class name.
    expect(component.container.firstChild).toHaveClass("footer");

    // Expect the component to have the correct heading.
    expect(screen.getByText(/All Right Reserved © Chaitanya/i)).toBeInTheDocument();

    // Expect the component to have the correct links.
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();

    // Expect the links to have the correct hrefs.
    expect(screen.getByText(/About/i)).toHaveAttribute("href", "/about");
    expect(screen.getByText(/Contact/i)).toHaveAttribute("href", "/contact");
    expect(screen.getByText(/Privacy Policy/i)).toHaveAttribute("href", "/policy");
});
