import React, { useEffect, useState } from 'react';
import axios from 'axios'

import CharacterCard from './CharacterCard';
import DetailsModal from './DetailsModal';
import SearchFilter from './SearchFilter'

const Characters = () => {

  const [fetchedChars, setFetchedChars] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);

  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    position: { top: 0, left: 0 },
    id: null
  })

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
    setPlanets(planetData);
    setSpecies(speciesData);
    setFetchedChars(true);
  }

  useEffect (() => {
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

    if (!fetchedChars) return (
      <div className = 'pageHeader'>
        <h1>Loading data, please wait...</h1>
      </div>
    );

    if (!characters) return null;

    if (!characters.length) return (
      <div>Sorry, no characters found</div>
    );


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
          <h2>STAR WARS</h2>
        </header>
        <div>
          <SearchFilter
          planets = {planets}
          characters = {characters}
          setCharacters = {setCharacters}
          />
        </div>
        <div className="charContainer">
        {charElems}
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
