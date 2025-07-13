import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import carousel_img1 from '../assets/carousel/carousel_img1.png';
import carousel_img2 from '../assets/carousel/carousel_img2.png';
import carousel_img3 from '../assets/carousel/carousel_img3.png';
import { getCategoryParent, getCategoryByParentId } from '../services/categoryService';
import CardProduct from '../components/CardProduct';
import { getProducts } from '../services/productService';


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [field, setField] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const parentRes = await getCategoryParent();
        const parents = parentRes.data;

        // Fetch for the next children
        const withChildren = await Promise.all(
          parents.map(async (parent) => {
            const childRes = await getCategoryByParentId(parent.category_id)
            const children = await Promise.all(
              childRes.data.map(async (child) => {
                const grandChildRes = await getCategoryByParentId(child.category_id)
                return {
                  ...child,
                  children: grandChildRes.data
                };
              })
            );
            return {
              ...parent,
              children,
            };
          })
        );
        setCategories(withChildren);
      }
      catch (err) {
        console.log('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const toggleOpen = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // pagination 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts(page, pageSize, field, categoryId);
        setProducts(res.data.results);
        const totalItems = res.data.count;
        setTotalPages(Math.ceil(totalItems / pageSize));
      }
      catch (err) {
        console.log('Failed to fetch products', err)
      }
    }
    fetchProducts();
  }, [page, pageSize, field, categoryId]);


  return (
    <>
      <div className='home-container'>
        <Navbar />
        <div className='container home-content'>
          <div className='carousel'>
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={carousel_img1} className="d-block carousel-img" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={carousel_img2} className="d-block  carousel-img" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={carousel_img3} className="d-block carousel-img" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>

          </div>
        </div>
      </div>
      <div className='container'>
        {/* categories && product */}
        <div className="row">
          {/* Category section  */}
          <div className="col-12 col-md-4">
            <div className='category-inner'>
              <h3 className='category-title'>Category</h3>
              <div className="category-menu">
                <ul className="menu">
                  {categories.map((parent) => (
                    <li key={parent.category_id}>
                      <div className="menu-item" onClick={() => toggleOpen(parent.category_id)}>
                        <span className="menu-text">{parent.category_name}</span>
                        {parent.children?.length > 0 && (
                          <span className="arrow">{openCategories[parent.category_id] ? (<i class="bi bi-caret-up-fill"></i>) : (<i class="bi bi-caret-down-fill"></i>)}</span>
                        )}
                      </div>

                      {openCategories[parent.category_id] && parent.children?.length > 0 && (
                        <ul className="submenu">
                          {parent.children.map((child) => (
                            <li key={child.category_id}>
                              <div className="menu-item" onClick={() => toggleOpen(child.category_id)}>
                                <span className="menu-text">{child.category_name}</span>
                                {child.children?.length > 0 && (
                                  <span className="arrow">{openCategories[child.category_id] ? (<i class="bi bi-caret-up-fill"></i>) : (<i class="bi bi-caret-down-fill"></i>)}</span>
                                )}
                              </div>

                              {openCategories[child.category_id] && child.children?.length > 0 && (
                                <ul className="submenu">
                                  {child.children.map((grandchild) => (
                                    <li key={grandchild.category_id} className="menu-text menu-item-grandchild" onClick={() => setCategoryId(grandchild.category_id)}>{grandchild.category_name}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Product section  */}
          <div className='col-12 col-md-8'>
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
                <div className="col-6 col-lg-4 mt-2 mb-2" key={product.product_id}>
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

      </div>
    </>
  )
}
