import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import "./come.css";
import Firm_create from "./firm_create";
import Firm_update from "./firm_update";
import Firm_delete from "./firm_delete";

export default function Firm(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get 'firm' records as firm
    const [firm, setFirm] = useState([]);
    useEffect(()=>{
        base('firm').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setFirm(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[]);
    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedFirm, setSelectedFirm] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('firm').select({
            view: "Grid view",
            filterByFormula: "{firm_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedFirm(record);
                new_arr.includes(record.id) ? new_arr=new_arr.filter(item=>item !== record.id) : new_arr=[...new_arr,record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    return(
        <div>
            <div className="heads">
                <h1>SCHRAMM</h1>
            </div>
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length===1 && <Firm_update update_id={SelectedId_arr[0]} firm={SelectedFirm}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <Firm_delete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item>
                    <Firm_create />
                </Grid>
            </Grid>
            <div className="contanier">
                <TableContainer>
                    <Table tablename="firm">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>廠商公司名稱</TableCell>
                                <TableCell>公司類別</TableCell>
                                <TableCell>公司電話</TableCell>
                                <TableCell>公司傳真</TableCell>
                                <TableCell>公司地址</TableCell>
                                <TableCell>公司信箱</TableCell>
                                <TableCell>公司統編</TableCell>
                                <TableCell>公司匯款資訊</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {firm.map((firm)=>(
                                <TableRow key={firm.fields.firm_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={firm.fields.firm_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{firm.fields.firm_id}</TableCell>
                                    <TableCell>{firm.fields.firm_name}</TableCell>
                                    <TableCell>{firm.fields.firm_category}</TableCell>
                                    <TableCell>{firm.fields.firm_phone}</TableCell>
                                    <TableCell>{firm.fields.firm_fax}</TableCell>
                                    <TableCell>{firm.fields.firm_address}</TableCell>
                                    <TableCell>{firm.fields.firm_mail}</TableCell>
                                    <TableCell>{firm.fields.firm_GUI}</TableCell>
                                    <TableCell>{firm.fields.firm_remit}</TableCell>
                                    <TableCell>{firm.fields.firm_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
            
    )
}