import { Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody,Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import "../come.css";
import VisitCreate from"./visit_create"
import VisitDelete from"./visit_delete"
import VisitUpdate from"./visit_update"


export default function Visit(){
    //連airtble
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //讀取 visit data from airtable
    const [visit, setVisit] = useState([]);
    useEffect(()=>{
        base('visit').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record){
                setVisit(records);
           });
           fetchNextPage();
        }, function done(err){
            if (err) { console.error(err); return; }
        });
    },[])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedVisit, setSelectedVisit] = useState([]);
    const handleSelect = (event) =>{
        //從勾選id得知哪筆資料要進行修改//勾選id=vis_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('visit').select({
            view: "Grid view",
            filterByFormula: "{vis_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setSelectedVisit(record);
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
            <Grid container direrction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length===1 && <VisitUpdate update_id={SelectedId_arr[0]}
                    visit={SelectedVisit}/>}
                    </Grid>
                    <Grid item>
                        {SelectedId_arr.length>0 && <VisitDelete delete_id={SelectedId_arr}/>}
                    </Grid>
                    <Grid item>
                        <VisitCreate/>
            </Grid>
            </Grid>

            <div className="container">
                <TableContainer>
                    <Table tablename='visit'>
                        <TableHead>
                            <TableRow>
                            <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>廠商員工姓名</TableCell>
                                <TableCell>日期</TableCell>
                                <TableCell>員工姓名</TableCell>
                                <TableCell>方式</TableCell>
                                <TableCell>目的</TableCell>
                                <TableCell>時長(分鐘)</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visit.map((visit)=>(
                                <TableRow key={visit.fields.vis_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={visit.fields.vis_id.toString()} onClick={handleSelect}/>
                                    </TableCell>

                                    <TableCell>{visit.fields.vis_id}</TableCell>
                                    <TableCell>{visit.fields.vis_firmstaff_name}</TableCell>
                                    <TableCell>{visit.fields.vis_date}</TableCell>
                                    <TableCell>{visit.fields.vis_em_name}</TableCell>
                                    <TableCell>{visit.fields.vis_method}</TableCell>
                                    <TableCell>{visit.fields.vis_purpose}</TableCell>
                                    <TableCell>{visit.fields.vis_duration}</TableCell>
                                    <TableCell>{visit.fields.vis_remark}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
            </div>   

    )
        
}
  