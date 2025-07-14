import React from "react";

import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom';

import App from "./App.tsx";
import "./index.css";

// REACT 18
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode> 
);


// REACT 17
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
