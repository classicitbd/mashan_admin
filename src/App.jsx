import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import route from "./routes/Route";

import "./i18n";
import { BASE_URL } from "./utils/baseURL";
const App = () => {
  const [favicon, setFavicon] = useState("Icon");
  const [title, setTitle] = useState("Mashan Admin"); // Add state for title
  useEffect(() => {
    fetch(`${BASE_URL}/setting`)
      .then((res) => res.json())
      .then((data) => {
        setFavicon(data?.data[0]?.favicon);
        setTitle(data?.data[0]?.title); // Set title from API response
      });
  }, []);

  // effect to update favicon
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = favicon;
  }, [favicon]);

  // Effect to update title
  useEffect(() => {
    if (title) {
      document.title = title; // Update the document title
    }
  }, [title]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        transition={Slide}
        closeOnClick
        toastClassName="my-global-toast"
      />
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
