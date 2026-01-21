import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import { routerConfig } from "./configs/routesConfig";
import { AppContextProvider } from "./provider/AppProvider";

const router = createBrowserRouter(routerConfig);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />;
  </AppContextProvider>
);

export default App;
