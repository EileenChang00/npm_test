import { Button, Dialog, DialogContent, DialogTitle, InputLabel, Select, MenuItem, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';


export default function Product_update(props){
    console.log(props.update_id);
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //control Update-Dialog open
    const [open,setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    //multiple choices
    //製造商選單
    const [SelectProducer, setSelectProducer] = useState([]);
    useEffect(()=>{
        base('producer').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectProducer.push([record.id,record.fields.producer_name]);
                setSelectProducer(SelectProducer);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    console.log(SelectProducer);
    //選單樣式
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    //get & prepare update data
    const [newProductName, setProductName] = useState('');
    const ChangeProductName = (event) =>{
        setProductName(event.target.value);
    }
    const [newCategory, setCategory] = useState('');
    const ChangeCategory = (event) =>{
        setCategory(event.target.value);
    }
    const [newSeries, setSeries] = useState('');
    const ChangeSeries = (event) =>{
        setSeries(event.target.value);
    }
    const [newFixedSize, setFixedSize] = useState('');
    const ChangeFixedSize = (event) =>{
        setFixedSize(event.target.value);
    }
    const [newSize, setSize] = useState('');
    const ChangeSize = (event) =>{
        setSize(event.target.value);
    }
    const [newPrice, setPrice] = useState('');
    const ChangePrice = (event) =>{
        setPrice(event.target.value);
    }
    const [newProducerId, setProducerId] = useState('');
    const ChangeProducerId = (event) =>{
        setProducerId(event.target.value);
    }
    const [newNote, setNote] = useState('');
    const ChangeNote = (event) =>{
        setNote(event.target.value);
    }
    //when Create button is clicked
    function handleClick(){
        base('product').update([
        {"id": props.update_id,
            "fields": {
            "product_name": newProductName,
            "product_category": newCategory,
            "product_series": newSeries,
            "product_fixedsize": newFixedSize,
            "product_size": newSize, 
            "product_price": newPrice,
            "product_producer_id": [newProducerId],
            "product_note": newNote
            }
        }], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }records.forEach(function(record) {
            console.log(record.get('com_id'));
        });
        });
        handleClose();
        alert("完成修改");
    }
    return(
        <div>
            <Button width="25px" variant="contained" color="default" onClick={handleOpen}>修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="產品名稱" type="text" value={newProductName} onChange={ChangeProductName} fullWidth />
                    <TextField margin="dense" label="類別" type="text" value={newCategory} onChange={ChangeCategory} fullWidth />
                     <TextField margin="dense" label="系列" type="text" value={newSeries} onChange={ChangeSeries} fullWidth />
                    <TextField margin="dense" label="尺寸" type="text" value={newFixedSize} onChange={ChangeFixedSize} fullWidth />
                    <TextField margin="dense" label="特殊尺寸" type="text" value={newSize} onChange={ChangeSize} fullWidth />
                    <TextField margin="dense" label="價格" type="text" value={newPrice} onChange={ChangePrice} fullWidth />
                    <InputLabel>製造商名稱</InputLabel>
                    <Select label="製造商名稱" fullWidth value={newProducerId} onChange={ChangeProducerId} MenuProps={MenuProps}>
                        {SelectProducer.map((producer)=>(
                            <MenuItem key={producer[0]} value={producer[0]}>{producer[1]}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="備註" type="text" value={newNote} onChange={ChangeNote} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}