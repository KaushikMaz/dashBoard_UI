import React from 'react'
import { data_API } from './constants'
import TableRow from './TableRow'

const MainTable = () => {
  const [data,setData]=React.useState([])
  React.useEffect(()=>{
   getDashboardData()
  },[])

  const getDashboardData=async()=>{
    try{
      const myData=await fetch(data_API)
      if (!myData.ok) {
        throw new Error(`HTTP error! Status: ${myData.status}`);
      }

      const response=await myData.json()
      // console.log(response)
      const items=response.map(item=>({...item,isChecked:false}))
      setData(items)

    }catch(error){
      console.error("Error:",error.message)
    }
    
    
  }

  const deletItem=(ItemId)=>{
    setData(prevdata=>prevdata.filter(data=>data.id!=ItemId))

  }

  const [allChecked,setAllChecked]=React.useState(false)

  const handleCheckBoxChange=(Itemid)=>{
    setAllChecked(false)
    setData(prevdata=>prevdata.map(item=>item.id===Itemid ?{...item,isChecked:!item.isChecked}:item))
}

const handleAllCheckBox=()=>{
  setAllChecked(!allChecked)
  setData(prevdata=>prevdata.map(item=>({...item,isChecked:!allChecked})))

}


  return (
    <div>
      <table className="font-mono  h-3 border-black  border-t-2 border-b mx-10 my-2 text-gray-100  w-[80rem] ">
        <thead className='text-lg bg-slate-600'>
          <tr>
            <th>
              <input type="checkbox" onChange={handleAllCheckBox}/>
            </th>
            <th className='hover:italic'>
              Name
            </th>
            <th className="hover:italic">
              Email
            </th>
            <th className="hover:italic">
              Role
            </th>
            <th className="hover:italic">
              Actions
            </th>
          </tr>
        </thead>
      </table>
      <div>
        {data.map(data=><TableRow  handleCheckBoxChange={handleCheckBoxChange} deletevalue={deletItem}key={data.id}{...data}/>)}
                
      </div>
    </div>
  )
}

export default MainTable