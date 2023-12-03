
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const TableRow = ({handleCheckBoxChange,isChecked,name,email,role,deletevalue,id}) => {
    
  return (
    <div>
        <table className="my-2 text-gray-800 w-[80rem] mx-10 border-b border-gray-300">
            <tbody >
                <tr className={`${isChecked? 'bg-slate-100':'' }`}>
                    <th className="w-[5rem] pl-[0.4rem]"><input type="checkbox" checked={isChecked} onChange={()=>handleCheckBoxChange(id)} /></th>
                    <th className=" w-[18rem]">{name}</th>
                    <th className="w-[18rem]">{email}</th>
                    <th className="w-[12rem]">{role}</th>
                    <div className="w-[27rem] pl-[13rem]">
                    <th className="cursor-pointer">
                        <FiEdit/>
                    </th>
                    <th className="cursor-pointer" onClick={()=>deletevalue(id)}>
                        <MdDelete/>
                    </th>
                    </div>


                </tr>

                
                
            </tbody>
        </table> 
   </div>
  )
}

export default TableRow