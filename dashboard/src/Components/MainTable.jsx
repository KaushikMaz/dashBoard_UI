import React from 'react';
import { data_API } from './constants';
import TableRow from './TableRow';
import Header from './Header';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const MainTable = () => {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [editingRow, setEditingRow] = React.useState(null);
  const [allChecked, setAllChecked] = React.useState(false);
  const rowsPerPage = 10;

  React.useEffect(() => {
    getDashboardData();
  }, []);

  React.useEffect(() => {
    filterData();
  }, [data, searchText]);

  const getDashboardData = async () => {
    try {
      const myData = await fetch(data_API);
      if (!myData.ok) {
        throw new Error(`HTTP error! Status: ${myData.status}`);
      }

      const response = await myData.json();
      const items = response.map((item) => ({ ...item, isChecked: false }));
      setData(items);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deleteItem = (ItemId) => {
    setData((prevdata) => prevdata.filter((data) => data.id !== ItemId));
  };

  const handleCheckBoxChange = (Itemid) => {
    setAllChecked(false);
    setData((prevdata) =>
      prevdata.map((item) =>
        item.id === Itemid ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleAllCheckBox = () => {
    setAllChecked(!allChecked);
    setData((prevdata) =>
      prevdata.map((item) => {
         // Check if the item is in the current page
        const isInCurrentPage = currentRows.some((row) => row.id === item.id);
      
        // Set isChecked based on isInCurrentPage
        const isChecked = (!allChecked && isInCurrentPage) || false;

        return { ...item, isChecked };
      })
    );
  };

  const handleDeleteAll = () => {
    const checkedRows = data.filter((item) => item.isChecked);
    const checkedIds = checkedRows.map((item) => item.id);
    setData((prevData) =>
      prevData.filter((item) => !checkedIds.includes(item.id))
    );
  };

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
  };

  const handleEdit = (Itemid) => {
    setEditingRow(Itemid);
  };

  const handleEditChange = (e, field) => {
    const newValue = e.target.value;
    setData((prevdata) =>
      prevdata.map((item) =>
        item.id === editingRow ? { ...item, [field]: newValue } : item
      )
    );
  };

  const handleSaveEdit = () => {
    setEditingRow(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div>
      <Header onSearchChange={handleSearchChange} onDeleteAll={handleDeleteAll} />
      <table className="font-mono  border-black border-t-2 border-b mx-10 my-1 text-gray-100 w-[80rem]">
        <thead className="text-lg bg-slate-600">
          <tr>
            <th>
              <input type="checkbox" onChange={handleAllCheckBox} />
            </th>
            <th className="hover:italic">Id</th>
            <th className="hover:italic">Name</th>
            <th className="hover:italic">Email</th>
            <th className="hover:italic">Role</th>
            <th className="hover:italic">Actions</th>
          </tr>
        </thead>
      </table>
      {currentRows.map((rowData) => (
        <TableRow
          key={rowData.id}
          {...rowData}
          handleCheckBoxChange={handleCheckBoxChange}
          deletevalue={deleteItem}
          handleEdit={handleEdit}
          editingRow={editingRow}
          handleEditChange={handleEditChange}
          handleSaveEdit={handleSaveEdit}
        />
      ))}
      <div className="ml-10 flex justify-center items-center">
        <FaAnglesLeft onClick={()=>setCurrentPage(1)} className="cursor-pointer"/>
        <FaChevronLeft onClick={handlePrevPage} className="cursor-pointer" />
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            className={`hover:bg-slate-300 hover:text-slate-600 ml-2 w-8 border border-slate-400 text-gray-700 rounded-lg ${
              pageIndex + 1 === currentPage ? 'bg-slate-500 text-slate-200' : ''
            }`}
            key={pageIndex + 1}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </button>
        ))}
        <FaChevronRight onClick={handleNextPage} className="cursor-pointer" />
        <FaAnglesRight onClick={()=>setCurrentPage(totalPages)} className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default MainTable;
