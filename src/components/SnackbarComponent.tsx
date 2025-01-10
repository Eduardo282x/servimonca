import { Alert } from "@mui/material"
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { BaseResponse } from "../interfaces/actions-api.interface";

interface SnackbarComponentProps {
  baseResponse: BaseResponse;
  open: boolean,
  setOpen: (open: boolean) => void
}

export function SnackbarComponent({ baseResponse ,open,setOpen }: SnackbarComponentProps) {
  const vertical = 'bottom';
  const horizontal = 'center';

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} >
        <Alert
          onClose={handleClose}
          severity={baseResponse.success ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {baseResponse.message}
        </Alert>
      </Snackbar>
    </>
  );
}

