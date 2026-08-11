import styles from './DoctorsList.module.css';
import {useGetDoctorsQuery} from "@/store/slices/doctorsApi";
import ActionButton from "@/components/ui/ActionButton";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StateMessage from "@/components/ui/StateMessage";
import DoctorCard from "@/components/DoctorCard";

function DoctorsList() {
  const {data: doctors, isLoading, isError} = useGetDoctorsQuery();

  if (isLoading) return <StateMessage>Loading...</StateMessage>
  if (isError) return <StateMessage>Error: {isError.message}</StateMessage>
  if (!doctors) return <StateMessage>No doctors found</StateMessage>
  return (
    <div className={styles.doctorsList}>
      <PageHeader
        kicker="Doctors"
        title="Лікарі"
        description="Список лікарів, спеціальностей, кабінетів і контактних даних."
        action={<ActionButton to="/doctors/new">Додати лікаря</ActionButton>}
      />

      <DataTable
        title="Список лікарів"
        count={doctors.length}
        columns={['Full Name', 'Specialty', 'Phone', 'Room', 'Дії']}
        emptyMessage="Лікарів поки немає"
      >
        {doctors?.map(doctor => (
          <DoctorCard
            key={doctor.id}
            data={doctor}
          />
        ))}
      </DataTable>
    </div>
  )
}

export default DoctorsList;
