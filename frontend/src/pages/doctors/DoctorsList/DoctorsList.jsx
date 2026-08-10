import styles from './DoctorsList.module.css';
import ActionButton from "@/components/ui/ActionButton";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";

function DoctorsList() {
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
        count={0}
        columns={['Full Name', 'Specialty', 'Phone', 'Room', 'Дії']}
        emptyMessage="Лікарів поки немає"
      />
    </div>
  )
}

export default DoctorsList;
