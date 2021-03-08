
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

function home() {
    return (
        <div style={backgroundstyle}>
        <div className="heads">
                    <a href="App.js"><h1 align="center">SCHRAMM</h1></a>
                    <div align="right" className="button1">
                        <button type="button" className="btn btn-primary">登出</button>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center g-0">
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><Link to="/customer"><img src='img/manager.png' alt="manager" className="pic2"></img></Link></div>
                                <p>顧客</p> 
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/conversation.png" alt="conversation" className="pic2"></img></div>
                                <p>來訪</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/currency.png" alt="currency" className="pic2"></img></div>
                                <p>購買</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/clipboard.png" alt="clipboard" className="pic2"></img></div>
                                <p>售後服務</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/bed.png" alt="bed" className="pic2"></img></div>
                                <p>產品</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/graphic-design.png" alt="graphic-design" className="pic2"></img></div>
                                <p>設計師</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/handshake.png" alt="handshake" className="pic2"></img></div>
                                <p>拜訪</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/id-card.png" alt="id-card" className="pic2"></img></div>
                                <p>員工</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/building.png" alt="building" className="pic2"></img></div>
                                <p>廠商</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="pic"><img src="img/businessman.png" alt="businessman" className="pic2"></img></div>
                                <p>廠商人員</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default home;
