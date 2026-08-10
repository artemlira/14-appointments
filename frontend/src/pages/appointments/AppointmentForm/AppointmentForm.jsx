import styles from './AppointmentForm.module.css';
import FormShell, {Field, FormGrid, FormSection} from "@/components/ui/FormShell";
import PageHeader from "@/components/ui/PageHeader";
import {useParams} from "react-router";

function AppointmentForm() {
  const {id} = useParams();

  return (
    <div className={styles.appointmentForm}>
      <PageHeader
        kicker={id ? 'Edit appointment' : 'New appointment'}
        title={`${id ? 'Редагування' : 'Створення'} зустрічі`}
        description="Структура форми для запису на прийом: пацієнт, лікар, дата, причина і статус."
      />

      <FormShell submitLabel={id ? 'Зберегти зустріч' : 'Створити зустріч'}>
        <FormSection title="Учасники зустрічі">
          <FormGrid>
            <Field label="Пацієнт">
              <select name="patientId">
                <option value="">Оберіть пацієнта</option>
              </select>
            </Field>

            <Field label="Лікар">
              <select name="doctorId">
                <option value="">Оберіть лікаря</option>
              </select>
            </Field>

            <Field label="Дата і час">
              <input
                type="datetime-local"
                name="date"
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
              />
            </Field>

            <Field label="Статус">
              <select name="status">
                <option value="scheduled">Активний</option>
                <option value="completed">Завершено</option>
              </select>
            </Field>
          </FormGrid>
        </FormSection>
      </FormShell>
    </div>
  )
}

export default AppointmentForm;
