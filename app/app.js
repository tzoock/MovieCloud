// import ReactDOM from 'react-dom';
// import React from 'react';
//
// const Root = () => {
//   return (
//     <h1>Song Cloud</h1>
//   );
// };
// console.info('gfgf');
// ReactDOM.render(<Root/>, document.querySelector('#root'));


import ReactDOM from 'react-dom';
import React from 'react';
import Greeting from './Greeting';


const data = {
  name: "Slim-Shady", what: "whaaat?", who: "whooo?"
};

const Root = () => {
  return (
    <div>
      <Greeting data={data}/>
    </div>
  );
};


ReactDOM.render(<Root/>, document.querySelector('#root'));
