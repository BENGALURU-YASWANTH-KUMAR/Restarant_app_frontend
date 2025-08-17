import React, { useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteProvider'; // Import the FavouriteContext

const Favourite = () => {
  const { favourites, removeFromFavourites } = useContext(FavouriteContext);  // Get favourites and removal function

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Favourites</h1>
      {favourites.length === 0 ? (
        <p>No items added to favourites yet!</p>
      ) : (
        <div className="row">
          {favourites.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img 
                  src={item.image} 
                  className="card-img-top" 
                  alt={item.name} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <button 
                    className="btn btn-danger"
                    onClick={() => removeFromFavourites(item.name)} // Remove from favourites
                  >
                    Remove from Favourites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
