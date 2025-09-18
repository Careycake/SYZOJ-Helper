// ==UserScript==
// @name         SYZOJ Helper
// @version      0.3
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
// ==/UserScript==

var image, DefaultImage =
[
    "https://www.helloimg.com/i/2025/03/23/67dfa10f0406f.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa11ace69d.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa131ba844.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13186e6f.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13692d9d.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13771a7f.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13789fd0.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13c1f0a4.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa13de0f83.jpg",
    "https://www.helloimg.com/i/2025/03/23/67dfa122833a2.jpg",
    "https://www.helloimg.com/i/2025/07/06/686a6b34cc00d.jpeg",
    "https://www.helloimg.com/i/2025/07/07/686b62f1a6d57.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62f2d1b48.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62f2ee62e.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62f3c73f3.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62f34176c.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62f600653.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62fdd0eaa.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62fe14474.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b62ff14ffe.jpg",
    "https://www.helloimg.com/i/2025/07/07/686b6300206a5.jpg",
];

function Move(str)
{
    const element = document.querySelector('.ui.container');
    if(element == undefined)
    {
        return;
    }
    element.innerHTML = element.innerHTML.replace(new RegExp(str, 'gi'), '<i class="text">$&</i>' );
}

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

function show_problem_tag(i)
{
    jQuery('#statisticsNum_' + i).show()
    jQuery('#statisticsPlaceholder_' + i).hide()
    jQuery('#show_tag_controled_' + i).show()
}

function FindCookie(name)
{
    return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + name + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
}

function ChangeBackground()
{
    var i = 1;
    while(document.querySelector("#_td" + i.toString()))
    {
        var element = document.querySelector("#_td" + i.toString());
        var newStyle = element.style.background.replaceAll("rgb(255, 255, 255)", "rgba(255, 255, 255, 0)").replace("rgb(255, 255, 255)", "rgba(255, 255, 255, 0)");
        element.style.background = newStyle;
        if(localStorage.getItem("ShowProblemTag") == "true")
        {
            document.getElementById("problem_cb_" + i.toString()).checked = true;
            show_problem_tag(i);
        }
        i++;
    }
}

function Onclick(id, Notcheckclick = false)
{
    console.log("check ID'" + id + "'");
    if (Notcheckclick || document.getElementById(id).checked == true)
    {
        console.log("checked");
        localStorage.setItem(id, true);
    }
    else
    {
        console.log("not checked");
        localStorage.setItem(id, false);
    }
}

function genSearchBox(use, id, holder, api) 
{
    return [`
    <h4 class="ui top attached block header"><i class="search icon"></i><div class="content">${use}</div></h4>
    <div class="ui bottom attached segment" style="z-index: 50;">
      <div class="ui search focus" id="${id}" style="width: 100%; ">
        <div class="ui left icon input" style="width: 100%; ">
          <input class="prompt" style="width: 100%;" type="text" placeholder="${holder}">
          <i class="search icon"></i>
        </div>
        <div class="results" style="width: 100%; "></div>
    </div></div>`, `
    $(function () {
      $('#${id}').search({
        debug: false,
        apiSettings: {url: '/api/v2/search/${api}/{query}', cache: false},
        fields: {title: 'name'}
      });
    });
    `];
}

async function Hitokoto() 
{
    let h = await $.get("https://v1.hitokoto.cn/?c=a");
    return `<a style='color:black' href=https://hitokoto.cn/?uuid=${h.uuid} target='_blank'>${h.hitokoto}</a><div style="margin-top: 14px;text-align: right;font-size: .95em;color: #999;">${"\u2014\u2014"}${h.from}</div>`;
}

const domain = window.location.pathname;
async function MainPageFun()
{
    if (domain == "/") 
    {
        let LeftPlace = $(".right.floated.five.wide.column")[0];
        let SearchUser = genSearchBox("查找用户", "user", "ID / 用户名 …", "users");
        if(localStorage.getItem("ShowUserFinding") == "true")
        {
            LeftPlace.innerHTML = SearchUser[0] + LeftPlace.innerHTML;
            script = document.createElement("script");
            script.innerHTML = SearchUser[1];
            LeftPlace.appendChild(script);
        }

        if(localStorage.getItem("ShowHitokoto") == "false")
        {
            return;
        }
        try {
            LeftPlace.innerHTML = `
            <h4 class="ui block top attached header"><i aria-hidden="true" class="ui quote left icon"></i><div class="content">Hitokoto (一言)
            <i id="hit" title="Refresh" style="" class="redo icon button"></i></div></h4>
            <div class="ui bottom attached center aligned segment">
            <div id="hitword"></div>
            <div id="hithold" class="ui placeholder">
                <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                </div>
            </div>
            </div>
            <style>
            #hit {
                opacity: .2;position: absolute;right: 10px;height: 19px;display: inline-flex;align-items: center;
            }
            #hit:hover {
                opacity: .4;
            }
            </style>` + LeftPlace.innerHTML;
            let getyy = async () => {
                $("#hitword").hide();
                $("#hithold").show();
                $("#hitword").html(await Hitokoto());
                $("#hitword").show();
                $("#hithold").hide()
            };
            getyy();
            $("#hit").click(getyy);
        } catch {
            console.error("SYZOJ Helper：一言加载失败，网络错误");
        }
    }
}

var Name = ["背景图片", "自动跳转", "使用 Cookie 登录", "Cookie 登录提示", "强制显示题目标签", "白板工具", "在主页优化排名", "在主页显示一言", "在主页显示用户查找"];
var Id = ["Image", "Jump", "Cookie-Login", "Cookie-Tips", "ShowProblemTag", "WhiteBoard", "ShowRanking", "ShowHitokoto", "ShowUserFinding"];
var Discribe = 
[
    "设置网站的背景图片，可自定义图片链接。", 
    "当操作失败时，自动跳转回上一页。", 
    "提供使用 Cookie 进行登录的选项。", 
    "当使用 Cookie 登录时，显示提示信息提醒，避免误操作，<strong> 强烈建议开启 <strong>。", "强制显示题库中题目的标签信息。", 
    "在边栏上显示白板工具按钮，方便绘图和打草稿，推荐使用 <a href=\"http://www.nfls.com.cn:20035/article/5212\">excalidraw</a>，你可以在下方自定义白板地址。", 
    "在主页优化排名区域的展示效果，调整布局与视觉样式，提升用户排名、分数等信息的可读性，优化排名模块的浏览体验。",
    "在主页左侧区域显示随机一言（Hitokoto）内容，你可以从这里获得做题的动力。",
    "在主页左侧添加用户搜索功能模块，支持通过「用户 ID」或「用户名」进行搜索；帮助快速定位用户。"
];

var WhiteBoard, DefaultWhiteBoard = "https://excalidraw.com/";

//https://www.WhiteBoard.com/

function WhiteBoardWindows()
{
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="ui dimmer modals page transition visible active" style="display: flex !important;" id="WhiteBoardWin"><div class="ui modal transition visible active scrolling" id="__modal" style="width: 80%; height: 84%; display: block !important;"><div class="header"><div> 白板 </div></div><div class="content" style="height: 88%"><iframe name="__iframe" id="__iframe" width="100%" height="100%" style="border: medium none" src="' + WhiteBoard + '">正在加载中，请稍后...</iframe></div><div class="actions"><button class="ui cancel button primary" id="CloseWhiteBoardWin"> 关闭 </button></div></div></div>');
    document.getElementById('CloseWhiteBoardWin').addEventListener('click', function(){document.getElementById('WhiteBoardWin').remove();}, false);
}

var list, DefaultList = ["首页","题库","课程 &amp; 比赛","练习","评测","排名","讨论","帮助","返回比赛","修改资料","上传视频","后台管理","重启服务","注销"];

function SettingWindows()
{
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="ui dimmer modals page transition visible active" style="display: flex !important;" id="setting"><div style="width: 80%; height: 84%; display: block !important;" id="" class="ui modal transition visible active scrolling"><div class="header" id="forList">插件设置</div><div class="content" style="overflow:auto; height: 88%"><div class="ui main container"><div class="padding"><div class="inline field"><label class="ui header">开启或关闭功能</label><br><br><br><div id="ChangeFunction"></div><div class="inline field"><label class="ui header">重置所有数据</label><br><br><div class="ui green cancel inverted button" id="DeteteAll"><i class="remove icon"></i>重置所有数据</div></div><div style="text-align: center; margin-top: 30px; "></div></div></div></div></div><div class="actions"><button id="SubmitSetting" type="submit" class="ui blue labeled icon button"><i class="ui  icon edit"></i>确定（需重新加载页面）</button><button class="ui labeled icon button" id="CloseSetting"><i class="ui icon angle left"></i>不保存</button></div></div></div>');

    const ChangeFunction = document.getElementById("ChangeFunction");
    for(var i = 0; i < Name.length; i++)
    {
        ChangeFunction.insertAdjacentHTML('beforeend', '<div class="ui toggle checkbox" style="margin-right: 20px; "><input type="checkbox" id="' + Id[i] + '"><label>' + Name[i] + '</label></div><br><div class="ui toggle text" style="margin-right: 20px; ">' + Discribe[i] + '</div><br>');
        if(localStorage.getItem(Id[i]) == 'true')
        {
            document.getElementById(Id[i]).checked = true;
        }
        if(Id[i] == "WhiteBoard")
        {
            ChangeFunction.insertAdjacentHTML('beforeend', '<div style="width: 300px" class="ui input"><input id="WhiteBoardDetail" placeholder="白板地址" type="text" value="' + WhiteBoard + '"></div><br><br>');
        }
    }

    ChangeFunction.insertAdjacentHTML('beforeend', '<br><br><div class="ui toggle text" style="margin-right: 20px; "><label class="ui header">自定义背景图片</label><br><br><br><textarea style="width: 1066px; height: 220px; resize: none;" rows="15" id="ImageDetail" name="content" class="markdown-edit"></textarea>');

    ChangeFunction.insertAdjacentHTML('beforeend', '<br><br><div class="ui toggle text" style="margin-right: 20px; "><label class="ui header">边栏文字内容</label><br><br><div class="ui toggle text" style="margin-right: 20px; ">Tips: 由于 SYZOJ 边栏文字无标签，你需要在这里手动填写标签文字内容</div><br><textarea style="width: 1066px; height: 220px; resize: none;" rows="15" id="ListDetail" name="content" class="markdown-edit"></textarea>');
    document.getElementById("ImageDetail").innerHTML = image.join("\n");
    document.getElementById("ListDetail").innerHTML = list.join("\n");
    document.getElementById('CloseSetting').addEventListener('click', function(){document.getElementById('setting').remove();}, false);
    document.getElementById('DeteteAll').addEventListener('click', function(){localStorage.removeItem("FirstUses");window.location.reload();}, false);
    document.getElementById('SubmitSetting').addEventListener('click',
    function()
    {
        for(var i = 0; i < Name.length; i++)
        {
            Onclick(Id[i])
        };
        var NewImage = document.getElementById("ImageDetail").value.split("\n");
        var NewList = document.getElementById("ListDetail").value.replace("&", "&amp;").split("\n");
        var NewWhiteBoard = document.getElementById("WhiteBoardDetail").value;

        console.log("ImageDetail:");
        console.log(NewImage);
        console.log("ListDetail:");
        console.log(NewList);
        console.log("WhiteBoardDetail:");
        console.log(NewWhiteBoard);
        localStorage.setItem('ImageDetail', JSON.stringify(NewImage));
        localStorage.setItem('ListDetail', JSON.stringify(NewList));
        localStorage.setItem('WhiteBoardDetail', NewWhiteBoard);
        window.location.reload();
    }, false);
}

(function() {
    'use strict'
    if(document.location.href.toString() == "https://cdn.plyr.io/3.7.8/plyr.svg")
    {
        console.log("Hi!");
        window.location.href = "https://cdn.bootcdn.net/ajax/libs/plyr/3.7.8/plyr.svg";
    }

    Hitokoto();
    MainPageFun();

    if(localStorage.getItem("FirstUses") == null)
    {
        console.log("Welcome to use SYZOJ Helper (For the first time)!");
        for(var i = 0; i < Name.length; i++)
        {
            Onclick(Id[i], true);
        }
        Onclick("FirstUses", true);
        localStorage.setItem('ImageDetail', JSON.stringify(DefaultImage));
        localStorage.setItem('ListDetail', JSON.stringify(DefaultList));
    }

    WhiteBoard = localStorage.getItem("WhiteBoardDetail");
    image = JSON.parse(localStorage.getItem("ImageDetail"));
    list = JSON.parse(localStorage.getItem("ListDetail"));
	window.setTimeout(ChangeBackground, 700);

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

    for(var i = 0; i < list.length; i++)
    {
        Move(list[i]);
    }

    var RightMenu = document.querySelector('.ui.fixed.borderless.menu .right.menu'), Menu = document.querySelector('.ui.fixed.borderless.menu');

    var css = "";
    if(Menu != undefined)
    {
        if(localStorage.getItem("WhiteBoard") == 'true')
        {
            Menu.insertAdjacentHTML('beforeend', '<a class="item"  id="WhiteBoard_er"><i class="pencil icon"></i> <i class="text">白板</i></a>');
            document.getElementById('WhiteBoard_er').addEventListener('click', WhiteBoardWindows, false);
        }

        Menu.insertAdjacentHTML('beforeend', '<a class="item"  id="Setting"><i class="setting icon"></i> <i class="text">插件设置</i></a>');
        document.getElementById('Setting').addEventListener('click', SettingWindows, false);
    }

    if(RightMenu != undefined)
    {
        RightMenu.parentElement.insertAdjacentElement("afterend", RightMenu);
        RightMenu.parentElement.insertAdjacentElement("afterend", RightMenu);
        RightMenu.className = "ui borderless menu right menu";
        RightMenu.id = "RightMenu";
        if(document.querySelector('.right.menu .menu') != undefined)
        {
            document.querySelector('.right.menu .menu').id = "RightMenu_Dropped";
        }

        css += [
            "body{",
            "    margin-top: 0px !important;",
            "    height: 100% !important;",
            "    margin-left: 150px !important;",
            "    width: calc(100% - 150px) !important;",
            "}",
        ].join("\n");
    }

    if(localStorage.getItem("Image") == 'true')
    {
        const a = Math.floor(Math.random() * image.length);
        css += [
            "body{",
            "    background-image: url('" + image[a] + "');",
            "    background-repeat: no-repeat;",
            "    background-size: cover;",
            "    background-position: center;",
            "    background-attachment: fixed;",
            "}",
            "h1:first-child:not(#content h1),.padding > h1{",
            "    color: white !important;",
            "}",
        ].join("\n");
    }

    if(localStorage.getItem("Opacity") == "false")
    {
        return;
    }

    if(new RegExp(".*://.*/help*").test(window.location.href.toString()))
    {
        document.querySelector('.ui.main.container > .padding > div:first-of-type').className = "attached";
        document.querySelector('.ui.main.container > .padding > div:first-of-type').style = "font-content;padding: 10px 10px 10px 10px;";
    }

    if(document.querySelector("div.ui.fixed.borderless.menu") != undefined)
    {
        document.querySelector("div.ui.fixed.borderless.menu").style = "display: flex !important;flex-direction: column;align-items: center;";
        // document.querySelector("div.ui.fixed.borderless.menu").insertAdjacentHTML('afterbegin', '<a id="Unshow"><i class="long arrow alternate left icon"></i> <i class="text">隐藏</i></a>');
        document.querySelector("div.ui.container").removeAttribute("class");
        document.querySelector("body").removeAttribute("style");
    }
    if(new RegExp(".*://.*/(admin*|videos*)").test(window.location.href.toString()))
    {
        css += [
            ".ui.main.container > .ui.grid{",
            "    transition-duration: 0.4s !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    border-radius: 20px ;",
            "    background: rgba(255, 255, 255, .8) !important; ",
            "}",
            ".ui.main.container > .ui.grid:hover{",
            "    transition-duration: 0.4s !important;",
            "    background: rgba(255, 255, 255, .9) !important;",
            "}",
            ".ui.secondary.menu,.ui.tab.basic.segment.active{",
            "    transition-duration: 0.4s !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    border-radius: 20px ;",
            "    background: rgba(255, 255, 255, .8) !important;",
            "}",
            ".ui.secondary.menu:hover,.ui.tab.basic.segment.active:hover{",
            "    background: rgba(255, 255, 255, .9) !important;",
            "}"
        ].join("\n");
    }

    // if(localStorage.getItem("DisableSmart") == "true")
    {
        css += [
            "#RightMenu {",
            "    width: 150px;",
            "    left: calc(100% - 200px);",
            "    position: relative;",
            "    border-radius: 20px !important;",
            "}",
            "#Unshow {",
            "    display: block !important;",
            "}",
            "#Unshow > .long.arrow.alternate.left.icon{",
            "    width: auto;",
            "    display: block !important;",
            "}",
            "#ImageDetail, #ListDetail {",
            "    margin: 0;",
            "    -webkit-appearance: none;",
            "    tap-highlight-color: rgba(255,255,255,0);",
            "    padding: .78571429em 1em;",
            "    background: #fff;",
            "    border: 1px solid rgba(34, 36, 38, .15);",
            "    outline: 0;",
            "    color: rgba(0, 0, 0, .87);",
            "    border-radius: .28571429rem;",
            "    -webkit-box-shadow: 0 0 0 0 transparent inset;",
            "    box-shadow: 0 0 0 0 transparent inset;",
            "    -webkit-transition: color .1s ease, border-color .1s ease;",
            "    transition: color .1s ease, border-color .1s ease;",
            "    font-size: 1em;",
            "    line-height: 1.2857;",
            "    resize: vertical;",
            "}",
            "#ImageDetail:focus, #ListDetail:focus {",
            "    color: rgba(0, 0, 0, .95);",
            "    border-color: #85b7d9;",
            "    border-radius: .28571429rem;",
            "    background: #fff;",
            "    -webkit-box-shadow: 0 0 0 0 rgba(34, 36, 38, .35) inset;",
            "    box-shadow: 0 0 0 0 rgba(34, 36, 38, .35) inset;",
            "    -webkit-appearance: none;",
            "}",
            ".cookie{",
            "    display: flex !important;",
            "    flex-wrap: wrap !important;",
            "    justify-content: center;",
            "    align-content: center !important;",
            "}",
            "/*边栏*/",
            ".ui.fixed.borderless.menu{",
            "    margin-top: 0.5% !important;",
            "    transform: scale(0.95, 0.95);",
            "    background: none;",
            "    width: auto !important;",
            "    height: auto !important;",
            "    position: fixed !important;",
            "    float: left !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    border-top-left-radius: 50px !important;",
            "    border-top-right-radius: 50px !important;",
            "    border-bottom-right-radius: 20px !important;",
            "    border-bottom-left-radius: 20px !important;",
            "    box-shadow: 0 0 5px #333;",
            "}",
            "#RightMenu, #RightMenu_Dropped{",
            "    display: flex;",
            "    background: none;",
            "    align-content: center;",
            "    justify-content: center;",
            "    flex-direction: column;",
            "    flex-wrap: wrap;",
            "    align-items: center;",
            "    backdrop-filter: blur(10px) !important;",
            "    z-index: 10;",
            "    position: fixed;",
            "    box-shadow: 0 0 5px #333;",
            "}",
            "div#RightMenu_Dropped:before {",
            "    content: \"3t2\";",
            "}",
            ".ui.fixed.borderless.menu div:not(#modal-restart){",
            "    display: flex;",
            "    background-attachment: revert;",
            "    align-content: center;",
            "    justify-content: center;",
            "    flex-direction: column;",
            "    flex-wrap: wrap;",
            "    align-items: center;",
            "    backdrop-filter: blur(10px) !important;",
            "    width: auto;",
            "}",
            // ".right.menu{",
            // "    position: fixed;",
            // "    right:100px;",
            // "    top: 0px!important;",
            // "    margin-top: 0px;",
            // "}",
            "/*边栏上的按钮*/",
            ".ui.fixed.borderless.menu > div > a:first-of-type{",
            "    width: 100px !important;",
            "    height: 100px !important;",
            "    border-radius: 50px !important;",
            "    background-image: url(https://cdn.luogu.com.cn/upload/image_hosting/mj3q9q5d.png) !important;",
            "    background-repeat: no-repeat;",
            "    background-size: cover;",
            "    background-position: center;",
            "    background-attachment: revert;",
            "}",
            "#back_to_contest, #Setting, .ui.fixed.borderless.menu a.item, #RightMenu>div>div a{",
            "    border-radius: 20px !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    transition-duration: 0.4s !important;",
            "    display: flex !important;",
            "    align-content: stretch;",
            "    flex-wrap: wrap;",
            "    flex-direction: column;",
            "    align-items: center;",
            "    justify-content: center;",
            "    background: none;",
            "}",
            ".ui.fixed.borderless.menu a.item:hover, #RightMenu>div>div a:hover{",
            "    box-shadow:1px 1px 10px #00000073 !important;",
            "    background-color: white !important;",
            "}",
            ".text{",
            "    font-style:normal;",
            "}",
            ".ui.fixed.borderless.menu .icon, #RightMenu .icon{",
            "    color: #61eee9f5 !important;",
            "    display: flex !important;",
            "    justify-content: center;",
            "    align-items: center;",
            "    line-height: 1.5em;",
            "    font-size: 17px;",
            "    width: 100%;",
            "    margin: 0 !important;",
            "    transition: all 0.2s ease;",
            "}",
            ".ui.fixed.borderless.menu .text, #RightMenu .text{",
            "    color: #0e0063 !important;",
            "    display: flex !important;",
            "    justify-content: center;",
            "    align-items: center;",
            "    position: relative !important;",
            "    top: 10px;",
            "    opacity: 0;",
            "    margin-top: -0.4em;",
            "    display: block;",
            "    transition: all 0.8s ease;",
            "}",
            ".ui.fixed.borderless.menu  a:hover > .icon, #RightMenu>div>div a:hover > .icon{",
            "    color: #0e0063 !important;",
            "    line-height: 1.5em;",
            "    font-size: 17px;",
            "}",
            ".ui.fixed.borderless.menu  a:hover > .text, #RightMenu>div>div a:hover > .text{",
            "    color: #0e0063 !important;",
            "    opacity: 1;",
            "    margin-top: 0.4em;",
            "}",
            "/*回复*/",
            ".comment{",
            "    padding: 7px 7px 7px 7px !important;",
            "}",
            ".comments>.header{",
            "    padding: 7px 7px 7px 7px !important;",
            "}",
            "/*各种块*/",
            "#vueAppFuckSafari, #vueAppFuckSafari>table{",
            "    position: relative;",
            "    z-index: 3 !important; ",
            "}",
            ".ui.mini.form,.item{",
            "    position: relative;",
            "    z-index: 12 !important; ",
            "}",
            ".form:not(.ui.main.container > .ui.grid .form),.comments:not(.comments.icon),.attached,.table:not(.attached .table, .ui.main.container > .ui.grid .table), #score-distribution-chart, #score-distribution-chart-pre, #score-distribution-chart-suf, canvas{",
            "    transition-duration: 0.4s !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    border-radius: 20px ;",
            "    background: rgba(255, 255, 255, .8) !important; ",
            "}",
            ".form:hover:not(.ui.main.container > .ui.grid:hover .form),.comments:hover:not(.comments.icon:hover),.attached:hover,.table:hover:not(.attached:hover .table, .ui.main.container > .ui.grid:hover .table), #score-distribution-chart:hover, #score-distribution-chart-pre:hover, #score-distribution-chart-suf:hover, canvas:hover{",
            "    transition-duration: 0.4s !important;",
            "    background: rgba(255, 255, 255, .9) !important;",
            "}",
            ".attached.header{",
            "    background: rgba(255, 255, 255, .85) !important; ",
            "}",
            ".field,.fields{",
            "    padding: 7px 7px 7px 7px !important;;",
            "}",
            "label{",
            "    padding-top: 15px; !important;",
            "    padding-bottom: 15px; !important;",
            "}",
            "div.inline.fields > label:first-of-type{",
            "    padding-left: 10px; !important;",
            "}",
            ".fields:not(.form .fields){",
            "    transition-duration: 0.4s !important;",
            "    backdrop-filter: blur(10px) !important;",
            "    border-radius: 5px;",
            "    background: rgba(255, 255, 255, .8) !important; ",
            "}",
            ".fields:hover:not(.form:hover .fields){",
            "    transition-duration: 0.4s !important;",
            "    background: rgba(255, 255, 255, .9) !important;",
            "    box-shadow: 5px 5px 5px #000;",
            "}",
            "::-webkit-scrollbar-thumb {",
            "    background-color: rgba(137, 81, 234, .99);",
            "}",
            "::-webkit-scrollbar-thumb:hover {",
            "    background-color: #5e72e4;",
            "}",
            ".ui[class*=\"very basic\"].table:not(.sortable):not(.striped) td:first-child, .ui[class*=\"very basic\"].table:not(.sortable):not(.striped) th:first-child {",
            "    padding-left: 10px !important;",
            "}",
            ".ui[class*=\"very basic\"].table:not(.sortable):not(.striped) thead tr:first-child th {",
            "    padding-top: 10px !important;",
            "}",
            "::-webkit-scrollbar {",
            "    width: 5px;",
            "    height: 10px;",
            "    background-color: rgba(0, 0, 0, .12);",
            "}",
        ].join("\n");
    }

    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0)
    {
        heads[0].appendChild(node);
        heads[0].insertAdjacentHTML('beforeend', '<link rel="apple-touch-icon" sizes="180x180" href="http://www.nfls.com.cn:10611/apple-touch-icon-180x180.png"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-32x32.png" sizes="32x32"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/android-chrome-192x192.png" sizes="192x192"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-96x96.png" sizes="96x96"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-16x16.png" sizes="16x16"></link>');
    }
    else
    {
        document.documentElement.appendChild(node);
        document.documentElement.insertAdjacentHTML('beforeend', '<link rel="apple-touch-icon" sizes="180x180" href="http://www.nfls.com.cn:10611/apple-touch-icon-180x180.png"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-32x32.png" sizes="32x32"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/android-chrome-192x192.png" sizes="192x192"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-96x96.png" sizes="96x96"> \
        <link rel="icon" type="image/png" href="http://www.nfls.com.cn:10611/favicon-16x16.png" sizes="16x16"></link>');
    }
})();
