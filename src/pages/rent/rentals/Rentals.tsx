import { useEffect, useState } from 'react'
import { SnackbarComponent } from '../../../components/SnackbarComponent';
import { Loader } from '../../../components/loaders/Loader';
import TableComponent from '../../../components/TableComponent';
import { getDataApi } from '../../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../../API/BaseAPI';
import { BaseResponse } from '../../../interfaces/actions-api.interface';
import { actionsValid, TableReturn } from '../../../interfaces/table.interface';
import { ISparePartForm, sparePartDefaultValues } from '../../Store/sparePart/sparePart.data';
import { IRental } from '../../../interfaces/rental.interface';
import { rentalColumns, rentalDataForm, rentalFormSchema } from './rental.data';
import DialogComponent from '../../../components/DialogComponent';
import { FormComponent } from '../../../components/FormComponent';
import { IEquipment } from '../../Store/equipment/equipment.data';
import { IClients } from '../../clients/clients.data';
import { IDataForm } from '../../../interfaces/form.interface';
import { IPayments } from '../../../interfaces/payments.interface';

export const Rentals = () => {
  const [rentals, setRentals] = useState<IRental[]>([]);
  const [defaultValues, setDefaultValues] = useState<ISparePartForm>(sparePartDefaultValues);
  const [dataForm, setDataForm] = useState<IDataForm[]>(rentalDataForm);
  const [formAction, setFormAction] = useState<actionsValid>('add');
  const [dialog, setDialog] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
  const [loading, setLoading] = useState<boolean>(true);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);


  // useEffects
  useEffect(() => {
    getRentalsApi();
    getEquipments();
    getClients();
    getPayments();
  }, []);

  const getEquipments = async () => {
    await getDataApi('/equipment/Disponible').then((response: IEquipment[]) => {
      const equipmentOptions = response.map((equipment) => ({
        label: equipment.model, // Texto que se muestra
        value: equipment.id, // Valor seleccionado
      }));

      setDataForm((prevDataForm) =>
        prevDataForm.map((field) =>
          field.name === 'equipmentId' ? { ...field, options: equipmentOptions } : field
        )
      );
    });
  }

  const getPayments = async () => {
    await getDataApi('/payment').then((response: IPayments[]) => {
      const paymentsOptions = response.map((payment) => ({
        label: `${payment.owner} - ${payment.bank}`, // Texto que se muestra
        value: payment.id, // Valor seleccionado
      }));

      setDataForm((prevDataForm) =>
        prevDataForm.map((field) =>
          field.name === 'paymentId' ? { ...field, options: paymentsOptions } : field
        )
      );
    });
  }

  const getClients = async () => {
    await getDataApi('/clients').then((response: IClients[]) => {
      const clientOptions = response.map((client) => ({
        label: `${client.name} ${client.lastname}`, // Texto que se muestra
        value: client.id, // Valor seleccionado
      }));

      setDataForm((prevDataForm) =>
        prevDataForm.map((field) =>
          field.name === 'clientId' ? { ...field, options: clientOptions } : field
        )
      );
    });
  }

  // Async functions
  async function getRentalsApi() {
    setLoading(true);

    await getDataApi('/rental').then((response: IRental[]) => {
      setRentals(response);
      setLoading(false);
    });
  }

  // Functions
  const openDialog = async (tableReturn: TableReturn) => {
    const { data, action } = tableReturn;
    const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/rental');
    setDefaultValues(responseBaseApi.body as ISparePartForm);
    setFormAction(responseBaseApi.action)
    if (responseBaseApi.open) { setDialog(true) };
    if (responseBaseApi.close) { setDialog(false) };
    if (responseBaseApi.snackbarMessage.message !== '') {
      setSnackbar(responseBaseApi.snackbarMessage);
      getRentalsApi();
      setOpenSnackbar(true);
    };
  }

  return (
    <div>
      <div>
        {/* <p className=' text-3xl font-semibold mb-5'>Alquiler de equipos</p> */}

        {loading ? <Loader /> :
          <TableComponent
            tableData={rentals}
            tableColumns={rentalColumns}
            openDialog={openDialog}
            addButton='Agregar alquiler'
          />}

        <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        <DialogComponent
          dialog={dialog}
          setDialog={setDialog}
          form={
            <FormComponent
              title={'Solicitud de alquiler'}
              description={formAction === 'addApi' ? 'Llena el formulario y agrega' : 'Edita los campos y modifica'}
              descriptionColored={formAction === 'addApi' ? 'un nuevo alquiler' : 'un alquiler'}
              dataForm={dataForm}
              defaultValues={defaultValues}
              validationSchema={rentalFormSchema}
              action={formAction}
              buttonText={'Solicitar'}
              onSubmitForm={openDialog}
            />
          }
        />

      </div>
    </div>
  )
}
