import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import "../come.css";
import ReservationCreate from "./reservation_create";
import ReservationUpdate from "./reservation_update";
import ReservationDelete from "./reservation_delete";

export default function Reservation(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    //get 'reservation' records as reservation
    const [reservation, setReservation] = useState([]);
    useEffect(()=>{
        base('reservation').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setReservation(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[]);
    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedReservation, setSelectedReservation] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('reservation').select({
            view: "Grid view",
            filterByFormula: "{res_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedReservation(record);
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
                    {SelectedId_arr.length===1 && <ReservationUpdate update_id={SelectedId_arr[0]} reservation={SelectedReservation}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <ReservationDelete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item>
                    <ReservationCreate />
                </Grid>
            </Grid>
            <div className="contanier">
                <TableContainer>
                    <Table tablename="reservation">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>顧客名稱</TableCell>
                                <TableCell>顧客電話</TableCell>
                                <TableCell>預約時間</TableCell>
                                <TableCell>負責員工姓名</TableCell>
                                <TableCell>後續狀態</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservation.map((reservation)=>(
                                <TableRow key={reservation.fields.res_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={reservation.fields.res_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{reservation.fields.res_id}</TableCell>
                                    <TableCell>{reservation.fields.res_cus_name}</TableCell>
                                    <TableCell>{reservation.fields.res_cus_phone}</TableCell>
                                    <TableCell>{moment(reservation.fields.res_date).format('YYYY-MM-DD HH:mm')}</TableCell>
                                    <TableCell>{reservation.fields.res_em_name}</TableCell>
                                    <TableCell>{reservation.fields.res_status}</TableCell>
                                    <TableCell>{reservation.fields.res_remark}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    )
}