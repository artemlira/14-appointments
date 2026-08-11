import styles from './PatientDetails.module.css';
import PageHeader from "@/components/ui/PageHeader";
import StateMessage from "@/components/ui/StateMessage";
import {useGetPatientByIdQuery} from "@/store/slices/patientsApi";
import {useParams} from "react-router";
import ActionButton from "@/components/ui/ActionButton";
import DetailsPanel, {InfoGrid, InfoItem} from "@/components/ui/DetailsPanel";

function PatientDetails() {
  const {id} = useParams();

  const {
    data: loadedData,
    isLoading: patientLoading,
    isError: patientError,
    error: patientRequestError,
  } = useGetPatientByIdQuery(id, {skip: !id});

  if (patientLoading) return <StateMessage>Loading...</StateMessage>;
  if (patientError) {
    const errorMessage = patientRequestError?.data?.error ?? 'Не вдалося завантажити пацієнта';
    return <StateMessage>Error: {errorMessage}</StateMessage>;
  }
  if (!loadedData) return <StateMessage>Пацієнта не знайдено</StateMessage>;

  return (
    <div className={styles.patientDetails}>
      <PageHeader
        kicker="Patient card"
        title={loadedData.fullName}
        description="Повна read-only картка пацієнта з контактними даними, адресою і медичними примітками."
        action={<ActionButton to={`/patients/${loadedData.id}`}>Редагувати</ActionButton>}
      />

      <DetailsPanel title="Основна інформація">
        <InfoGrid>
          <InfoItem
            label="ПІБ"
            value={loadedData.fullName}
          />
          <InfoItem
            label="Дата народження"
            value={loadedData.birthDate}
          />
          <InfoItem
            label="Стать"
            value={loadedData.gender}
          />
        </InfoGrid>
      </DetailsPanel>

      <DetailsPanel title="Контакти">
        <InfoGrid>
          <InfoItem
            label="Телефон"
            value={loadedData.phone}
          />
          <InfoItem
            label="Email"
            value={loadedData.email}
          />
          <InfoItem
            label="Адреса"
            value={loadedData.address}
            fullWidth
          />
        </InfoGrid>
      </DetailsPanel>

      <DetailsPanel title="Медичні примітки">
        <InfoGrid>
          <InfoItem
            label="Примітки"
            value={loadedData.notes}
            fullWidth
          />
        </InfoGrid>
      </DetailsPanel>
    </div>
  )
}

export default PatientDetails;
