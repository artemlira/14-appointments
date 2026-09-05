import styles from './AppointmentsList.module.css';
import ActionButton from "@/components/ui/ActionButton";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import {useGetAppointmentsQuery} from "@/store/slices/appointmentsApi";
import StateMessage from "@/components/ui/StateMessage";
import AppointmentCard from "@/components/AppointmentCard";

function AppointmentsList() {
  const {data: appointments, isLoading, isError} = useGetAppointmentsQuery();
  if (isLoading) return <StateMessage>Loading...</StateMessage>;
  if (isError) return <StateMessage>Error: {isError.message}</StateMessage>;
  if (!appointments) return <StateMessage>No appointments found</StateMessage>;
  return (
    <div className={styles.appointmentsList}>
      <PageHeader
        kicker="Appointments"
        title="Призначення відвідування лікаря"
        description="Список зустрічей із відображенням пацієнта, лікаря, дати, причини та статусу."
        action={
          <ActionButton to="/appointments/new">Додати зустріч</ActionButton>}
      />

      <DataTable
        title="Список призначених зустрічей"
        count={appointments.length}
        columns={['Пацієнт', 'Лікар', 'Дата', 'Причина', 'Статус', 'Дії']}
        emptyMessage="Записів на прийом поки немає"
      >
        {
          appointments?.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              data={appointment}
            />
          ))
        }
      </DataTable>
    </div>
  )
}

export default AppointmentsList;
