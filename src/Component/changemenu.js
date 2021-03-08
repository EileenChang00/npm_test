
import './App.css';
import Background from './bg.jpeg';
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link
} from 'react-router-dom';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';

var backgroundstyle = {
    width: "auto",
    height: "auto",
    backgroundImage: `url(${Background})`
};


const base = new Airtable({ apiKey: 'keyC0nR1e39lOmrhm' }).base('apphBomMb49ieU17N');

function Changemenu() {

    const [promenu, setPromenu] = useState([]);

    useEffect(() => {
        base('promenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage();
                setPromenu(records);
            })
    }, [])

    const [newpro, setpro] = useState('');
    const onChangepro = (event) => {
        setpro(event.target.value);
    };

    const proarray = [];
    promenu.map(promenu => proarray.push(promenu.fields.menu))
    console.log(proarray);
    const proid = [];
    promenu.map(promenu => proid.push(promenu.id))
    console.log(proid);

    const prosplit1 = [];
    for (let i = 0; i < promenu.length; i += 3) {
        prosplit1.push([proid[i],proarray[i]]);
    }
    //console.log(prosplit1);
    const prosplit2 = [];
    for (let i = 1; i < promenu.length; i += 3) {
        prosplit2.push([proid[i],proarray[i]]);
    }
    //console.log(prosplit2);
    const prosplit3 = [];
    for (let i = 2; i < promenu.length; i += 3) {
        prosplit3.push([proid[i],proarray[i]]);
    }
    //console.log(prosplit3);

    return (
        <div style={backgroundstyle}>
            <div class="d-flex" id="wrapper">

                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">SCHRAMM </div>
                    <div class="list-group list-group-flush">
                        <div>基本資料表</div>
                        <Link to="/customer"><a href="/#" class="list-group-item list-group-item-action bg-light">顧客資料表</a></Link>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">員工資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">產品資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">製造商資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">廠商資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">廠商人員資料表</a>
                        <div>進階資料表</div>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">預約資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">來訪資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">購買資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">售後服務資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">拜訪資料表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">贈品資料表</a>
                        <div>報表</div>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">營業報表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">熱銷報表</a>
                        <a href="/#" class="list-group-item list-group-item-action bg-light">介紹次數報表</a>
                    </div>
                </div>

                <div id="page-content-wrapper">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        {/* <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}

                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/#">公告 <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">預約</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">來訪</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#">購買</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        設定</a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="/changepw">員工更改密碼</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="/changemenu">選單修改</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div class="container-fluid">
                        <h1 class="mt-4">選單修改</h1>
                        <p>職業選單</p>
                        <div align='center' style={{ color: 'white' }}>新增職業:&nbsp;<input name='new' onChange={onChangepro}></input>&nbsp;&nbsp;<button type="button" class="badge rounded-pill bg-success" style={{ width: "80px", height: "40px", color: "white" }} onClick={createpro}>新增</button>
                            <button type="button" class="badge rounded-pill bg-danger" style={{ width: "80px", height: "40px", color: "white" }} id="delete" onClick={deletepro}>刪除</button>
                        </div>
                        <div class="list1">
                            {prosplit1.map(prosplit1 =>
                                <li style={{ color: 'white' }}><input type="radio" name="pro" id={prosplit1[0]} />&nbsp;&nbsp;{prosplit1[1]}</li>
                            )}
                        </div>
                        <div class='list2'>
                            {prosplit2.map(prosplit2 =>
                                <li style={{ color: 'white' }}><input type="radio" name="pro" id={prosplit2[0]} />&nbsp;&nbsp;{prosplit2[1]}</li>
                            )}
                        </div>
                        <div class='list3'>
                            {prosplit3.map(prosplit3 =>
                                <li style={{ color: 'white' }}><input type="radio" name="pro" id={prosplit3[0]} />&nbsp;&nbsp;{prosplit3[1]}</li>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function createpro() {
        const value = document.querySelector('[name=new]');
        if (value.value) {
            base('promenu').create({
                "menu": newpro,
            }, function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(record.fields);
                window.location.reload();
            });
        } else {
            alert('請輸入新職業');
        }
    }

    function deletepro() {
        const checked = document.querySelector('[name=pro]:checked');
        console.log(checked.id);
        console.log(checked);
        if (checked) {
            console.log("有選取");

            base('promenu').destroy(checked.id, function(err, deletedRecord) {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Deleted record', deletedRecord.id);
                window.location.reload();
              });
        } else {
            console.log("未選取");
        }

    }


}

export default Changemenu;
