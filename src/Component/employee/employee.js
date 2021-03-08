import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody } from "@material-ui/core";
import { useEffect, useState } from "react";
import "../come.css";
import EmployeeCreate from "./employee_create";
import EmployeeUpdate from "./employee_update";
import EmployeeDelete from "./employee_delete";

export default function Employee(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get Employee data
    const [employee, setEmployee] = useState([]);
    useEffect(()=>{
        base('employee').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setEmployee(records);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedEmployee, setSelectedEmployee] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('employee').select({
            view: "Grid view2",
            filterByFormula: "{em_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedEmployee(record);//超LAG!!!
                new_arr.includes(record.id) ? new_arr=new_arr.filter(item=>item !== record.id) : new_arr=[...new_arr,record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    //employee={SelectedEmployee}
    return(
        <div>
            <div className="heads">
                <h1>SCHRAMM</h1>
            </div>
            
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>{SelectedId_arr.length===1 && <EmployeeUpdate update_id={SelectedId_arr[0]}  employee={SelectedEmployee}/>}</Grid>
                <Grid item>{SelectedId_arr.length>0 && <EmployeeDelete delete_id={SelectedId_arr} />}</Grid>
                <Grid item><EmployeeCreate /></Grid>
            </Grid>
            <div className="container">
                <TableContainer>
                    <Table tablename='employee'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>姓名</TableCell>
                                <TableCell>手機</TableCell>
                                <TableCell>生日</TableCell>
                                <TableCell>身分證字號</TableCell>
                                <TableCell>地址</TableCell>
                                <TableCell>到職日期</TableCell>
                                <TableCell>離職日期</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.map((employee)=>(
                                <TableRow key={employee.fields.em_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={employee.fields.em_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{employee.fields.em_id}</TableCell>
                                    <TableCell>{employee.fields.em_name}</TableCell>
                                    <TableCell>{employee.fields.em_phone}</TableCell>
                                    <TableCell>{employee.fields.em_birth}</TableCell>
                                    <TableCell>{employee.fields.em_IDnumber}</TableCell>
                                    <TableCell>{employee.fields.em_address}</TableCell>
                                    <TableCell>{employee.fields.em_enterdate}</TableCell>
                                    <TableCell>{employee.fields.em_resigndate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}