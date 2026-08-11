import styles from './DoctorForm.module.css';
import FormShell, {
  Field,
  FormGrid,
  FormSection
} from "@/components/ui/FormShell";
import PageHeader from "@/components/ui/PageHeader";
import {useNavigate, useParams} from "react-router";
import {useState} from "react";
import {
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation
} from "@/store/slices/doctorsApi";
import StateMessage from "@/components/ui/StateMessage";

const emptyDoctorData = {
  id: '',
  fullName: '',
  specialty: '',
  email: '',
  phone: '',
  room: '',
  notes: '',
};

function DoctorForm() {
  const {id} = useParams();
  const [formData, setFormData] = useState(null);

  const [createDoctor, {isLoading: createLoading}] = useCreateDoctorMutation();

  const [updateDoctor, {isLoading: updateLoading}] = useUpdateDoctorMutation();

  const {
    data: loadedData,
    isLoading: doctorLoading,
    isError: doctorError,
    error: doctorRequestError
  } = useGetDoctorByIdQuery(id, {skip: !id});

  const navigate = useNavigate();

  const form = formData ?? loadedData ?? emptyDoctorData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...(prevData ?? loadedData ?? emptyDoctorData),
      [e.target.name]: e.target.value
    }))
  }

  const onSave = async (e) => {
    e.preventDefault();
    if (id) await updateDoctor(form).unwrap();
    else {
      const {id: _id, ...doctorData} = form;
      await createDoctor(doctorData).unwrap();
    }

    setFormData({...emptyDoctorData});
    navigate('/doctors');
  };

  if (doctorLoading) return <StateMessage>Loading...</StateMessage>
  if (doctorError) {
    const errorMessage = doctorRequestError?.data?.error ?? 'Не вдалося завантажити лікаря'
    return <StateMessage>Error: {errorMessage}</StateMessage>
  }

  const loading = createLoading || updateLoading;
  const buttonLabel = `${id ? 'Зберегти' : 'Створити'} ${loading ? '...' : ''}`

  return (
    <div className={styles.doctorForm}>
      <PageHeader
        kicker={id ? 'Edit doctor' : 'New doctor'}
        title={`${id ? 'Редагування даних' : 'Створення нового'} лікаря`}
        description="Структура форми для профілю лікаря: спеціальність, контакти, кабінет і службові примітки."
      />

      <FormShell
        onSubmit={onSave}
        submitLabel={buttonLabel}
        submitting={loading}
      >
        <FormSection title="Основна інформація">
          <FormGrid>
            <Field label="Імʼя лікаря">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Спеціальність">
              <input
                type="text"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
              />
            </Field>

            <Field label="Кабінет">
              <input
                type="text"
                name="room"
                value={form.room}
                onChange={handleChange}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Контакти">
          <FormGrid>
            <Field label="Email">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Field>

            <Field label="Телефон">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Примітки">
          <Field
            label="Примітки"
            fullWidth
          >
            <textarea
              name="notes"
              rows="4"
              value={form.notes}
              onChange={handleChange}
            />
          </Field>
        </FormSection>
      </FormShell>
    </div>
  )
}

export default DoctorForm;
