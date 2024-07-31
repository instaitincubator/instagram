import Button from '@/shared/ui/Button/Button';
import {Input} from '@/shared/ui/Input/Input';
import Select from '@/shared/ui/Select/Select';

export const GeneralInformationForm = () => {


    return <div>
        <form>
            <div>
                <div>
                    Upload avatar
                </div>
                <div>
                    <Input label={'Username'} value={'Username'}/>
                    <Input label={'First Name'} value={'First Name'}/>
                    <Input label={'Last Name'} value={'Last Name'}/>
                    <Input label={'Date of birth'} value={'Date of birth'}/>
                    <div>
                        <Select onChange={() => {}} options={[]}/>
                        <Select onChange={() => {}} options={[]}/>
                    </div>
                </div>
            </div>
            <div>
                <Button>Save changes</Button>
            </div>
        </form>
    </div>
}