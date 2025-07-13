import React from 'react'
import '../styles/CardProduct.css'
import Star from './Star';
import { Link } from 'react-router';

export default function CardProduct({
    img_url,
    product_name,
    discount_price,
    actual_price,
    rating,
    product_id }) {
    const formatPrice = (price) => {
        const numeric = parseFloat(price);
        if (isNaN(numeric)) return '';

        const parts = numeric.toFixed(1).split('.');
        const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // use comma as thousands separator
        const decPart = parts[1];

        return decPart === '0' ? intPart : `${intPart}.${decPart}`;
    };
    const calculateDiscount = (actual, discount) => {
        const a = parseFloat(actual);
        const d = parseInt(discount);
        if (!a || !d || d >= a) return null;
        return Math.round(((a - d) / a) * 100);
    };
    const discountPercent = calculateDiscount(actual_price, discount_price)
    return (
        <Link to={`/products/${product_id}`} className='product-link'>
            <div className='product-container d-flex'>
                <div className="product-image-wrapper">
                    {discountPercent && (
                        <div className="svg-discount-badge">
                            <svg viewBox="0 0 200 200" width="60" height="60">
                                <path fill="red" d="M49.6,-63.6C62.2,-51.3,68.9,-32.3,70.4,-14.3C71.9,3.8,68.2,20.9,59.7,35.3C51.2,49.7,38,61.5,22.2,67.6C6.4,73.6,-12,73.8,-28.3,67.4C-44.5,61.1,-58.6,48.3,-65.9,32.6C-73.3,16.9,-74,-1.8,-66.8,-16.8C-59.5,-31.8,-44.3,-43.1,-28.9,-54.2C-13.6,-65.2,2.9,-76,19.4,-75.2C35.9,-74.4,49.6,-61.6,49.6,-63.6Z" transform="translate(100 100)" />
                                <text x="100" y="115" fontSize="36" fontWeight="bold" textAnchor="middle" fill="#fff">
                                    -{discountPercent}%
                                </text>
                            </svg>
                        </div>
                    )}
                    <div className='cart-badge'>
                        <i className="bi bi-basket-fill"></i>
                    </div>
                    <img src={img_url} alt="product_img" className='product-image' />
                </div>

                <div className='product-title'>
                    {product_name}
                </div>
                <div className='price'>
                    <span className='discount-price'> ${formatPrice(discount_price)}</span>
                    <span className='actual-price'> ${formatPrice(actual_price)}</span>
                </div>
                <div className="product-content">
                    <Star rating={rating} />
                    <span className='rating-text'>{rating}</span>
                </div>

            </div>
        </Link>
    )
}
