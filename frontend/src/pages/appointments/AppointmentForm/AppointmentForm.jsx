import styles from './AppointmentForm.module.css';
import FormShell, {
  Field,
  FormGrid,
  FormSection
} from "@/components/ui/FormShell";
import PageHeader from "@/components/ui/PageHeader";
import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import {useGetPatientsQuery} from "@/store/slices/patientsApi";
import {useGetDoctorsQuery} from "@/store/slices/doctorsApi";
import StateMessage from "@/components/ui/StateMessage";
import {
  useCreateAppointmentMutation,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentMutation
} from "@/store/slices/appointmentsApi";

const emptyAppointmentData = {
  id: '',
  patientId: '',
  doctorId: '',
  date: '',
  reason: '',
  status: 'scheduled',
};

const normalizeAppointmentData = (appointment) => {
  if (!appointment) return emptyAppointmentData;

  return {
    id: appointment.id ?? '',
    patientId: appointment.patientId ?? '',
    doctorId: appointment.doctorId ?? '',
    date: appointment.date ? appointment.date.slice(0, 16) : '',
    reason: appointment.reason ?? '',
    status: appointment.status ?? 'scheduled',
  };
};

function AppointmentForm() {
  const {id} = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const {
    data: patients = [],
    isLoading: patientsLoading,
    isError: patientsError,
    error: patientsRequestError,
  } = useGetPatientsQuery();
  const {
    data: doctors = [],
    isLoading: doctorsLoading,
    isError: doctorsError,
    error: doctorsRequestError,
  } = useGetDoctorsQuery();
  const {
    data: loadedData,
    isLoading: appointmentLoading,
    isError: appointmentError,
    error: appointmentRequestError,
  } = useGetAppointmentByIdQuery(id, {skip: !id});

  const [createAppointment, {isLoading: createLoading}] = useCreateAppointmentMutation();
  const [updateAppointment, {isLoading: updateLoading}] = useUpdateAppointmentMutation();

  const form = formData ?? normalizeAppointmentData(loadedData);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...(prevData ?? normalizeAppointmentData(loadedData)),
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (id) await updateAppointment(form).unwrap();
    else {
      const {id: _id, ...appointmentData} = form;
      await createAppointment(appointmentData).unwrap();
    }

    setFormData({...emptyAppointmentData});
    navigate('/appointments');
  };

  if (patientsLoading || doctorsLoading || appointmentLoading) return <StateMessage>Loading...</StateMessage>;
  if (patientsError) {
    const errorMessage = patientsRequestError?.data?.error ?? 'Не вдалося завантажити пацієнтів';
    return <StateMessage>Error: {errorMessage}</StateMessage>;
  }
  if (doctorsError) {
    const errorMessage = doctorsRequestError?.data?.error ?? 'Не вдалося завантажити лікарів';
    return <StateMessage>Error: {errorMessage}</StateMessage>;
  }
  if (appointmentError) {
    const errorMessage = appointmentRequestError?.data?.error ?? 'Не вдалося завантажити запис';
    return <StateMessage>Error: {errorMessage}</StateMessage>;
  }

  const loading = createLoading || updateLoading;
  const buttonLabel = `${id ? 'Зберегти' : 'Створити'} зустріч ${loading ? '...' : ''}`;

  return (
    <div className={styles.appointmentForm}>
      <PageHeader
        kicker={id ? 'Edit appointment' : 'New appointment'}
        title={`${id ? 'Редагування' : 'Створення'} зустрічі`}
        description="Структура форми для запису на прийом: пацієнт, лікар, дата, причина і статус."
      />

      <FormShell
        onSubmit={onSave}
        submitLabel={buttonLabel}
        submitting={loading}
      >
        <FormSection title="Учасники зустрічі">
          <FormGrid>
            <Field label="Пацієнт">
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
              >
                <option
                  value=""
                  disabled
                >
                  Оберіть пацієнта
                </option>
                {patients.map(patient => (
                  <option
                    key={patient.id}
                    value={patient.id}
                  >
                    {patient.fullName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Лікар">
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
              >
                <option
                  value=""
                  disabled
                >
                  Оберіть лікаря
                </option>
                {doctors.map(doctor => (
                  <option
                    key={doctor.id}
                    value={doctor.id}
                  >
                    {doctor.fullName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Дата і час">
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Деталі прийому">
          <FormGrid>
            <Field
              label="Причина"
              fullWidth
            >
              <textarea
                name="reason"
                rows="4"
                value={form.reason}
                onChange={handleChange}
              />
            </Field>

            <Field label="Статус">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="scheduled">Заплановано</option>
                <option value="active">Активний</option>
                <option value="completed">Завершено</option>
                <option value="cancelled">Скасовано</option>
              </select>
            </Field>
          </FormGrid>
        </FormSection>
      </FormShell>
    </div>
  )
}

export default AppointmentForm;
