import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  minDate: dayjs.Dayjs | undefined;
}

export default function DatePickerComponent({ value, onChange, minDate }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <DemoContainer components={['DatePicker']}>
          <DatePicker
            className='w-full'
            value={value}
            onChange={onChange}
            minDate={minDate}
            format='DD/MM/YYYY'
            views={['year', 'month', 'day']} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
