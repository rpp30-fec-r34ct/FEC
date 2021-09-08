import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Search = (props) => (
  (
    <div>
      <form>
        <input type="text" placeholder="Search Questions and Answers" onChange={props.handleSearch}></input>
      </form>
    </div>
  )
)

export default Search;