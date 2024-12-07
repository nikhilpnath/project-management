import { useQuery } from "@apollo/client";
import { ClientRow } from "../";
import { GET_CLIENTS } from "../../queries/clientQueries";

const Clients = () => {
  // get Data
  const { data, error = {} } = useQuery(GET_CLIENTS);

  

  if (error && error.message) return <p>Coudn&apos;t fetch client&apos;s data</p>;

  return (
    <div className="mt-4 ">
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.clients.length > 0 &&
            data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
