import React,{useState} from 'react'
import { Checkbox,Collapse, Radio} from 'antd';
const {Panel} = Collapse;



const price = [
   {
    "_id": 0,
    "name": "Any",
    "array": []
   },
   {
      "_id": 1,
      "name": "$0 to $199",
      "array": [0,199]
     },
     {
      "_id": 2,
      "name": "$200 to $249",
      "array": [200,249]
     },   
     {
      "_id": 3,
      "name": "$250 to $279",
      "array": [0,199]
     },
     {
      "_id": 4,
      "name": "$280 to $299",
      "array": [0,199]
     },
     {
      "_id": 5,
      "name": "More than $300",
      "array": [300,150000]
     },
     
]




function RadioBox(props) {
   
   const [value, setValue] = useState(0);

   const renderRadioBox = () => 
   price.map((value) => 
<Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
   )

   const handleChange = (e) => {
         setValue(e.target.value)

         props.handleFilters(e.target.value)
         props.handleFilters(e.target.value)
   }


   return (
      <div>
         <Collapse defaultActiveKey={['0']}> 
         <Panel header="price" key="1">
            <Radio.Group onChange={handleChange} value={value}>
             {renderRadioBox()}
            </Radio.Group>

         </Panel>
         </Collapse>
      </div>
   )
}

export default RadioBox;
