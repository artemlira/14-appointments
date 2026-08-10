import {useDeletePatientMutation} from "@/store/slices/patientsApi";
import styles from './PatientCard.module.css';
import ActionButton from "@/components/ui/ActionButton";

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
          <ActionButton
            variant="secondary"
            to={`/patients/${data.id}/card`}
          >
            Картка
          </ActionButton>
          <ActionButton
            variant="secondary"
            to={`/patients/${data.id}`}
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

export default PatientCard;
