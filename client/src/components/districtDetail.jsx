import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchData,getSingleDistrict, useAppDispatch } from '../app/districtSlice';
import Select from 'react-select';
function DistrictDetail() {
    // console.log('--------------',district);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dispatch = useAppDispatch();
    const items = useSelector((state) => state.district.districts);
    const status = useSelector((state) => state.district.status);
    const error = useSelector((state) => state.district.error);
  const [id,setId]= useState('');
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchData());
        // dispatch(getSingleDistrict(district));
      }
    }, [status, dispatch]);
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getSingleDistrict(id));
  };

  const handleChange = (event) => {
    setId(event.target.value);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions(selected);
  };
// console.log(id)

//     console.log(items)
  return (
//     <form onSubmit={handleSubmit} className='form shadow-lg w-50'>
//     <div className="form-group">
//     <label className='form-control'>
//       District ID:
//       <input type="text" value={id} onChange={handleChange} className='form-control'/>
//     </label>
//     </div>
//     {/* <Select
//       isMulti
//       options={options}
//       value={selectedOptions}
//       onChange={handleChange2}
//     /> */}
//     {/* <button type="submit" className='btn btn-sm btn-dark'>Submit</button> */}
//   </form>
  <div className="container">
    <h1>hi</h1>
  </div>
);
}

export default DistrictDetail
