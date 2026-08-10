import styles from './PatientDetails.module.css';
import PageHeader from "@/components/ui/PageHeader";
import StateMessage from "@/components/ui/StateMessage";

function PatientDetails() {
  return (
    <div className={styles.patientDetails}>
      <PageHeader
        kicker="Patient card"
        title="Картка пацієнта"
        description="Структурна сторінка для майбутнього перегляду повної інформації про пацієнта."
      />

      <StateMessage>
        Тут можна підключити завантаження пацієнта за id і відобразити його медичну картку.
      </StateMessage>
    </div>
  )
}

export default PatientDetails;
