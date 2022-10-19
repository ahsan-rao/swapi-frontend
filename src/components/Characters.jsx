import React, { useEffect, useState } from 'react';
import axios from 'axios'

import CharacterCard from './CharacterCard';
import DetailsModal from './DetailsModal';
import SearchFilter from './SearchFilter';

//component rendering the container for the cards
const Characters = () => {
  //fetchedChars keeps track of whether the fetch has been completed yet or not
  const [fetchedChars, setFetchedChars] = useState(false);
  const [characters, setCharacters] = useState([]);

  //storing a copy of the characters from the fetch used for filtering in SearchFilter
  const [charactersOrg, setCharactersOrg] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);

  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    position: { top: 0, left: 0 },
    id: null
  })

  const reset = () => {
    setCharacters(charactersOrg);
  }

  //fetching the data once upon mounting of component and saving it to state. Using pagination to access data from all pages of each endpoint.
  const fetchData = async () => {
    let charPage = 1;
    let charPages = 9;
    let charData = [];
    
    while (charPage <= charPages) {
      let url = `https://swapi.dev/api/people/?page=${charPage}`;
      const charResponse = await axios.get(url);
      charResponse.data.results.forEach(el => {
         charData.push(el);
      })
      charPage++
    }

    let planetPage = 1;
    let planetPages = 6;
    let planetData = [];

    while (planetPage <= planetPages) {
        let url = `https://swapi.dev/api/planets/?page=${planetPage}`;
        const planetResponse = await axios.get(url);
        planetResponse.data.results.forEach(el => {
            planetData.push(el);
        })
        planetPage++
      }

      let speciesPage = 1;
      let speciesPages = 4;
      let speciesData = [];
  
    while (speciesPage <= speciesPages) {
        let url = `https://swapi.dev/api/species/?page=${speciesPage}`;
        const speciesResponse = await axios.get(url);
        speciesResponse.data.results.forEach(el => {
            speciesData.push(el);
        })
        speciesPage++
    }

    //replacing the homeworld and species urls in characters with their respective names
    charData = charData.map(char => {
        const homeworld = planetData.find(
            (planet) => planet.url === char.homeworld
        )

        const species = speciesData.find(
            (sp) => char.species.includes(sp.url)
        )

        char.homeworld = homeworld.name;
        char.species = species ? species.name : 'n/a';

        return char;
    })

    setCharacters(charData);
    setCharactersOrg(charData);
    setPlanets(planetData);
    setSpecies(speciesData);
    setFetchedChars(true);
  }

  useEffect (() => {
    if (fetchedChars === true) return;
    fetchData();
  }, [])


  const openModal = (type, position, id) => {
    setModalState({
        ...modalState,
        open: true,
        type,
        position,
        id
    })
  }

  const closeModal = () => {
    setModalState({
        ...modalState,
        open: false
    })
  }

    //rendering individual card for each element of the characters array
    const charElems = characters.map((char, i) => {
        return (
        <CharacterCard
          key={i}
          info={char}
          openModal={openModal}
        />
        )
    });
  
    return (
      <section className="mainSection">
        <header className="pageHeader">
         <h1>STAR WARS</h1>
        </header>
        <div>
          <SearchFilter
          planets = {planets}
          characters = {characters}
          setCharacters = {setCharacters}
          reset = {reset}
          charactersOrg = {charactersOrg}
          />
        </div>
        <div className="charContainer">
        {fetchedChars ? (characters.length ? charElems : "Sorry, no characters found!") : "Loading data, please wait..."}
        </div>
        {modalState.open &&
          <DetailsModal
            type={modalState.type}
            position={modalState.position}
            id={modalState.id}
            closeModal={closeModal}
            planets = {planets}
            species = {species}
          />
        }
      </section>
    );
  }

export default Characters;
