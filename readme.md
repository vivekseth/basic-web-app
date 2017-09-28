# Readme

## Description

Project currently uses a Single Page App (SPA) architecture. 

Server is responsible for responding to API requests and serving entire app on every, non-API request. 

App is responsible for rendering correct page for a given path and making API requests.

## TODO

* Refactor. Abstract out "Ajax view" concept. Avoid repeating logic for maintaining `isLoading` and setting data once requests comes in. 

* Use a React UI kit (bootstrap-react)

* Add footer

* Add search, sort, filtering

* How can I use BrowserRouter for prod and HashRouter for dev? 

* Use client-side, purgeable cache to avoid duplicating ajax requests. 

* Add login support to app (abilty to favorite characters and films)

* How does react-router work with authentication? If a user is logged in, a path may look different. 

* Use server-side rendering

* Server-size hot-reload 

* Optimize request to render time

* Split up app into multiple components

* [DONE] Build out star wars data explorer app

* [DONE] Unify node_modules for server and client

* [DONE] Use an API to feed real data to app (star wars)

* [DONE] client-side hot-reload 

* [DONE] Use babel to transpile JSX and ES5 syntax files

* [DONE] Use react-router to render different paths.

