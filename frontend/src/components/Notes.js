import React from 'react';  //step 1

const Notes = ({notes}) => { // step 2 declare component
    //Notes specific logic in here
    return(
        <div className="notes-list">
            {notes.map((item) => {
              // same as java
              // convert each array item to an element
              return (
                <div className="notes-item">
                  {item}
                </div>
              );
            })}
        </div>
    );
};

//step 3
export default Notes;