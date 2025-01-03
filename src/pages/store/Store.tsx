import { data, columnsStore, IStore, storeDataForm, storeDefaultValues, storeValidationSchema } from './store.data.ts';
import { Button } from '@mui/material';
import TableComponent from '../../components/TableComponent';
import Filter from '../../components/Filter';
import { useState } from 'react';
import DialogComponent from '../../components/DialogComponent.tsx';
import { FormComponent } from '../../components/FormComponent.tsx';
import { actionsValid } from '../../interfaces/table.interface.ts';

export const Store = () => {
    const [defaultValues, setDefaultValues] = useState<IStore>(storeDefaultValues);
    const [dataTable, setDataTable] = useState<IStore[]>(data);
    const [dialog, setDialog] = useState(false);
    const openDialog = () => setDialog(true);

    const getActionTable = (action: actionsValid, data: IStore) => {
        if (action === 'edit') {
            setDefaultValues(data);
            openDialog();
        }
    }

    const addNewStore = () => {
        setDefaultValues(storeDefaultValues);
        openDialog();
    }

    return (
        <div>

            <p className=' text-3xl font-semibold mb-5'>Almacén</p>

            <div className="flex items-center justify-between w-full my-5">

                <Filter tableData={data} setTableData={setDataTable} tableColumns={columnsStore}></Filter>

                <Button
                    onClick={addNewStore}
                    variant="contained"
                    className='flex gap-2'
                >
                    <span className='material-icons'>add_circle</span> Agregar
                </Button>

            </div>

            <TableComponent tableData={dataTable} tableColumns={columnsStore} action={getActionTable} />

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
