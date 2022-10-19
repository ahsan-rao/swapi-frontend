import React, {useState, useEffect} from 'react';
import Combobox from 'react-widgets/Combobox';

//component to implement search/filter functionality
const searchFilter = ({
    planets,
    characters,
    setCharacters,
    reset,
    charactersOrg
}) => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [planetInput, setPlanetInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    // dynamic filter function utilized for both homeworld and name
    const filter = (characters, type, query) => {
        if (query === "") return characters;
        return characters.filter((data) => {
        return data[type].toLowerCase().includes(query.toLowerCase())
        });
      };

    // planet names to be used for the filter dropdown list
    const planetNames = planets.map(planet =>{
      return planet.name;
    }).sort();

    // character names to be used for the filter dropdown list
    const charNames = characters.map(char => {
      return char.name;
    }).sort();

    //updating the characters array based on any change in the planet or name input fields
    useEffect(() => {
      if (!planetInput && !nameInput) reset();
      else {
        let tmp = filter(charactersOrg, 'homeworld', planetInput);
        tmp = filter(tmp, 'name', nameInput);
        setCharacters(tmp)
      }
    }, [planetInput, nameInput])


  return (
<div className = 'searchContainer'>
    <div className = 'searchForm'>
      <Combobox
      aria-label = "Filter by homeworld" 
      placeholder = "Filter by homeworld"
      data = {planetNames}
      value = {planetInput}
      onChange = {(value) => {
          setPlanetInput(value);
          setQuery(value);
          setType("homeworld")
     }}/>
      <button 
      aria-label = "clear homeworld filter" 
      data-testid = "clear-homeworld-filter-button"
      onClick = {() =>
        {
        setPlanetInput(''); 
        if (planetInput || nameInput) {
          let tmp = filter(charactersOrg, 'name', nameInput);
          setCharacters(tmp);
        }}}>
          Clear
      </button>
    </div>

    <div className = 'searchForm'>
      <Combobox
      aria-label = "Filter by name" 
      placeholder = "Filter by name"
      data = {charNames}
      value = {nameInput}
      onChange = {(value) => {
          setNameInput(value);
          setQuery(value);
          setType("name")
     }}/>
      <button 
      aria-label = "clear name filter" 
      data-testid = "clear-name-filter-button"
      onClick = {() =>
          {
          setNameInput('');
          if (planetInput || nameInput) {
            let tmp = filter(charactersOrg, 'homeworld', planetInput);
            setCharacters(tmp);
            }}}>
              Clear
      </button>
    </div>
</div>
  );
}

export default searchFilter;