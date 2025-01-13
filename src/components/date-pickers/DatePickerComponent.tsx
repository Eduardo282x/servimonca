import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es'; 

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

export default function DatePickerComponent({ value, onChange }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          className='w-full'
          value={value}
          onChange={onChange}
          format='DD/MM/YYYY'
          views={['year', 'month', 'day']} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
