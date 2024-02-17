import React, { useEffect } from 'react'
import './input.css';

function Input(props) {
  const {type,label,options, onChangeHandler} = props;
  const renderField = () => {
    switch (type) {
      case 'dropdown':
        return (<>
        <label htmlFor='select'>{label}</label>
          <select className='mySelect' name={label} onChange={onChangeHandler}>
            <option>Select</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
             {option}
           </option>
            ))}
          </select></>
          
        );
      case 'checkbox':
        return (

        <div>
          <label>{label}</label>
          {options.map((option, index) => (
          <>
          {/* <label key={index}>{option}
          </label>
            <input type="checkbox" value={option}/> */}
            <label class="checkbox-container">
            <input type="checkbox" class="custom-checkbox" value={option} name={option} onChange={onChangeHandler}/>
            {/* <span class="custom-checkbox"></span> */}
            <span class="checkbox-label">{option}</span>
            </label>
            </>
        ))}
        </div>
        )
        
        
      case 'radio':
        return (<div>
          <label>{label}</label>
          {options.map((option, index) => (
          <>
            {/* <label key={index}>{option}
            </label>
            <input type="radio" value={option}/> */}
            <label class="radio-container">
              <input type="radio" name={label} value={option} className="custom-radio" onChange={onChangeHandler}/>
            
              <span class="radio-label">{option}</span>
            </label>
            </>
        ))}
        </div>)
      default:
        return (<div>
        <label>{label}</label>
        <input type={type} className='myInput' name={label} onChange={onChangeHandler}/>
        </div>)
    }
  };

  return (
    <div className='inputContainer'>
      {renderField()}
    </div>
  )
}

export default Input;
