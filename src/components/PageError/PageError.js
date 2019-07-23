import React from 'react'
import { Link } from 'react-router-dom';
import './PageError.scss';

const PageError = ({status, title}) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>
            {status}
            {' '}
- 
            {' '}
            {title}
          </h2>
        </div>
        <Link to={status === 403 ? '/login' : '/'}>Go TO Homepage</Link>
      </div>
    </div>
  )
}
export default PageError;
