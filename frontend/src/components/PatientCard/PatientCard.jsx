import {useDeletePatientMutation} from "@/store/slices/patientsApi";

function PatientCard(props) {
  const {data} = props;
  const [deletePatient, {isLoading, isError}] = useDeletePatientMutation();
  const onDelete = async () => {
    await deletePatient(data.id);
  };

  const buttonLabel = `Delete ${isLoading ? '...' : ''}`
  return (
    <tr>
      <td>{data.fullName}</td>
      <td>{data.phone}</td>
      <td>{data.address}</td>
      <td>
        <button
          type=""
          onClick={onDelete}
        >{buttonLabel}
        </button>
      </td>
    </tr>
  )
}

export default PatientCard;
