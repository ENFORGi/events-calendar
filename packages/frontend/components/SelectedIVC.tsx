import { Select, SelectProps } from "antd";
import { useEffect, useState } from "react";

interface IPropsSelectedIVC extends SelectProps<string> {
    selectedIVC: string,
    setSelectedIVC: React.Dispatch<React.SetStateAction<string>>
}

interface IOptions{
    value: string,
    label: string
}

export default function SelectedIVCList({ selectedIVC, setSelectedIVC, ...props}: IPropsSelectedIVC){
    
    const [options, setOptions] = useState<IOptions[]>([]);

    useEffect(() => {
        setOptions(
            [{ value: '1', label: 'Jack' },
            { value: '2', label: 'Lucy' },
            { value: '3', label: 'Tom' }])
    }, [])
    return(
        <>
            <Select
                {...props}
                showSearch
                placeholder="Выбрать ИВЦ"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={options}
                value={selectedIVC}
                onChange={(e) => {
                    setSelectedIVC(e);
                    console.log(selectedIVC);
                }}/>
        </>
    )
}