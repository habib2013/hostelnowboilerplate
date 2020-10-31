import React,{useEffect,useState} from 'react'
import Axios from 'axios'


function DetailProductPage(props) {
   const productId = props.match.params.productId
   const [Product, setProduct] = useState([])
   useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then(response => {
         setProduct(response.data[0])
    })

   //    let vari

   // Axios.post('/api/product/getProduct',variable)

    
   }, [])


   return (
    <div className="postPage" style={{width: '100%'}}></div>
   )
}

export default DetailProductPage;
