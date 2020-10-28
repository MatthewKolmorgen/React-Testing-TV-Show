import React from 'react';
import App from './App';
import { render, fireEvent, wait, waitFor } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/FetchShow.js';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockEpisodes = [
    {
        id: null,
        image: null,
        name: null,
        season: null,
        number: null,
        summary: null,
        runtime: null
    }
]

jest.mock('./api/FetchShow.js')

test('Renders app', () => {
    render(<App />);
  });

test('Nothing Rendered', () => {
    const { queryAllByTestId } = render(<App />)
    
    expect(queryAllByTestId('episode')).toHaveLength(0)
  });
  test('Api call', async () => {
    mockFetchShow.mockResolvedValueOnce({data: mockEpisodes})

    
    const { findByText, getAllByText }= render(<App />)
    
    await findByText(/fetching data.../i)

    const dropdown = await findByText(/Select a season/i)
    await act(async () => {
    userEvent.click(dropdown)
    })
    const seasonOne = await findByText(/Season 1/i)
    await act(async () => {
    fireEvent.click(seasonOne)
    })
    await waitFor(() => {
        expect(getAllByText(/episode/i)).toHaveLength(8)
    })

})