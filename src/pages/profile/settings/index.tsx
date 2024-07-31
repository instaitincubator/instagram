import {getLayoutWithSidebar} from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar';
import {Tabs, TabsContent} from '@/shared/ui/Tabs';
import {useState} from 'react';
import {GeneralInformation} from '@/widgets';


const defaultOptions = [
    {label: 'General Information', value: 'general', children: <GeneralInformation/>},
    {label: 'Devices', value: 'devices', children: <div>Devices</div>},
    {label: 'Account Management', value: 'management', children: <div>Account Management</div>},
    {label: 'My Payments', value: 'payments', children: <div>My Payments</div>},
]


const Settings = () => {
    const [value, setValue] = useState<string>(defaultOptions[0].value)


    return <div className="pt-9 pl-6 pb-6 pr-16">
        <Tabs options={defaultOptions} onValueChange={setValue} defaultValue={value} padding={'pb-6'}>
            {defaultOptions.map((el) => <TabsContent value={el.value} children={el.children}/>)}
        </Tabs>
    </div>
}

Settings.getLayout = getLayoutWithSidebar
export default Settings
