import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Checkbox, TableBody } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./come.css";
import Buy_create from "./buy_create";

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
    console.log(buy);
    return(
        <div>
            <div className="heads">
                <h1>SCHRAMM</h1>
            </div>
            <div align="right" width="25px">
                <Buy_create />
                <Button width="25px" variant="contained" color="default">修改</Button>
                <Button width="25px" variant="contained" color="secondary">刪除</Button>
            </div>
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
                                        <Checkbox id={buy.fields.buy_id.toString()} />
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