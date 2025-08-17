import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Confirmed');
  };

  const handleCancel = () => {
    setFormData({
      cardName: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    });
    alert('Payment Cancelled');
  };

  const payWithUPI = (appName) => {
    alert("Redirecting to ${appName} for payment.");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">Payment Details</h1>

        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Card Payment</h2>
          <div className="mb-3">
            <label htmlFor="cardName" className="form-label">Name on Card</label>
            <input
              type="text"
              className="form-control"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="Enter cardholder's name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="number"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9101 1121"
              required
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="expMonth" className="form-label">Expiry Month</label>
                <input
                  type="text"
                  className="form-control"
                  id="expMonth"
                  name="expMonth"
                  value={formData.expMonth}
                  onChange={handleInputChange}
                  placeholder="MM"
                  required
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label htmlFor="expYear" className="form-label">Expiry Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="expYear"
                  name="expYear"
                  value={formData.expYear}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              type="number"
              className="form-control"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              required
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success me-2">Confirm Payment</button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

        <h2 className="text-center my-4">Or Pay Using</h2>
        <div className="d-flex justify-content-around">
          <div className="payment-option text-center p-2 bg-light" onClick={() => payWithUPI('PhonePe')}>
            <img
              src="https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2018/01/phonepe1.jpg"
              alt="PhonePe"
              width="40"
            />
            <div>PhonePe</div>
          </div>
          <div className="payment-option text-center p-2 bg-light" onClick={() => payWithUPI('GPay')}>
            <img
              src="https://i.pinimg.com/564x/8d/ec/e1/8dece15cc40aaf66ed47f6591b639d06.jpg"
              alt="Google Pay"
              width="40"
            />
            <div>Google Pay</div>
          </div>
          <div className="payment-option text-center p-2 bg-light" onClick={() => payWithUPI('Paytm')}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYMs5YUA9Ro5Cq4Z27hlXSSHH6Y7CK6Tc6A&s"
              alt="Paytm"
              width="40"
            />
            <div>Paytm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;