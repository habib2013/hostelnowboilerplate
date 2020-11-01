import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Col, Row } from 'antd'
import ProductImage from '../../utils/Sections/ProductImage'
import ProductInfo from '../../utils/Sections/ProductInfo'


function DetailProductPage(props) {
   const productId = props.match.params.productId
   console.log( props.match.params.productId)
   const [Product, setProduct] = useState([])
   useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(response => {
       console.log(response.data[0])
         setProduct(response.data[0])
    })

   //    let vari

   // Axios.post('/api/product/getProduct',variable)

    
   }, [])


   return (
    <div className="postPage" style={{width: '100%',padding: '3rem 4rem'}}>
         <div style={{display:'flex',justifyContent: 'center'}}>
   <h1>{Product.title}</h1>
         </div>
<br/>
<Row gutter={[16,16]}>
       <Col lg={12} xs={24}>
         <ProductImage detail={Product}/>
      </Col>
      <Col lg={12} xs={24}>
        <ProductInfo detail={Product}/>
      </Col>
</Row>
    </div>
   )
}

export default DetailProductPage;
