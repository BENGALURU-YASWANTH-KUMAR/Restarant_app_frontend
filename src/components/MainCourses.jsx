import React, { useState, useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteProvider'; // Import the FavouriteContext
import { useNavigate } from 'react-router-dom';
const mainCoursesList = [
  {
    name: 'Spaghetti Carbonara',
    description: 'Pasta with a creamy sauce made with eggs, cheese, pancetta, and pepper.',
    image: 'assets/spaghetti.jpeg',
  },
  {
    name: 'Grilled Salmon',
    description: 'Salmon fillet grilled to perfection, served with a lemon butter sauce.',
    image: 'assets/grilled-salmon.jpeg',
  },
  {
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted cheese.',
    image: 'assets/chicken-parmesan.jpeg',
  },
  {
    name: 'Vegetable Stir-Fry',
    description: 'A mix of fresh vegetables stir-fried in soy sauce and sesame oil.',
    image: 'assets/vegetable-stir-fry.jpeg',
  },
  {
    name: 'Beef Tacos',
    description: 'Soft tacos filled with seasoned beef, lettuce, cheese, and salsa.',
    image: 'assets/beef-tacos.jpeg',
  },
  {
    name: 'Mushroom Risotto',
    description: 'Creamy risotto with sautéed mushrooms and parmesan cheese.',
    image: 'assets/mushroom-risotto.jpeg',
  },
  {
    name: 'Lamb Chops',
    description: 'Grilled lamb chops served with mint sauce and vegetables.',
    image: 'assets/lamb-chops.jpeg',
  },
  {
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, peanuts, and bean sprouts.',
    image: 'assets/pad-thai.jpeg',
  },
  {
    name: 'Pork Schnitzel',
    description: 'Breaded pork cutlet served with potato salad and lemon.',
    image: 'assets/pork-schnitzel.jpeg',
  },
  {
    name: 'Stuffed Peppers',
    description: 'Bell peppers stuffed with a mixture of rice, beans, and spices.',
    image: 'assets/stuffed-peppers.jpeg',
  },
  
    {
      "name": "Hyderabadi Biryani",
      "description": "A fragrant and spicy biryani made with marinated meat, basmati rice, and aromatic spices, layered and cooked together.",
      "image": "assets/hyderabadi-biryani.jpeg"
    },
    {
      "name": "Kolkata Biryani",
      "description": "A unique biryani from Kolkata featuring long-grain rice, marinated meat, boiled eggs, and potatoes, all cooked with saffron and spices.",
      "image": "assets/kolkata-biryani.jpeg"
    },
    {
      "name": "Lucknowi Biryani",
      "description": "Also known as Awadhi biryani, this version is slow-cooked with marinated meat and rice, featuring subtle flavors and less spice.",
      "image": "assets/lucknowi-biryani.jpeg"
    },
    {
      "name": "Vegetable Biryani",
      "description": "A colorful and flavorful biryani made with mixed vegetables, aromatic spices, and basmati rice, perfect for vegetarian lovers.",
      "image": "assets/vegetable-biryani.jpeg"
    },
    {
      "name": "Mutton Biryani",
      "description": "A rich and hearty biryani made with tender mutton, basmati rice, and a blend of spices, cooked to perfection.",
      "image": "assets/mutton-biryani.jpeg"
    },
    {
      "name": "Chicken Biryani",
      "description": "A popular biryani made with marinated chicken, fragrant basmati rice, and a mix of spices for a delicious meal.",
      "image": "assets/chicken-biryani.jpeg"
    },
    {
      "name": "Egg Biryani",
      "description": "A simple yet flavorful biryani made with boiled eggs and basmati rice, cooked with spices and herbs.",
      "image": "assets/egg-biryani.jpeg"
    },
    {
      "name": "Prawn Biryani",
      "description": "A seafood twist on biryani, made with juicy prawns, basmati rice, and spices, offering a unique flavor profile.",
      "image": "assets/prawn-biryani.jpeg"
    }
  
  
];

const MainCourses = () => {
  const { addToFavourites } = useContext(FavouriteContext); // Access addToFavourites from the context
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // State for the success message

  const handleAddToFavourites = (mainCourse) => {
    addToFavourites(mainCourse); // Add the main course to favourites
    setMessage(`${mainCourse.name} successfully added to favourites!`); // Set the success message

    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage(''); // Clear the message
    }, 3000);
  };
  const handleOrderNow = ()=>{
    navigate('/payment');
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Main Courses</h1>

      {/* Display success message if it exists */}
      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        {mainCoursesList.map((mainCourse, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={mainCourse.image}
                className="card-img-top"
                alt={mainCourse.name}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = '/assets/default-image.jpg'; // Fallback image
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{mainCourse.name}</h5>
                <p className="card-text">{mainCourse.description}</p>
                <button className="btn btn-primary me-2" onClick={handleOrderNow}>Order Now</button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToFavourites(mainCourse)} // Call the handler when clicked
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

export default MainCourses;
