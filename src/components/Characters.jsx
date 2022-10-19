import React, { useEffect, useState } from 'react';
import axios from 'axios'

import CharacterCard from './CharacterCard';
import DetailsModal from './DetailsModal';
import SearchFilter from './SearchFilter';

const Characters = () => {

  const [fetchedChars, setFetchedChars] = useState(false);
  const [characters, setCharacters] = useState([]);
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
    console.log('entered reset')
    setCharacters(charactersOrg);
  }

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
          fetchedChars = {fetchedChars}
          setFetchedChars = {setFetchedChars}
          setCharacters = {setCharacters}
          reset = {reset}
          charactersOrg = {charactersOrg}
          />
        </div>
        <div className="charContainer">
        {/* { (!characters.length && fetchedChars) ? ( <div>Sorry, no characters found</div> ) : charElems} */}
        {/* { (characters.length) ? ( charElems  ) : <div>Loading data, please wait...</div>} */}
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
