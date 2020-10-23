import TextArea from 'antd/lib/input/TextArea';
import React,{useState} from 'react';
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';


function UploadProductPage(props) {
      const [TitleValue, setTitleValue] = useState('');
      const [DescriptionValue, setDescriptionValue] = useState('')
      const [priceValue, setPriceValue] = useState('');
      const [continentValue, setContinentValue] = useState(1);
      
      const [Images, setImages] = useState([]);

      const {Title} = Typography;
      const {TextArea} = Input;

      const continents = [
            {key:1,value:"Africa"},
            {key:2,value:"Asia"},
            {key:3,value:"North America"},
            {key:7,value:"South America"},
            {key:4,value:"Europe"},
            {key:5,value:"Australia"},
            {key:6,value:"Antartica"},
      ];

     const onContinentSelectChange = (e) => {
            setContinentValue(e.currentTarget.value);
     }

      const onTitleChange = (e) => {
         setTitleValue(e.currentTarget.value);
      }
   
      const onDescriptionChange = (e) => {
         setDescriptionValue(e.currentTarget.value);
      }

      const onPriceChange = (e) => {
         setPriceValue(e.currentTarget.value);
      }

      const updateImages = (newImages) => {
            setImages(newImages)
      }

      const onSubmit = (e) => {
         e.preventDefault();

            if (!TitleValue || !DescriptionValue || !priceValue || !continentValue || !Images) {
               alert('Fill out all fields')
            }


         const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: priceValue,
            image: Images,
            continents: continentValue
         }

         Axios.post('/api/product/uploadProduct',variables).then(
            response => {
               if (response.data.success) {
                     alert('product successfully updated')
                     props.history.push('/')
               }
               else {
                  alert('Faled to upload product')
               }
            }
         )
      }


   return(
      <div style={{maxWidth: '700px', margin:'2rem auto'}}>
         <div style={{textAlign:'center',marginBottom:'2rem'}}>
               <Title level={2}>Upload Travel Product</Title>
         </div>

         <Form onSubmit={onSubmit}>
            <FileUpload refreshFunction={updateImages}/>
            <br/>
            <br/>
            <label>Title</label>
            <Input
               onChange={onTitleChange}
               value={TitleValue}
            />
            <br/>
            <br/>
            <label>Description</label>
               <TextArea
                     onChange={onDescriptionChange}
                     value = {DescriptionValue}
                     
               />
               <br/>
            <br/>
            <label>Price($)</label>
            <Input
               onChange ={onPriceChange}
               value = {priceValue}
               type="number"
            />
            <br/>
            <br/>
               <select onChange={onContinentSelectChange}>
                  {continents.map(item => 
                  <option key={item.key} value = {item.key}>{item.value}</option>

                  )
                  }

                  

               </select>
               <br/>
               <br/>
               <Button
                  onClick={onSubmit}
               >
               Submit
               </Button>
         </Form>

      </div> 

   );
}

export default UploadProductPage;