
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './Jobs.css';

const ADD_TO_CART = gql`
  mutation AddItems ($item: AddToCartInput!){
    addItem(input: $item){
        totalItems
    }
  }
`;

const GET_CART = gql`
  query GetItems {
    cart {
      totalItems
    }
  } 
`;

const Items= () => {
   const [addToCartMutation, {data, loading, error}] = useMutation(ADD_TO_CART);
   const [getCartQuery, result] = useLazyQuery(GET_CART);
   const [ID, setID] = useState("")
   const [price, setPrice] = useState(0)
   const [quantity, setQuantity] = useState(1)
   const [clicked, setClicked] = useState(false)

   const AddItemToCart = () =>{
      addToCartMutation({
          variables: {
              item: {
                  id: ID,
                  cartId: "123",
                  price:price,
                  quantity:quantity
              }
          }
      }).then(() =>{getCartQuery().then((result) =>console.log(result))})
     console.log("item added")
   }
   
   if (loading) return <p>Loading...</p>;

   console.log(result?.data)
 
   return (<div>
            <div className='item-list'>
              {data?.addItem.totalItems} items
            </div>
            <div className='add-item'>
              <input type="text" onChange={(e)=>setID(e.target.value)}/>
              <input type="number" onChange={(e)=>setPrice(parseInt(e.target.value))}/>
              <input type="number" onChange={(e)=>setQuantity(parseInt(e.target.value))}/>
              <button onClick={AddItemToCart}>Submit</button>
            </div>
          </div>)
}
export default Items;