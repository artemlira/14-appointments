import styles from './PatientForm.module.css';
import {useState} from "react";
import {
  useCreatePatientMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation
} from "@/store/slices/patientsApi";
import {useNavigate, useParams} from "react-router";

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

  if (patientLoading) return <div className={styles.state}>Loading...</div>;
  if (patientError) {
    const errorMessage = patientRequestError?.data?.error ?? 'Не вдалося завантажити пацієнта';
    return <div className={styles.state}>Error: {errorMessage}</div>;
  }

  const loading = createLoading || updateLoading;
  const buttonLabel = `${id ? 'Зберегти' : 'Створити'} ${loading ? '...' : ''}`
  return (
    <div className={styles.patientForm}>
      <section className={styles.header}>
        <p className={styles.kicker}>{id ? 'Edit patient' : 'New patient'}</p>
        <h1>{`${id ? 'Редагування даних' : 'Створення нового'} пацієнта`}</h1>
        <p>
          Заповніть основні контактні та медичні дані. Ця форма стане основою для
          майбутніх записів на прийом.
        </p>
      </section>

      <form
        className={styles.form}
        onSubmit={onSave}
      >
        <div className={styles.formSection}>
          <h2>Основна інформація</h2>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Імʼя пацієнта</span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </label>

            <label className={styles.field}>
              <span>Дата народження</span>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
              />
            </label>

            <label className={styles.field}>
              <span>Стать</span>
              <input
                type="text"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Контакти</h2>
          <div className={styles.grid}>
            <label className={styles.field}>
              <span>Телефон</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </label>

            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className={`${styles.field} ${styles.fullWidth}`}>
              <span>Адреса</span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Примітки</h2>
          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span>Примітки</span>
            <textarea
              name="notes"
              rows="4"
              value={form.notes}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading}
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientForm;
