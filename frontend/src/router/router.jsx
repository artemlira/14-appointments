import {createBrowserRouter} from "react-router";
import HomePage from "@/pages/HomePage";
import MainLayout from "@/MainLayout";
import AboutPage from "@/pages/AboutPage";
import PatientsList from "@/pages/patients/PatientsList";
import PatientForm from "@/pages/patients/PatientForm";

export const routes = [
  {
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
        meta: {
          title: 'Головна'
        }
      },
      {
        path: '/patients',
        children: [
          {
            index: true,
            Component: PatientsList,
          },
          {
            path: 'new',
            Component: PatientForm,
          },
          {
            path: ':id',
            Component: PatientForm,
          }
        ],
        meta:{
          title: 'Пацієнти'
        }
      },
      {
        path: "/about",
        Component: AboutPage,
        meta: {
          title: 'Про додаток'
        }
      },
    ]
  },
];

const router = createBrowserRouter(routes);
export default router;
