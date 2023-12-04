
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const TableRow = ({
  editingRow,
  handleCheckBoxChange,
  handleEdit,
  handleEditChange,
  handleSaveEdit,
  deletevalue,
  isChecked,
  name,
  email,
  role,
  id,
}) => {
  return (
    <div>
      <table className="my-2 text-gray-800 w-[80rem] mx-10 border-b border-gray-300">
        <tbody>
          <tr className={`${isChecked ? 'bg-slate-100' : ''}`}>
            <th className="w-[5rem] pl-2 ">
              <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckBoxChange(id)}
              />
              </div>
            </th>
            <th className="w-[18rem]">
              {editingRow === id ? (
                <div>
                <input
                className="text-center"
                  type="text"
                  value={name}
                  onChange={(e) => handleEditChange(e, 'name')}
                />
                </div>
              ) : (
                <div>{name}</div>
              )}
            </th>
            <th className="w-[18rem]">
              {editingRow === id ? (
                <input
                className="text-center"
                  type="text"
                  value={email}
                  onChange={(e) => handleEditChange(e, 'email')}
                />
              ) : (
                <div>{email}</div>
              )}
            </th>
            <th className="w-[12rem]">
              {editingRow === id ? (
                <input className="text-center"
                  type="text"
                  value={role}
                  onChange={(e) => handleEditChange(e, 'role')}
                />
              ) : (
                <div>{role}</div>
              )}
            </th>
            <th className="w-[27rem] pl-[13rem] flex items-center">
              <div className="cursor-pointer ">
                {editingRow === id ? (
                  <FaSave onClick={handleSaveEdit} />
                ) : (
                  <FiEdit onClick={() => handleEdit(id)} />
                )}
              </div>
              <div className="cursor-pointer" onClick={() => deletevalue(id)}>
                <MdDelete />
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableRow;
