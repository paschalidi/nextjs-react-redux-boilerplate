## General info
You can find a live version of the challenge [here]()
This project was bootstrapped with [zeit/next.js](https://github.com/zeit/next.js/).



## Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.



## Implementation details

### Global requirements

* For tech stack I used React and on top of that Nextjs as boilerplate. Argumentation for using Nextjs is that, Nextjs provides out of the box SSR :)
* For the stiling I did 90 percent of the css myself but I used  [Semantic UI React](https://react.semantic-ui.com/) for the Grid so I saved some time. The argumentation behind this is that people have send already a lot of coding power into developing a `flex` grid and I didnt see why I should do it again myself from scratch.



### Restaurant list page requirements

* Filters and sorting you will see the moment you run the app.
* Clicking the restaurant works as described [here](https://docs.google.com/document/d/1A13K02UIrNjkNT4rIwMptUaadUzgsSToiRJt8yT38Ts/edit?ts=5af0126c#)
* Functionality of Pagination also is there.



### Restaurant details page requirements

* Style is made by me.
* When user clicks a product then there is a console.log with the product details.

### Extras 

* Mobile responsive for every page.
* Broken images handle. (When image returns 404 then a plcaeholder replaces it)