import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabsProperties } from '../interfaces/tabs.interface';

interface TabsComponentProps {
    tabValue: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
    tabs: TabsProperties[];
}

export default function TabsComponent({tabValue, setTabValue, tabs} : TabsComponentProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        console.log(newValue)
    };

    return (

        <div>
            <Tabs value={tabValue} onChange={handleChange} aria-label="icon label tabs example" className='py-5 rounded-lg'>
                {tabs && tabs.map((tab: TabsProperties, index: number) => (
                    <Tab label={tab.label} key={index} />
                ))}
            </Tabs>
        </div>

    );
}
