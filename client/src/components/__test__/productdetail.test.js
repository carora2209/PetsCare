import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import UserMenu from '../Layout/UserMenu';

describe('UserMenu', () => {
    test('renders UserMenu component without crashing', () => {
        render(<Router><UserMenu /></Router>);
    });

    test('renders Profile and Orders links', () => {
        render(<Router><UserMenu /></Router>);

        const profileLinkElement = screen.getByText(/Profile/i);
        expect(profileLinkElement).toBeInTheDocument();
        expect(profileLinkElement.closest('a')).toHaveAttribute('href', '/dashboard/user/profile');

        const ordersLinkElement = screen.getByText(/Orders/i);
        expect(ordersLinkElement).toBeInTheDocument();
        expect(ordersLinkElement.closest('a')).toHaveAttribute('href', '/dashboard/user/orders');
    });
});
