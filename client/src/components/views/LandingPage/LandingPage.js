import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import {Button, Card, Col, Icon, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/imageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './RadioBox';
import {Continents,price} from './Data'
import SearchFeatures from './Sections/SearchFeatures';
import { Link } from 'react-router-dom';


function LandingPage() {

const [Products, setProducts] = useState([]);
const [Skip, setSkip] = useState(0)
const [Limit, setLimit] = useState(8)
const [PostSize, setPostSize] = useState(0)
const [SearchTerms, setSearchTerms] = useState('')
const [Filters, setFilters] = useState({
    continents: [],
    price: []
})


useEffect(() => {
    const variables = {
        skip: Skip,
        limit: Limit,

    }
    getProducts(variables)
}, [])

const getProducts = (variables) => {
    Axios.post('/api/product/getProducts',variables).then(response => {
        if (response.data.success) {
                if(variables.loadMore){
                    setProducts([...Products,...response.data.products]);
        
                }
                    else {
                        setProducts(response.data.products);
          
                    }

           
                setPostSize(response.data.postSize)
              console.log([...Products,response.data.products]);
        }
        else {
           alert('unable to fetch data')
        }
    })
}

const RenderCards = Products.map((product,index) => {
    return <Col lg={6} xs={24} md={8}>
        <Card
            hoverable={true}
            cover={ <Link to={`/product/${product._id}`}>

                <ImageSlider images={product.image}/>
            </Link>
            }
        >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
        </Card>
    </Col>
})


const showFIlteredResults = (filters) => {
    const variables = {
        skip: 0,
        limit: Limit,
        filters: filters
    }
    getProducts(variables)
    setSkip(0)
}

const handlePrice = (value) => {
    const data = price;
    let array = [];

    for(let key in data){
        
        if(data[key]._id == parseInt(value,10)) {
                array = data[key].array;
        }
    }
    console.log('array',array)
    return array;
}

const handleFilters = (filters,category) => {
        console.log(filters)
    const newFilters = {...Filters}

    
    newFilters[category] = filters

    if (category === 'price') {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues
    }

    console.log(newFilters) 
    showFIlteredResults(newFilters)
    setFilters(newFilters)

}


const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
        skip: skip,
        limit: Limit,
        loadMore: true  
    }

    getProducts(variables)

        setSkip(skip)
}

const updateSearchTerms = (newSearchTerm) => {
  
    // console.log(newSearchTerm)

    const variables = {
        skip: 0,
        limit: Limit,
        filters: Filters,
        searchTerm: newSearchTerm
    }
       setSkip(0)
       setSearchTerms(newSearchTerm)
    getProducts(variables)
}




    return (
     <div style={{width: '75%',margin: '3rem auto'}}>
            <div style={{textAlign:'center'}}>
                    <h2>Let's Travel Anywhere  <Icon type="rocket"/> </h2>
            </div>

           <Row gutter={[16,16]}>
               <Col lg={12} xs={24}>
               <CheckBox 
               list={Continents}
        handleFilters={filters => handleFilters(filters, 'continents')}
        />
               </Col>
               <Col lg={12} xs={24}>
               <RadioBox 
               list={price}
          handleFilters={filters => handleFilters(filters, 'price')}
        />
               </Col>


               </Row> 
<div style={{display: 'flex',justifyContent: 'flex-end', margin: '1rem auto'}}>

<SearchFeatures
refreshFunction = {updateSearchTerms}
/>

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
        {
            PostSize >= Limit && 
            <div style={{display: 'flex',justifyContent: 'center'}}>
            <Button onClick={onLoadMore}>Load More</Button>
    </div>
        }
   


     </div>
    )
}

export default LandingPage
