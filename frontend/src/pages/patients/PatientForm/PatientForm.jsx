import styles from './PatientForm.module.css';
import {useState} from "react";
import {
  useCreatePatientMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation
} from "@/store/slices/patientsApi";
import {useNavigate, useParams} from "react-router";
import FormShell, {Field, FormGrid, FormSection} from "@/components/ui/FormShell";
import PageHeader from "@/components/ui/PageHeader";
import StateMessage from "@/components/ui/StateMessage";

const emptyPatientData = {
  id: '',
  fullName: '',
  birthDate: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

function PatientForm() {
  const [formData, setFormData] = useState(null);
  const {id} = useParams();

  const [createPatient, {isLoading: createLoading}] = useCreatePatientMutation();

  const [updatePatient, {isLoading: updateLoading}] = useUpdatePatientMutation();

  const navigate = useNavigate();

  const {
    data: loadedData,
    isLoading: patientLoading,
    isError: patientError,
    error: patientRequestError,
  } = useGetPatientByIdQuery(id, {skip: !id});

  const form = formData ?? loadedData ?? emptyPatientData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...(prevData ?? loadedData ?? emptyPatientData),
      [e.target.name]: e.target.value
    }))
  }

  const onSave = async (e) => {
    e.preventDefault();
    if (id) await updatePatient(form).unwrap();
    else {
      const {id: _id, ...patientData} = form;
      await createPatient(patientData).unwrap();
    }

    setFormData({...emptyPatientData});
    navigate('/patients');
  };

  if (patientLoading) return <StateMessage>Loading...</StateMessage>;
  if (patientError) {
    const errorMessage = patientRequestError?.data?.error ?? 'Не вдалося завантажити пацієнта';
    return <StateMessage>Error: {errorMessage}</StateMessage>;
  }

  const loading = createLoading || updateLoading;
  const buttonLabel = `${id ? 'Зберегти' : 'Створити'} ${loading ? '...' : ''}`

  return (
    <div className={styles.patientForm}>
      <PageHeader
        kicker={id ? 'Edit patient' : 'New patient'}
        title={`${id ? 'Редагування даних' : 'Створення нового'} пацієнта`}
        description="Заповніть основні контактні та медичні дані. Ця форма стане основою для майбутніх записів на прийом."
      />

      <FormShell
        onSubmit={onSave}
        submitLabel={buttonLabel}
        submitting={loading}
      >
        <FormSection title="Основна інформація">
          <FormGrid>
            <Field label="Імʼя пацієнта">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Дата народження">
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
              />
            </Field>

            <Field label="Стать">
              <input
                type="text"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              />
            </Field>
          </FormGrid>
        </FormSection>

        <FormSection title="Контакти">
          <FormGrid>
            <Field label="Телефон">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Field>

            <Field
              label="Адреса"
              fullWidth
            >
              <input
                type="text"
                name="address"
                value={form.address}
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

export default PatientForm;
