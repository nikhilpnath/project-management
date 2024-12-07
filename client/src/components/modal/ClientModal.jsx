import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";
import ModalStructure from "./ModalStructure";

const ClientModal = ({ icon, id, action, title, value }) => {

  //datas
  const data = {
    name: value?.name || "",
    email: value?.email || "",
    phone: value?.phone || "",
  };

  const [clientData, setClientData] = useState(data);

  const modalRef = useRef(null);

  const [clientMutation, val] = useMutation(action, {
    //used update to updated the cache and show the result without reloading
    update(cache, { data }) {
      const mutationResult =
        id === "addClientModal" ? data.addClient : data.updateClient;
      //the addClient / updateClient is our mutation name

      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      if (id === "addClientModal") {
        // If adding a client, append the new client to the list
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: [...clients, mutationResult],
          },
        });
      } else {
        // If updating a client, replace the existing client with the updated one
        const updatedClients = clients.map((client) =>
          client.id === mutationResult.id ? mutationResult : client
        );

        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: updatedClients,
          },
        });
      }
    },
    // showing erros
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
    onCompleted: () => {
      // Closing the modal programmatically after successful mutation
      const modalInstance = window.bootstrap.Modal.getInstance(
        modalRef.current
      );
      modalInstance.hide();
      setClientData(data);
    },
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setClientData({ ...clientData, [name]: value });
  };

  const handleClientForm = (e) => {
    e.preventDefault();

    const { name, email, phone } = clientData;

    if (!name || !email || !phone) return alert("All fields are required");

    if (phone.length !== 10) return alert("Enter a valid Phone");

    //mutating the client
    const variables = value?.id
      ? {
          id: value.id,
          edits: clientData,
        }
      : { client: clientData };

    clientMutation({
      variables,
    });
  };

  return (
    <>
      <ModalStructure
        icon={icon}
        ref={modalRef}
        text={id === "addClientModal" ? "Add Client" : ""}
        modaltitle={title}
        btnClr="secondary"
        modalId={id}
      >
        <form onSubmit={handleClientForm}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={clientData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={clientData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              value={clientData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </form>
      </ModalStructure>
    </>
  );
};

export default ClientModal;
