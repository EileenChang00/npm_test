import React, { useEffect, useState } from "react";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import "./come.css";
import Come_update from "./come_update"
import Come_create from "./come_create2"
import Come_delete from "./come_delete"

export default function Come(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get 'come'records as come
    const [come, setCome] = useState([]);
    useEffect(()=>{
        base('come').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setCome(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('come').select({
            view: "Grid view",
            filterByFormula: "{com_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
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
            <div align="right" width="25px">
                <Come_create />
                {SelectedId_arr.length===1 && <Come_update update_id={SelectedId_arr[0]}/>}
                {SelectedId_arr.length>0 && <Come_delete delete_id={SelectedId_arr}/>}
            </div>
            <div className="container">
                <TableContainer>
                    <Table tablename='come' >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>顧客名稱</TableCell>
                                <TableCell>來訪日期</TableCell>
                                <TableCell>負責員工名稱</TableCell>
                                <TableCell>得知管道</TableCell>
                                <TableCell>有興趣產品</TableCell>
                                <TableCell>停留時長</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {come.map((come) =>(
                                <TableRow key={come.fields.com_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={come.fields.com_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{come.fields.com_id}</TableCell>
                                    <TableCell>{come.fields.com_cus_name}</TableCell>
                                    <TableCell>{come.fields.com_date}</TableCell>
                                    <TableCell>{come.fields.com_em_name}</TableCell>
                                    <TableCell>{come.fields.com_know}</TableCell>
                                    <TableCell>{come.fields.com_product_name}</TableCell>
                                    <TableCell>{come.fields.com_time}</TableCell>
                                    <TableCell>{come.fields.com_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
