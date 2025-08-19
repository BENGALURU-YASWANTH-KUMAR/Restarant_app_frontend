import React, { useContext, useEffect, useState } from 'react'
import { FavouriteContext } from '../context/FavouriteProvider'
import Loader from '../components/Loader'

const Favourite = () => {
  const { favourites, removeFromFavourites } = useContext(FavouriteContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Favourites</h1>
      {favourites.length === 0 ? (
        <p>No items added to favourites yet!</p>
      ) : (
        <div className="row">
          {favourites.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = '/assets/default-image.jpg' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-danger" onClick={() => removeFromFavourites(item.name)}>
                    Remove from Favourites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favourite
