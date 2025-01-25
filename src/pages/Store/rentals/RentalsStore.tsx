import { useEffect, useState } from 'react'
import { SnackbarComponent } from '../../../components/SnackbarComponent';
import { Loader } from '../../../components/loaders/Loader';
import TableComponent from '../../../components/TableComponent';
import { getDataApi } from '../../../API/AxiosActions';
import { BaseApiReturn, BaseApi } from '../../../API/BaseAPI';
import { BaseResponse } from '../../../interfaces/actions-api.interface';
import { actionsValid, TableReturn } from '../../../interfaces/table.interface';
import { ISparePartForm, sparePartDefaultValues } from '../sparePart/sparePart.data';
import { IRental } from '../../../interfaces/rental.interface';
import { rentalColumns, rentalDataForm, rentalFormSchema } from './rental.data';
import DialogComponent from '../../../components/DialogComponent';
import { FormComponent } from '../../../components/FormComponent';

export const RentalsStore = () => {
  const [rentals, setRentals] = useState<IRental[]>([]);
  const [defaultValues, setDefaultValues] = useState<ISparePartForm>(sparePartDefaultValues);
  const [formAction, setFormAction] = useState<actionsValid>('add');
  const [dialog, setDialog] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<BaseResponse>({} as BaseResponse);
  const [loading, setLoading] = useState<boolean>(true);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);


  // useEffects
  useEffect(() => {
    getRentalsApi();
  }, []);

  // Async functions
  async function getRentalsApi() {
    setLoading(true);

    await getDataApi('/rental/store').then((response: IRental[]) => {
      setRentals(response);
      setLoading(false);
    });
  }

  // Functions
  const openDialog = async (tableReturn: TableReturn) => {
    const { data, action } = tableReturn;
    const responseBaseApi: BaseApiReturn = await BaseApi(action, data, defaultValues, 'id', '/rental/status');
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
            addButton=''
          />}

        <SnackbarComponent baseResponse={snackbar} open={openSnackbar} setOpen={setOpenSnackbar}></SnackbarComponent>

        <DialogComponent
          dialog={dialog}
          setDialog={setDialog}
          form={
            <FormComponent
              title={'Solicitud de alquiler'}
              description={''}
              descriptionColored={''}
              dataForm={rentalDataForm}
              defaultValues={defaultValues}
              validationSchema={rentalFormSchema}
              action={formAction}
              buttonText={'Solicitad'}
              onSubmitForm={openDialog}
            />
          }
        />

      </div>
    </div>
  )
}
