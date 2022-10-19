/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Characters from '../src/components/Characters';
import axios from 'axios';


describe('Characters', () => {

  beforeAll(async () => {
    waitFor(()=> render(<Characters characters/>))
  })

  it('Verify page title', async () => {
    waitFor(() => expect(screen.findByText('STAR WARS')).toBeInTheDocument());
  });

  it('Verify all characters loaded', async () => {
    waitFor(() => expect(screen.findByText('Luke Skywalker')).toBeInTheDocument())
    waitFor(() => expect(screen.findByText('Tion Medon')).toBeInTheDocument())
  });
});

describe('SearchFilter', () => {

  beforeAll(async () => {
    waitFor(()=> render(<Characters/>))
  })

  it('Verify homeworld filter works', async () => {

    const planetInput = screen.getByPlaceholderText('Filter for homeworld');

    fireEvent.change(planetInput, { target: { value: 'Tatooine' } });

    waitFor(() => expect(planetInput.value).toBe('tatooine'));
  });

  it('Verify name filter works', async () => {

    const nameInput = screen.getByPlaceholderText('Filter for name');

    fireEvent.change(nameInput, { target: { value: 'Luke' } });

    expect(nameInput.value).toBe('Luke');

    waitFor(() => expect(nameInput.value).toBe('Luke'));
  });

  xit('Verify both filters work together', async () => {

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });

  it('Verify if the clear button is rendered', async () => {

    waitFor(() => expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument());
});

  xit('Verify clear homeworld filter works', async () => {

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });

  xit('Verify clear name filter works', async () => {

    //await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    //await waitFor(() => expect(screen.getByText('Tion Medon')).toBeInTheDocument())
  });
});
