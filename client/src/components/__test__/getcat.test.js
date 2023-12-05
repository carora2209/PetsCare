import React from 'react';
import { render, act } from '@testing-library/react';
import useCategory from '../../hooks/useCategory';
import axios from 'axios';

jest.mock('axios');

describe('useCategory hook', () => {
    it('returns an empty array initially', () => {
        let categories;

        // Render a component that uses the hook
        render(<TestComponent hook={() => (categories = useCategory())} />);

        // Expect the hook to return an empty array initially
        expect(categories).toEqual([]);
    });

    it('fetches the categories correctly', async () => {
        // Mock the axios.get function.
        axios.get.mockResolvedValue({
            data: {
                category: [
                    {
                        id: 1,
                        name: 'Electronics',
                    },
                ],
            },
        });

        let categories;

        // Render a component that uses the hook
        render(<TestComponent hook={() => (categories = useCategory())} />);

        // Wait for the hook to fetch the categories.
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Expect the hook to return the correct categories.
        expect(categories).toEqual([
            {
                id: 1,
                name: 'Electronics',
            },
        ]);
    });
});

// A test component to render the hook
const TestComponent = ({ hook }) => {
    hook();
    return null;
};
