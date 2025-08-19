import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {   // 👈 use named export
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage when the component mounts
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add item to favourites
  const addToFavourites = (starter) => {
    if (!favourites.some((favourite) => favourite.name === starter.name)) {
      setFavourites((prevFavourites) => [...prevFavourites, starter]);
    }
  };

  // Remove item from favourites
  const removeFromFavourites = (name) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((favourite) => favourite.name !== name)
    );
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
