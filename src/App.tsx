import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Landing />} />
      <Route path="home" element={<Home />} />

      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

      {/* products */}
      <Route path="products" element={""}>
        <Route index element={<ProductList />} />

        <Route path=":id" element={<ProductDetails />} />
      </Route>

      {/* About */}
      <Route path="about" element={""}>
        <Route index element={<About />} />
      </Route>

      {/* Admin */}
      <Route path="admin" element={""}>
        <Route index element={<AdminPage />} />
      </Route>

      <Route path="contacts" element={<Contacts />} />
      {/* <Route path="/checkout/my-orders" element={<Orders />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}  />;
}

export default App;
