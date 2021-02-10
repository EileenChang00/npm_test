import Airtable from 'airtable';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useEffect, useState } from 'react';



export default function Come_update(props){
    console.log(props.update_id);
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //control Update-Dialog open
    const [open,setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    //When UpdateButton is clicked
    function handleClick(){
        base('come').update([
        {"id": props.update_id,
            "fields": {
                "com_cus_id": [newCustomerId],
                "com_date": newComeDate,
                "com_em_id": [newEmployeeId],
                "com_know": newKnow,
                "com_time": newTime,
                "com_remark": newRemark,
                "com_product_id": [newProductId]
            }
        }], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }records.forEach(function(record) {
            console.log(record.get('com_id'));
        });
        });
        handleClose();
        alert("完成修改");
    }
    //get & prepare update data
    const [newCustomerId, setCustomerId] = useState('');
    const [newCustomerPhone, setCustomerPhone] =useState('');
    const ChangeCustomerId = (event) =>{
        setCustomerPhone(event.target.value);
        base('customer').select({
        view: "Grid view",
        filterByFormula: "{cus_phone}='"+event.target.value+"'"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setCustomerId(record.id);
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    }
    const [newComeDate, setComeDate] = useState('');
    const ChangeComeDate = (event) =>{
        setComeDate(event.target.value);
    };
    const [newEmployeeId, setEmployeeId] = useState('');
    const ChangeEmployeeId = (event) =>{
        setEmployeeId(event.target.value);
    }
    const [newKnow, setKnow] = useState('');
    const ChangeKnow = (event) =>{
        setKnow(event.target.value);
    };
    const [newProductId, setProductId] = useState('');
    const ChangeProductId = (event) =>{
        setProductId(event.target.value);
    }
    const [newTime, setTime] = useState('');
    const ChangeTime = (event) =>{
        setTime(event.target.value);
    };
    const [newRemark, setRemark] = useState('');
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //multiple choices 
    //SelectCustomer[] = [customerPhone,customerName] //customerPhone=key
    const [SelectCustomer, setSelectCustomer] = useState([]);
    useEffect(()=>{
        base('customer').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            SelectCustomer.push([record.fields.cus_phone,record.fields.cus_name]);
            setSelectCustomer(SelectCustomer);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },[])
    //員工名稱選單
    const [SelectEmployee, setSelectEmployee] = useState([]);
    useEffect(()=>{
        base('employee').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectEmployee.push([record.id,record.fields.em_name]);
                setSelectEmployee(SelectEmployee);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //產品名稱選單
    const [SelectProduct, setSelectProduct] = useState([]);
    useEffect(()=>{
        base('product').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectProduct.push([record.id,record.fields.product_name]);
                setSelectProduct(SelectProduct);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    

    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <InputLabel>顧客名稱</InputLabel>
                    <Select label="顧客名稱" fullWidth value={newCustomerPhone} onChange={ChangeCustomerId} MenuProps={MenuProps}>
                        {SelectCustomer.map((nameList) =>(
                            <MenuItem key={nameList[0]} value={nameList[0]}>{nameList[1]},{nameList[0]}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel>來訪日期</InputLabel>
                    <TextField margin="dense" type="date" value={newComeDate} onChange={ChangeComeDate} fullWidth />
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList[0]} value={nameList[0]}>{nameList[1]}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="得知管道" type="text" value={newKnow} onChange={ChangeKnow} fullWidth />
                    <InputLabel>有興趣的產品</InputLabel>
                    <Select label="有興趣的產品" fullWidth value={newProductId} onChange={ChangeProductId} MenuProps={MenuProps}>
                        {SelectProduct.map((nameList) =>(
                            <MenuItem key={nameList[0]} value={nameList[0]}>{nameList[1]}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="停留時長" type="text" value={newTime} onChange={ChangeTime} fullWidth />
                    <TextField margin="dense" label="備註" type="text" value={newRemark} onChange={ChangeRemark} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}