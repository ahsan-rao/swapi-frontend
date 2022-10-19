import React, {useState, useEffect} from 'react';
import Combobox from 'react-widgets/Combobox';
import "react-widgets/styles.css";

const searchFilter = ({
    fetchedChars,
    setFetchedChars,
    planets,
    characters,
    setCharacters,
    reset,
    charactersOrg
}) => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [planetSelected, setPlanetSelected] = useState("");
    const [charSelected, setCharSelected] = useState("");
    const [planetInput, setPlanetInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const filter = (characters, type, query) => {
        if (query === "") return characters;
        return characters.filter((data) => {
        return data[type].toLowerCase().includes(query.toLowerCase())
        });
      };

    const planetNames = planets.map(planet =>{
      return planet.name;
    })

    const charNames = characters.map(char => {
      return char.name;
    })

    useEffect(() => {
      if (!planetInput && !nameInput) reset();
      else {
        let tmp = filter(charactersOrg, 'homeworld', planetInput);
        tmp = filter(tmp, 'name', nameInput);
        setCharacters(tmp)
      }
    }, [planetInput, nameInput])

    // useEffect(() => {
    // if (fetchedChars === false) return;
    // const filtered = filter(charactersOrg, type, query);
    // setCharacters(filtered);
    // }, [query]);

  return (
<div className = 'searchContainer'>
    <div className = 'searchForm'>
      <Combobox
      placeholder="Filter by homeworld"
      data = {planetNames}
      value = {planetInput}
      onChange = {(value) => {
          setPlanetInput(value);
          setQuery(value);
          setType("homeworld")
     }}/>
      <button onClick = {() =>
        {
        setPlanetInput(''); 
        if (planetInput || nameInput) {
          let tmp = filter(charactersOrg, 'name', nameInput);
          setCharacters(tmp);
        }}}>Clear</button>
    </div>

    <div className = 'searchForm'>
      <Combobox
      placeholder="Filter by name"
      data = {charNames}
      value = {nameInput}
      onChange = {(value) => {
          setNameInput(value);
          setQuery(value);
          setType("name")
     }}/>
      <button onClick = {() =>
        {
          setNameInput('');
          if (planetInput || nameInput) {
            let tmp = filter(charactersOrg, 'homeworld', planetInput);
            setCharacters(tmp);
            }}}>Clear</button>
    </div>
</div>
  );
}

export default searchFilter;