import React, { useContext, useEffect, useState } from 'react'
import { FavouriteContext } from '../context/FavouriteProvider'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const mainCoursesList = [
  { name: 'Spaghetti Carbonara', description: 'Pasta with creamy sauce, pancetta, and pepper.', image: '/assets/spaghetti.jpeg' },
  { name: 'Grilled Salmon', description: 'Salmon fillet with lemon butter sauce.', image: '/assets/grilled-salmon.jpeg' },
  { name: 'Chicken Parmesan', description: 'Breaded chicken with marinara and melted cheese.', image: '/assets/chicken-parmesan.jpeg' },
  { name: 'Vegetable Stir-Fry', description: 'Fresh vegetables in soy sauce and sesame oil.', image: '/assets/vegetable-stir-fry.jpeg' },
  { name: 'Beef Tacos', description: 'Soft tacos with seasoned beef and salsa.', image: '/assets/beef-tacos.jpeg' },
  { name: 'Mushroom Risotto', description: 'Creamy risotto with sautéed mushrooms.', image: '/assets/mushroom-risotto.jpeg' },
  { name: 'Lamb Chops', description: 'Grilled lamb chops with mint sauce.', image: '/assets/lamb-chops.jpeg' },
  { name: 'Pad Thai', description: 'Rice noodles with shrimp, peanuts, sprouts.', image: '/assets/pad-thai.jpeg' },
  { name: 'Pork Schnitzel', description: 'Breaded pork cutlet with potato salad.', image: '/assets/pork-schnitzel.jpeg' },
  { name: 'Stuffed Peppers', description: 'Peppers stuffed with rice, beans, spices.', image: '/assets/stuffed-peppers.jpeg' },

  { name: 'Hyderabadi Biryani', description: 'Fragrant biryani with marinated meat and spices.', image: '/assets/hyderabadi-biryani.jpeg' },
  { name: 'Kolkata Biryani', description: 'Biryani with rice, meat, egg, potato, saffron.', image: '/assets/kolkata-biryani.jpeg' },
  { name: 'Lucknowi Biryani', description: 'Subtle Awadhi biryani, slow-cooked.', image: '/assets/lucknowi-biryani.jpeg' },
  { name: 'Vegetable Biryani', description: 'Colorful vegetarian biryani.', image: '/assets/vegetable-biryani.jpeg' },
  { name: 'Mutton Biryani', description: 'Hearty biryani with tender mutton.', image: '/assets/mutton-biryani.jpeg' },
  { name: 'Chicken Biryani', description: 'Popular biryani with marinated chicken.', image: '/assets/chicken-biryani.jpeg' },
  { name: 'Egg Biryani', description: 'Simple biryani with boiled eggs.', image: '/assets/egg-biryani.jpeg' },
  { name: 'Prawn Biryani', description: 'Seafood biryani with juicy prawns.', image: '/assets/prawn-biryani.jpeg' },
]

const MainCourses = () => {
  const { addToFavourites } = useContext(FavouriteContext)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  const handleAddToFavourites = (item) => {
    addToFavourites(item)
    setMessage(`${item.name} successfully added to favourites!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleOrderNow = () => navigate('/payment')

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Main Courses</h1>
      {message && <div className="alert alert-success text-center">{message}</div>}
      <div className="row">
        {mainCoursesList.map((item, idx) => (
          <div key={idx} className="col-md-4 mb-4">
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
                <button className="btn btn-primary me-2" onClick={handleOrderNow}>Order Now</button>
                <button className="btn btn-success" onClick={() => handleAddToFavourites(item)}>
                  Add to Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainCourses
