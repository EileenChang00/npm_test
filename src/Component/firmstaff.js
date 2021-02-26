import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";
import "./come.css";
import Firmstaff_create from "./firmstaff_create";
import Firmstaff_update from "./firmstaff_update";
import Firmstaff_delete from "./firmstaff_delete";

export default function Firmstaff(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get 'firm' records as firm
    const [firmstaff, setFirmstaff] = useState([]);
    useEffect(()=>{
        base('firmstaff').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setFirmstaff(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[]);
    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedFirmstaff, setSelectedFirmstaff] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('firmstaff').select({
            view: "Grid view2",
            filterByFormula: "{firmstaff_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedFirmstaff(record);
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
                    {SelectedId_arr.length===1 && <Firmstaff_update update_id={SelectedId_arr[0]} firmstaff={SelectedFirmstaff}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <Firmstaff_delete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item>
                    <Firmstaff_create />
                </Grid>
            </Grid>
            <div className="contanier">
                <TableContainer>
                    <Table tablename="firmstaff">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>廠商人員名稱</TableCell>
                                <TableCell>公司名稱</TableCell>
                                <TableCell>手機</TableCell>
                                <TableCell>傳真</TableCell>
                                <TableCell>職稱</TableCell>
                                <TableCell>電子信箱</TableCell>
                                <TableCell>評價</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {firmstaff.map((firmstaff)=>(
                                <TableRow key={firmstaff.fields.firmstaff_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={firmstaff.fields.firmstaff_id.toString()} onClick={handleSelect} />
                                    </TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_id}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_name}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_firm_name}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_phone}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_fax}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_profession}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_mail}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_evaluation}</TableCell>
                                    <TableCell>{firmstaff.fields.firmstaff_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}