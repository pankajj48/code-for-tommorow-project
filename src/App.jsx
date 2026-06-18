import React from "react";
import { PostProvider } from "./context/postContext";
import Dashboard from './components/Dashboard';
import './App.css';

function App() {

  return (
    <PostProvider>
      <Dashboard/>
    </PostProvider>
  );
}
export default App;