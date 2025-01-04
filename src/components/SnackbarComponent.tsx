import { Alert } from "@mui/material"
import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { BaseResponse } from "../interfaces/actions-api.interface";

interface SnackbarComponentProps {
  baseResponse: BaseResponse;
}

function SnackbarComponent({baseResponse} : SnackbarComponentProps) {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };  

  return (
      
      <>
      
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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

export default Snackbar