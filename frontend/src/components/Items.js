import React from 'react'; 

const Items = ({items}) => {

  return (
    <div className="items-list">
      {items.map((item) => {
        return (
          <div className="items-item">
            {item}
            <button>Delete</button>
          </div>
        ); 
      })}
    </div>
  );
};

export default Items;