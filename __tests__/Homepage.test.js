/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../src/App';

describe('App', () => {
  it('Verify page title', () => {
    render(<App />);

    expect(screen.getByText('SWAPI FRONTEND APP')).toBeInTheDocument();
  });
});
