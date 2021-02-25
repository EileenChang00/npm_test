import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./come.css";
import Customer_create from "./customer_create";
import Customer_update from "./customer_update";
import Customer_delete from "./customer_delete";

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

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedCustomer, setSelectedCustomer] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('customer').select({
            view: "Grid view2",
            filterByFormula: "{cus_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedCustomer(record);
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
                    {SelectedId_arr.length===1 && <Customer_update update_id={SelectedId_arr[0]}  customer={SelectedCustomer} />}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <Customer_delete delete_id={SelectedId_arr} />}
                </Grid>
                <Grid item><Customer_create /></Grid>
            </Grid>
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