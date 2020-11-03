import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';
import {getCartItems,removeCartItem} from '../../../_actions/user_actions'
import UserCardBlock from './UserCardBlock';
import {Empty, Result} from 'antd'
import Paypal from '../../utils/Paypal';

function CartPage(props) {
const dispatch = useDispatch();
const [Total, setTotal] = useState(0)
const [ShowTotal, setShowTotal] = useState(false)
const [showSuccess, setShowSuccess] = useState(false)

   useEffect(() => {
         let cartItems = [];
         
         if(props.user.userData && props.user.userData.cart){
            if (props.user.userData.cart.length > 0) {
              props.user.userData.cart.forEach((item) => {
                 cartItems.push(item.id)
              });
              dispatch(getCartItems(cartItems,props.user.userData.cart))
            }
         }
   }, [props.user.userData])

      useEffect(() => {
         if (props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculateTotal(props.user.cartDetail)
         }
      }, [props.user.cartDetail])

      const calculateTotal = (cartDetail) => {
               let total = 0;
               cartDetail.map(item => {
                  total += parseInt(item.price) * item.quantity
               })
                  setTotal(total)
                  setShowTotal(true)
      }

      const removeFromCart = (productId) => {
         dispatch(removeCartItem(productId)).then(
            () => {
               Axios.get('/api/users/userCartInfo')
               .then(response => {
                  if (response.data.success) {
                     if(response.data.cartDetail.length <= 0 ) {
                       setShowTotal(false)
                     }
                     else {
                        calculateTotal(response.data.cartDetail)
                     }
                  }
                  else {
                     // alert('unable to get Cart Details')
                  }
               })
            }

         )
      }

   return (
      <div style={{width:'85%',margin:'3rem auto'}}>
        <h1>My Cart</h1>
        <div>
         <UserCardBlock 
         products = {props.user.cartDetail}
            removeItem = {removeFromCart}
         />

      

      { ShowTotal ?
               <div style={{marginTop: '3rem'}}>
               <h2>Total amount: $ {Total}</h2> 
             </div> :
         showSuccess ? 
         <Result
         status="success"
         title = "Successfully purchased Items"
      /> : 

      <div style={{
         width:'100%', display: 'flex',flexDirection: 'column',
         justifyContent: 'center'
      }}>
            <br/>
            <Empty description={false}/>
            <p>No Items in the cart</p>
      </div>
      }

    
    

        


        </div>

<Paypal/>

      </div>
   )
}

export default CartPage;
