import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';
import { currentYear } from './YearPickerComponent';

interface DatePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  includeMin: boolean;
}

export default function DatePickerComponent({ value, onChange, includeMin }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
      <DemoContainer components={['DatePicker']}>
        {includeMin ? (
          <DatePicker
            className='w-full'
            value={value}
            onChange={onChange}
            minDate={currentYear}
            format='DD/MM/YYYY'
            views={['year', 'month', 'day']} />
        ) : (
          <DatePicker
            className='w-full'
            value={value}
            onChange={onChange}
            format='DD/MM/YYYY'
            views={['year', 'month', 'day']} />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
