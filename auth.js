// ==UserScript==
// @name         SYZOJ Helper - 登录模块
// @version      0.3 Preview
// @author       Carey_chen
// @description  这是一个针对常见的 SYZOJ 的美化工具，并为其增加了一些功能，部分灵感与实现 Smart-Lougu。
// @match        http://www.nfls.com.cn:20035/*
// @match        http://47.109.34.226:5283/*
// @match        https://tywzoj.top/*
// @match        http://noi.ybtoj.com.cn/*
// @match        http://syzoj.365xingzhi.com:5283/*
// @match        http://ssloj.cn/*
// @match        https://loj.ac/*
// @match        https://cdn.plyr.io/3.7.8/plyr.svg
// @match        http://192.168.188.77/*
// @run-at       document-end
// ==/UserScript==


function LoginByCooie()
{
    console.log("SYZOJ helper：曲奇登录成功！");
    document.cookie = "LoginByCookie=true";
    document.cookie = "login=" + document.getElementById("Cookie").value;
    window.location.href = "/";
}

var created = false;
function ConfirmToSubmit()
{
    if(created == false)
    {
        document.querySelector('body').insertAdjacentHTML('afterend', '<div id="confirmer" class="ui dimmer modals page transition visible active" style="display: flex !important;"><div class="ui basic modal transition visible active" style="display: block !important;"><div class="ui icon header"><i class="edit icon"></i></div><div class="content" style="text-align: center; "><p>确认要以曲奇（Cookie）登录时提交此代码吗？。<br></p><b>Tips: 若使用曲奇（Cookie）登录将不会被记录IP地址，但若提交代码，你的IP将被记录。<br> Tips: 若要跳过确认，请在代码框中填入代码，之后在控制台（console）中输入 “submit_code()”（不含引号）。</b></div><div class="actions"><div id="ConfirmToSubmit_Cancel" class="ui red basic cancel inverted button"><i class="remove icon"></i>否</div><a id="ConfirmToSubmit_OK" class="ui green ok inverted button"><i class="checkmark icon"></i>是</a></div></div></div>');
        created = true;
    }
    else
    {
        document.querySelector("#confirmer").style = "display: flex !important;";
    }

    document.getElementById('ConfirmToSubmit_Cancel').addEventListener('click', function()
    {
        document.querySelector("#confirmer").style = "display: none !important;";
    });
    document.getElementById('ConfirmToSubmit_OK').addEventListener('click', function()
    {
        document.querySelector("#confirmer").style = "display: none !important;";
        document.querySelector("#ConfirmToSubmit").style = "display: none !important;";

        const element = document.querySelector('.ui.center.aligned.vertical.segment > button:nth-of-type(2)');
        element.innerHTML = element.innerHTML.replace(new RegExp("若要提交代码，请先完成确认", 'gi'), '<i class="text">提交</i>' );
        document.querySelector('.ui.center.aligned.vertical.segment > button:nth-of-type(2)').disabled = "";
    });
}

function PowerfulLogin()
{
    document.querySelector('#login').insertAdjacentHTML('afterend', '<div class="ui fluid large submit button" id="LoginByCooie">使用曲奇登录</div>');
    document.querySelector('#login').insertAdjacentHTML('afterend', '<i class="text">或</i><div class="field"><div class="ui left icon input"></svg><i class="cookie icon"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16H9.01M12 11H12.01M7 10H7.01M15 16H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12 5.76142 13.7909 8 16 8C16 10.2091 18.2386 12 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></i><input name="Cookie" placeholder="曲奇（Cookie）" id="Cookie"></div></div>');
    document.getElementById('LoginByCooie').addEventListener('click', LoginByCooie, false);
    document.getElementById('login').addEventListener('click', function(){document.cookie = "LoginByCookie=false"}, false);
}


function FindCookie(name)
{
    return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + name + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
}


(function() {
    console.log("Auth Mode Loaded!");

    if(document.querySelector(".negative") && document.querySelector('.content>.header'))
    {
        if(localStorage.getItem("Jump") == 'true')
        {
            const element = document.querySelector('.content>.header');
            element.innerHTML = element.innerHTML.replace(new RegExp("您没有权限进行此操作", 'gi'), '您没有权限进行此操作，3s后自动返回' );
            element.innerHTML = element.innerHTML.replace(new RegExp("您已经登录了，请先注销", 'gi'), '您已经登录了，请先注销，3s后自动返回' );
            window.setTimeout("window.history.back();", 3000);
        }
    }
    else if(new RegExp(".*://.*/login*").test(window.location.href.toString()) && localStorage.getItem("Cookie-Login") == 'true')
    {
        PowerfulLogin();
    }

    //var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)LoginByCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(FindCookie("LoginByCookie") == "true" && !new RegExp(".*://.*/login*").test(window.location.href.toString()) && localStorage.getItem("Cookie-Tips"))
    {
        console.log("SYZOJ helper：曲奇时间!");

        if(document.querySelector('body > div:has(.ui.main.container)'))
        {
            document.querySelector('body > div:has(.ui.main.container)').insertAdjacentHTML('afterbegin', '<div class="ui main container"><div class="ui positive icon message"><i class="cookie icon"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16H9.01M12 11H12.01M7 10H7.01M15 16H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12 5.76142 13.7909 8 16 8C16 10.2091 18.2386 12 21 12Z" stroke="#1a531b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></i><div class="content"><div class="header" style="margin-bottom: 10px; ">Tips：您正在使用曲奇（Cookie）登录。</div></div><i class="cancel icon" style="color: #000000;margin-bottom: 20px;font-size: 1em;" id="CloseCookie"></i></div></div><br>');
        }
        else
        {
            document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="ui main container"><div class="ui positive icon message"><i class="cookie icon"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16H9.01M12 11H12.01M7 10H7.01M15 16H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12 5.76142 13.7909 8 16 8C16 10.2091 18.2386 12 21 12Z" stroke="#1a531b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></i><div class="content"><div class="header" style="margin-bottom: 10px; ">Tips：您正在使用曲奇（Cookie）登录。</div></div><i class="cancel icon" style="color: #000000;margin-bottom: 20px;font-size: 1em;" id="CloseCookie"></i></div></div><br>');
        }
        document.getElementById('CloseCookie').addEventListener('click', function(){document.cookie = "LoginByCookie=false"; location.reload() }, false);
        const element = document.querySelector('.ui.center.aligned.vertical.segment > button');
        if(element && localStorage.getItem("Cookie-Tips") == 'true')
        {
            element.disabled = true;
            element.insertAdjacentHTML('beforebegin', '<button id="ConfirmToSubmit" class="ui labeled icon button"> <i class="ui checkmark icon"></i><i class="text">确认</i></button>');
            document.getElementById('ConfirmToSubmit').addEventListener('click', ConfirmToSubmit, false);
            element.innerHTML = element.innerHTML.replace(new RegExp("提交", 'gi'), '<i class="text">若要提交代码，请先完成确认</i>' );
        }
    }
})();
