import React, { FC } from 'react'
import { useEffect, useState } from 'react';
import ProductCart, { ProductType } from '../../components/ProductCart'

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useGetAllProductsQuery, useGetBestProductsQuery } from '../../store/apiquery/productApiSlice';
import Spinner from '../../components/Spinner';
import { useGetAllCategoriesQuery } from '../../store/apiquery/categoryApiSlice';
import RoutePaths from '../../config';


const Category = ({ category, arrow = 'left' }: { category: any, arrow?: string }) => {

  return <div key={category.id} className="category text-dark">
    {arrow === 'left' ? <i className='bi bi-chevron-double-right me-2'></i> : null}
    <Link to={"/"} className='text-dark'>{category.name}</Link>
    {arrow === 'right' ? <i className='bi bi-chevron-right float-end opacity-75 me-2'></i> : null}
  </div>
}



const About: FC = () => {

  return (
    <div className="section-info p-2 py-4 rounded-3 my-5 border-2 border-color-light shadow text-black" style={{ minHeight: '100px' }}>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-bus-front fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Free Shipping</h6><span className="font-light opacity-75">Free USA shipping when you spend £30.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-flower2 fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Get Fresh Products</h6><span className="font-light opacity-75">Find a range of best online organic food.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-currency-dollar fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Moneyback Offer</h6><span className="font-light opacity-75">Free USA shipping when you spend £30.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-shield-x fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Safe Payment</h6><span className="font-light opacity-75">We are using secure payment methods.</span></div>
          </div>
        </div>
      </div>
    </div>
  );

}
// const PopularProducts = ({ grid = 3, type = 'grid' }: { grid?: number | boolean, type?: string }) => {

//   const { isLoading, data: productsList, isSuccess, isError } = useGetAllProductsQuery('api/products');

//   // const productsList : ProductType[] = useAppSelector((state) => state.products);

//   let content: React.ReactNode;

//   content = isLoading || isError
//     ? <Spinner />
//     : isSuccess
//       ? productsList['data'].map((product: ProductType) => <ProductCart {...product} type={type} key={product.id} />)
//       : null;


//   return (
//     <div className={type === 'list' ? "test" : "d-grid gap-3 grid-0 grid-lg-" + grid}>
//       {content}
//     </div>
//   )
// }
const PopularProducts = ({ grid = 3, type = 'grid' }: { grid?: number | boolean, type?: string }) => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProductsList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  let content: React.ReactNode;

  content = isLoading
    ? <Spinner />
    : productsList.map((product: ProductType) => <ProductCart {...product} type={type} key={product.id} />);

  return (
    <div className={type === 'list' ? "test" : "d-grid gap-3 grid-0 grid-lg-" + grid}>
      {content}
    </div>
  )
}



const Section = () => {

  return (
    <section>
      <div className="container-fluid">
        
        <div className='px-3 px-lg-5 py-4'>
          <About />
          
          <div className="popular-products text-black my-5">
            <div className="d-flex flex-wrap justify-content-between mb-5">
              <h4>Popular Products</h4>
              <div><Link to={RoutePaths.shop} className="fd-btn fw-bold">View All <i className="bi bi-arrow-right"></i></Link></div>
            </div>
            <PopularProducts grid={3} />
          </div>
          
          
          
          
        </div>
        
      </div>
    </section>
  )
}

export { Section, PopularProducts,  Category };