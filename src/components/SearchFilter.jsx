import React, {useState, useEffect} from 'react';

const searchFilter = ({
    fetchedChars,
    setFetchedChars,
    planets,
    characters,
    setCharacters
}) => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [planetSelected, setPlanetSelected] = useState("");
    const [charSelected, setCharSelected] = useState("");

    const filter = (characters, type, query) => {
        if (query === "") return characters;
        return characters.filter((data) => {
        return data[type].toLowerCase().includes(query.toLowerCase())
        });
      };
  
    useEffect(() => {
    if (fetchedChars === false) return;
    const filtered = filter(characters, type, query);
    setCharacters(filtered);
    }, [query]);

  return (
<div className = 'searchContainer'>
    <div className = 'searchForm'>
     <form value = {planetSelected} onChange = {setPlanetSelected}>
      <input type="search" id="query" placeholder='Filter for homeworld' 
      onChange = {(e) => {
          e.preventDefault();
          setQuery(e.target.value);
          setType("homeworld")
     }}/>
      <button onClick = {() => {setPlanetSelected("")}}>Clear</button>
    </form>
    </div>

    <div className = 'searchForm'>
    <form value = {charSelected} onChange = {setCharSelected}>
        <input type="search" id="query" placeholder='Filter for name'
        onChange = {(e) => {
            e.preventDefault();
            setQuery(e.target.value);
            setType("name");
      }} />
        <button onClick = {() => {setCharSelected("")}}>Clear</button>
    </form>
    </div>
</div>
  );
}

export default searchFilter;