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
