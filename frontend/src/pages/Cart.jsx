import React, { useState, useEffect } from 'react'
import '../styles/Cart.css'
import Navbar from '../components/Navbar';
import '../styles/Product.css'
import '../styles/Home.css'
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cartItems } = useCart()
    const totalPrice = cartItems?.reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.quantity;
      }, 0);
    return (
        <>
            <div className='home-container'>
                <Navbar />
            </div>
            <div className="container">
                <div className='breadcrumb breadcrumb-align'>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Cart</li>
                        </ol>
                    </nav>
                </div>
                <div className=''>
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className='description'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Product name</th>
                                            <th scope='col'>Unit name</th>
                                            <th scope='col'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems && cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className='product-name-container'>
                                                        <img src={item.product.image_url} alt="" className='cart-img-cart' />
                                                        <div>{item.product.product_name}</div>
                                                    </div>
                                                </td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className='description'>
                                <h6 className='order-title'>Order Information</h6>
                                <div className='order-align'>
                                    <span>Product total price</span>
                                    <span>${totalPrice.toFixed(2)} </span>
                                </div>
                                <div className='order-align'>
                                    <span>Discount</span>
                                    <span> -0</span>
                                </div>
                                <div className='order-align'>
                                    <span>Total payment</span>
                                    <span> ${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className='btn-order'>Order now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
