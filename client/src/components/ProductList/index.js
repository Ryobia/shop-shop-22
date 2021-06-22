import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { updateProducts } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"
import { useDispatch, useStore } from "react-redux";


function ProductList() {
  // const [state, dispatch] = useStoreContext();
  const store = useStore();
  const { currentCategory } = store;
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if(data) {
      dispatch(updateProducts(data.products));
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return store.products;
    }

    return store.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {store.products?.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
