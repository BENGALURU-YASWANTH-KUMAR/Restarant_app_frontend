import React, { useState, useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteProvider';
import { useNavigate } from 'react-router-dom';

const dessertsList = [
  {
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake layered with chocolate frosting.',
    image: 'assets/chocolate-cake.jpeg',
  },
  {
    name: 'Cheesecake',
    description: 'Creamy cheesecake with a buttery graham cracker crust.',
    image: 'assets/cheesecake.jpeg',
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert made with coffee-soaked ladyfingers and mascarpone.',
    image: 'assets/tiramisu.jpeg',
  },
  {
    name: 'Apple Pie',
    description: 'Homemade apple pie with a flaky crust and spiced apple filling.',
    image: 'assets/apple-pie.jpeg',
  },
  {
    name: 'Panna Cotta',
    description: 'Silky smooth Italian dessert topped with berry sauce.',
    image: 'assets/panna-cotta.jpeg',
  },
  {
    name: 'Brownies',
    description: 'Fudgy brownies with a rich chocolate flavor and a chewy texture.',
    image: 'assets/brownies.jpeg',
  },
  {
    name: 'Lemon Tart',
    description: 'Tangy lemon filling in a buttery tart shell, topped with meringue.',
    image: 'assets/lemon-tart.jpeg',
  },
  {
    name: 'Macarons',
    description: 'Delicate French meringue cookies filled with various flavors.',
    image: 'assets/macarons.jpeg',
  },
  {
    name: 'Crème Brûlée',
    description: 'Rich custard topped with a layer of hard caramel.',
    image: 'assets/creme-brulee.jpeg',
  },
  {
    name: 'Gelato',
    description: 'Italian-style ice cream with intense flavors and a creamy texture.',
    image: 'assets/gelato.jpeg',
  },
  {
    name: 'Eclairs',
    description: 'Light pastry filled with cream and topped with chocolate glaze.',
    image: 'assets/eclairs.jpeg',
  },
  {
    name: 'Baklava',
    description: 'Sweet pastry made with layers of filo dough, honey, and nuts.',
    image: 'assets/baklava.jpeg',
  },
  {
    name: 'Churros',
    description: 'Crispy fried dough coated in cinnamon sugar and served with chocolate sauce.',
    image: 'assets/churros.jpeg',
  },
  {
    name: 'Mochi Ice Cream',
    description: 'Japanese dessert made of chewy mochi filled with ice cream.',
    image: 'assets/mochi-ice-cream.jpeg',
  },
  {
    name: 'Banoffee Pie',
    description: 'Banana and toffee pie topped with whipped cream.',
    image: 'assets/banoffee-pie.jpeg',
  },
  {
    name: 'Cannoli',
    description: 'Italian pastry filled with ricotta cheese and chocolate chips.',
    image: 'assets/cannoli.jpeg',
  },
  {
    name: 'Pavlova',
    description: 'Meringue dessert with a crisp crust and a soft, light inside topped with fruit.',
    image: 'assets/pavlova.jpeg',
  },
  {
    name: 'Profiteroles',
    description: 'Cream puffs filled with ice cream and topped with chocolate sauce.',
    image: 'assets/profiteroles.jpeg',
  },
  {
    name: 'Cupcakes',
    description: 'Mini cakes with frosting, available in various flavors.',
    image: 'assets/cupcakes.jpeg',
  },
  {
    name: 'Fruit Tart',
    description: 'Buttery tart shell filled with custard and topped with fresh fruits.',
    image: 'assets/fruit-tart.jpeg',
  },
];

const Desserts = () => {
  const { addToFavourites } = useContext(FavouriteContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddToFavourites = (dessert) => {
    addToFavourites(dessert);
    setMessage(`${dessert.name} successfully added to favourites!`);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleOrderNow = () => {
    console.log('Order Now button clicked');
    navigate('/payment');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Our Desserts</h1>

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        {dessertsList.map((dessert, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={dessert.image} 
                className="card-img-top" 
                alt={dessert.name} 
                style={{ height: '200px', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/default-image.jpg';
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{dessert.name}</h5>
                <p className="card-text">{dessert.description}</p>
                <button className="btn btn-primary me-2" onClick={handleOrderNow}>Order Now</button>
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToFavourites(dessert)}
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

export default Desserts;
