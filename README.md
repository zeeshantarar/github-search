# Github users search

This project will allow search through github users api. You may search a user by their name.

## Project scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Project details

- I mainly focused on the requirement though i did waste some time on the designs.
- The context api was quite significant for managing states throught the app heirarchy.
- Pagination is a thing well done.
- Given more time i would have aimed at creating generic listing cards for all the resources provided by the api. For example for repositories, issues, commits or users i would render the same component with the important info. I will also break down the app a bit more into components for re-useability. The last but most important thing is to find a way to fetch user data in one api call for optimisation. Currently there are as much calls as the items on one page. Other than these i would focus more on making a better design and a responsive ui.
