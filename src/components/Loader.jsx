// src/components/Loader.jsx
import React from 'react'

const Loader = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(255,255,255,0.7)', zIndex: 2000 }}
    >
      <div className="spinner-border" role="status" aria-label="Loading"></div>
    </div>
  )
}

export default Loader
