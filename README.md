# SWAPI Frontend App
This app consists of a main view that displays the list of characters from Star Wars in a grid view with options to filter and search by homeworld and character name. The data is being retrieved from an open API called [SWAPI (Star Wars API)](https://swapi.dev/).

## Functionality
Users can search/filter by homeworld, character name or both. There is also the option to clear each individual filter as required. When the user changes the filter settings in the filter section, the list of characters will instantly adapt to only show characters that match the chosen filter settings. The user can also view more information about the homeworld and species by clicking on the question mark icons within each character card.

## Run Project using CLI

- **Fork** and **Clone** Repository.
- Open project directory
- Install dependencies

```bash
npm install
```

- To run the development build

```bash
npm run dev
```

- To run tests

```bash
npm run test
```

## Deployment
For quick access, the app has been deployed on Netlify: https://meek-smakager-bd79a7.netlify.app/
