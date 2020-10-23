import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import {Button, Card, Col, Icon, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/imageSlider';


function LandingPage() {

const [Products, setProducts] = useState([]);
useEffect(() => {
  Axios.post('/api/product/getProducts').then(response => {
      if (response.data.success) {
            setProducts(response.data.products);
        console.log(response.data.products);
      }
      else {
         alert('unable to fetch data')
      }
  })
}, [])


const RenderCards = Products.map((product,index) => {
    return <Col lg={6} xs={24} md={8}>
        <Card
            hoverable={true}
            cover={
                <ImageSlider images={product.image}/>
            }
        >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
        </Card>
    </Col>
})

    return (
     <div style={{width: '75%',margin: '3rem auto'}}>
            <div style={{textAlign:'center'}}>
                    <h2>Let's Travel Anywhere  <Icon type="rocket"/> </h2>
            </div>


        {
            Products.length == 0 ?
            <div style={{display: 'flex',height: '300px',justifyContent: 'center',alignItems: 'center'}}>
                <h2>No posts yet ...</h2>
            </div> : <div>
<Row gutter={[16,16]}>
{RenderCards}
</Row>

            </div>
        }
        <br/><br/>
        <div style={{display: 'flex',justifyContent: 'center'}}>
                <Button>Load More</Button>
        </div>


     </div>
    )
}

export default LandingPage
