import Airtable from 'airtable';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel } from "@material-ui/core";
import { useState } from 'react';



export default function Customer_update(props){
    console.log(props.update_id);
    const customer = props.customer;
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

    //get & prepare update data
    const [newCustomerName, setCustomerName] = useState(customer.fields.cus_name);
    const ChangeCustomerName = (event) =>{
        setCustomerName(event.target.value);
    }
    const [newPhone, setPhone] = useState(customer.fields.cus_phone);
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    }
    const [newBirth, setBirth] = useState(customer.fields.cus_birth);
    const ChangeBirth = (event) =>{
        setBirth(event.target.value);
    }
    const [newProfession, setProfession] = useState(customer.fields.cus_profession);
    const ChangeProfession = (event) =>{
        setProfession(event.target.value);
    }
    const [newTitle, setTitle] = useState(customer.fields.cus_title);
    const ChangeTitle = (event) =>{
        setTitle(event.target.value);
    }
    const [newEmail, setEmail] = useState(customer.fields.cus_email);
    const ChangeEmail = (event) =>{
        setEmail(event.target.value);
    }
    const [newAddress, setAddress] = useState(customer.fields.cus_address);
    const ChangeAddress = (event) =>{
        setAddress(event.target.value);
    }
    const [newintro, setIntro] = useState(customer.fields.cus_intro);
    const ChangeIntro = (event) =>{
        setIntro(event.target.value);
    }
    const [newminorintro, setMinorIntro] = useState(customer.fields.cus_minor_intro);
    const ChangeMinorIntro = (event) =>{
        setMinorIntro(event.target.value);
    }
    const [newgui, setGui] = useState(customer.fields.cus_GUI);
    const ChangeGui = (event) =>{
        setGui(event.target.value);
    }
    const [newinvoice, setInvoice] = useState(customer.fields.cus_invoice);
    const ChangeInvoice = (event) =>{
        setInvoice(event.target.value);
    }
    //multiple choices 
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
    //When UpdateButton is clicked
    function handleClick(){
        base('customer').update([
        {"id": props.update_id,
            "fields": {
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

    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
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
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}