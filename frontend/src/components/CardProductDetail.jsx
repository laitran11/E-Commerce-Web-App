import React from 'react'
import '../styles/CardProductDetail.css'
import Star from './Star';
export default function CardProductDetail({
    img_url,
    product_name,
    discount_price,
    actual_price,
    rating,
    product_id,
    description,

}) {
    const formattedDescription = description?.split('|').map((text, index) => (
        <li className='description-item' key={index}>{text.trim()}</li>
    ))
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
        <div className='row'>

            <div className="col-12 col-md-6 col-lg-5 ">
                <img src={img_url} alt="" className='product-image-detail' />
            </div>
            <div className='col-12 col-md-6 col-lg-7'>
                <div className='description'>
                    <div className='product-detail-title '>{product_name}</div>
                    <div className="product-content">
                        { rating && (
                            <Star rating={rating} />
                        )}
                        <span className='rating-text'>{rating}</span>
                    </div>
                    <span className='discount-percent-detail'> {-discountPercent}% </span>
                        <span className='discount-price-detail'> ${formatPrice(discount_price)}</span>
                </div>
                <div className='description'>
                    <h5 className='description-title'>About this item</h5>
                    <ul>{formattedDescription}</ul>
                </div>
            </div>
            <div className='col-12 col-lg-6'>

            </div>
        </div>
    )
}
