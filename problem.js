// ==UserScript==
// @name         SYZOJ Helper - 题目模块
// @version      0.3 Preview
// @author       Carey_chen
// @description  这是一个针对常见的 SYZOJ 的美化工具，并为其增加了一些功能，部分灵感与实现 Smart-Lougu。
// @match        http://www.nfls.com.cn:20035/*
// @match        http://192.168.188.77/*
// @run-at       document-begin
// @require      https://cdn.bootcss.com/blueimp-md5/2.12.0/js/md5.min.js
// ==/UserScript==

let clickCountForCode = 0;
const domain = window.location.pathname;

function formatCode() 
{
    clickCountForCode ^= 1;
    let value = $(".existing.segment")[0];
    value.lastChild.firstChild.innerHTML = clickCountForCode ? formattedCode : unformattedCode; // eslint-disable-line no-undef
    value.children[0].children[1].textContent = clickCountForCode ? "显示原始代码" : "格式化代码";
}
// 实现 SetClipboard 函数，模拟 Tampermonkey 内置功能，By 豆包
function SetClipboard(text, _type) 
{
    // 优先使用现代 Clipboard API
    if (navigator.clipboard) 
    {
        return navigator.clipboard.writeText(text).catch(err => 
        {
            console.error('Clipboard API 失败，尝试备用方法:', err);
            fallbackCopyText(text);
        });
    } 
    else 
    {
        // 兼容旧浏览器的备用方法
        fallbackCopyText(text);
    }

    // 传统复制方法（通过创建临时元素）
    function fallbackCopyText(text) 
    {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        // 避免在页面中显示元素
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        // 选中并复制
        textarea.select();
        document.execCommand('copy');
        // 清理临时元素
        document.body.removeChild(textarea);
    }
}

function addCopy(button, code) 
{
    button.addEventListener("click", function() {
    {
        SetClipboard(code.textContent.replaceAll("\n", "\r\n"), "Copy"); // eslint-disable-line no-undef
        button.textContent = "复制成功!";
        setTimeout(function() {button.textContent = "复制";}, 1000);
    }})
}

(function() 
{
    console.log("Problem Mode Loaded!");

    $('.ban_copy').removeClass('ban_copy');

    if (!(/login/.test(domain))) 
    {
        if (/\/submission\/\d+/.test(domain) && document.body.innerText.includes("格式化代码") || document.body.innerText.includes("显示原始代码")) 
        {
            let value = $(".existing.segment")[0];
            value.firstChild.style.borderRadius = "0 .28571429rem 0 0";
            value.firstChild.style.position = "unset";
            let position = value.innerHTML.search(/<\/a>/) + 4;
            value.innerHTML = `<span style="position:absolute;top:0px;right:-4px;"><div class="ui button" style="position:relative;left:4px;border-right:1px solid rgba(0,0,0,0.6);border-radius:0 0 0 .28571429rem;">复制</div>${value.innerHTML.slice(0, position)}</span>${value.innerHTML.slice(position)}`;
            addCopy(value.firstChild.children[0], value.lastChild);
            value.children[0].children[1].addEventListener("click", formatCode);
        } 
        else 
        {
            for (let i = 0, e; i < (e = $(".existing.segment")).length; i++) 
            {
                if ($(e[i]).children('pre').length == 0) continue;
                if (/\/problem\//.test(domain) && e[i].parentNode.style.overflow != "hidden") 
                {
                    e[i].parentNode.style.width = "50%";
                }
                e[i].innerHTML += `<div class="ui button" style="position:absolute;top:0px;right:-4px;border-top-left-radius:0;border-bottom-right-radius:0;">复制</div>`;
                addCopy(e[i].lastChild, $(e[i]).children('pre')[0]);
            }
        }
    }

    function get_key(problem_id) 
    {
        return md5(problem_id + "problem_xxx")
    }

    if (/^\/problem\/\d+($|\/(?![\d\w]))/.test(domain) && !$("body").html().includes("提交记录") && $("body").html().includes("您没有权限进行此操作")) {
        window.location.href = domain + '?key=' + get_key(domain.match(/\d+/)[0]);
    }

    try
    {
        let qwq = $("body").html().match(/\/streams\/([\s\S]*?)\/index.m3u8/);
        console.log(`视频合并下载命令 ffmpeg -headers "Cookie: Cookie: ${document.cookie}" -i ${window.location.origin + qwq[0]} -c copy -bsf:a aac_adtstoasc ~/Videos/${$('h1')[0].innerText}.mp4`)
    } 
    catch 
    {
        console.log(`本页面不包含可下载的视频`)
    }
})();
