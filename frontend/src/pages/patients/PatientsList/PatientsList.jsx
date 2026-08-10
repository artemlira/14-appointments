import styles from './PatientsList.module.css';
import {useGetPatientsQuery} from "@/store/slices/patientsApi";
import PatientCard from "@/components/PatientCard";
import {Link} from "react-router";

function PatientsList() {
  const {data: patients, isLoading, isError} = useGetPatientsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;
  return (
    <div className={styles.patientsList}>
      <h1>Patients List</h1>
      <Link to="/patients/new/">+ Додати пацієнта</Link>
      {
        patients.length === 0 ? (<p>No patients found</p>) : (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Дії над пацієнтами</th>
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
        )
      }
    </div>
  )
}

export default PatientsList;
