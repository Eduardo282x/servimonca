import { columnsStore, IStore, IStoreForm, storeDataForm, storeDefaultValues, storeValidationSchema } from './store.data.ts';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useEffect, useState } from 'react';
import DialogComponent from '../../components/DialogComponent.tsx';
import { FormComponent } from '../../components/FormComponent.tsx';
import { actionsValid } from '../../interfaces/table.interface.ts';
import { getDataApi } from '../../API/AxiosActions.ts';
import { Loader } from '../../components/loaders/Loader.tsx';

export const Store = () => {

    // useStates
    const [ equipment, setEquipment ] = useState<IStore[]>([]);
    const [tableData, setTableData] = useState<IStore[]>([]);
    const [defaultValues, setDefaultValues] = useState<IStoreForm>(storeDefaultValues);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffects
    useEffect(() => {
        getEquipments();
    }, []);

    // Asuync functions
    async function getEquipments() {
        setLoading(true);
        await getDataApi('/equipment').then((response: IStore[]) => {
            setEquipment(response);
            setLoading(false);
        });
    }

    // Functions
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IStore) => {
        if (action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewEquipment = () => {
        setDefaultValues(storeDefaultValues);
        openDialog();
    }

    return (
        <div>

            <p className=' text-3xl font-semibold mb-5'>Almacén</p>

            <div className="flex items-center justify-between w-full my-5">

                <Filter tableData={equipment} setTableData={setTableData} tableColumns={columnsStore}></Filter>

                <Button
                    onClick={addNewEquipment}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>

            </div>

            {loading ? <Loader /> : <TableComponent tableData={tableData} tableColumns={columnsStore} action={getActionTable} /> }

            <DialogComponent
                dialog={dialog}
                setDialog={setDialog}
                form={
                    <FormComponent
                        title='Nuevo Producto'
                        description='Llena el formulario y agrega'
                        descriptionColored='un nuevo producto'
                        dataForm={storeDataForm}
                        defaultValues={defaultValues}
                        validationSchema={storeValidationSchema}
                        action='add'
                        buttonText='Agregar Producto'
                    />
                }
            />

        </div>
    );

}
