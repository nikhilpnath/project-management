import {
  ClientModal,
  AddProjectModal,
  Clients,
  Projects,
} from "../components";

import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";

const Home = () => {


  return (
    <div style={{ height: "90vh" }}>
      <div className="d-flex gap-3 modal-buttons ">
        <ClientModal
          icon={FaUser}
          id="addClientModal"
          action={ADD_CLIENT}
        />
        <AddProjectModal />
      </div>
      <Projects />
      <Clients />
    </div>
  );
};

export default Home;
