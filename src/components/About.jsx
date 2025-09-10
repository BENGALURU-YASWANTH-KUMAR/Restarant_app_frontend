import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

const About = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Us</h1>
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <img
            src="/assets/restaurantabout.jpeg"
            alt="Restaurant"
            className="img-fluid rounded"
            style={{ maxHeight: "600px", width: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.src = "/assets/default-image.jpg";
            }}
          />
        </div>
        <div className="col-md-4 align-self-center">
          <h2>Welcome to Our Restaurant</h2>
          <p>
            At our restaurant, we are passionate about delivering a unique and
            memorable dining experience. With years of culinary expertise, we
            pride ourselves on offering a diverse menu that satisfies every
            palate.
          </p>
          <p>
            Our chefs use the freshest ingredients, carefully selected to create
            dishes that are both flavorful and creative. Whether you're looking
            for a light bite or a full-course meal, we have something for
            everyone.
          </p>
          <p>
            Come join us for a culinary adventure and enjoy the warm and
            inviting ambiance that makes our restaurant the perfect place to
            unwind.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide a delightful dining experience with
          exceptional food, friendly service, and a comfortable atmosphere. We
          are committed to offering dishes made from the highest quality
          ingredients while supporting local farmers and sustainable practices.
        </p>
      </div>
    </div>
  );
};

export default About;
