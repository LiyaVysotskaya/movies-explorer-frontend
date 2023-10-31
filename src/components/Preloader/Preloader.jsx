import React from 'react'
import './Preloader.css'

function Preloader(props) {
  return (
    <>
      {props.isLoading &&
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
      }
    </>

  )
};

export default Preloader;
