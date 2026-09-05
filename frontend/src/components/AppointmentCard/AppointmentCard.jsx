import styles from './AppointmentCard.module.css';
import ActionButton from "@/components/ui/ActionButton";
import {useDeleteAppointmentMutation} from "@/store/slices/appointmentsApi";

function AppointmentCard(props) {
  const {data} = props;
  const [deleteAppointment, {isLoading}] = useDeleteAppointmentMutation();

  const onDelete = async () => {
    await deleteAppointment(data.id);
  }

  const buttonLabel = `Delete ${isLoading ? '...' : ''}`;

  return (
    <tr>
      <td>{data.patient?.fullName}</td>
      <td>{data.doctor?.fullName}</td>
      <td>{data.date}</td>
      <td>{data.reason}</td>
      <td>{data.status}</td>
      <td>
        <div className={styles.actions}>
          <ActionButton
            variant="secondary"
            to={`/appointments/${data.id}`}
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

export default AppointmentCard;
