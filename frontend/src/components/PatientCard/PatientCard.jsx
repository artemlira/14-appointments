import {useDeletePatientMutation} from "@/store/slices/patientsApi";
import styles from './PatientCard.module.css';
import {Link} from "react-router";

function PatientCard(props) {
  const {data} = props;
  const [deletePatient, {isLoading}] = useDeletePatientMutation();
  const onDelete = async () => {
    await deletePatient(data.id);
  };

  const buttonLabel = `Delete ${isLoading ? '...' : ''}`
  return (
    <tr>
      <td>
        <div className={styles.patientName}>{data.fullName}</div>
        <div className={styles.patientEmail}>{data.email || 'Email не вказано'}</div>
      </td>
      <td>{data.phone}</td>
      <td>{data.address}</td>
      <td>
        <div className={styles.actions}>
        <Link
          className={styles.editLink}
          to={`/patients/${data.id}`}
        >
          Edit
        </Link>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={onDelete}
          disabled={isLoading}
        >
          {buttonLabel}
        </button>
        </div>
      </td>
    </tr>
  )
}

export default PatientCard;
