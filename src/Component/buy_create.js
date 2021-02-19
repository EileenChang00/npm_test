import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default function Buy_create(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    //open 新增 Dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    //multiple choices select
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
    const [value_cus, setValue_cus] = useState('');
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
    //購買門市選單
    const ShopChoice = [
        {id:'Taipei', name:'台北門市'},
        {id:'Taichung', name:'台中門市'}
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
    console.log(SelectProduct);
    const [open_Sale, openSaleDialog] = useState(false);
    const closeSaleDialog = () =>{
        setDialogValue_sale({
            recordId:'',
            name:'',
            count:'',
        });
        openSaleDialog(false);
    }
    const [value_sale, setValue_sale] = useState([{ //儲存最後要新增到sale裡的資料
        recordId:'',
        count:'',
    }])
    const [dialogValue_sale, setDialogValue_sale] = useState([{ //儲存放進dialog中的臨時資料
        recordId:'',
        name:'',
        count:'',
    }])
    //新增購買的產品ID和數量 到sale資料表
    const handleSubmitSale = (event) =>{
        event.preventDefault();
        var sale_temp = value_sale;
        sale_temp.push([...sale_temp,
            {recordId:dialogValue_sale.recordId,
            name:dialogValue_sale.name,
            count:dialogValue_sale.count,}]);
        setValue_sale(sale_temp);
        closeSaleDialog();
    }
    console.log("dialogvalue_sale= "+dialogValue_sale);
    console.log("value_sale= "+value_sale);
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
    const [newBuyDate, setBuyDate] = useState(currentDate);
    const [newShippingDate, setShippingDate] = useState('');
    const [newShop, setShop] = useState('');
    const [newEmployeeId, setEmployeeId] = useState('');
    const [newActualPrice, setActualPrice] = useState('');
    const [newFixedPrice, setFixedPrice] = useState('');
    const [newRemark, setRemark] = useState('');
    const ChangeBuyDate = (event) =>{
        setBuyDate(event.target.value);
    }
    const ChangeShippingDate = (event) =>{
        setShippingDate(event.target.value);
    }
    const ChangeShop = (event) =>{
        setShop(event.target.value);
    }
    const ChangeEmployeeId = (event) =>{
        setEmployeeId(event.target.value);
    }
    const ChangeActualPrice = (event) =>{
        setActualPrice(event.target.value);
    }
    const ChangeFixedPrice = (event) =>{
        setFixedPrice(event.target.value);
    }
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    }
    //when 新增button is clicked
    function handleClick(){
        base('buy').create([
        newShippingDate ? 
        {"fields": {
            "buy_cus_id": [newCustomerId],
            "buy_date": newBuyDate,
            "buy_shippingdate": newShippingDate,
            "buy_shop": newShop,
            "buy_em_id":[newEmployeeId],
            "buy_actualprice": newActualPrice,
            "buy_fixedprice":newFixedPrice,
            "buy_remark":newRemark,
            }
        } : {"fields": {
            "buy_cus_id": [newCustomerId],
            "buy_date": newBuyDate,
            "buy_shop": newShop,
            "buy_em_id":[newEmployeeId],
            "buy_actualprice": newActualPrice,
            "buy_fixedprice":newFixedPrice,
            "buy_remark":newRemark,
            }
        }
        ], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
        alert("完成新增");
        });
        handleClose();
    }
    return(
        <div>
            <Button width="25px" variant="contained" color="primary" onClick={handleOpen}>新增</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增資料</DialogTitle>
                <DialogContent>
                    <Autocomplete 
                    value={value_cus}
                    onChange={(event, newValue) => {
                        if(!newValue){
                            console.log('!newValue');
                        }else if (newValue && newValue[0].search(newValue[1]) !== -1) {
                            //顧客不存在
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
                            setCustomerId(newValue[2]);
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
                    {/* 在Autocomplete freesolo下拉式選單
                    選擇產品，
                    彈出視窗輸入該產品購買數量，
                    並新增至sale資料表 */}
                    <Autocomplete
                    freeSolo//可以任意輸入非選單內的文字
                    multiple
                    onChange={(event,newValue)=>{
                            if(!newValue){
                                console.log("!newValue");
                            }
                            console.log("product's newValue="+newValue);
                            setTimeout(()=>{
                                setDialogValue_sale({
                                    recordId:newValue.recordId,
                                    name:newValue.name,
                                })
                                openSaleDialog(true);
                            })
                        }}
                    options={SelectProduct}
                    getOptionLabel={(option) => option.name}
                    selectOnFocus
                    clearOnBlur
                    renderInput={(params) => (
                        <TextField {...params} label="有興趣的產品" margin="normal" />
                    )}
                    />
                    <Dialog open={open_Sale} onClose={closeSaleDialog} aria-labelledby="form-dialog-title">
                        <form onSubmit={handleSubmitSale}>
                        <DialogTitle id="form-dialog-title">請輸入{dialogValue_sale.name}的購買數量</DialogTitle>
                        <DialogContent>
                            <TextField
                            margin="dense"
                            id="count"
                            value={dialogValue_sale.count}
                            onChange={(event) => setDialogValue_sale({ ...dialogValue_sale, count: event.target.value })}
                            label="數量"
                            type="number"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeSaleDialog} color="primary">
                            取消
                            </Button>
                            <Button type="submit" color="primary">
                            新增
                            </Button>
                        </DialogActions>
                        </form>
                    </Dialog>
                    <InputLabel>購買日期</InputLabel>
                    <TextField margin="dense" type="date" value={newBuyDate} onChange={ChangeBuyDate} fullWidth />
                    <InputLabel>出貨日期</InputLabel>
                    <TextField margin="dense" type="date" value={newShippingDate} onChange={ChangeShippingDate} fullWidth />
                    <InputLabel>購買門市</InputLabel>
                    <Select label="購買門市" fullWidth value={newShop} onChange={ChangeShop} MenuProps={MenuProps}>
                        {ShopChoice.map((list) =>(
                            <MenuItem key={list.id} value={list.name}>{list.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="實價" type="number" value={newActualPrice} onChange={ChangeActualPrice} fullWidth />
                    <TextField margin="dense" label="定價" type="number" value={newFixedPrice} onChange={ChangeFixedPrice} fullWidth />
                    {/* 在Autocomplete freesolo下拉式選單
                    選擇贈品，
                    彈出視窗輸入該贈品數量，
                    並新增至gift資料表 */}
                    <TextField margin="dense" label="贈品名稱" type="text" fullWidth />
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