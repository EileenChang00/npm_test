import { Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./come.css";

export default function Customer(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get Customer data from airtable
    const [customer, setCustomer] = useState([]);
    useEffect(()=>{
        base('customer').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setCustomer(records);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])

    
    return(
        <div>
            <div className="heads">
                <h1>SCHRAMM</h1>
            </div>
            <div align="right">
                <Button width="25px" variant="contained" color="primary">新增</Button>
                <Button width="25px" variant="contained" color="primary">修改</Button>
                <Button width="25px" variant="contained" color="primary">刪除</Button>
            </div>
            <div className="container">
                <TableContainer>
                    <Table tablename='customer'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>姓名</TableCell>
                                <TableCell>手機</TableCell>
                                <TableCell>生日</TableCell>
                                <TableCell>職業</TableCell>
                                <TableCell>職稱</TableCell>
                                <TableCell>信箱</TableCell>
                                <TableCell>地址</TableCell>
                                <TableCell>主介紹人</TableCell>
                                <TableCell>次介紹人</TableCell>
                                <TableCell>統一編號</TableCell>
                                <TableCell>統編抬頭</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customer.map((customer)=>(
                                <TableRow key={customer.fields.cus_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={customer.fields.cus_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{customer.fields.cus_id}</TableCell>
                                    <TableCell>{customer.fields.cus_name}</TableCell>
                                    <TableCell>{customer.fields.cus_phone}</TableCell>
                                    <TableCell>{customer.fields.cus_birth}</TableCell>
                                    <TableCell>{customer.fields.cus_profession}</TableCell>
                                    <TableCell>{customer.fields.cus_title}</TableCell>
                                    <TableCell>{customer.fields.cus_email}</TableCell>
                                    <TableCell>{customer.fields.cus_address}</TableCell>
                                    <TableCell>{customer.fields.cus_intro}</TableCell>
                                    <TableCell>{customer.fields.cus_minor_intro}</TableCell>
                                    <TableCell>{customer.fields.cus_GUI}</TableCell>
                                    <TableCell>{customer.fields.cus_invoice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}