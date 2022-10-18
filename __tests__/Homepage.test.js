/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Characters from '../src/components/Characters';

describe('Characters', () => {
  it('Verify page title', async () => {
    render(<Characters />);

    await waitFor(() => expect(screen.findByText('STAR WARS')).toBeInTheDocument())
  });

  it('Verify all characters loaded', async () => {
    render(<Characters />);

    await waitFor(() => expect(screen.findByText('Luke Skywalker')).toBeInTheDocument())
    await waitFor(() => expect(screen.findByText('Tion Medon')).toBeInTheDocument())
  });
});

xdescribe('SearchFilter', () => {
  it('Verify homeworld filter works', async () => {
    render(<SearchFilter />);

    //await waitFor(() => expect(screen.getByText('STAR WARS')).toBeInTheDocument())
  });

  it('Verify name filter works', async () => {
    render(<SearchFilter />);

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });

  it('Verify both filters work together', async () => {
    render(<SearchFilter />);

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });

  it('Verify clear homeworld filter works', async () => {
    render(<SearchFilter />);

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });

  it('Verify clear name filter works', async () => {
    render(<SearchFilter />);

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });
});
