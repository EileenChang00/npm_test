import { Button, Dialog, DialogContent, DialogTitle, InputLabel, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';


export default function Customer_create(){
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
    const [newCustomerName, setCustomerName] = useState('');
    const ChangeCustomerName = (event) =>{
        setCustomerName(event.target.value);
    }
    const [newPhone, setPhone] = useState('');
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    }
    const [newBirth, setBirth] = useState('');
    const ChangeBirth = (event) =>{
        setBirth(event.target.value);
    }
    const [newProfession, setProfession] = useState('');
    const ChangeProfession = (event) =>{
        setProfession(event.target.value);
    }
    const [newTitle, setTitle] = useState('');
    const ChangeTitle = (event) =>{
        setTitle(event.target.value);
    }
    const [newEmail, setEmail] = useState('');
    const ChangeEmail = (event) =>{
        setEmail(event.target.value);
    }
    const [newAddress, setAddress] = useState('');
    const ChangeAddress = (event) =>{
        setAddress(event.target.value);
    }
    const [newintro, setIntro] = useState('');
    const ChangeIntro = (event) =>{
        setIntro(event.target.value);
    }
    const [newminorintro, setMinorIntro] = useState('');
    const ChangeMinorIntro = (event) =>{
        setMinorIntro(event.target.value);
    }
    const [newgui, setGui] = useState('');
    const ChangeGui = (event) =>{
        setGui(event.target.value);
    }
    const [newinvoice, setInvoice] = useState('');
    const ChangeInvoice = (event) =>{
        setInvoice(event.target.value);
    }
    //when Create button is clicked
    function handleClick(){
        base('customer').create([
        newBirth ? {"fields": {
            "cus_name": newCustomerName,
            "cus_phone": newPhone,
            "cus_birth": newBirth,
            "cus_profession": newProfession,
            "cus_title": newTitle, 
            "cus_email": newEmail,
            "cus_address": newAddress,
            "cus_intro": newintro,
            "cus_minor_intro": newminorintro,
            "cus_GUI": newgui,
            "cus_invoice": newinvoice
            }
        } : {"fields": {
            "cus_name": newCustomerName,
            "cus_phone": newPhone,
            "cus_profession": newProfession,
            "cus_title": newTitle, 
            "cus_email": newEmail,
            "cus_address": newAddress,
            "cus_intro": newintro,
            "cus_minor_intro": newminorintro,
            "cus_GUI": newgui,
            "cus_invoice": newinvoice
            }
        },
        ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
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
                    <TextField margin="dense" label="顧客名稱" type="text" value={newCustomerName} onChange={ChangeCustomerName} fullWidth />
                    <TextField margin="dense" label="手機" type="text" value={newPhone} onChange={ChangePhone} fullWidth />
                    <InputLabel>生日</InputLabel>
                    <TextField margin="dense" type="date" value={newBirth} onChange={ChangeBirth} fullWidth />
                     <TextField margin="dense" label="職業" type="text" value={newProfession} onChange={ChangeProfession} fullWidth />
                    <TextField margin="dense" label="職稱" type="text" value={newTitle} onChange={ChangeTitle} fullWidth />
                    <TextField margin="dense" label="信箱" type="text" value={newEmail} onChange={ChangeEmail} fullWidth />
                    <TextField margin="dense" label="地址" type="text" value={newAddress} onChange={ChangeAddress} fullWidth />
                    <TextField margin="dense" label="主介紹人" type="text" value={newintro} onChange={ChangeIntro} fullWidth />
                    <TextField margin="dense" label="次介紹人" type="text" value={newminorintro} onChange={ChangeMinorIntro} fullWidth />
                    <TextField margin="dense" label="統一編號" type="text" value={newgui} onChange={ChangeGui} fullWidth />
                    <TextField margin="dense" label="統編抬頭" type="text" value={newinvoice} onChange={ChangeInvoice} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>新增</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}