import {medicalApi} from "@/store/api";

export const patientsApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => 'patients',
      providesTags: ['Patients'],
    }),
    getPatientById: builder.query({
      query: (id) => `patients/${id}`,
      providesTags: (result, error, id) => [
        {type: 'Patient', id}
      ],
    }),
    createPatient: builder.mutation({
      query: (patient) => ({
        url: 'patients',
        method: 'POST',
        body: patient,
      }),
      invalidatesTags: ['Patients'],
    }),
    updatePatient: builder.mutation({
      query: ({id, ...data}) => ({
        url: `patients/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: 'Patient', id},
        'Patients',
      ],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, id) => [
        {type: 'Patient', id},
        'Patients',
      ],
    })
  }),
})

export const {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} = patientsApi;
