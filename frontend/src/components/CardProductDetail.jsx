import React, { useState } from 'react'
import '../styles/CardProductDetail.css'
import Star from './Star';
import { createCart} from '../services/cartService';
import { useCart } from '../context/CartContext';

export default function CardProductDetail({
    img_url,
    product_name,
    discount_price,
    actual_price,
    rating,
    product_id,
    description,

}) {
    const [quantity, setQuantity] = useState(1);

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

    const {addToCart} = useCart();
    const handleAddToCart = async () =>{
        await addToCart(product_id,quantity,discount_price);
        alert("Product added to cart")
    }

    return (
        <div className='row'>

            <div className="col-12 col-md-6 col-lg-5 ">
                <img src={img_url} alt="" className='product-image-detail' />
            </div>
            <div className='col-12 col-md-6 col-lg-7'>
                <div className='description'>
                    <div className='product-detail-title '>{product_name}</div>
                    <div className="product-content">
                        {rating && (
                            <Star rating={rating} />
                        )}
                        <span className='rating-text'>{rating}</span>
                    </div>
                    <span className='discount-percent-detail'> {-discountPercent}% </span>
                    <span className='discount-price-detail'> ${formatPrice(discount_price)}</span>
                </div>
                <div className='description quantity-display'>
                    <h5>Quantity</h5>
                    <div>
                        <button className='btn-quantity'> + </button>
                        <button className='btn-quantity'> 1 </button>
                        <button className='btn-quantity'> - </button>
                    </div>
                    <h5>Provisional</h5>
                    <span className='discount-price-provisonal'> ${formatPrice(discount_price)}</span>
                    <div className='add-cart-container'>
                        <button className='add-to-cart btn-cart-p' onClick={handleAddToCart}>Add to cart</button>
                        <button className='buy-now btn-cart-p'>Buy now</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 quantity-display-md">
                <div className='description'>
                    <h5>Quantity</h5>
                    <div>
                        <button className='btn-quantity'> + </button>
                        <button className='btn-quantity'> 1 </button>
                        <button className='btn-quantity'> - </button>
                    </div>
                    <h5>Provisional</h5>
                    <span className='discount-price-provisonal'> ${formatPrice(discount_price)}</span>
                    <div className='add-cart-container'>
                        <button className='add-to-cart btn-cart-p'onClick={handleAddToCart}>Add to cart</button>
                        <button className='buy-now btn-cart-p'>Buy now</button>
                    </div>
                </div>
            </div>
            <div className="col-12">
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
