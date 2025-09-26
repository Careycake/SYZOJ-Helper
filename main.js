// ==UserScript==
// @name         SYZOJ Helper - 主模块
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

class Item
{
    constructor(name, id, describe)
    {
        this.name = name;
        this.id = id;
        this.describe = describe;
    }
};

let CheckBox = [
    new Item("背景图片", "Image", "设置网站的背景图片，可自定义图片链接。"),
    new Item("自动跳转", "Jump", "当操作失败时，自动跳转回上一页。"),
    new Item("使用 Cookie 登录", "Cookie-Login", "提供使用 Cookie 进行登录的选项。"),
    new Item("Cookie 登录提示", "Cookie-Tips", "当使用 Cookie 登录时，显示提示信息提醒，避免误操作，<strong> 强烈建议开启 </strong>。"),
    new Item("强制显示题目标签", "ShowProblemTag", "强制显示题库中题目的标签信息。"),
    new Item("白板工具", "WhiteBoard", "在边栏上显示白板工具按钮，方便绘图和打草稿，推荐使用 <a href=\"http://www.nfls.com.cn:20035/article/5212\">excalidraw</a>，你可以在下方自定义白板地址。"),
    new Item("在主页优化排名", "ShowRanking", "在主页优化排名区域的展示效果，调整布局与视觉样式，提升用户排名、分数等信息的可读性，优化排名模块的浏览体验。"),
    new Item("在主页显示一言", "ShowHitokoto", "在主页左侧区域显示随机一言（Hitokoto）内容，你可以从这里获得做题的动力。"),
    new Item("在主页显示用户查找", "ShowUserFinding", "在主页左侧添加用户搜索功能模块，支持通过「用户 ID」或「用户名」进行搜索；帮助快速定位用户。"
    )
];

let Roller = 
[
    new Item("基本设置", "Basic-Item", "#Image"), // 这里的 describe 是滑动到的元素名称
    new Item("针对 NFLSOJ 的设置", "NFLSOJ-Item", "#ShowRanking"),
    new Item("边栏文字内容", "Sider-Item", "#SiderText"),
    new Item("重置所有数据", "Reset-Item", "#ResetAll"),
];

var WhiteBoard, DefaultWhiteBoard = "https://excalidraw.com/";

//https://www.WhiteBoard.com/

function WhiteBoardWindows()
{
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="ui dimmer modals page transition visible active" style="display: flex !important;" id="WhiteBoardWin"><div class="ui modal transition visible active scrolling" id="__modal" style="width: 80%; height: 84%; display: block !important;"><div class="header"><div> 白板 </div></div><div class="content" style="height: 88%"><iframe name="__iframe" id="__iframe" width="100%" height="100%" style="border: medium none" src="' + WhiteBoard + '">正在加载中，请稍后...</iframe></div><div class="actions"><button class="ui cancel button primary" id="CloseWhiteBoardWin"> 关闭 </button></div></div></div>');
    document.getElementById('CloseWhiteBoardWin').addEventListener('click', function(){document.getElementById('WhiteBoardWin').remove();}, false);
}

var list, DefaultList = ["首页","题库","课程 &amp; 比赛","练习","评测","排名","讨论","帮助","返回比赛","修改资料","上传视频","后台管理","重启服务","注销"];

function handleEvent(i) 
{
    return function(){document.querySelector(Roller[i].describe).scrollIntoView();};
}

function SettingWindows()
{
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="ui dimmer modals page transition visible active" style="display: flex !important;" id="setting"><div style="width: 80%; height: 84%; display: block !important;" id="" class="ui modal transition visible active scrolling"><div class="header" id="forList">插件设置</div><div class="content" style="overflow:auto; height: 88%"><div class="ui main container"><div class="padding"><div class="inline field"><div class="ui grid"><div class="three wide column"><div style="position: fixed;"><div class="ui vertical fluid tabular menu" style="height: 100%; " id="ItemRoller"></div></div></div><div class="thirteen wide column" id="ChangeFunction"><label class="ui header">开启或关闭功能</label><br><br><br></div></div></div><div style="text-align: center; margin-top: 30px; "></div></div></div></div><div class="actions"><button id="SubmitSetting" type="submit" class="ui blue labeled icon button"><i class="ui  icon edit"></i>确定（需重新加载页面）</button><button class="ui labeled icon button" id="CloseSetting"><i class="ui icon angle left"></i>不保存</button></div></div></div>');

    for(var i = 0; i < CheckBox.length; i++)
    {
        ChangeFunction.insertAdjacentHTML('beforeend', '<div class="ui toggle checkbox" style="margin-right: 20px; "><input type="checkbox" id="' + CheckBox[i].id + '"><label>' + CheckBox[i].name + '</label></div><br><div class="ui toggle text" style="margin-right: 20px; ">' + CheckBox[i].describe + '</div><br>');
        if(localStorage.getItem(CheckBox[i].id) == 'true')
        {
            document.getElementById(CheckBox[i].id).checked = true;
        }
        if(CheckBox[i].id == "Image")
        {
            ChangeFunction.insertAdjacentHTML('beforeend', '<div class="ui toggle text" style="margin-right: 20px; "><h4 class="ui header">自定义背景图片</label><br><br><textarea style="width: 1066px; height: 220px; resize: none;" rows="15" id="ImageDetail" name="content" class="markdown-edit"></textarea><br><br>');
        }
        if(CheckBox[i].id == "WhiteBoard")
        {
            ChangeFunction.insertAdjacentHTML('beforeend', '<div style="width: 300px" class="ui input"><input id="WhiteBoardDetail" placeholder="白板地址" type="text" value="' + WhiteBoard + '"></div><br><br>');
        }
    }

    const ItemRoller = document.getElementById("ItemRoller");
    for(var i = 0; i < Roller.length; i++)
    {
        ItemRoller.insertAdjacentHTML('beforeend', '<a class="item" id="' + Roller[i].id + '">' + Roller[i].name + '</a>');
        document.getElementById(Roller[i].id).addEventListener('click', handleEvent(i), false);
    }

    ChangeFunction.insertAdjacentHTML('beforeend', '<br><br><div class="ui toggle text" style="margin-right: 20px; " id="SiderText"><label class="ui header">边栏文字内容</label><br><br><div class="ui toggle text" style="margin-right: 20px; ">Tips: 由于 SYZOJ 边栏文字无标签，你需要在这里手动填写标签文字内容</div><br><textarea style="width: 1066px; height: 220px; resize: none;" rows="15" id="ListDetail" name="content" class="markdown-edit"></textarea>');
    ChangeFunction.insertAdjacentHTML('beforeend', '<div class="inline field" id="ResetAll"><label class="ui header">重置所有数据</label><br><br><div class="ui green cancel inverted button" id="DeteteAll"><i class="remove icon"></i>重置所有数据</div></div>');
    document.getElementById("ImageDetail").innerHTML = image.join("\n");
    document.getElementById("ListDetail").innerHTML = list.join("\n");
    document.getElementById('CloseSetting').addEventListener('click', function(){document.getElementById('setting').remove();}, false);
    document.getElementById('DeteteAll').addEventListener('click', function(){localStorage.removeItem("FirstUses");window.location.reload();}, false);
    document.getElementById('SubmitSetting').addEventListener('click',
    function()
    {
        for(var i = 0; i < CheckBox.length; i++)
        {
            Onclick(CheckBox[i].id)
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

    console.log("Main Mode Loaded!");

    image = JSON.parse(localStorage.getItem("ImageDetail"));
    list = JSON.parse(localStorage.getItem("ListDetail"));

    Hitokoto();
    MainPageFun();

    if(localStorage.getItem("FirstUses") == null)
    {
        console.log("Welcome to use SYZOJ Helper (For the first time)!");
        for(var i = 0; i < CheckBox.length; i++)
        {
            Onclick(CheckBox[i].id, true);
        }
        Onclick("FirstUses", true);
        localStorage.setItem('ImageDetail', JSON.stringify(DefaultImage));
        localStorage.setItem('ListDetail', JSON.stringify(DefaultList));
    }

    WhiteBoard = localStorage.getItem("WhiteBoardDetail");

    var RightMenu = document.querySelector('.ui.fixed.borderless.menu .right.menu'), Menu = document.querySelector('.ui.fixed.borderless.menu');

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
    }
})();
