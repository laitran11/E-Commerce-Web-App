import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import '../styles/Product.css'
import '../styles/Home.css'
import { useSearchParams } from 'react-router';
import { getProducts } from '../services/productService';
import CardProduct from '../components/CardProduct';

export default function SearchInput() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [totalPages, setTotalPages] = useState(1);
    const [field, setField] = useState('');
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [count,setCount] = useState(0);
    const resultTextStyle ={
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '10px',
    }

    // pagination 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts(page, pageSize, field, name);
                setProducts(res.data.results);
                setCount(res.data.count);
                const totalItems = res.data.count;
                setTotalPages(Math.ceil(totalItems / pageSize));
                console.log(res)
            }
            catch (err) {
                console.log('Failed to fetch products', err)
            }
        }
        fetchProducts();
    }, [page, pageSize, field, name]);
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
                            <li class="breadcrumb-item active" aria-current="page"> Search results for  "{name}"</li>
                        </ol>
                    </nav>
                </div>
                
                <div>
                <div style={resultTextStyle}>Found {count} products for keyword '{name}'</div>
                    <div className="row mt-4">
                        <div className='fiter-align'>
                            <div className='filter-align-btn'>
                                <button className="btn-filter" onClick={() => setField('price_asc')}>
                                    <i class="bi bi-sort-up"></i>
                                    Low - High Price
                                </button>
                                <button className="btn-filter" onClick={() => setField('price_desc')}>
                                    <i class="bi bi-sort-down"></i>
                                    High - Low Price
                                </button>
                            </div>
                            <div className="pagination-controls pagination-align">
                                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className='btn-pagination-control'>Prev</button>
                                <span>Page {page} of {totalPages}</span>
                                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className='btn-pagination-control'>Next</button>

                                <select value={pageSize} onChange={(e) => { setPageSize(parseInt(e.target.value)); setPage(1); }} className='pagination-select'>
                                    <option value={12}>12 / page</option>
                                    <option value={20}>20 / page</option>
                                    <option value={30}>30 / page</option>
                                    <option value={50}>50 / page</option>
                                </select>
                            </div>
                        </div>


                        {products && products.map((product) => (
                            <div className="col-6 col-md-4 col-lg-3 mt-2 mb-2" key={product.product_id}>
                                <CardProduct
                                    product_name={product.product_name}
                                    img_url={product.image_url}
                                    discount_price={product.discount_price}
                                    actual_price={product.actual_price}
                                    rating={product.rating}
                                    product_id={product.product_id}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}
