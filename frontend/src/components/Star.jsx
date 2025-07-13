import React from 'react'

export default function Star({ rating }) {
    const fullStarts = Math.floor(rating);
      const halfStarts = rating % 1 >= 0.5
      const emptyStarts = 5 - fullStarts - (halfStarts ? 1 : 0);
    return (
        <>
            {[...Array(fullStarts)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
            {halfStarts && <i className="bi bi-star-half"></i>}
            {[...Array(emptyStarts)].map((_, i) => <i key={i} class="bi bi-star"></i>)}
        </>
    )
}
