
import './App.css';
import Background from './bg.jpeg';
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link
} from 'react-router-dom';

var backgroundstyle = {
    width: "auto",
    height: "auto",
    backgroundImage: `url(${Background})`
};

function Changepw() {
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
                                        設定
          </a>
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
                        <h1 class="mt-4">員工更改密碼</h1>
                        <p>新密碼</p>
                        <p><input></input></p>
                        <p>再輸入新密碼</p>
                        <p><input></input></p>
                        <p><button>確定更改</button></p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Changepw;
