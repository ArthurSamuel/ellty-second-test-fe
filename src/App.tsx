import { RouterProvider } from "react-router";
import routes from "./routes/Route";
import UserInformationContextFC from "./context/userInformationContext";

function App() {
  return (
    <UserInformationContextFC>
      <RouterProvider router={routes} />
    </UserInformationContextFC>
  );
}

export default App;
