import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const medicalApi = createApi({
  reducerPath: 'medicalApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://one4-appointments.onrender.com/' }),
  tagTypes: ['Appointments','Appointment', 'Patients', 'Patient', 'Doctors', 'Doctor'],
  endpoints: (builder) => ({}),
})
