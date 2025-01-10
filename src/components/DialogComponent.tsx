import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { actionsValid } from '../interfaces/table.interface';

interface DialogComponentProps {
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  form: JSX.Element;
}

export default function DialogComponent({ dialog, setDialog, form } : DialogComponentProps) {

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogContent>
          {form}
        </DialogContent>
      </Dialog>
    </>
  );
}

