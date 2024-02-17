import React from 'react'
import { useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { dropDownValue } from '../constatnt/constant';
import Input from '../input/index';
function GenerateForm() {
  
  const [initialData , setInitialData] = useState({ 
    type: '', 
    label: '', 
    options: [] 
 }); 

 const [formInput,setFormInput] = useState({});

 const [formFields, setFormFields] = useState([]);
 const [itemStyle,setItemStyle] = useState(false);

  const handleChange = (e)=>{
      const updatedData = {...initialData};
      updatedData[e.target.name] = e.target.value;
      console.log("gggggg",updatedData);
      
      if(updatedData.type=="dropdown" || updatedData.type=="checkbox" || updatedData.type=="radio")
        setItemStyle(true);
      else
        setItemStyle(false);
      setInitialData({...updatedData});  
  }

  const addOptionvalue = (e) => {
    e.preventDefault();
    let data = document.getElementById("options").value;
    console.log(data);

      let updateIn = {...initialData,options:[...initialData.options,data]};
      
      setInitialData({...updateIn});
      console.log(updateIn);
      document.getElementById("options").value="";
  };
  
  const handleClick = ()=>{
    setFormFields([...formFields,initialData]);
    const obj = {...formInput};
    
    if(initialData.type=='checkbox')
     {
       obj[initialData.label] = [];
      }
    else
     obj[initialData.label] = '';
    console.log(obj);
    setFormInput({...obj});
    setInitialData({ 
      type: '', 
      label: '', 
      options: [] 
   });
   setItemStyle(false);
   setOpen(false);
   
  }

  const deleteItem = (id)=>{
    let updated = initialData.options.filter((i,index)=>{
      return id!=index;
    })
    setInitialData({...initialData,options:updated});
  }
  const[open,setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onChangeHandler = (e)=>{
    const updated = {...formInput};
   
    console.log(e.target.name);
    console.log(e.target.value);
    setFormInput({...updated[e.target.name], updated:e.target.value})
      console.log(updated);
    if(e.target.type==='checkbox')
    {
      console.log(e.target.parentElement.label);
      if(e.target.checked ) 
     { 
      if(updated.hasOwnProperty(e.target.name.split("_")[0]))
        updated[e.target.name.split("_")[0]].push(e.target.value);
      else{
        updated[e.target.name.split("_")[0]] = [e.target.value];
      }
      console.log("data ",updated);
    }
    else
    {
      console.log("welcome",e.target.value);
      updated[e.target.name.split("_")[0]].splice(updated[e.target.name.split("_")[0]].indexOf(e.target.value),1);
      console.log(updated);
    }
    }
    else
      updated[e.target.name] = e.target.value;
    
    setFormInput(updated);
    console.log(updated);
  }
 const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(formInput);
    console.log(JSON.stringify(formInput));
 }
  return (
    <div>
      <h1 className='heading'>DYNAMIC FORM GENERATOR</h1>
        <div className="App">
            
          <form className='form'>
            {formFields.map((field)=>{
              return (
                <Input type={field.type} label={field.label} options={field.options} onChangeHandler={onChangeHandler}/>)
            })}
          {formFields.length>0 && <button onClick={handleSubmit}>Submit</button>}
          </form>
          <section className='toolbarSection'>
            <h1>Toolbar</h1>
            <button onClick={openModal}>Set input type</button>

              <Modal open={open} onClose={closeModal} style={{margin:"0",padding:"0"}}>
                <form >
                  <div>
                    <label htmlFor='inputType'> Selecet Input Type</label>
                    <select onChange={handleChange} name="type">
                      <option>Select Option</option>
                      {dropDownValue.map((i)=>{
                        return (<option key={i.id} value={i}>{i}</option>)
                      })}
                    </select>
                  </div>
                  <div>
                    <label htmlFor='label'>Label Name</label>
                    <input type='text' name='label' onChange={handleChange}/>
                  </div>
                  
                 <div style={{display:itemStyle?"block":"none"}}>
                    <input type='text' name='options' id='options'/>
                    <button onClick={addOptionvalue}>Add Item</button>
                 </div>
                </form>
                <ul>
                {initialData?.options?.map((item,index) => (
                  <li key={item}>{item}
                  <button onClick={()=>{deleteItem(index)}}>Delete</button>
                  </li>
                ))}
              </ul>

              <button onClick={handleClick} >Add Fields</button>
              </Modal>
          </section>
        </div>
    </div>
  )
}

export default GenerateForm
