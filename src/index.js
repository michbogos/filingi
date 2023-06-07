import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddPage from './AddPage';
import StatsPage from './StatsPage';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyD_MFZqlo9ydBPgkclHRALTlxBK55B-_6A",

  authDomain: "filingi.firebaseapp.com",

  projectId: "filingi",

  storageBucket: "filingi.appspot.com",

  messagingSenderId: "157353307784",

  appId: "1:157353307784:web:e3ead286032a593d4b393d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const router = createHashRouter([
  {
    path: "/",
    element: <App db={db}></App>,
  },
  {
    path: "/stats",
    element: <StatsPage db={db}></StatsPage>,
  },
  {
    path: "/add",
    element: <AddPage db={db}></AddPage>,
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
