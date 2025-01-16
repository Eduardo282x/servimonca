import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface YearPickerComponentProps {
    year: dayjs.Dayjs | null;
    setYear: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}

export const currentYear = dayjs();

export default function YearPickerComponent({year, setYear} : YearPickerComponentProps) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={year}
                onChange={(newYear) => setYear(dayjs(newYear))}
                label="Selecciona un año"
                minDate={currentYear}
                openTo="year"
                views={['year']}
                yearsOrder="desc"
                sx={{ minWidth: 250 }}
            />
        </LocalizationProvider>
    );

}

