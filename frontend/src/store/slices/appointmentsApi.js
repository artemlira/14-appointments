import {medicalApi} from "@/store/api";

export const appointmentsApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => 'appointments',
      providesTags: ['Appointments'],
    }),
    getAppointmentById: builder.query({
      query: (id) => `appointments/${id}`,
      providesTags: (result, error, id) => [
        {type: 'Appointment', id}
      ],
    }),
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: 'appointments',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation({
      query: ({id, ...data}) => ({
        url: `appointments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: 'Appointment', id},
        'Appointments',
      ],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `appointments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, id) => [
        {type: 'Appointment', id},
        'Appointments',
      ]
    })
  }),
})


export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApi;
