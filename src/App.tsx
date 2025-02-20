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
import Profile from "./pages/Profile";
import Docs from "./pages/Docs";
import ArtistSignUp from "./pages/ArtistSignUp";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import Forum from "./pages/Forum";
import PurchasePage from "./pages/PurchasePage";

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
      <Route path="profile" element={<Profile />} />
      <Route path="docs" element={<Docs />} />
      <Route path="artist-onboard" element={<ArtistSignUp />} />
      <Route path="artists/forum" element={<Forum />} />
      <Route path="purchases" element={<PurchasePage />} />
    </Route>
  )
);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents(previous => [...previous, value]);
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.off('foo', onFooEvent);
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
