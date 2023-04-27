import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";
import PageDetail from "./PageDetail/PageDetail";
import DestinosFormPage from "./DestinosFormPage/DestinosFormPage";
import PublicarJobsPage from "./PublicarJobsPage/PublicarJobsPage";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexLayout />,

    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/details/:id",
                element: <PageDetail />
            },
            {
                path: "/new/destinos",
                element: <DestinosFormPage />,
            },
            {
                path: "/publicar",
                element: <PublicarJobsPage />,
            },

        ],
    },
]);
