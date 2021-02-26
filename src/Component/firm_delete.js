import { Button } from "@material-ui/core";

export default function Firm_delete(props){
    //import moment
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    console.log(currentDate);
    //connect Airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //when delete button is clicked
    function handleDelete(){
        props.delete_id.map((deleteId) =>(
            base('firm').update([
            {"id": deleteId,
                "fields": {
                "firm_deletetime": currentDate
                }
            }], function(err, records) {
            if (err) {
                console.error(err);
                alert(err);
                return;
            }
            alert("完成刪除");
            })
        ))
    }

    return(
        <div>
            <Button variant="contained" color="secondary" onClick={handleDelete}>刪除</Button>
        </div>
    )
}