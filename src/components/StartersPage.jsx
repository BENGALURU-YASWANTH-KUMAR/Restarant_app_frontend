import React, { useState,useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteProvider';
import { useNavigate } from 'react-router-dom';// Import the FavouriteContext

// Starter data with image paths from the public folder
const startersList = [
  {
    name: 'Bruschetta',
    description: 'Grilled bread topped with a mixture of diced tomatoes, garlic, and basil.',
    image: '/assets/bruschetta.jpeg',
  },
  {
    name: 'Stuffed Mushrooms',
    description: 'Mushrooms stuffed with cream cheese, herbs, and breadcrumbs.',
    image: '/assets/stuffed-mushrooms.jpeg',
  },
  {
    name: 'Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables and served with dipping sauce.',
    image: '/assets/spring-rolls.jpeg',
  },
  {
    name: 'Garlic Bread',
    description: 'Toasted bread topped with garlic butter and parsley.',
    image: '/assets/garlic-bread.jpeg',
  },
  {
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil drizzled with olive oil and balsamic glaze.',
    image: '/assets/caprese-salad.jpeg',
  },
  {
    name: 'Chicken Wings',
    description: 'Spicy marinated chicken wings served with blue cheese dipping sauce.',
    image: '/assets/chicken-wings.jpeg',
  },
  {
    name: 'Mozzarella Sticks',
    description: 'Fried mozzarella sticks served with marinara sauce.',
    image: '/assets/mozzarella-sticks.jpeg',
  },
  {
    name: 'Nachos',
    description: 'Crispy tortilla chips topped with melted cheese, jalapeños, and salsa.',
    image: '/assets/nachos.jpeg',
  },
  {
    name: 'Hummus and Pita',
    description: 'Creamy hummus served with warm pita bread and fresh vegetables.',
    image: '/assets/hummus-pita.jpeg',
  },
  {
    name: 'Mini Quiches',
    description: 'Bite-sized quiches with spinach, cheese, and a flaky pastry crust.',
    image: '/assets/mini-quiches.jpeg',
  },
  {
    name: 'Fried Calamari',
    description: 'Crispy fried calamari served with marinara sauce.',
    image: '/assets/fried-calamari.jpeg',
  },
  {
    name: 'Deviled Eggs',
    description: 'Classic deviled eggs with a creamy, tangy filling.',
    image: '/assets/deviled-eggs.jpeg',
  },
  {
    name: 'Baked Brie',
    description: 'Creamy baked brie topped with honey and walnuts, served with crackers.',
    image: '/assets/baked-brie.jpeg',
  },
  {
    name: 'Potato Skins',
    description: 'Crispy potato skins loaded with cheese, bacon, and sour cream.',
    image: '/assets/potato-skins.jpeg',
  },
  {
    name: 'Coconut Shrimp',
    description: 'Shrimp coated in a crispy coconut batter, served with sweet chili sauce.',
    image: '/assets/coconut-shrimp.jpeg',
  },
  {
    name: 'Meatballs',
    description: 'Italian-style meatballs in a rich tomato sauce.',
    image: '/assets/meatballs.jpeg',
  },
  {
    name: 'Cheese Platter',
    description: 'Assorted cheeses served with crackers, fruit, and nuts.',
    image: '/assets/cheese-platter.jpeg',
  },
  {
    name: 'Stuffed Jalapeños',
    description: 'Spicy jalapeños stuffed with cream cheese and wrapped in bacon.',
    image: '/assets/stuffed-jalapenos.jpeg',
  },
  {
    name: 'Tzatziki and Pita',
    description: 'Creamy Greek yogurt dip with cucumbers and garlic, served with pita.',
    image: '/assets/tzatziki-pita.jpeg',
  },
  {
    name: 'Mini Tacos',
    description: 'Mini tacos filled with seasoned beef, lettuce, cheese, and salsa.',
    image: '/assets/mini-tacos.jpeg',
  },
];


const StartersPage = () => {
  const { addToFavourites } = useContext(FavouriteContext); // Access the addToFavourites function from context
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // State for the success message

  const handleAddToFavourites = (starter) => {
    addToFavourites(starter); // Add the starter to favourites
    setMessage(`${starter.name} successfully added to favourites!`); // Set the success message

    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage(''); // Clear the message
    }, 3000);
  };
  const handleOrderNow = () =>{

    navigate('/payment');
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Starters</h1>

      {/* Display success message if it exists */}
      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        {startersList.map((starter, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={starter.image}
                className="card-img-top"
                alt={starter.name}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = '/assets/default-image.jpg'; // Fallback image
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{starter.name}</h5>
                <p className="card-text">{starter.description}</p>
                <button className="btn btn-primary me-2" onClick={handleOrderNow}>Order Now</button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToFavourites(starter)}  // Call the handler when clicked
                >
                  Add to Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartersPage