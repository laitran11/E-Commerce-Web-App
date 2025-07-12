import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import carousel_img1 from '../assets/carousel/carousel_img1.png';
import carousel_img2 from '../assets/carousel/carousel_img2.png';
import carousel_img3 from '../assets/carousel/carousel_img3.png';
import { getCategoryParent, getCategoryByParentId } from '../services/categoryService';
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

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
        <div className='category-container'>
          <div className="row">
            <div className="col-4 category-inner">
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
                                    <li key={grandchild.category_id} className="menu-text menu-item-grandchild">{grandchild.category_name}</li>
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
        </div>
      </div>
    </>
  )
}
