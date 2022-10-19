import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//component for the species and homeworld modal data
const DetailsModal = ({ type, position, id, closeModal, species, planets }) => {

//retrieving the details of the selected species
let selSpecies = species.find(
    (sp) => sp.name === id
);

//retrieving the details of the selected planet
let selPlanet = planets.find(
    (planet) => planet.name === id
);

  let info;
  switch(type) {
  case 'species':
    const { classification, average_height, average_lifespan, language } = selSpecies || {};
    return (
    <div className="modal" style={position}>
        <div className="modalHeading">
          <h4 className="modalName">{selSpecies?.name || 'Unknown'}</h4>
          <FAIcon icon={faTimes} onClick={closeModal} />
        </div>
      <ul className="modalList">
        <li className="modalDetail">Classification: {classification || 'n/a'}</li>
        <li className="modalDetail">Average Height: {average_height || 'n/a'}</li>
        <li className="modalDetail">Average Lifespan: {average_lifespan || 'n/a'}</li>
        <li className="modalDetail">Language: {language || 'n/a'}</li>
      </ul>
      </div>
    );
    break;
  case 'homeworld':
    const { rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population } = selPlanet;
    return (
    <div className="modal" style={position}>
      <div className="modalHeading">
        <h4 className="modalName">{selPlanet?.name || 'Unknown'}</h4>
        <FAIcon icon={faTimes} onClick={closeModal} />
      </div>
      <ul className="modalList">
        <li className="modalDetail">Rotation Period: {rotation_period || 'n/a' }</li>
        <li className="modalDetail">Orbital Period: {orbital_period || 'n/a' }</li>
        <li className="modalDetail">Diameter: {diameter || 'n/a' }</li>
        <li className="modalDetail">Climate: {climate || 'n/a' }</li>
        <li className="modalDetail">Gravity: {gravity || 'n/a' }</li>
        <li className="modalDetail">Terrain: {terrain || 'n/a' }</li>
        <li className="modalDetail">Surface Water: {surface_water || 'n/a' }</li>
        <li className="modalDetail">Population: {population || 'n/a' }</li>
      </ul>
      </div>
    );
    break;
  default:
    info = (<p>Unexpected modal type</p>);
  }
};

export default DetailsModal;