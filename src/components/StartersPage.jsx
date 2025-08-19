import React, { useContext, useEffect, useState } from 'react'
import { FavouriteContext } from '../context/FavouriteProvider'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const startersList = [
  { name: 'Bruschetta', description: 'Grilled bread with tomatoes, garlic, basil.', image: '/assets/bruschetta.jpeg' },
  { name: 'Stuffed Mushrooms', description: 'Mushrooms with cream cheese, herbs, breadcrumbs.', image: '/assets/stuffed-mushrooms.jpeg' },
  { name: 'Spring Rolls', description: 'Crispy rolls with fresh vegetables.', image: '/assets/spring-rolls.jpeg' },
  { name: 'Garlic Bread', description: 'Toasted bread with garlic butter and parsley.', image: '/assets/garlic-bread.jpeg' },
  { name: 'Caprese Salad', description: 'Mozzarella, tomatoes, basil, olive oil & balsamic.', image: '/assets/caprese-salad.jpeg' },
  { name: 'Chicken Wings', description: 'Spicy wings with blue cheese dip.', image: '/assets/chicken-wings.jpeg' },
  { name: 'Mozzarella Sticks', description: 'Fried mozzarella with marinara.', image: '/assets/mozzarella-sticks.jpeg' },
  { name: 'Nachos', description: 'Chips with melted cheese, jalapeños, salsa.', image: '/assets/nachos.jpeg' },
  { name: 'Hummus and Pita', description: 'Creamy hummus with warm pita.', image: '/assets/hummus-pita.jpeg' },
  { name: 'Mini Quiches', description: 'Bite-sized quiches with spinach & cheese.', image: '/assets/mini-quiches.jpeg' },
  { name: 'Fried Calamari', description: 'Crispy calamari with marinara.', image: '/assets/fried-calamari.jpeg' },
  { name: 'Deviled Eggs', description: 'Classic tangy deviled eggs.', image: '/assets/deviled-eggs.jpeg' },
  { name: 'Baked Brie', description: 'Brie with honey and walnuts, crackers.', image: '/assets/baked-brie.jpeg' },
  { name: 'Potato Skins', description: 'Skins with cheese, bacon, sour cream.', image: '/assets/potato-skins.jpeg' },
  { name: 'Coconut Shrimp', description: 'Crispy coconut-battered shrimp.', image: '/assets/coconut-shrimp.jpeg' },
  { name: 'Meatballs', description: 'Italian-style meatballs in tomato sauce.', image: '/assets/meatballs.jpeg' },
  { name: 'Cheese Platter', description: 'Assorted cheeses with crackers, fruit, nuts.', image: '/assets/cheese-platter.jpeg' },
  { name: 'Stuffed Jalapeños', description: 'Jalapeños stuffed with cream cheese & bacon.', image: '/assets/stuffed-jalapenos.jpeg' },
  { name: 'Tzatziki and Pita', description: 'Greek yogurt dip with cucumbers & garlic.', image: '/assets/tzatziki-pita.jpeg' },
  { name: 'Mini Tacos', description: 'Mini tacos with seasoned beef and salsa.', image: '/assets/mini-tacos.jpeg' },
]

const Starters = () => {
  const { addToFavourites } = useContext(FavouriteContext)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  const handleAddToFavourites = (starter) => {
    addToFavourites(starter)
    setMessage(`${starter.name} successfully added to favourites!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleOrderNow = () => navigate('/payment')

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Starters</h1>
      {message && <div className="alert alert-success text-center">{message}</div>}

      <div className="row">
        {startersList.map((starter, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={starter.image}
                className="card-img-top"
                alt={starter.name}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/assets/default-image.jpg' }}
              />
              <div className="card-body">
                <h5 className="card-title">{starter.name}</h5>
                <p className="card-text">{starter.description}</p>
                <button className="btn btn-primary me-2" onClick={handleOrderNow}>Order Now</button>
                <button className="btn btn-success" onClick={() => handleAddToFavourites(starter)}>
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

export default Starters
