import { useState } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import { Category, PopularProducts } from './includes/Section'
import SearchBar from '../components/SearchBar'



import { useGetAllCategoriesQuery } from '../store/apiquery/categoryApiSlice';
import Spinner from '../components/Spinner'


const Shop = () => {

  const {isLoading, data : categoryList, isError }  = useGetAllCategoriesQuery("api/categories");


  const [type, setType] = useState('grid');

  const changeTypeToGrid = () => { setType('grid'); }
  const changeTypeToList = () => { setType('list'); }

  return (
    <>
        <Header />
        <div className="shop d-flex flex-wrap gap-3 my-3 text-black p-3 p-lg-5"> 
          <div className="shop-section col-12 col-lg-12">
            <div className="d-flex justify-content-between">
              <div>
                <span className={type === 'grid' ? 'me-2 cursor-pointer fd-color-primary' : 'me-2 cursor-pointer'} onClick={changeTypeToGrid}>
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                </span>
                <span className={type === 'list' ? 'me-2 cursor-pointer fd-color-primary' : 'd-none d-lg-block me-2 cursor-pointer'} onClick={changeTypeToList}>
                  <i className="bi bi-list-task"></i>
                </span>
              </div>
              
              
            </div>
            <PopularProducts type={type} />
          </div>
          
        </div>
        <Footer />
    </>
  )
}

export default Shop