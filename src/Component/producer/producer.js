import { Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody,Grid} from "@material-ui/core";
import { useEffect, useState } from "react";
import "../come.css";
import ProducerCreate from "./producer_create";
import ProducerUpdate from "./producer_update";
import ProducerDelete from "./producer_delete";




export default function Producer(){
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    const [producer, setProducer] = useState([]);
    useEffect(()=>{
        base('producer').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setProducer(records);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedProducer, setSelectedProducer] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('producer').select({
            view: "Grid view2",
            filterByFormula: "{producer_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedProducer(record);
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
                    {SelectedId_arr.length===1 && <ProducerUpdate update_id={SelectedId_arr[0]}
                    producer={SelectedProducer}/>}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length>0 && <ProducerDelete delete_id={SelectedId_arr}/>}
                </Grid>
                <Grid item>
                    <ProducerCreate/>
                </Grid>
            </Grid>              
            <div className="container">
                <TableContainer>
                    <Table tablename="producer">
                        <TableHead>
                            <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox/>
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>名稱</TableCell>
                                <TableCell>聯絡人</TableCell>
                                <TableCell>地址</TableCell>
                                <TableCell>類別</TableCell>
                                <TableCell>統一編號</TableCell>
                                <TableCell>匯款資訊</TableCell>
                                <TableCell>電話</TableCell>
                                <TableCell>電子信箱</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {producer.map((producer)=>(
                                <TableRow key={producer.fields.producer_id}>
                                   <TableCell padding="checkbox">
                                      <Checkbox id={producer.fields.producer_id.toString()} onClick={handleSelect}/>
                                   </TableCell>
                                
                                    <TableCell>{producer.fields.producer_id}</TableCell>
                                    <TableCell>{producer.fields.producer_name}</TableCell>
                                    <TableCell>{producer.fields.producer_contactperson}</TableCell>
                                    <TableCell>{producer.fields.producer_address}</TableCell>
                                    <TableCell>{producer.fields.producer_kind}</TableCell>
                                    <TableCell>{producer.fields.producer_GUI}</TableCell>
                                    <TableCell>{producer.fields.producer_info}</TableCell>
                                    <TableCell>{producer.fields.producer_phone}</TableCell>
                                    <TableCell>{producer.fields.producer_email}</TableCell>
                                    <TableCell>{producer.fields.producer_remark}</TableCell>
                                </TableRow> 
                                
                            ))}
                        </TableBody>
                    </Table>
                    
                </TableContainer>
            
        </div>
        </div>
        )
}
