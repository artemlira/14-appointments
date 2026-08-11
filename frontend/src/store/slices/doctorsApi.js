import {medicalApi} from "@/store/api";

export const doctorsApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => 'doctors',
      providesTags: ['Doctors'],
    }),
    getDoctorById: builder.query({
      query: (id) => `doctors/${id}`,
      providesTags: (result, error, id) => [
        {type: 'Doctor', id}
      ],
    }),
    createDoctor: builder.mutation({
      query: (doctor) => ({
        url: 'doctors',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateDoctor: builder.mutation({
      query: ({id, ...data}) => ({
        url: `doctors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [
        {type: 'Doctor', id},
        'Doctors',
      ],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, id) => [
        {type: 'Doctor', id},
        'Doctors',
      ],
    })
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;
