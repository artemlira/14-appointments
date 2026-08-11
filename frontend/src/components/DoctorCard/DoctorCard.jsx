import styles from './DoctorCard.module.css';
import ActionButton from "@/components/ui/ActionButton";
import {useDeleteDoctorMutation} from "@/store/slices/doctorsApi";

function DoctorCard(props) {
  const {data} = props;
  const [deleteDoctor, {isLoading}] = useDeleteDoctorMutation();
  const onDelete = async () => {
    await deleteDoctor(data.id);
  }

  const buttonLabel = `Delete ${isLoading ? '...' : ''}`

  return (
    <tr>
      <td>
        <div className={styles.doctorName}>{data.fullName}</div>
        <div className={styles.doctorEmail}>{data.email}</div>
      </td>
      <td>{data.specialty}</td>
      <td>{data.phone}</td>
      <td>{data.room}</td>
      <td>
        <div className={styles.actions}>
          <ActionButton
            variant="secondary"
            to={`/doctors/${data.id}`}
          >
            Edit
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={onDelete}
            disabled={isLoading}
          >
            {buttonLabel}
          </ActionButton>
        </div>
      </td>
    </tr>
  )
}

export default DoctorCard;
