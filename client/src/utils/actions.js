//ACTIONS
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product
  };
};
export const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product
  };
};
export const updateProducts = (products) => {
  return {
    type: "UPDATE_PRODUCTS",
    payload: products
  };
};
export const addMultipleToCart = (products) => {
  return {
    type: "ADD_MULTIPLE_TO_CART",
    payload: products
  };
};
export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
export const updateCartQuantity = (id, purchaseQuantity) => {
  return {
    type: "UPDATE_CART_QUANTITY",
    _id: id,
    purchaseQuantity: purchaseQuantity
  };
};
export const toggleCart = () => {
  return {
    type: "TOGGLE_CART",
  };
};
export const updateCategories = (categories) => {
  return {
    type: "UPDATE_CATEGORIES",
    payload: categories
  };
};
export const updateCurrentCategory = (currentCategory) => {
  return {
    type: "UPDATE_CURRENT_CATEGORY",
    payload: currentCategory
  };
};
