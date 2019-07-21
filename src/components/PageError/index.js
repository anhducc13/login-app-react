import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

export default (props) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>{props.status} - {props.title}</h2>
        </div>
        <Link to="/">Go TO Homepage</Link>
      </div>
    </div>
  )
}
