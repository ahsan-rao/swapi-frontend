/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Characters from '../src/components/Characters';

const filter = jest.fn();

const characters = [
  {
  name: "Luke Skywalker",
	height: "172",
	mass: "77",
  hair_color: "blond",
	skin_color: "fair",
	eye_color: "blue",
	birth_year: "19BBY",
	gender: "male",
	homeworld: "https://swapi.dev/api/planets/1/",
	films: [
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/6/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/7/"
	],
	species: [
		"https://swapi.dev/api/species/1/"
	],
	vehicles: [
		"https://swapi.dev/api/vehicles/14/",
		"https://swapi.dev/api/vehicles/30/"
	],
	starships: [
		"https://swapi.dev/api/starships/12/",
		"https://swapi.dev/api/starships/22/"
	],
	created: "2014-12-09T13:50:51.644000Z",
	edited: "2014-12-20T21:17:56.891000Z",
	url: "https://swapi.dev/api/people/1/"
  },
  {
    name: "Chewbacca",
    height: "228",
    mass: "112",
    hair_color: "brown",
    skin_color: "unknown",
    eye_color: "blue",
    birth_year: "200BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/14/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/"
    ],
    species: [
      "https://swapi.dev/api/species/3/"
    ],
    vehicles: [
      "https://swapi.dev/api/vehicles/19/"
    ],
    starships: [
      "https://swapi.dev/api/starships/10/",
      "https://swapi.dev/api/starships/22/"
    ],
    created: "2014-12-10T16:42:45.066000Z",
    edited: "2014-12-20T21:17:50.332000Z",
    url: "https://swapi.dev/api/people/13/"
  }
]

describe('Characters', () => {

  beforeAll(async () => {

    waitFor(()=> render(<Characters {...characters}/>));
  })

  it('Verify page title', async () => {

    waitFor(() => expect(screen.findByText('STAR WARS')).toBeInTheDocument());
  });

  it('Verify all characters loaded', async () => {

    waitFor(() => expect(screen.findByText('Luke Skywalker')).toBeInTheDocument());
    waitFor(() => expect(screen.findByText('Chewbacca')).toBeInTheDocument());
    waitFor(() => expect(characters.length).toBe(2));
  });
});

describe('SearchFilter', () => {

  it('Verify if the homeworld input works', async () => {
    render(<Characters {...characters}/>)

    const planetInput = screen.getByPlaceholderText('Filter by homeworld');

    fireEvent.change(planetInput, { target: { value: 'Tatooine' } });

    waitFor(() => expect(planetInput.value).toBe('Tatooine'));
  });

  it('Verify if the name input works', async () => {
    render(<Characters {...characters}/>)

    const nameInput = screen.getByPlaceholderText('Filter by name');

    fireEvent.change(nameInput, { target: { value: 'Luke' } });

    waitFor(() => expect(nameInput.value).toBe('Luke'));
  });

  it('Verify if the clear button is rendered', async () => {

    waitFor(() => expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument());
  });

  it('Verify if clear homeworld filter button works', async () => {
    render(<Characters {...characters}/>)

    const planetInput = screen.getByPlaceholderText('Filter by homeworld');

    fireEvent.change(planetInput, { target: { value: 'Kashyyyk' } });

    const button = screen.getByTestId("clear-homeworld-filter-button");

    fireEvent.click(button);

    waitFor(() => expect(planetInput.value).toBe(''));
  });

  it('Verify if clear name filter button works', async () => {
    render(<Characters {...characters}/>)

    const nameInput = screen.getByPlaceholderText('Filter by name');

    fireEvent.change(nameInput, { target: { value: 'Chewbacca' } });

    const button = screen.getByTestId("clear-name-filter-button");

    fireEvent.click(button);

    waitFor(() => expect(nameInput.value).toBe(''));

  });
  
  //this test is still a work in progress
  xit('Verify if homeworld filter works', async () => {
    render(<Characters 
      {...characters}
      filter = {filter}/>)
    
    const planetInput = screen.getByPlaceholderText('Filter by homeworld');

    fireEvent.change(planetInput, { target: { value: 'Kashyyyk' } });

    expect(filter).toHaveBeenCalledWith(planetInput.value);
  });

  //this test is still a work in progress
  xit('Verify if name filter works', async () => {
    render(<Characters 
      {...characters}
      filter = {filter}/>)

    const nameInput = screen.getByPlaceholderText('Filter by name');

    fireEvent.change(nameInput, { target: { value: 'Chewbacca' } });

    expect(filter).toHaveBeenCalledWith(nameInput.value);
  });

});
