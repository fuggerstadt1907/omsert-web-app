This project was created with [Create React App](https://github.com/facebookincubator/create-react-app).

## Project Description

It's the year 2137 and luckily planet Earth still exists. In a futuristic city called Auxburg the
most important intergalactic digital service company on the planet is found: omsert
GmbH.

They just received a very exciting message: some English speaking extraterrestrial tourists
from planet Kepler-186f want to visit our planet next month. Of course they are unsure
what places to see or how to find them. To help our friendly neighbours omsert is creating
an efficient and simple web app with information about the countries of the Earth.

Unfortunately the omsert team is very busy due to several requests from planet KrypIoT
and MarsLearning and therefore needs your help: Develop a fantastic and informative
web app and help us make our friends happy!

Functional requirements
As an extraterrestrial tourist I want to:
* Get an overview over all countries of the world
  * Name, flag and population are displayed
* Get more detailed information about a specific country
  * Continent, capital, currency and timezone are displayed
* See a selected country marked on a global map
  * Use GoogleMaps, OpenStreetMap or something similar
  * The zoom level should be adjusted according to the size of the country
* Sort countries by name or population
* Search for a specific country
* Share country information via link

Non-functional requirements
* Design is according to the corporate identity (see below)
* Design for mobile devices only (full responsiveness optional)
* App in English language
* Use the existing country API: https://restcountries.eu
* Use Angular or React to implement the web application
* Version your code with git and make it available on GitHub or GitLab
* The web app runs on a current Chrome, Firefox or Safari browser

## Project Documentation

- [What was particularly challenging for me during implementation](#What-was-particularly-challenging-for-me-during-implementation)
- [Optimization potential within the application](#Optimization-potential-within-the-application)
- [Choice of 3rd Party Frameworks/Libraries](#Choice-of-3rd-Party-Frameworks/Libraries)
- [Sketch](#Sketch)


## What was particularly challenging for me during implementation

* Figure out HOW TO START this WebApp
* Setting dynamical the zoom level of each country
* Decide to use plain JS (e.g. Google Maps Part) or out of the box finished ReactJS Libraries

## Optimization potential within the application

* Implementing `ESLint` for coding rules, error handling and more consistent code
* Client performance e.g. size of websize data (Image resolution)
* Caching API responses. I don't expect often changes. Maybe hold API response for one week then replace it with a new .json file
* Implement Pagination for the Country Table
* Implement better Error handling
* Better looking fullresponsive Design
* Copy Page URL to clipboard, share link via social links


## Choice of 3rd Party Frameworks/Libraries

The following Frameworks/Libraries are used in this project

* `axios` is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.
* `react-router` is used for indexing the Country Detail Pages and Routing beetwewen the Views.
* `semantic-ui` is a popular UI Framework which is used for the Detailscreen (Loader, Button, Modal, Icon, Input, Table).
* `Google Maps` is used to present a selected Country with a Marker on Google Maps.


## Sketch

![alt text](https://github.com/fuggerstadt1907/omsert-web-app/blob/master/src/assets/sketch.png)