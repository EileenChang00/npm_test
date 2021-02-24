import { Table, TableCell, TableContainer, TableHead, TableRow, Checkbox, TableBody, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./come.css";
import Buy_create from "./buy_create";
import Buy_delete from "./buy_delete";
import Buy_update from "./buy_update";

export default function Buy(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get 'buy'records as buy
    const [buy, setBuy] = useState([]);
    useEffect(()=>{
        base('buy').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setBuy(records);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedBuy, setSelectedBuy] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('buy').select({
            view: "Grid view",
            filterByFormula: "{buy_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedBuy(record);
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
                    {SelectedId_arr.length===1 && <Buy_update update_id={SelectedId_arr[0]} buy={SelectedBuy}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <Buy_delete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item><Buy_create /></Grid>
            </Grid>
            <div className="container">
                <TableContainer>
                    <Table tablename="buy">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>顧客名稱</TableCell>
                                <TableCell>產品名稱</TableCell>
                                <TableCell>購買日期</TableCell>
                                <TableCell>出貨日期</TableCell>
                                <TableCell>購買門市</TableCell>
                                <TableCell>負責員工名稱</TableCell>
                                <TableCell>預計服務日期</TableCell>
                                <TableCell>實價</TableCell>
                                <TableCell>定價</TableCell>
                                <TableCell>贈品</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buy.map((buy)=>(
                                <TableRow key={buy.fields.buy_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={buy.fields.buy_id.toString()} onClick={handleSelect} />
                                    </TableCell>
                                    <TableCell>{buy.fields.buy_id}</TableCell>
                                    <TableCell>{buy.fields.buy_cus_name}</TableCell>
                                    <TableCell>{buy.fields.buy_product_name}</TableCell>
                                    <TableCell>{buy.fields.buy_date}</TableCell>
                                    <TableCell>{buy.fields.buy_shippingdate}</TableCell>
                                    <TableCell>{buy.fields.buy_shop}</TableCell>
                                    <TableCell>{buy.fields.buy_em_name}</TableCell>
                                    <TableCell>{buy.fields.buy_defaultdate}</TableCell>
                                    <TableCell>{buy.fields.buy_actualprice}</TableCell>
                                    <TableCell>{buy.fields.buy_fixedprice}</TableCell>
                                    <TableCell>{buy.fields.buy_gift_name}</TableCell>
                                    <TableCell>{buy.fields.buy_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}