import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface DialogComponentProps {
  form: JSX.Element;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
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

