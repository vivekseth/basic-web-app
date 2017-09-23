import React from 'react';
import { render } from 'react-dom'
import App from './components/App.jsx'

// import str from './test.txt'
// console.log(str);

// import style from './style.css'
// console.log(style)

// var testFunction = (a, b) => {
//     console.log(a + b);
// }

// var testJSX = () => {
//     return <b>hello</b>;
// }

// testFunction(2, 3);

// console.log(testJSX());

render(<App />, document.getElementById('app'));
