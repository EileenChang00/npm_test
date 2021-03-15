import React from "react";
import { useEffect, useState } from "react";


export default function Bulletin(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    //get 'reservation' records as reservation
    const [reservation, setReservation] = useState([]);
    useEffect(()=>{
        base('reservation').select({
            view: "Grid view2",
            filterByFormula: "AND(IS_BEFORE({res_date},DATEADD(TODAY(),1,'month')),IS_AFTER({res_date},TODAY()))",
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
            view: "Grid view2",
            filterByFormula: "AND(IS_BEFORE({ser_actualdate},DATEADD(TODAY(),1,'month')),IS_AFTER({ser_actualdate},TODAY()))",
        }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            setService(records);
        });
        fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //完成狀態checkbox
    //點選預約完成checkbox
    const resStatusDone = (event) =>{
        //alert(event.target.value);
        var doneId = event.target.value;
        base('reservation').update([
            {"id": doneId,
                "fields": {
                "res_status": "完成"
                }
            }], function(err, records) {
            if (err) {
                console.error(err);
                alert(err);
                return;
            }
            alert("完成");
            })
    }
    //點選售後服務完成checkbox
    const serStatusDone = (event) =>{
        //alert(event.target.value);
        var doneId = event.target.value;
        base('service').update([
            {"id": doneId,
                "fields": {
                "ser_donedate": currentDate
                }
            }], function(err, records) {
            if (err) {
                console.error(err);
                alert(err);
                return;
            }
            alert("完成");
            })
    }
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
                    <td><font color="white">完成</font></td>
                </tr>
                {reservation.map((reservation)=>(
                    <tr>
                        <td><font color="white">{moment(reservation.fields.res_date).format('YYYY-MM-DD HH:mm')}</font></td>
                        <td><font color="white">{reservation.fields.res_cus_name}</font></td>
                        <td><font color="white">{reservation.fields.res_cus_phone}</font></td>
                        <td><font color="white">{reservation.fields.res_em_name}</font></td>
                        <td><font color="white"><input type="checkbox" name="resStatus[]" value={reservation.id} id="resStatus" onClick={resStatusDone}></input></font></td>
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
                    <td><font color="white">完成</font></td>
                </tr>
                {service.map((service)=>(
                    <tr>
                        <td><font color="white">{moment(service.fields.ser_actualdate).format('YYYY-MM-DD HH:mm')}</font></td>
                        <td><font color="white">{service.fields.ser_cus_name}</font></td>
                        <td><font color="white">{service.fields.ser_cus_phone}</font></td>
                        <td><font color="white">{service.fields.ser_em_name}</font></td>
                        <td><font color="white">{service.fields.ser_project}</font></td>
                        <td><font color="white"><input type="checkbox" name="serStatus[]" value={service.id} id="serStatus" onClick={serStatusDone}></input></font></td>
                    </tr>
                ))}
            </table>
        </div>
    )
}