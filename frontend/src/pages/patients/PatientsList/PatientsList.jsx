import styles from './PatientsList.module.css';
import {useGetPatientsQuery} from "@/store/slices/patientsApi";
import PatientCard from "@/components/PatientCard";
import ActionButton from "@/components/ui/ActionButton";
import DataTable from "@/components/ui/DataTable";
import ListToolbar from "@/components/ui/ListToolbar";
import PageHeader from "@/components/ui/PageHeader";
import StateMessage from "@/components/ui/StateMessage";

function PatientsList() {
  const {data: patients, isLoading, isError} = useGetPatientsQuery();

  if (isLoading) return <StateMessage>Loading...</StateMessage>;
  if (isError) return <StateMessage>Error: {isError.message}</StateMessage>;

  return (
    <div className={styles.patientsList}>
      <PageHeader
        kicker="Patients"
        title="Пацієнти"
        description="Медичні картки, контакти і швидке редагування даних пацієнтів."
        action={<ActionButton to="/patients/new/">Додати пацієнта</ActionButton>}
      />

      <ListToolbar>
        <input
          type="search"
          name="fullName"
          placeholder="Фільтрація за ПІБ"
        />
      </ListToolbar>

      <DataTable
        title="Список пацієнтів"
        count={patients.length}
        columns={['Full Name', 'Phone', 'Address', 'Дії']}
        emptyMessage="Пацієнтів поки немає"
      >
        {patients.length > 0
          ? patients.map(patient => (
            <PatientCard
              key={patient.id}
              data={patient}
            />
          ))
          : null}
      </DataTable>
    </div>
  )
}

export default PatientsList;
