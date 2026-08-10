import {createBrowserRouter} from "react-router";
import HomePage from "@/pages/HomePage";
import MainLayout from "@/MainLayout";
import AboutPage from "@/pages/AboutPage";
import PatientsList from "@/pages/patients/PatientsList";
import PatientForm from "@/pages/patients/PatientForm";
import PatientDetails from "@/pages/patients/PatientDetails";
import DoctorsList from "@/pages/doctors/DoctorsList";
import DoctorForm from "@/pages/doctors/DoctorForm";
import AppointmentsList from "@/pages/appointments/AppointmentsList";
import AppointmentForm from "@/pages/appointments/AppointmentForm";

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
            path: ':id/card',
            Component: PatientDetails,
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
        path: '/doctors',
        children: [
          {
            index: true,
            Component: DoctorsList,
          },
          {
            path: 'new',
            Component: DoctorForm,
          },
          {
            path: ':id',
            Component: DoctorForm,
          }
        ],
        meta: {
          title: 'Лікарі'
        }
      },
      {
        path: '/appointments',
        children: [
          {
            index: true,
            Component: AppointmentsList,
          },
          {
            path: 'new',
            Component: AppointmentForm,
          },
          {
            path: ':id',
            Component: AppointmentForm,
          }
        ],
        meta: {
          title: 'Записи'
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
