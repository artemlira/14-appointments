import styles from './AppointmentsList.module.css';
import ActionButton from "@/components/ui/ActionButton";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";

function AppointmentsList() {
  return (
    <div className={styles.appointmentsList}>
      <PageHeader
        kicker="Appointments"
        title="Призначення відвідування лікаря"
        description="Список зустрічей із відображенням пацієнта, лікаря, дати, причини та статусу."
        action={<ActionButton to="/appointments/new">Додати зустріч</ActionButton>}
      />

      <DataTable
        title="Список призначених зустрічей"
        count={0}
        columns={['Пацієнт', 'Лікар', 'Дата', 'Причина', 'Статус', 'Дії']}
        emptyMessage="Записів на прийом поки немає"
      />
    </div>
  )
}

export default AppointmentsList;
