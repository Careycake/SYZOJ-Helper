// ==UserScript==
// @name         SYZOJ Helper - 样式模块
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
// @run-at       document-begin
// ==/UserScript==

function MotifyTag(str)
{
    const element = document.querySelector('.ui.container');
    if(element == undefined)
    {
        return;
    }
    element.innerHTML = element.innerHTML.replace(new RegExp(str, 'gi'), '<i class="text">$&</i>' );
}

function show_problem_tag(i)
{
    jQuery('#statisticsNum_' + i).show()
    jQuery('#statisticsPlaceholder_' + i).hide()
    jQuery('#show_tag_controled_' + i).show()
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

(function() 
{
    image = JSON.parse(localStorage.getItem("ImageDetail"));
    list = JSON.parse(localStorage.getItem("ListDetail"));
	window.setTimeout(ChangeBackground, 700);

    console.log("Sytle Mode Loaded!");

    for(var i = 0; i < list.length; i++)
    {
        MotifyTag(list[i]);
    }

    var css = "";

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

    if(document.querySelector('.ui.fixed.borderless.menu .right.menu') != undefined)
    {
        css += [
            "body{",
            "    margin-top: 0px !important;",
            "    height: 100% !important;",
            "    margin-left: 150px !important;",
            "    width: calc(100% - 150px) !important;",
            "}",
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
