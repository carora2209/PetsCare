import React from "react";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import AdminMenu from '../Layout/AdminMenu';

describe("AdminMenu component", () => {
    test("renders a list of links for admin actions", () => {
        render(
            <BrowserRouter>
                <AdminMenu />
            </BrowserRouter>
        );
        expect(screen.getByText(/admin panel/i)).toBeInTheDocument();
        expect(screen.getByText(/create category/i)).toBeInTheDocument();
        expect(screen.getByText(/create product/i)).toBeInTheDocument();
        expect(screen.getByText(/products/i)).toBeInTheDocument();
        expect(screen.getByText(/orders/i)).toBeInTheDocument();
        // expect(screen.getByText(/users/i)).toBeInTheDocument();
    });

    test("renders the correct href for each link", () => {
        render(
            <BrowserRouter>
                <AdminMenu />
            </BrowserRouter>
        );
        expect(screen.getByText(/create category/i)).toHaveAttribute(
            "href",
            "/dashboard/admin/create-category"
        );
        expect(screen.getByText(/create product/i)).toHaveAttribute(
            "href",
            "/dashboard/admin/create-product"
        );
        expect(screen.getByText(/products/i)).toHaveAttribute(
            "href",
            "/dashboard/admin/products"
        );
        expect(screen.getByText(/orders/i)).toHaveAttribute(
            "href",
            "/dashboard/admin/orders"
        );
        // expect(screen.getByText(/users/i)).toHaveAttribute(
        //   "href",
        //   "/dashboard/admin/users"
        // );
    });
});
