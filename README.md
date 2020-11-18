# Star Trakker

_Search nodes, the final frontier_

## Captain’s log (Stardate 74328.9):

I have built a **Start Trakker** app that solves all the following challenges:

- Display lists and selected content from a data tree structure
- Search and highlight content while preventing xss vulnerabilities
- replace content with template string variables

In addition, I styled the app with a deep space like theme and included “universalization” for most species to enjoy

🖖

## The Process

With the limited amount of time I had between job searching and other activities, I’m pleased with the outcome. Early on, I quickly made sure the application worked in a few files. I coded the logic within the components themselves (api calls, useState, useEffect, prop drilling). Well aware that it will need later optimization.

Next I styled the app with great thought to usability and aesthetics.

Afterwards, I decided to move most of the state logic into a redux architecture, all the while refactoring components down. As opposed to using standard react-redux, connect, mapStateToProps and such, I implemented redux utilizing [Redux Toolkit](https://redux-toolkit.js.org/). Doing so proved effective as I was able to clean up the components and simplify the codebase with react-redux hooks.

I developed a crafty solution to cache and replace node states upon empty searches, therefore eliminated unnecessary api calls. In addition, by creating a unique `nodeId` (parent id’s separated by dots) became useful in selecting the correct connection within the node tree. The unique `nodeId` could be used to recursively insert selected connections and traverse node connections inside of the `connection.js` component.

Highlighting content was completed using some custom util functions and nifty regex expressions that ignore any html tags while searching. Using the dompurify library to sanitize the innerHtml was key to prevent xss attacks. Furthermore, I took the liberty of removing any empty string literals text from being displayed.

## Further implementation:

Overall the app is highly functional but could be expanded for better usability. For example, the user might want the list to stay open upon click (similar to vsCode file-folder structure). Or be able to change the variables in a dropdown UI, saving changes to the backend. The search endpoint also searches the text, if this was a real app, I’d expand the highlighting feature to the list. For larger datasets, I’d consider paginating the data in and better caching within global state (redux).

Other aspects of the code would need attention too;

- internationalization
- accessibility (alternative text for images, keyboard navigation, resizing text, etc),
- typescript (opted out, but usually my default),
- jsdoc comments everywhere (currently only in util files),
- scss mixins/variables or even better styled-components
- constants and enums for api endpoints and the like

If this was a production ready app, I would eject create-react-app and configure accordingly, though realistically would have built the webpack from scratch. Code splitting, lazy loading sections, common chunks. Dockerfiles, env variables, deploy scripts, the whole nine.

## Getting Started

first start server:

```
https://github.com/Tumne/Ada-fe-test.git
cd ada-fe-test/
yarn
yarn start-server
```

then in the client:

```
cd client/
yarn
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Built With

- [React](https://reactjs.org/) - The JS framework used
- [React Redux](https://react-redux.js.org/) - Official React bindings for Redux
- [Redux Toolkit](https://redux-toolkit.js.org/) - All in one toolset for efficient Redux development
- [css-modules](https://github.com/css-modules/css-modules) - Locally scoped sass/css modules
- [DOMPurify](https://github.com/cure53/DOMPurify) - DOM-only XSS sanitizer for HTML

## Authors

- **Nikhil Tumne** - _Developers Developers Developers_ - [Freshly Grazed](http://freshlygrazed.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://www.mit.edu/~amini/LICENSE.md) file for details
