import { FaTrash, FaUserEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT, DELETE_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { ClientModal } from "..";

const ClientRow = ({ client }) => {
  
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    let isDelete = confirm("Delete Client?");
    if (isDelete) return deleteClient();
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <div className="btn btn-sucess btn-sm">
          <ClientModal
            icon={FaUserEdit}
            id={`update${client.name}Modal`}
            action={UPDATE_CLIENT}
            title="Update Client"
            value={client}
          />
        </div>
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
