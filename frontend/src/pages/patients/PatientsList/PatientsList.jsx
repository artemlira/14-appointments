import styles from './PatientsList.module.css';
import {useGetPatientsQuery} from "@/store/slices/patientsApi";
import PatientCard from "@/components/PatientCard";
import {Link} from "react-router";

function PatientsList() {
  const {data: patients, isLoading, isError} = useGetPatientsQuery();

  if (isLoading) return <div className={styles.state}>Loading...</div>;
  if (isError) return <div className={styles.state}>Error: {isError.message}</div>;

  return (
    <div className={styles.patientsList}>
      <section className={styles.header}>
        <div>
          <p className={styles.kicker}>Patients</p>
          <h1>Пацієнти</h1>
          <p className={styles.subtitle}>
            Медичні картки, контакти і швидке редагування даних пацієнтів.
          </p>
        </div>
        <Link
          className={styles.addButton}
          to="/patients/new/"
        >
          Додати пацієнта
        </Link>
      </section>

      {
        patients.length === 0 ? (<p>No patients found</p>) : (
          <section className={styles.tableShell}>
            <div className={styles.tableHeader}>
              <h2>Список пацієнтів</h2>
              <span>{patients.length} записів</span>
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <PatientCard
                      key={patient.id}
                      data={patient}
                    />))}

                </tbody>
              </table>
            </div>
          </section>
        )
      }
    </div>
  )
}

export default PatientsList;
