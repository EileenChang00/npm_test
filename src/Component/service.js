import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import "./come.css";
import Service_create from "./service_create";
import Service_update from "./service_update";
import Service_delete from "./service_delete";

export default function Service(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    //get 'service'records as service
    const [service, setService] = useState([]);
    useEffect(()=>{
        base('service').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setService(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedService, setSelectedService] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('service').select({
            view: "Grid view",
            filterByFormula: "{ser_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedService(record);
                new_arr.includes(record.id) ? new_arr=new_arr.filter(item=>item !== record.id) : new_arr=[...new_arr,record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    console.log(SelectedId_arr);
    return(
        <div>
            <div className="heads">
                <h1>SCHRAMM</h1>
            </div>
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length===1 && <Service_update update_id={SelectedId_arr[0]} service={SelectedService}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <Service_delete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item>
                    <Service_create />
                </Grid>
            </Grid>
            <div className="container">
                <TableContainer>
                    <Table tablename="service">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>顧客名稱</TableCell>
                                <TableCell>產品名稱</TableCell>
                                <TableCell>服務日期</TableCell>
                                <TableCell>服務項目</TableCell>
                                <TableCell>負責員工姓名</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {service.map((service)=>(
                                <TableRow key={service.fields.ser_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={service.fields.ser_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{service.fields.ser_id}</TableCell>
                                    <TableCell>{service.fields.ser_cus_name}</TableCell>
                                    <TableCell>{service.fields.ser_productname}</TableCell>
                                    <TableCell>{moment(service.fields.ser_actualdate).format('YYYY-MM-DD HH:mm')}</TableCell>
                                    <TableCell>{service.fields.ser_project}</TableCell>
                                    <TableCell>{service.fields.ser_em_name}</TableCell>
                                    <TableCell>{service.fields.ser_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}