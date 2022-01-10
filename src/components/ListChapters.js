import React from 'react'

import '../styles/styles.css'

import '../styles/App.css'





function ListChapters({ chapterCH }) {




  return (
    <div>
    <div id='list-chapters' className='listOfChapters-css ' >
     
      <h1 >
        List of chapters <i className="fas fa-clipboard-list"></i>
      </h1>


    {chapterCH}
 
    </div>
    </div>
  );
}

export default ListChapters;
