import styles from './PatientForm.module.css';
import {useState} from "react";
import {useCreatePatientMutation} from "@/store/slices/patientsApi";
import {useNavigate} from "react-router";

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
  const form = formData ?? emptyPatientData;

  const [createPatient, {isLoading, isError}] = useCreatePatientMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const onSave = async (e) => {
    e.preventDefault();
    await createPatient(formData);
    setFormData({...emptyPatientData});
    navigate('/patients');
  };


  const buttonLabel = `Створити ${isLoading ? '...' : ''}`
  return (
    <div className={styles.patientForm}>
      <h1>Створення нового пацієнта</h1>
      <form onSubmit={onSave}>

        <div>
          <label>
            Імʼя пацієнта
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Дата народження
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Стать
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Телефон
            <input
              type="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Адреса
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>≠
            Примітки
            <input
              type="text"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type='submit'>
          {buttonLabel}
        </button>
      </form>
    </div>
  )
}

export default PatientForm;
