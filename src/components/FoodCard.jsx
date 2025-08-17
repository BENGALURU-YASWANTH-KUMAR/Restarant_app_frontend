import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use Bootstrap for styling

const FoodCard = (props) => {
  const { title, image } = props; // Destructure props for easy access

  return (
    <div className="card my-3 shadow-sm" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          This is a delicious {title}. Try it now to satisfy your cravings!
        </p>

        {/* Button Group for 'Order Now' and 'My Favorite' */}
        <div className="d-flex justify-content-between ">
          <a href="#" className="btn btn-primary">
            Order Now
          </a>
          <button className="btn btn-success ms-3">
            <i className="bi bi-heart"></i> My Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
