import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default function Service_update(props){
    const service = props.service;
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
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
            SelectCustomer.push([record.fields.cus_name,record.fields.cus_phone,record.id]);
            setSelectCustomer(SelectCustomer);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },[])
    const filter = createFilterOptions();//選單內搜尋
    const [open_Customer, openCustomerDialog] = useState(false);//打開新增顧客視窗
    const [value_cus, setValue_cus] = useState(service.fields.ser_cus_name);
    const [dialogValue_cus, setDialogValue_cus] = useState({
        name: '',
        phone: '',
    });
    const closeCustomerDialog = () => {
        setDialogValue_cus({
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
            "cus_name": dialogValue_cus.name,
            "cus_phone": dialogValue_cus.phone
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
    setValue_cus(dialogValue_cus.name);
    closeCustomerDialog();
    }
    //產品名稱選單
    const [SelectProduct, setSelectProduct] = useState([]);
    useEffect(()=>{
        base('product').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectProduct.push({
                    recordId:record.id,
                    name:record.fields.product_name});
                setSelectProduct(SelectProduct);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    const [value_prod, setValue_prod] = useState(service.fields.ser_productname);
    //服務項目選單
    const ProjectChoice = [
        {id:"card", name:"寄送小卡"},
        {id:"bed", name:"翻床墊"},
        {id:"battery", name:"換電池"},
        {id:"pillow", name:"換枕頭"},
    ]
    //員工名稱選單
    const [SelectEmployee, setSelectEmployee] = useState([]);
    useEffect(()=>{
        base('employee').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectEmployee.push({
                    recordId:record.id,
                    name:record.fields.em_name});
                setSelectEmployee(SelectEmployee);
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
    const [newCustomerId, setCustomerId] = useState(service.fields.ser_cus_id);
    const [newProductName, setProductName] = useState(service.fields.ser_productname);
    const [newServiceDate, setServiceDate] = useState(moment(service.fields.ser_actualdate).format('YYYY-MM-DDTHH:mm'));
    const ChangeServiceDate = (event) =>{
        setServiceDate(event.target.value);
    };
    console.log("service date="+newServiceDate);
    const [newProject, setProject] = useState(service.fields.ser_project);
    const ChangeProject = (event) =>{
        setProject(event.target.value);
    };
    const [newEmployeeId, setEmployeeId] = useState(service.fields.ser_em_id);
    const ChangeEmployeeId = (event) =>{
        setEmployeeId([event.target.value]);
    };
    console.log(newEmployeeId);
    const [newRemark, setRemark] = useState(service.fields.ser_remark);
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //When UpdateButton is clicked
    function handleClick(){
        base('service').update([
        {"id": props.update_id,
            "fields": {
            "ser_cus_id" : newCustomerId,
            "ser_productname" : newProductName,
            "ser_actualdate": newServiceDate,
            "ser_project": newProject,
            "ser_em_id": newEmployeeId,
            "ser_remark" : newRemark,
            }
        }], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }records.forEach(function(record) {
            console.log(record.get('ser_id'));
            alert("完成修改");
        });
        });
        handleClose();
    }
    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <Autocomplete 
                    value={value_cus}
                    onChange={(event, newValue) => {
                        if(!newValue){
                            console.log('newValue');
                        }else if (newValue && newValue[0].search(newValue[1]) !== -1) {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                            openCustomerDialog(true);
                            setDialogValue_cus({
                                name: newValue[1],
                                phone:''
                            });
                            });
                        }else {
                            setValue_cus(newValue[0]);
                            setCustomerId([newValue[2]]);
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
                        if (typeof option === 'string') {
                            return option;
                        }
                        return option[0];
                        }}// 在選單中按了選擇的名稱後，回傳顯示在TextField裡的值
                    selectOnFocus
                    clearOnBlur
                    renderOption={(option) => option[0]+","+option[1]}//在選單中顯示的內容(此為顧客名稱List)
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
                            value={dialogValue_cus.name}
                            onChange={(event) => setDialogValue_cus({ ...dialogValue_cus, name: event.target.value })}
                            label="顧客名稱"
                            type="text"
                            />
                            <TextField
                            margin="dense"
                            id="phone"
                            value={dialogValue_cus.phone}
                            onChange={(event) => setDialogValue_cus({ ...dialogValue_cus, phone: event.target.value })}
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
                    <Autocomplete
                        freeSolo
                        value={value_prod}
                        onChange={(event,newValue)=>{
                            console.log(newValue);
                            if(!newValue){
                                console.log("!newValue");
                            }else{
                                console.log("setProductName"+newValue.name);
                                setProductName(newValue.name);
                                setValue_prod(newValue);
                            }
                        }}
                        options={SelectProduct}
                        getOptionLabel={(option) => {
                            if(typeof option === "string"){
                                console.log("string");
                                return option;
                            }
                            console.log("else");
                            return option.name;
                        }}
                        renderOption={(option)=>option.name}
                        renderInput={(params) => (
                        <TextField {...params} label="產品名稱" margin="normal" />
                        )}
                    />
                    <InputLabel>來訪日期</InputLabel>
                    <TextField margin="dense" type="datetime-local" value={newServiceDate} onChange={ChangeServiceDate} fullWidth />
                    <InputLabel>服務項目</InputLabel>
                    <Select label="服務項目" fullWidth value={newProject} onChange={ChangeProject} MenuProps={MenuProps}>
                        {ProjectChoice.map((list) =>(
                            <MenuItem key={list.id} value={list.name}>{list.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
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