import React from 'react'
import { data_API } from './constants'
import TableRow from './TableRow'
import Header from './Header'

const MainTable = () => {
  const [data,setData]=React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredData,setFilteredData]=React.useState([])
  const [searchText, setSearchText] = React.useState('');
  const rowsPerPage = 14;

  React.useEffect(()=>{
   getDashboardData()
  },[])

  React.useEffect(()=>{
    filterData()
  },[data,searchText])

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

  const deleteItem=(ItemId)=>{
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
const handleDeleteAll = () => {
  const checkedRows = data.filter((item) => item.isChecked);
  const checkedIds = checkedRows.map((item) => item.id);
  setData((prevData) => prevData.filter((item) => !checkedIds.includes(item.id)));
}

const filterData = () => {
  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.role.toLowerCase().includes(searchText.toLowerCase())
  );
  setFilteredData(filtered);
};

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (value) => {
    setSearchText(value);

  }
  return (
    <div>
      <Header onSearchChange={handleSearchChange} onDeleteAll={handleDeleteAll}/>
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
       {currentRows.map((rowData) => (
        <TableRow
          key={rowData.id}
          {...rowData}
          handleCheckBoxChange={handleCheckBoxChange}
          deletevalue={deleteItem}
        />
      ))}
      {/* <div>
        {data.map(data=><TableRow  handleCheckBoxChange={handleCheckBoxChange} deletevalue={deletItem}key={data.id}{...data}/>)}
                
      </div>
    </div> */}
     <div className="ml-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button className=" hover:bg-slate-500 hover:text-slate-200 ml-2 w-8  border border-slate-400 text-gray-700 rounded-lg" key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MainTable