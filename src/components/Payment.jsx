import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'

const Payment = () => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  })

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])
  if (loading) return <Loader />

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Payment Confirmed')
  }

  const handleCancel = () => {
    setFormData({ cardName: '', cardNumber: '', expMonth: '', expYear: '', cvv: '' })
    alert('Payment Cancelled')
  }

  const payWithUPI = (appName) => {
    alert(`Redirecting to ${appName} for payment.`)
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">Payment Details</h1>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-3">Card Payment</h2>

          <div className="mb-3">
            <label htmlFor="cardName" className="form-label">Name on Card</label>
            <input type="text" className="form-control" id="cardName" name="cardName"
              value={formData.cardName} onChange={handleInputChange} placeholder="Enter cardholder's name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input type="text" inputMode="numeric" className="form-control" id="cardNumber" name="cardNumber"
              value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9101 1121" required />
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="expMonth" className="form-label">Expiry Month</label>
                <input type="text" className="form-control" id="expMonth" name="expMonth"
                  value={formData.expMonth} onChange={handleInputChange} placeholder="MM" required />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="expYear" className="form-label">Expiry Year</label>
                <input type="text" className="form-control" id="expYear" name="expYear"
                  value={formData.expYear} onChange={handleInputChange} placeholder="YYYY" required />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="password" inputMode="numeric" className="form-control" id="cvv" name="cvv"
              value={formData.cvv} onChange={handleInputChange} placeholder="123" required />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-success me-2">Confirm Payment</button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

        <h2 className="text-center my-4">Or Pay Using</h2>
        <div className="d-flex justify-content-around">
          <div className="payment-option text-center p-2 bg-light" role="button" onClick={() => payWithUPI('PhonePe')}>
            <img src="/assets/phonepe.png" alt="PhonePe" width="40" />
            <div>PhonePe</div>
          </div>
          <div className="payment-option text-center p-2 bg-light" role="button" onClick={() => payWithUPI('Google Pay')}>
            <img src="/assets/gpay.png" alt="Google Pay" width="40" />
            <div>Google Pay</div>
          </div>
          <div className="payment-option text-center p-2 bg-light" role="button" onClick={() => payWithUPI('Paytm')}>
            <img src="/assets/paytm.png" alt="Paytm" width="40" />
            <div>Paytm</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
