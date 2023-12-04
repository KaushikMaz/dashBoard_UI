import React from 'react'


const Header = ({onSearchChange,onDeleteAll}) => {
    const [searchText,setSearchText]= React.useState("")
    const handleChange=(event)=>{
        setSearchText(event.target.value)
        onSearchChange(event.target.value)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        setSearchText("")

    }
  return (
    <div className="flex w-[80rem] mx-10">
        <form  onSubmit={handleSubmit} >
            <input  className="w-[40rem] px-2 py-1 border border-gray-600 rounded-lg  my-1" type="text" placeholder='Search Here' value={searchText} onChange={handleChange}/>
            <button className="hover:bg-gray-400 w-24 rounded-lg  mx-2 px-2 py-1 border border-gray-100 text-gray-100 bg-slate-600"> Search </button>
        </form>
        <div >
            <button onClick={onDeleteAll} className=" w-22 px-2 py-1 my-1 mx-2 border border-slate-700 bg-gray-50 text-slate-700 rounded-lg">Delete All</button>
            
        </div>
        
    </div>
  )
}

export default Header