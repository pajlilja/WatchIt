# Project details
Updated May 18th

## What has been done
* Custom Webpack setup, Babel, ESLint, Sass
* Responsive sidebar which turns into a slideout menu on mobile
* Responsive grid layouts for movies and tv shows
* Detail page for movies and tv shows
* Browse pages for movies and tv shows
    * Used to browse top, popular, upcoming, genres, year.
* Drag and drop functionality for movies/tv shows (actual logic for saving to lists isn't implemented, just the drag and drop)
* Integration with TheMovieDB API
    * The homepage fetches currently playing movies and now airing TV shows.
    * Fully functioning search system with infinte scroll for loading more results.
    * The movie details page fetches movie info including data such as rating, runtime, cast, trailers, etc.
    * Different API calls for top, upcoming, genres etc.
* Login / sign up with Firebase
* Added list functionality
    * Functionality to add to lists
    * Delete from lists
    * Fetch list entries from Firebase
    * Episode lists for tv shows to be able to mark individual episodes as seen
* Added a detail page for actors

For more details, feel free to check the closed issues in our issue tracker


### If we have time
* Profile page with watch stats
* Misc minor issues.

## Project file structure
This project's structure is inspired from `create-react-app`.

Our static files (e.g. HTML files) are in `public/` whereas JS and CSS are located in `src/`.

In there we have separated our files depending on their roles.

* Stateless reusable components go in `src/components`
    * Too many files to individually list here, but each file contains a short description of its purpose, and their names should hopefully make it clear too.
* Components which have state and/or handle data go in `src/containers` and generally contain minimal markup.
    * Currently we have `App.js` which is our entry point and houses application state. Aside from that, we have a container for each of our implemented page, since those pages need API data to function.
* API related files go in `src/api`.
    * `APIUtils.js` export several functions, so we don't call the API directly in our components.
* Utility/helper functions that don't relate to the API and can be reused go in `src/utils`
* CSS (Sass) files go in `src/css` where each file corresponds to a component of the same name (except `index.scss`, `_global.scss` and `responsive.scss`).
