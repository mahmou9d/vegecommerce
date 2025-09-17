import React, { useEffect } from 'react'
import Categories from './Categories'
import { useAppDispatch, useAppSelector } from '../store/hook';
import { RootState } from '../store';
import { productUser } from '../store/productSlice';
type TProduct = {
  id: number;
  name: string;
  description: string;
  original_price: string;
  final_price: string;
  discount: number;
  stock: number;
  categories: string[];
  tags: string[];
  img: string;
  average_rating: number;
  img_url: string;
};
const Shop = () => {
const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(
      (state: RootState) => state.product
    );
console.log(products,'ppppppppppppppppppppppp')
    useEffect(() => {
      if (products.length === 0) {
        dispatch(productUser());
      }
    }, [dispatch, products.length]);
  return (
    <div>
      <Categories products={products as TProduct[]} title={"Shop"} />
    </div>
  );
}

export default Shop
