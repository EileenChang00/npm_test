import { Button, Dialog, DialogContent, DialogTitle, InputLabel, Select, MenuItem, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


export default function Come_create(){
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
    //multiple choices 
    //顧客名稱選單
    const [SelectCustomer, setSelectCustomer] = useState([]);
    useEffect(()=>{
        base('customer').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            SelectCustomer.push([record.fields.cus_name,record.fields.cus_phone]);
            setSelectCustomer(SelectCustomer);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },[])
    const filter = createFilterOptions();//選單內搜尋
    const [open_Customer, openCustomerDialog] = useState(false);//打開新增顧客視窗
    const [value, setValue] = useState('');
    const [dialogValue, setDialogValue] = useState({
        name: '',
        phone: '',
    });
    const closeCustomerDialog = () => {
        setDialogValue({
        name: '',
        phone: '',
        });
        openCustomerDialog(false);
    };
    //新增新顧客姓名電話
    const handleSubmitCustomer = (event) =>{
        event.preventDefault();
        base('customer').create([{
        "fields": {
            "cus_name": dialogValue.name,
            "cus_phone": dialogValue.phone
        }
    }
    ], function(err, records) {
    if (err) {
        return;
    }
    records.forEach(function (record) {
        setCustomerId(record.getId());
    });
    });
    setValue(dialogValue.name);
    closeCustomerDialog();
    }
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
    //選單樣式
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

    //get & prepare update data
    const [newCustomerId, setCustomerId] = useState('');
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
    //when Create button is clicked
    function handleClick(){
        base('come').create([
        {
            "fields": {
            "com_cus_id": [newCustomerId],
            "com_date": newComeDate,
            "com_em_id": ["recpO8hcpqUSY7NbP"],
            "com_know": newKnow,
            "com_time": newTime,
            "com_remark": newRemark,
            "com_product_id": [
                "reclqOUslPXx19J6V"
            ]
            }
        },
        ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
        });
        handleClose();
        alert("完成新增");
    }
    return(
        <div>
            <Button width="25px" variant="contained" color="primary" onClick={handleOpen}>新增</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增資料</DialogTitle>
                <DialogContent>
                    <Autocomplete 
                    value={value}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        if(!newValue){
                            console.log("!newValue");
                            ///setValue(newValue[0]);
                        }else if (newValue && newValue[0].search(newValue[1]) !== -1) {
                            // timeout to avoid instant validation of the dialog's form.
                            console.log("String include");
                            setTimeout(() => {
                            openCustomerDialog(true);
                            setDialogValue({
                                name: newValue[1],
                                phone:''
                            });
                            });
                        }else {
                            console.log('else');
                            setValue(newValue);
                        }
                        }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push([
                            `新增顧客 "${params.inputValue}"`,
                            params.inputValue,
                            ]);
                        }
                        return filtered;
                        }}
                    options={SelectCustomer}
                    getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        console.log(option);
                        if (typeof option === 'string') {
                            return option;
                        }
                        return option[0];
                        }}// 在選單中按了選擇的名稱後，回傳顯示在TextField裡的值
                    selectOnFocus
                    clearOnBlur
                    renderOption={(option) => option[0]}//在選單中顯示的內容(此為顧客名稱List)
                    freeSolo//可以任意輸入非選單內的文字
                    renderInput={(params) => (
                        <TextField {...params} label="顧客名稱" />
                    )}
                    />
                    <Dialog open={open_Customer} onClose={closeCustomerDialog} aria-labelledby="form-dialog-title">
                        <form onSubmit={handleSubmitCustomer}>
                        <DialogTitle id="form-dialog-title">請輸入新顧客的姓名和聯絡方式!</DialogTitle>
                        <DialogContent>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                            label="顧客名稱"
                            type="text"
                            />
                            <TextField
                            margin="dense"
                            id="phone"
                            value={dialogValue.phone}
                            onChange={(event) => setDialogValue({ ...dialogValue, phone: event.target.value })}
                            label="手機"
                            type="number"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeCustomerDialog} color="primary">
                            取消
                            </Button>
                            <Button type="submit" color="primary">
                            新增
                            </Button>
                        </DialogActions>
                        </form>
                    </Dialog>
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
                    <Button onClick={handleClick}>新增</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}