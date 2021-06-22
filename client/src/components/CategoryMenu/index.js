import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { updateCategories, updateCurrentCategory } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useStore} from 'react-redux';

function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();
  const store = useStore();
  const dispatch = useDispatch();

  const { categories } = store;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: updateCategories,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: updateCategories,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: updateCurrentCategory,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories?.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
