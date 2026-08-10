import styles from './DoctorForm.module.css';
import FormShell, {Field, FormGrid, FormSection} from "@/components/ui/FormShell";
import PageHeader from "@/components/ui/PageHeader";
import {useParams} from "react-router";

function DoctorForm() {
  const {id} = useParams();

  return (
    <div className={styles.doctorForm}>
      <PageHeader
        kicker={id ? 'Edit doctor' : 'New doctor'}
        title={`${id ? 'Редагування даних' : 'Створення нового'} лікаря`}
        description="Структура форми для профілю лікаря: спеціальність, контакти, кабінет і службові примітки."
      />

      <FormShell submitLabel={id ? 'Зберегти лікаря' : 'Створити лікаря'}>
        <FormSection title="Основна інформація">
          <FormGrid>
            <Field label="Імʼя лікаря">
              <input
                type="text"
                name="fullName"
              />
            </Field>

            <Field label="Спеціальність">
              <input
                type="text"
                name="specialty"
              />
            </Field>

            <Field label="Кабінет">
              <input
                type="text"
                name="room"
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
              />
            </Field>

            <Field label="Телефон">
              <input
                type="tel"
                name="phone"
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
            />
          </Field>
        </FormSection>
      </FormShell>
    </div>
  )
}

export default DoctorForm;
