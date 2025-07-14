import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import '../styles/Product.css'
import '../styles/Home.css'
import CardProductDetail from '../components/CardProductDetail';
import { getProductDetail } from '../services/productService';
import { useParams } from 'react-router';

export default function Product() {
    const [product, setProduct] = useState([])
    const { id } = useParams();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await getProductDetail(id);
                setProduct(res.data);
            } catch (err) {
                console.error('Failed to load product detail:', err)
            }
        };
        fetchProductDetail();
    }, [id]);
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
                            <li class="breadcrumb-item active" aria-current="page">{product?.category_detail?.category_name}</li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <CardProductDetail
                        product_name={product.product_name}
                        img_url={product.image_url}
                        discount_price={product.discount_price}
                        actual_price={product.actual_price}
                        rating={product.rating}
                        product_id={product.product_id}
                        description={product.description}
                    />
                </div>
            </div>
        </>
    )
}
