import React,{useState} from 'react'
import {Input} from 'antd'

const {Search} = Input;

function SearchFeatures(props) {

   const [SearchTerms, setSearchTerms] = useState('')

   const onSearchChange = (e)  => {
      setSearchTerms(e.currentTarget.value)
      props.refreshFunction(e.currentTarget.value)
   }

   return (
      <div>
        <Search
         value = {SearchTerms}
         onChange = {onSearchChange}
         placeholder="search by Typing ..."
        />
      </div>
   )
}

export default SearchFeatures;
