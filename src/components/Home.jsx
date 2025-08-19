import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const foodMenu = {
  Starters: {
    description: 'Enjoy our delicious starters to begin your meal.',
    representativeImg: '/assets/starters.jpeg',
    route: '/starters',
  },
  'Main Courses': {
    description: 'Hearty and flavorful main courses to satisfy your hunger.',
    representativeImg: '/assets/MainCourses.jpeg',
    route: '/main-courses',
  },
  Desserts: {
    description: 'Indulge in our sweet and decadent desserts.',
    representativeImg: '/assets/desserts.jpeg',
    route: '/desserts',
  },
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const handleTypeSelect = (route) => navigate(route)

  if (loading) return <Loader />

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1>Welcome to SmartBite!</h1>
        <p className="lead">Explore our delicious menu and satisfy your cravings!</p>
      </div>

      <h2 className="text-center my-4">Select Food Type</h2>
      <div className="row">
        {Object.keys(foodMenu).map((type, index) => (
          <div
            className="col-md-4"
            key={index}
            onClick={() => handleTypeSelect(foodMenu[type].route)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card text-center mb-4 shadow-sm">
              <img
                src={foodMenu[type].representativeImg}
                alt={type}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/assets/default-image.jpg' }}
              />
              <div className="card-body">
                <h5 className="card-title">{type}</h5>
                <p className="card-text">{foodMenu[type].description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
