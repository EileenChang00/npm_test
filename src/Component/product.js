import { Button, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./come.css";
import Product_create from "./product_create";
import Product_update from "./product_update";
import Product_delete from "./product_delete";

export default function Product(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get Customer data
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        base('product').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                setProduct(records);
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
        base('product').select({
            view: "Grid view2",
            filterByFormula: "{product_id}='"+new_select_id+"'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                new_arr.includes(record.id) ? new_arr=new_arr.filter(item=>item !== record.id) : new_arr=[...new_arr,record.id];//若紀錄已被勾選，刪除紀錄，否則紀錄勾選id
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
            <div align="right">
                <Product_create />               
                {SelectedId_arr.length===1 && <Product_update update_id={SelectedId_arr[0]} />}               
                {SelectedId_arr.length>0 && <Product_delete delete_id={SelectedId_arr} />}
            </div>
            <div className="container">
                <TableContainer>
                    <Table tablename='product'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>編號</TableCell>
                                <TableCell>名稱</TableCell>
                                <TableCell>類別</TableCell>
                                <TableCell>系列</TableCell>
                                <TableCell>尺寸</TableCell>
                                <TableCell>特殊尺寸</TableCell>
                                <TableCell>價格</TableCell>
                                <TableCell>製造商名稱</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map((product)=>(
                                <TableRow key={product.fields.product_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={product.fields.product_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{product.fields.product_id}</TableCell>
                                    <TableCell>{product.fields.product_name}</TableCell>
                                    <TableCell>{product.fields.product_category}</TableCell>
                                    <TableCell>{product.fields.product_series}</TableCell>
                                    <TableCell>{product.fields.product_fixedsize}</TableCell>
                                    <TableCell>{product.fields.product_size}</TableCell>
                                    <TableCell>{product.fields.product_price}</TableCell>
                                    <TableCell>{product.fields.product_producer_name}</TableCell>
                                    <TableCell>{product.fields.product_note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}