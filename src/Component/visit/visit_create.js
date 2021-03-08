import { Button, Dialog, DialogContent, DialogTitle, InputLabel, Select, MenuItem, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default function Visit_create(){
    //connect Airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import 時間
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    console.log(currentDate);
    //control Update-Dialog open
    const [open,setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    //multiple chpices
    //firmstaff選單
     const [SelectFirmstaff, setSelectFirmstaff] = useState([]);
     useEffect(()=>{
       base('firmstaff').select({
           view: "Grid view2"
       }).eachPage(function page(records, fetchNextPage) {
           records.forEach(function(record) {
               SelectFirmstaff.push({
                   recordId:record.id,
                   name:record.fields.firmstaff_name});
               setSelectFirmstaff(SelectFirmstaff);
           });
           fetchNextPage();
       }, function done(err) {
           if (err) { console.error(err); return; }
       });
   },[])



    //員工選單
    const [SelectEmployee, setSelectEmployee] = useState([]);
    useEffect(()=>{
        base('employee').select({
            view: "Grid view2"
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
     const [newFirmstaffId, setFirmstaffId] = useState('');
     const ChangeFirmstaffId = (event) =>{
         setFirmstaffId(event.target.value);
     };
     const [newVisitDate, setVisitDate] = useState('');
     const ChangeVisitDate = (event) =>{
         setVisitDate(event.target.value);
     };
     const [newEmployeeId, setEmployeeId] = useState('');
     const ChangeEmployeeId = (event) =>{
         setEmployeeId(event.target.value);
     };
     const [newMethod, setMethod] = useState('');
     const ChangeMethod = (event) =>{
         setMethod(event.target.value);
     };
     const [newPurpose, setPurpose] = useState('');
     const ChangePurpose = (event) =>{
         setPurpose(event.target.value);
     };
     const [newDuration, setDuration] = useState('');
     const ChangeDuration = (event) =>{
         setDuration(event.target.value);
     };
     const [newRemark, setRemark] = useState('');
     const ChangeRemark = (event) =>{
         setRemark(event.target.value);
     };
    //when Create button is clicked
    function handleClick(){
        base('visit').create([
        {
            "fields": {
            "vis_firmstaff_id": [newFirmstaffId],
            "vis_date": newVisitDate,
            "vis_em_id": [newEmployeeId],
            "vis_method": newMethod,
            "vis_purpose": newPurpose,
            "vis_duration": newDuration,
            "vis_remark": newRemark
            }
        },
        ], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }
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
                    



                   <InputLabel>廠商員工名稱</InputLabel>
                   <Select label="廠商員工名稱" fullWidth value={newFirmstaffId} onChange={ChangeFirmstaffId} MenuProps={MenuProps}>
                        {SelectFirmstaff.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>  
                   <InputLabel>拜訪日期</InputLabel>
                    <TextField margin="dense" type="date" value={newVisitDate} onChange={ChangeVisitDate} fullWidth />
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>  
                    <TextField margin="dense" label="方式" type="text" value={newPurpose} onChange={ChangePurpose} fullWidth />
                    <TextField margin="dense" label="目的" type="text" value={newMethod} onChange={ChangeMethod} fullWidth />
                    <TextField margin="dense" label="拜訪時長(分鐘)" type="text" value={newDuration} onChange={ChangeDuration} fullWidth />
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
