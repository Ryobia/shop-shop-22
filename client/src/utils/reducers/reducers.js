//REDUCERS
const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
};

const reduxReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: [...action.payload],
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.payload],
      };

    case "ADD_MULTIPLE_TO_CART":
      return {
        ...state,
        cart: [...state.cart, ...action.payload],
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case "REMOVE_FROM_CART":
      let newState = state.cart.filter((product) => {
        return product._id !== action.payload._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case "TOGGLE_CART":
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: [...action.payload],
      };

    case "UPDATE_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };

    default:
      return state;
  }
};

export default reduxReducer;
