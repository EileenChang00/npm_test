import React from "react";

export default function Bulletin(){
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
                <tr>
                    <td><font color="white">2021/01/02,08:30</font></td>
                    <td><font color="white">王小明</font></td>
                    <td><font color="white">0921233123</font></td>
                    <td><font color="white">王大名</font></td>
                </tr>
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
                <tr>
                    <td><font color="white">2021/01/02,08:30</font></td>
                    <td><font color="white">王小明</font></td>
                    <td><font color="white">0921233123</font></td>
                    <td><font color="white">王大名</font></td>
                    <td><font color="white">翻床墊</font></td>
                </tr>
            </table>
        </div>
    )
}