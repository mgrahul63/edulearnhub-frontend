import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import { routerConfig } from "./configs/routesConfig";
import { AppContextProvider } from "./provider/AppProvider";

 import { ToastContainer, toast } from 'react-toastify';
  
const router = createBrowserRouter(routerConfig);

const App = () => (
  <AppContextProvider>
    <ToastContainer />
    <RouterProvider router={router} />;
  </AppContextProvider>
);

export default App;
