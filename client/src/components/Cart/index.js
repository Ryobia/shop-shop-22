import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from "../../utils/queries"
import { idbPromise } from "../../utils/helpers"
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { toggleCart, addMultipleToCart } from "../../utils/actions";
import { useDispatch, useStore } from "react-redux";

import "./style.css";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const store = useStore();
  const dispatch = useDispatch();
  // const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  useEffect(() => {
    console.log(store.cartOpen);
  })

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(addMultipleToCart(cart));
    };

    if (!store.cart?.length) {
      getCart();
    }
  }, [store.cart?.length, dispatch]);

  function toggleCartDiv() {
    dispatch(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    store.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    store.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!store.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCartDiv}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div key={'pleaseWork'} className="cart">
      <div className="close" onClick={toggleCartDiv}>[close]</div>
      <h2>Shopping Cart</h2>
      {store.cart.length ? (
        <div>
          {store.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
              </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
          </span>
          You haven't added anything to your cart yet!
          </h3>
        )}
    </div>
  );
};

export default Cart;
