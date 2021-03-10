import React from "react";
import { useEffect, useState } from "react";


export default function Bulletin(){
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
    return(
        <div class="container-fluid">
            <h1 class="mt-4">公告</h1>
            <p>預約</p>
            <table border="1" cellpadding="5" align="center">
                <tr>
                    <td><font color="white">日期時段</font></td>
                    <td><font color="white">顧客姓名</font></td>
                    <td><font color="white">顧客電話</font></td>
                    <td><font color="white">員工姓名</font></td>
                </tr>
                {reservation.map((reservation)=>(
                    <tr>
                        <td><font color="white">{moment(reservation.fields.res_date).format('YYYY-MM-DD HH:mm')}</font></td>
                        <td><font color="white">{reservation.fields.res_cus_name}</font></td>
                        <td><font color="white">{reservation.fields.res_cus_phone}</font></td>
                        <td><font color="white">{reservation.fields.res_em_name}</font></td>
                    </tr>
                ))}
            </table>
            <p></p>
            <p>售後服務</p>
            <table border="1" cellpadding="5" align="center">
                <tr>
                    <td><font color="white">日期時段</font></td>
                    <td><font color="white">顧客姓名</font></td>
                    <td><font color="white">顧客電話</font></td>
                    <td><font color="white">員工姓名</font></td>
                    <td><font color="white">服務項目</font></td>
                </tr>
                {service.map((service)=>(
                    <tr>
                        <td><font color="white">{moment(service.fields.ser_actualdate).format('YYYY-MM-DD HH:mm')}</font></td>
                        <td><font color="white">{service.fields.ser_cus_name}</font></td>
                        <td><font color="white">{service.fields.ser_cus_phone}</font></td>
                        <td><font color="white">{service.fields.ser_em_name}</font></td>
                        <td><font color="white">{service.fields.ser_project}</font></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}