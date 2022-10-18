import React, {useState} from 'react';

const searchFilter = ({
    planetSelected,
    charSelected,
    setPlanetSelected,
    setCharSelected,
    planets,
    characters
}) => {
    
    //const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState(characters);

    const filter = (characters, type, query) => {
        if (query === "") return characters;
        return characters.filter((data) => {
        return data[type].toLowerCase().includes(query.toLowerCase())
        });
      };
  
    // useEffect(() => {
    //   const filteredValues = filter(characters, type, query);
    //   setFilteredData(filteredValues);
    // }, [query]);

  return (
<div className = 'searchContainer'>
    <div className = 'searchForm'>
     <form onSubmit = {(e) => {
          e.preventDefault();
          const query = e.target.elements.query.value;
          const results = filter(characters, 'homeworld', query);
          setFilteredData(results)
          console.log(results)
     }}>
      <input type="search" id="query" placeholder='Filter for homeworld' />
      <button>Filter</button>
    </form>
    </div>

    <div className = 'searchForm'>
    <form onSubmit = {(e) => {
          e.preventDefault();
          const query = e.target.elements.query.value;
          const results = filter(characters, 'name', query);
          setFilteredData(results)
          console.log(results)
    }}>
        <input type="search" id="query" placeholder='Filter for name' />
        <button>Filter</button>
    </form>
    </div>
</div>
  );
}

export default searchFilter;