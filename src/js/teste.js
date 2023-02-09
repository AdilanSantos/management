$.fn.modal.Constructor.prototype.enforceFocus = function () {};
var glbAppConf = JSON.parse($("body").attr("data-appconf").replace(/'/g, '"')),
    glbLC = glbAppConf.lc,
    glbLang = LZString.decompressFromUTF16(localStorage.getItem("Idioma" + glbLC)),
    glbVersion = "?r=" + sessionStorage.getItem("random"),
    glbColors = ["#00BCD5", "#772581", "#8E2E56", "#08A045", "#E55934", "#F19B2C", "#92CCA7", "#476368", "#4DB849", "#FDE74C", "#CF424B", "#BF3930", "#808080", "#D4D247", "#6FBCBD", "#649CD3", "#EB6761", "#84A0D0", "#03B3CB", "#C7A069", "#F19B2C", "#EB6761", "#476368", "#92CCA7", "#CE8A2B", "#5BC0EB", "#9BC53D", "#FA7921", "#AA4827", "#FC6199", "#5CB85C", "#355B33", "#2F70DA", "#5F2F23", "#E528EF", "#AB2626", "#6C9084", "#673ABA", "#CDDC4B", "#9C27C8", "#2196D8", "#CE0000", "#00FF87", "#FF0000", "#4200FF", "#890000", "#250093", "#90b102", "#0098FF", "#8DFF30", "#FFAF00", "#3000B4", "#FF8900", "#00FFCE", "#cc6b6b", "#AAAAAA", "#111111", "#B10DC9", "#F012BE", "#85144b", "#FF4136", "#FF851B", "#FFDC00", "#01FF70", "#2ECC40", "#3D9970", "#39CCCC", "#7FDBFF", "#0074D9", "#001F3F", "#FAEBD7", "#7FFFD4", "#586C6C", "#8E8E1D", "#FFE4C4", "#000000", "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#006400", "#A9A9A9", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F", "#00CED1", "#9400D3", "#FF1493", "#00BFFF", "#696969", "#1E90FF", "#B22222", "#FFFAF0", "#228B22", "#FFD700", "#DAA520", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4", "#CD5C5C", "#4B0082", "#CAC171", "#E6E6FA", "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#90EE90", "#D3D3D3", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#778899", "#B0C4DE", "#FFFFE0", "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA", "#0000CD", "#BA55D3", "#9370DB", "#3CB371", "#7B68EE", "#00FA9A", "#48D1CC", "#C71585", "#191970", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6", "#808000", "#6B8E23", "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093", "#FFEFD5", "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#663399", "#BC8F8F", "#4169E1", "#8B4513", "#FA8072", "#F4A460", "#2E8B57", "#FFF5EE", "#A0522D", "#C0C0C0", "#87CEEB", "#6A5ACD", "#708090", "#00FF7F", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#40E0D0", "#EE82EE", "#F5DEB3", "#FFFF00", "#9ACD32"],
    glbSearch = $(location).prop("search").replace("?", "").split("/"),
    glbHostName = $(location).prop("hostname").split("."),
    glbSubDominio = glbHostName[0],
    glbAppName = glbSearch[0],
    glbWVAndroid = navigator.userAgent.search("; wv"),
    glbWViOS = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
    glbIE = /(Edge|Trident)/i.test(navigator.userAgent),
    glbWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
    glbAbortAjax = [],
    glbTimerPanel, glbTempSSJSON = "";
if (localStorage.getItem("md") == "1") {
    glbColors = ["#00BCD5", "#772581", "#8E2E56", "#08A045", "#E55934", "#F19B2C", "#92CCA7", "#476368", "#4DB849", "#B7A735", "#CF424B", "#BF3930", "#808080", "#D4D247", "#6FBCBD", "#649CD3", "#EB6761", "#84A0D0", "#03B3CB", "#C7A069", "#F19B2C", "#EB6761", "#476368", "#92CCA7", "#CE8A2B", "#5BC0EB", "#9BC53D", "#FA7921", "#AA4827", "#FC6199", "#5CB85C", "#355B33", "#2F70DA", "#5F2F23", "#E528EF", "#AB2626", "#6C9084", "#673ABA", "#CDDC4B", "#9C27C8", "#2196D8", "#CE0000", "#00FF87", "#FF0000", "#4200FF", "#890000", "#250093", "#90b102", "#0098FF", "#8DFF30", "#FFAF00", "#3000B4", "#FF8900", "#00FFCE", "#cc6b6b", "#AAAAAA", "#111111", "#B10DC9", "#F012BE", "#85144b", "#FF4136", "#FF851B", "#FFDC00", "#01FF70", "#2ECC40", "#3D9970", "#39CCCC", "#7FDBFF", "#0074D9", "#001F3F", "#FAEBD7", "#479D81", "#586C6C", "#8E8E1D", "#FFE4C4", "#000000", "#C8A776", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#006400", "#A9A9A9", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F", "#00CED1", "#9400D3", "#FF1493", "#00BFFF", "#696969", "#1E90FF", "#B22222", "#FFFAF0", "#228B22", "#FFD700", "#DAA520", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4", "#CD5C5C", "#4B0082", "#CAC171", "#E6E6FA", "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#90EE90", "#D3D3D3", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#778899", "#B0C4DE", "#FFFFE0", "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA", "#0000CD", "#BA55D3", "#9370DB", "#3CB371", "#7B68EE", "#00FA9A", "#48D1CC", "#C71585", "#191970", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6", "#808000", "#6B8E23", "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093", "#FFEFD5", "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#663399", "#BC8F8F", "#4169E1", "#8B4513", "#FA8072", "#F4A460", "#2E8B57", "#FFF5EE", "#A0522D", "#C0C0C0", "#87CEEB", "#6A5ACD", "#708090", "#02A855", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#31AfA3", "#EE82EE", "#F5DEB3", "#FFFF00", "#9ACD32"]
}

function unique(b) {
    return $.grep(b, function (d, c) {
        return c == $.inArray(d, b)
    })
}

function urlify(c) {
    var b = "max-width:-webkit-fill-available;max-width:-moz-available;";
    c = c.replace(/(https:..firebasestorage.googleapis.com.*?[.][png|jpeg|jpg|gif].*?)(<br>| )/gi, '<img src="$1" loading="lazy" style="' + b + '" >$2');
    c = c.replace(/[^"](https:..firebasestorage.googleapis.com.*?[.]oga.*?)(<br>| )/gi, '<audio controls style="' + b + '" ><source src="$1" type="audio/mpeg">$1</audio>$2');
    c = c.replace(/!\[(.*?)\]\((.*?[.png|.jpeg|.jpg|.gif])\)/gi, '<img src="$2" title="$1" loading="lazy" style="' + b + '" >');
    c = c.replace(/\[.*?\]\((.*?[.mp3|.ogg|.oga])\)/gi, "$1");
    c = c.replace(/(https?:\/\/[^\s]+?)([.]mp3|[.]ogg|[.]oga)/gi, '<audio controls style="' + b + '" ><source src="$1$2" type="audio/mpeg">$1$2</audio>');
    c = c.replace(/\[.*?\]\((.*?[.mp4|.webm])\)/gi, "$1");
    c = c.replace(/(https?:\/\/[^\s]+?)([.]mp4|[.]webm)/gi, '<video controls style="' + b + '" ><source src="$1$2" type="audio/mp4">$1$2</video>');
    c = c.replace(/<br>https/g, "<br> https");
    c = c.replace(/[^\(|^"|^>](https?:\/\/[^\s|<]+)/gi, ' <a href="$1" target="blank" >$1</a>');
    c = c.replace(/\[(.*?)\]\((.*?([.]pdf|[.]doc|[.]docx|[.]html|[.]pfx|[.]xml|[.]js|[.]css|[.]txt|[.]rtf|[.]rar|[.]zip|[.]sql|[.]xls|[.]xlsx))\)/gi, ' <a href="$2" target="blank" >$1</a>');
    return c
}

function sleep(c) {
    const b = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now()
    } while (currentDate - b < c)
}

function urlphone(b) {
    return b.replace(/^(\(?[0-9]{0,3}\)? ?[0-9]{4,5}-[0-9]{4})$/, '<a href="tel:$1" >$1</a>')
}

function feT(b) {
    return b.replace(/(<|&lt;)(..|....)?script/gi, "$1&#8203;$2script")
}

function containsValue(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (b[c].indexOf(d) > -1) {
            return c
        }
    }
    return -1
}

function resizeBarraStatus(b) {
    var c = $("#Panel" + b).find("#prop-type-group");
    if ($(window).width() <= 600) {
        c.removeClass("btn-group").addClass("btn-group-vertical")
    } else {
        c.removeClass("btn-group-vertical")
    }
}

function accentsToCharCode(d) {
    var b = [];
    for (var c = d.length - 1; c >= 0; c--) {
        if (parseInt(d[c].charCodeAt()) >= 187) {
            b.unshift(["&#", d[c].charCodeAt(), ";"].join(""))
        } else {
            b.unshift([d[c]])
        }
    }
    return b.join("")
}

function escapeTags(d, b) {
    try {
        d = d.replace(/onerror/g, "on&#8203;error")
    } catch (c) {}
    return String(d).replace(new RegExp("<(/)?" + b, "g"), "&lt;$1" + b).replace("undefined", "")
}
var decodeEntities = (function () {
    var c = document.createElement("div");
    var b = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;
    return function d(e) {
        e = e.replace(b, function (f) {
            c.innerHTML = f;
            return c.textContent
        });
        c.textContent = "";
        return e
    }
})();
var cLineGrid = function (c, b) {
    c.closest(".TbodyC").find(".Cg").removeClass("Cg");
    c.closest(".TrC").addClass("Cg");
    sessionStorage.setItem("Cg" + $(location).prop("hash").substring(1), b)
};
$.ajax({
    url: (glbAppConf.ajaxCDN == "" ? glbAppConf.hostname + "view/html/Menu" + glbAppName + ".html" + glbVersion : glbAppConf.ajaxCDN + "view/" + sessionStorage.getItem("random") + "/html/Menu" + glbAppName + ".html"),
    dataType: "text",
    cache: true
}).done(function (d) {
    $("#Menu").html(d).traduzItens();
    if (glbWidth < 768) {
        $("#DropdownMenuFullScreen").hide();
        $("#DropdownMenuTeclasAtalho").hide();
        localStorage.setItem("teste" + glbLC, "true")
    } else {
        localStorage.removeItem("teste" + glbLC)
    }
    if (glbAppConf.nome == "erp") {
        if (glbAppName != "Login" && glbAppName != "AlteraSenha" && glbAppName != "AutoRegistration" && glbAppName != "Warning" && glbAppName != "Report" && glbAppName != "API") {
            localStorage.setItem("App" + glbLC, LZString.compressToUTF16(glbAppName));
            criaMenuPermissao("Menu")
        }
        if (L["title" + glbAppName] != undefined && glbAppName != "Login") {
            document.title = LZString.decompressFromUTF16(localStorage.getItem("PrefixoDescricao" + glbLC)) + " - " + L["title" + glbAppName];
            $(".navbar-brand").html("/&nbsp;&nbsp;" + L[glbAppName]);
            $("#PesquisaMenu").attr("placeholder", L.Pesquisar + "...")
        }
    } else {
        if (glbAppConf.nome == "csc") {
            localStorage.setItem("Prefixo" + glbLC, LZString.compressToUTF16(glbSubDominio));
            if (glbHostName.length == 3 && (glbAppName == "LoginPortal" || glbAppName == "LoginTicket")) {
                var g = $("#Modal" + glbAppName);
                var f = glbAppName.replace("Login", "");
                $.ajax({
                    url: "prefixo" + f.toLowerCase(),
                    type: "POST"
                }).done(function (m) {
                    var k = JSON.parse(m);
                    if (k.erro) {
                        g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", k.erro)
                    } else {
                        if (glbAppName == "LoginTicket") {
                            if (k.Mensagem) {
                                g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", k.Mensagem)
                            }
                            document.title = k.titticket;
                            localStorage.setItem("Titulo" + glbLC, LZString.compressToUTF16(k.titticket));
                            localStorage.setItem("Logo" + glbLC, LZString.compressToUTF16(glbAppConf.CDN + k.logo));
                            if (k.liberado == "S") {
                                g.find(".Logar").prop({
                                    disabled: false
                                }).text(L.Entrar);
                                if (k.alertaerp == "S") {
                                    var j = $("#ModalAlertaErp");
                                    j.modal("show");
                                    j.traduzItens()
                                }
                            }
                            localStorage.setItem("portaloperadorcss", LZString.compressToUTF16(k.portaloperadorcss))
                        } else {
                            if (glbAppName == "LoginPortal") {
                                var o = $("#Aba5LoginPortal");
                                if (k.portalcliente) {
                                    g.find('[href="#Aba1LoginPortal"]').removeClass("hide");
                                    $("#Aba1LoginPortal").find(".panel-body").html(k.portalcliente);
                                    if (k.portalclienteabapadrao == "H") {
                                        $('#ModalLoginPortal [href="#Aba1LoginPortal"]').trigger("click")
                                    }
                                }
                                try {
                                    if (k.WA) {
                                        localStorage.setItem("pcwa" + glbLC, k.WA);
                                        if (glbWidth > 768) {
                                            $("body").before("<style>.dwhats{position:fixed;bottom:15px;z-index:9999999999;display:flex;align-items:center;right:15px;}.dwhats{width:50px;height:48px;display:block;border-radius:50%;background:#25d366;box-shadow:2px 2px 6px rgba(0,0,0,0.4);}.dwhats:hover,.dwhats:focus{box-shadow:2px 2px 8px rgba(0,0,0,0.6);}.dwhats::before{content:\"\";display: block;background:url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3cpath fill='%23fff' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'%3e%3c/path%3e%3c/svg%3e\")top center no-repeat;height:35px;margin-top:6px;}</style><a href=https://wa.me/" + k.WA + " target=blank class=dwhats></a>")
                                        }
                                    } else {
                                        localStorage.removeItem("pcwa" + glbLC)
                                    }
                                } catch (l) {
                                    localStorage.removeItem("pcwa" + glbLC)
                                }
                                if (k.maisimativo == "S") {
                                    $.ajax({
                                        url: "portal/chat",
                                        type: "POST"
                                    }).done(function (r) {
                                        var s = JSON.parse(r),
                                            p = s.root;
                                        try {
                                            if (p.maisim["show_support"] == true && p.maisim["show_after_login"] == false) {
                                                if (glbWidth < 768) {
                                                    $("#ModalLoginPortal .modal-dialog").append('<div style="height:50px;" ></div>')
                                                }(function (t, u, x, y, z, w) {
                                                    t.top.maisim || (function () {
                                                        w = u.createElement(x);
                                                        x = u.getElementsByTagName(x)[0];
                                                        w.async = !0;
                                                        w.src = y + "?_=" + (+new Date());
                                                        w.id = "maisim";
                                                        w.charset = "utf-8";
                                                        w.setAttribute("data-token", z);
                                                        x.parentNode.insertBefore(w, x)
                                                    })()
                                                })(window, document, "script", "https://app.mais.im/support/assets/js/core/embed.js", p.maisim["enterprise_public_token"])
                                            }
                                        } catch (q) {}
                                    })
                                } else {
                                    if (k.chat == "S" && k.chatusulogado != "S") {
                                        g.find('[href="#Aba4LoginPortal"]').removeClass("hide")
                                    }
                                }
                                $.ajax({
                                    url: "portal/rcs",
                                    type: "POST"
                                }).done(function (q) {
                                    var p = JSON.parse(q);
                                    localStorage.setItem("rcsdms" + glbLC, p.rcsdms);
                                    localStorage.setItem("logmein" + glbLC, k.logmein);
                                    if ((p.rcsdms == "S" && navigator.userAgent.search("Windows") >= 0) || k.logmein == "S") {
                                        g.find('[href="#Aba5LoginPortal"]').removeClass("hide");
                                        if (p.rcsdms == "S") {
                                            o.find(".form-group:first").removeClass("hide")
                                        }
                                        if (k.logmein == "S") {
                                            o.find(".form-group:eq(1)").removeClass("hide")
                                        }
                                    }
                                });
                                document.title = k.titportal;
                                localStorage.setItem("Titulo" + glbLC, LZString.compressToUTF16(k.titportal));
                                localStorage.setItem("iap" + glbLC, k.iap);
                                g.find('[href="#Aba1LoginPortal"],.modal-footer').removeClass("hide");
                                if (k.portalclientecss) {
                                    localStorage.setItem("portalclientecss" + glbLC, LZString.compressToUTF16(k.portalclientecss));
                                    $("body").before("<style>" + k.portalclientecss + "</style>")
                                }
                                if ($(location).prop("hash").match(/PublicKnowledgeBase/) || k.portalclienteabapadrao == "B") {
                                    setTimeout(function () {
                                        $("#ModalLoginPortal").find('[href="#Aba3LoginPortal"]').trigger("click")
                                    }, 500)
                                }
                                if (k.cadastroportal == "S") {
                                    $('#ModalLoginPortal [data-target="#ModalLoginPortalCadastro"]').removeClass("hide")
                                }
                                g.find(".modal-header img").prop("src", glbAppConf.CDN + k.logo);
                                localStorage.setItem("Logo" + glbLC, LZString.compressToUTF16(glbAppConf.CDN + k.logo));
                                g.find(".Logar").prop({
                                    disabled: false
                                }).text(L.Entrar);
                                $.ajax({
                                    url: "portal/knowledgebasepublic",
                                    type: "POST",
                                    data: {
                                        Dados: '{"Total":"true"}'
                                    }
                                }).done(function (q) {
                                    var p = JSON.parse(q);
                                    if (parseInt(p.root) > 0) {
                                        g.find('[href="#Aba3LoginPortal"],[href="#Aba6LoginPortal"],[href="#Aba7LoginPortal"]').removeClass("hide")
                                    }
                                })
                            }
                        }
                    }
                    g.find('[name="Prefixo"]').val(k.prefixo);
                    $("#Modal" + glbAppName + "Esqueci").find('[name="Prefixo"]').val(k.prefixo)
                }).fail(function (j) {
                    g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L["ErrojqXHR" + j.status], false);
                    g.find(".Logar").prop("disabled", false).text(L.Entrar)
                });
                g.traduzItens()
            } else {
                if (glbAppName == "Approval") {
                    var b = "";
                    if (glbSearch[1].search("-Confirm") >= 0) {
                        b = "1";
                        glbSearch[1] = glbSearch[1].replace("-Confirm", "")
                    }
                    var c = new RegExp(/(A|R)([0-9]+)-(.*)/g).exec(glbSearch[1]);
                    var g = $("#ModalApproval");
                    g.find("#ModalLabelApproval").text((c[1] == "A" ? L.Aprovacao : L.Reprovacao));
                    g.modal("show");
                    g.traduzItens();
                    $.ajax({
                        url: "prefixoportal",
                        type: "POST"
                    }).done(function (k) {
                        var j = JSON.parse(k);
                        document.title = j.titportal;
                        if (j.portalclientecss) {
                            localStorage.setItem("portalclientecss" + glbLC, LZString.compressToUTF16(j.portalclientecss));
                            $("body").before("<style>" + j.portalclientecss + "</style>")
                        }
                        if (b == "") {
                            $.ajax({
                                url: glbAppConf.base + "ChamadoAprovacao",
                                type: "POST",
                                data: {
                                    Dados: '{"Tipo":"' + c[1] + '","CodUsuario":"' + c[2] + '","Token":"' + c[3] + '","Prefixo":"' + glbSubDominio + '"}'
                                }
                            }).done(function (q) {
                                var t = JSON.parse(q);
                                var o = t.erro;
                                var l = t.root;
                                if (l) {
                                    if (c[1] == "A") {
                                        if (l.JustificarAprovacao == "S") {
                                            var s = $("#ModalCSAprovar");
                                            s.find('[name="TAprovacao[CodUsuario]"]').val(c[2]);
                                            s.find('[name="TAprovacao[Token]"]').val(c[3]);
                                            s.find("#ModalLabelCSAprovar small").text("#" + l.Codchamado + " " + l.Assunto);
                                            s.modal("show");
                                            s.traduzItens()
                                        } else {
                                            g.find(".MsgModal:eq(0)").html('<div class="alert alert-success" role="alert"><strong>' + L.Oba + "...</strong> " + L.AprovadoComSucesso + " :)</div>")
                                        }
                                    } else {
                                        var s = $("#ModalCSReprovar");
                                        s.find('[name="TAprovacao[CodUsuario]"]').val(c[2]);
                                        s.find('[name="TAprovacao[Token]"]').val(c[3]);
                                        if (l.MsgReprov) {
                                            var p = s.find('[name="TAprovacao[Descricao]"]'),
                                                r = JSON.parse(l.MsgReprov),
                                                m = "";
                                            $.each(r, function (w, u) {
                                                m += '<option value="' + Object.values(u) + '">' + Object.values(u) + "</option>"
                                            });
                                            p.parent().html('<select name="TAprovacao[Descricao]" class="form-control" required ><option></option>' + m + "</select>");
                                            p.remove()
                                        }
                                        s.find("#ModalLabelCSReprovar small").text("#" + l.Codchamado + " " + l.Assunto);
                                        s.modal("show");
                                        s.traduzItens()
                                    }
                                } else {
                                    g.find(".MsgModal:eq(0)").html('<div class="alert alert-warning" role="alert"><strong>' + L.Ops + "...</strong> " + o + " :(</div>")
                                }
                            }).fail(function (l) {
                                g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L["ErrojqXHR" + l.status], false)
                            })
                        } else {
                            g.find(".MsgModal:eq(0)").html('<a href="?Approval/' + glbSearch[1] + '" class="btn btn-primary btn-lg" style="margin-bottom:10px;" >' + L.CD + "</a>")
                        }
                    }).fail(function (j) {
                        g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L["ErrojqXHR" + j.status], false)
                    })
                } else {
                    if (glbAppName == "SatisfactionSurveyAnswer" || glbAppName == "Survey") {
                        var c = new RegExp(/(.*)/g).exec(glbSearch[1]);
                        var g = $("#ModalSurvey");
                        g.modal("show");
                        g.traduzItens();
                        $.ajax({
                            url: "prefixoportal",
                            type: "POST"
                        }).done(function (k) {
                            var j = JSON.parse(k);
                            document.title = j.titportal;
                            if (j.portalclientecss) {
                                localStorage.setItem("portalclientecss" + glbLC, LZString.compressToUTF16(j.portalclientecss));
                                $("body").before("<style>" + j.portalclientecss + "</style>")
                            }
                            populaFormCustomChamadoPS(c[1], g)
                        }).fail(function (j) {
                            g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L["ErrojqXHR" + j.status], false)
                        })
                    } else {
                        if (glbAppName == "Report" || glbAppName == "Register") {
                            var c = new RegExp(/(.*)/g).exec(glbSearch[1]),
                                g = $("#Modal" + glbAppName);
                            g.modal("show");
                            g.traduzItens();
                            $.ajax({
                                url: "prefixoportal",
                                type: "POST"
                            }).done(function (k) {
                                var j = JSON.parse(k);
                                document.title = j.titportal;
                                if (j.portalclientecss) {
                                    localStorage.setItem("portalclientecss" + glbLC, LZString.compressToUTF16(j.portalclientecss));
                                    $("body").before("<style>" + j.portalclientecss + "</style>")
                                }
                                if (glbAppName == "Report") {
                                    populaFormCustomRelatorio(c[1], g)
                                } else {
                                    populaFormCustomCadastroExterno(c[1], g)
                                }
                            }).fail(function (j) {
                                g.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L["ErrojqXHR" + j.status], false)
                            })
                        } else {
                            if (glbAppName == "API") {} else {
                                if (glbAppName == "ChangePasswordTicket" || glbAppName == "ChangePasswordPortal") {
                                    var g = $("#Modal" + glbAppName);
                                    g.modal("show");
                                    g.traduzItens()
                                } else {
                                    if ($.inArray(glbAppName, glbAppConf.apps) < 0) {
                                        var g = $("#ModalDirecionaPrefixo");
                                        g.find('[name="Prefixo"]').val(LZString.decompressFromUTF16(localStorage.getItem("Prefixo" + glbLC)));
                                        g.modal("show");
                                        g.traduzItens()
                                    } else {
                                        if (glbAppName == "Portal" && localStorage.getItem("Titulo" + glbLC)) {
                                            document.title = LZString.decompressFromUTF16(localStorage.getItem("Titulo" + glbLC));
                                            $(".navbar-brand").addClass("logoHome").html('<img src="' + LZString.decompressFromUTF16(localStorage.getItem("Logo" + glbLC)) + '" height="38" >');
                                            if (localStorage.getItem("portalclientecss" + glbLC)) {
                                                $("body").before("<style>" + LZString.decompressFromUTF16(localStorage.getItem("portalclientecss" + glbLC)) + "</style>")
                                            }
                                            if (localStorage.getItem("pcwa" + glbLC)) {
                                                $("body").before("<style>.dwhats{position:fixed;bottom:15px;z-index:9999999999;display:flex;align-items:center;left:15px;}.dwhats{width:50px;height:48px;display:block;border-radius:50%;background:#25d366;box-shadow:2px 2px 6px rgba(0,0,0,0.4);}.dwhats:hover,.dwhats:focus{box-shadow:2px 2px 8px rgba(0,0,0,0.6);}.dwhats::before{content:\"\";display: block;background:url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3cpath fill='%23fff' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'%3e%3c/path%3e%3c/svg%3e\")top center no-repeat;height:35px;margin-top:6px;}</style><a href=https://wa.me/" + localStorage.getItem("pcwa" + glbLC) + " target=blank class=dwhats></a>")
                                            }
                                        } else {
                                            if (localStorage.getItem("Titulo" + glbLC)) {
                                                document.title = LZString.decompressFromUTF16(localStorage.getItem("Titulo" + glbLC));
                                                $(".navbar-brand").html("/&nbsp;&nbsp;" + L[glbAppName]);
                                                var e = localStorage.getItem("portaloperadorcss");
                                                if (e) {
                                                    $("body").before("<style>" + LZString.decompressFromUTF16(e) + "</style>")
                                                }
                                            }
                                        }
                                        $("#PesquisaMenu").attr("placeholder", L.Pesquisar + "...");
                                        if (glbAppName != "Portal") {
                                            localStorage.setItem("App" + glbLC, LZString.compressToUTF16(glbAppName))
                                        }
                                        criaMenuPermissao("Menu")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $(window).trigger("resize")
}).fail(function (b) {
    location = "?Login"
});
$.fn.lForm = function (b) {
    var d = (b == undefined ? this.closest(".modal") : b);
    var c = d.find("form");
    c.trigger("reset");
    c.find("select").val("");
    c.find('[data-b="ajax"]').empty();
    c.find(".DSH").trigger("change");
    d.criaBuscaAjax();
    d.criaBuscaLocal();
    if (d.is(":visible") || b != undefined) {
        d.find(".aGridAvancado:first").trigger("click")
    }
};
$.fn.traduzItens = function () {
    var e = this.find("[data-l]:empty"),
        b = this.find('[data-lph="Nao"]'),
        d = this.find('[data-lpopover="Nao"]'),
        c = this.find('[data-ltooltip="Nao"]');
    e.each(function (f) {
        var g = $(this);
        g.html(L[g.attr("data-l")])
    });
    b.each(function (f) {
        var g = $(this);
        g.attr("placeholder", L[g.attr("placeholder")]);
        g.attr("data-lph", "Sim")
    });
    d.each(function (f) {
        var g = $(this);
        g.attr("data-original-title", L[g.attr("data-content").replace("popover", "")]);
        g.attr("data-content", L[g.attr("data-content")]);
        g.attr("data-lpopover", "Sim")
    });
    this.find('[data-toggle="popover"]').popover();
    if (glbWidth > 768) {
        c.each(function (f) {
            var g = $(this);
            g.attr("title", L[g.attr("title")]);
            g.attr("data-ltooltip", "Sim")
        });
        this.find('[data-toggle="tooltip"]').tooltip({
            html: true,
            container: "body"
        })
    }
};
$.fn.populaBuscaAjaxForm = function (b) {
    var d = this.attr("data-b");
    if (!((d == "ajax" || d == "local") && b)) {
        this.val(b).change()
    } else {
        var c = "";
        b = JSON.parse(b);
        $.each(b, function (f, e) {
            c += '<option value="' + Object.keys(e) + '" selected >' + Object.values(e) + "</option>"
        });
        this.html(c).change()
    }
};

function formataCamposModalAlt(e) {
    var b = 'input[type="checkbox"]',
        f = "value",
        d = "checked",
        c = "data-fcm",
        g = e.find("[" + c + "]");
    g.each(function () {
        $(this).val(window["formatoEditar" + $(this).attr(c)]($(this).val()))
    });
    e.find(b + "[" + f + '="on"],' + b + "[" + f + '="S"]').prop(d, true);
    e.find(b + "[" + f + '=""],' + b + "[" + f + '="N"]').prop(d, false);
    e.find(b).removeAttr(f)
}
$.fn.formataCamposModal = function () {
    var b = 'input[type="checkbox"]',
        e = "value",
        d = "checked",
        c = "data-fcm",
        f = this.find("[" + c + "]");
    f.each(function () {
        $(this).val(window["formatoEditar" + $(this).attr(c)]($(this).val()))
    });
    this.find(b + "[" + e + '="on"],' + b + "[" + e + '="S"]').prop(d, true);
    this.find(b + "[" + e + '=""],' + b + "[" + e + '="N"]').prop(d, false);
    this.find(b).removeAttr(e)
};
Number.prototype.formataMoeda = function (j, b, f, g) {
    var e = "\\d(?=(\\d{" + (b || 3) + "})+" + (j > 0 ? "\\D" : "$") + ")",
        d = this.toFixed(Math.max(0, ~~j));
    return (g ? d.replace(".", g) : d).replace(new RegExp(e, "g"), "$&" + (f || ","))
};
var formataValor = function (c, e) {
    try {
        c = c.replace(/\D/g, "")
    } catch (d) {
        c = "0"
    }
    c = new String(Number(c));
    var b = c.length;
    if (e == "Valor4c") {
        if (1 == b) {
            c = c.replace(/(\d)/, "0,000$1")
        } else {
            if (2 == b) {
                c = c.replace(/(\d)/, "0,00$1")
            } else {
                if (3 == b) {
                    c = c.replace(/(\d)/, "0,0$1")
                } else {
                    if (4 == b) {
                        c = c.replace(/(\d)/, "0,$1")
                    } else {
                        if (b > 13) {
                            c = c.replace(/(\d{3})(\d{3})(\d{3})(\d{4})$/, ".$1.$2.$3,$4")
                        } else {
                            if (b > 10) {
                                c = c.replace(/(\d{3})(\d{3})(\d{4})$/, ".$1.$2,$3")
                            } else {
                                if (b > 7) {
                                    c = c.replace(/(\d{3})(\d{4})$/, ".$1,$2")
                                } else {
                                    if (b > 4) {
                                        c = c.replace(/(\d{4})$/, ",$1")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (e == "Valor3c") {
            if (1 == b) {
                c = c.replace(/(\d)/, "0,00$1")
            } else {
                if (2 == b) {
                    c = c.replace(/(\d)/, "0,0$1")
                } else {
                    if (3 == b) {
                        c = c.replace(/(\d)/, "0,$1")
                    } else {
                        if (b > 12) {
                            c = c.replace(/(\d{3})(\d{3})(\d{3})(\d{3})$/, ".$1.$2.$3,$4")
                        } else {
                            if (b > 9) {
                                c = c.replace(/(\d{3})(\d{3})(\d{43})$/, ".$1.$2,$3")
                            } else {
                                if (b > 6) {
                                    c = c.replace(/(\d{3})(\d{3})$/, ".$1,$2")
                                } else {
                                    if (b > 3) {
                                        c = c.replace(/(\d{3})$/, ",$1")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (1 == b) {
                c = c.replace(/(\d)/, "0,0$1")
            } else {
                if (2 == b) {
                    c = c.replace(/(\d)/, "0,$1")
                } else {
                    if (b > 11) {
                        c = c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, ".$1.$2.$3,$4")
                    } else {
                        if (b > 8) {
                            c = c.replace(/(\d{3})(\d{3})(\d{2})$/, ".$1.$2,$3")
                        } else {
                            if (b > 5) {
                                c = c.replace(/(\d{3})(\d{2})$/, ".$1,$2")
                            } else {
                                if (b > 2) {
                                    c = c.replace(/(\d{2})$/, ",$1")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return c
};
$.fn.formataValor = function () {
    var e = this,
        d = e.attr("data-mc"),
        b = e.val(),
        c = b.substring(0, 1);
    e.val((c == "-" ? "-" : "") + formataValor(b, d))
};

function populaBuscaAjaxFormAlt(d, c) {
    var f = d.attr("data-b");
    if (!((f == "ajax" || f == "local") && c)) {
        d.val(c).change()
    } else {
        if (d.attr("data-fl") == "true") {
            var b = d.html().replace(/selected=""|selected/g, "");
            c = JSON.parse(c);
            $.each(c, function (j, g) {
                b = b.replace('value="' + Object.keys(g) + '"', 'value="' + Object.keys(g) + '" selected')
            });
            d.html(b).change()
        } else {
            var e = "";
            c = JSON.parse(c);
            $.each(c, function (j, g) {
                e += '<option value="' + Object.keys(g) + '" selected >' + Object.values(g) + "</option>"
            });
            d.html(e).change()
        }
    }
}
$.fn.populaForm = function (c) {
    var g = this,
        d = g.find("form"),
        e = d.find('[data-eh="true"]');
    var b = c.trigger;
    delete c.trigger;
    var f = c["function"];
    delete c["function"];
    $.map(c, function (j, k) {
        $.map(j, function (l, m) {
            if (!(typeof l === "object")) {
                form = d.find('[name="' + k + "[" + m + ']"],[name="' + k + "[" + m + '][]"]');
                populaBuscaAjaxFormAlt(form, l);
                if (form.prop("class") == "DSH") {
                    g.find("." + k + m).addClass("hide");
                    g.find("#Div" + k + m + l).removeClass("hide")
                }
            } else {
                if (k != "TFiles") {
                    form = g.find(".ADGM").closest('[data-tp="' + k + '"]');
                    form.gridGenericoModal(k);
                    $.map(l, function (o, p) {
                        if (!(typeof o === "object")) {
                            subform = d.find('[name="' + k + "[][" + p + ']"]:eq(' + m + '),[name="' + k + "[][" + p + '[]]"]:eq(' + m + ")");
                            subform.populaBuscaAjaxForm(o)
                        } else {
                            $.map(o, function (r, q) {
                                subform = d.find('[name="' + k + "[][" + p + "[" + q + ']]"]:eq(' + m + ")");
                                setTimeout(populaBuscaAjaxFormAlt, 0, subform, r)
                            })
                        }
                    })
                } else {
                    $.map(l, function (o, p) {
                        setTimeout(populaFilesAlt, 0, d, p, o, g)
                    })
                }
            }
        })
    });
    setTimeout(formataCamposModalAlt, 0, d);
    setTimeout(function () {
        e.each(function () {
            var j = $(this);
            j.summernote("destroy");
            j.summernote({
                toolbar: [
                    ["font", ["bold"]],
                    ["fontname", ["fontname"]],
                    ["color", ["color"]],
                    ["fontsize", ["fontsize"]],
                    ["table", ["table"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["insert", ["link", "picture", "video"]],
                    ["codeview", ["codeview"]]
                ],
                height: 200,
                disableDragAndDrop: true
            });
            if (j.prop("disabled") == true) {
                j.summernote("disable")
            }
        })
    }, 0);
    if (b) {
        setTimeout(function () {
            $(b).trigger("click")
        }, 0)
    }
    if (f) {
        f = JSON.parse(f);
        window["populaForm" + f.name](f.parameters)
    }
};

function populaFilesAlt(c, e, b, d) {
    c.find('[data-h="updateFile' + e + '"]').append(criaHtmlArquivos(e, b, d))
}
$.fn.gridGenericoModal = function (m, g) {
    var c, b, o, f, j, k, l = this,
        d = "";
    try {
        d = l.prevObject["prevObject"]["selector"] + " "
    } catch (e) {}
    if (g != "DESC") {
        f = l.clone().appendTo(d + "." + m + "_Form")
    } else {
        f = l.clone().prependTo(d + "." + m + "_Form")
    }
    c = l.find("select option:selected");
    c.each(function () {
        f.find('[name="' + $(this).parent().prop("name") + '"] [value="' + $(this).val() + '"]').prop("selected", true)
    });
    c = l.find('input[type="checkbox"]');
    c.each(function () {
        f.find('[name="' + $(this).parent().prop("name") + '"] [value="' + $(this).val() + '"]').prop("checked", true)
    });
    c = f.find("input,select,textarea");
    c.each(function () {
        $(this).prop("name", m + "[][" + $(this).prop("name") + "]")
    });
    c.removeAttr("data-ms");
    j = false;
    c = f.find('[data-b="ajax"]');
    c.each(function () {
        $(this).parent().find("span:first").remove();
        j = true
    });
    if (j == true) {
        f.criaBuscaAjax()
    }
    j = false;
    c = f.find('[data-b="local"]');
    c.each(function () {
        $(this).parent().find("span:first").remove();
        j = true
    });
    if (j == true) {
        f.criaBuscaLocal()
    }
    f.dateTimePicker();
    k = f.find(".ADGM");
    k.removeClass("ADGM btn-success data-tpo").addClass("RemoveDadoGridModal btn-danger");
    k.find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-trash");
    k.find("span:eq(1)").text(L.Remover);
    k.parent().append("<hr/>")
};
$.fn.criaColunaGridPadrao = function (c) {
    var b = [],
        d = $("#Modal" + c).find("[data-cg]");
    d.each(function (k) {
        var p = $(this),
            o = new RegExp(/\w+\[(\w+)\]/g),
            m = p.attr("data-lcg"),
            e = p.attr("data-cg"),
            f = p.attr("data-ocg"),
            g = p.attr("data-fcg"),
            j = o.exec(p.prop("name"))[1],
            q = L[(m == undefined ? j : m)];
        if (j == "Chave") {
            b[e] = ($("<th>").attr({
                "data-coluna": j,
                "data-formato": g
            }).append($("<input>").attr({
                type: "checkbox",
                "class": "CheckBoxAll"
            })))
        } else {
            if (f != "false") {
                b[e] = ($("<th>").attr({
                    "data-coluna": j,
                    "data-formato": g,
                    "data-direcao": "",
                    "data-ordem": ""
                }).html(q + " ").append($("<span>").attr({
                    "class": "glyphicon",
                    "aria-hidden": "true"
                })))
            } else {
                b[e] = ($("<th>").attr({
                    "data-coluna": j,
                    "data-formato": g
                }).html(q))
            }
        }
    });
    this.find(".TheadC").append($("<tr>").html(b))
};
$.fn.dateTimePicker = function (g) {
    var f = 'data-dtp="',
        b = "[" + f + 'true"]',
        e = "YYYY",
        d = this.find(b),
        c = (g == "pt_br" ? "DD-MM-YYYY" : L.FormatDate);
    d.datetimepicker({
        ignoreReadonly: true,
        locale: glbLang,
        format: c,
        showTodayButton: true,
        focusOnShow: false,
        minDate: "1899-12-30T00:00:00"
    });
    d = this.find(b);
    d.datetimepicker({
        format: "HH:mm",
        focusOnShow: false
    });
    d = this.find("[" + f + e + '"]');
    d.datetimepicker({
        format: e,
        focusOnShow: false
    });
    d = this.find("[" + f + e + 'MM"]');
    d.datetimepicker({
        locale: glbLang,
        format: c.replace(/DD-|-DD/g, ""),
        focusOnShow: false
    });
    d = this.find("[" + f + 'MMDD"]');
    d.datetimepicker({
        locale: glbLang,
        format: c.replace(/YYYY-|-YYYY/g, ""),
        focusOnShow: false
    })
};
$.fn.marcarTodos = function (k) {
    var b = this,
        f = ":checkbox",
        e = "checked",
        d = ".panel-body",
        m = ".panel-heading",
        g = b.prop("class");
    if (g == "MarcarTodos") {
        var l = b.closest("form").find('[id^="accordion' + k + '"] ' + f + ",.MarcarTodosApp");
        l.prop(e, (b.is(":" + e)))
    } else {
        var r = b.closest(".panel-default"),
            j = b.parent().parent().prop("class");
        if (j == m.substring(1)) {
            var q = r.find(d + " " + f);
            q.prop(e, !(q.is(":" + e)))
        } else {
            var p = r.find(d + " :" + e).length,
                o = r.find(m + " " + f);
            if (p <= 0) {
                o.prop(e, false)
            } else {
                o.prop(e, true)
            }
        }
    }
};
$.fn.exibeMsg = function (l, g, e, f, j) {
    var k = this,
        e = typeof e !== "undefined" ? e : true,
        j = typeof j !== "undefined" ? j : true;
    if (typeof g !== "object") {
        g = g.replace(/(?:\r\n|\r|\n)/g, "<br>")
    }
    if (k.attr("class").search("MsgModal") >= 0) {
        var c = k.closest(".modal");
        if (c.scrollTop() > 0) {
            k = c.find(".MsgModal:eq(1)")
        }
    }
    var d = k.find("div:first").is(":visible");
    if ((d == false || l.search("Falha") >= 0) && e == true) {
        var b = g;
        if (g.length > 250 && j == true) {
            g = g.substring(0, 250);
            g += ' <i id="DetalhesMensagem" class="Cp" data-sj=\'{"TextoOriginal":"' + b + "\"}' >...</i>"
        }
        k.html($(l).find("div:first").clone().fadeIn().delay((g.length * 150)).fadeOut()).find("strong").html(g)
    } else {
        if (e == false) {
            var c = k.html($(l).find("div:first").clone()).find("strong").html(g);
            setTimeout(function () {
                if (f != false && l != "#MsgFalha") {
                    c.html(L.Trabalhando + " " + g)
                }
            }, 3500)
        }
    }
    if ($("#open-chat").is(":visible")) {
        $("#Msg div:first").css({
            left: "80px",
            bottom: "-0.4vh"
        })
    }
};
$("#ContainerApp").on("click", "#DetalhesMensagem", function () {
    var c = $(this).attr("data-sj"),
        b = $("#ModalDetalhesMensagem");
    b.find(".modal-body").html(JSON.parse(c)["TextoOriginal"]);
    b.traduzItens();
    b.zIndex();
    b.modal("show")
});
var validaPermissaoLista = function (c) {
    var b = c.find(".Criar");
    b.each(function () {
        var d = $(this);
        if (permissaoBotoes(d.attr("data-tm").replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2"), "Criar") == true || $("#Modal" + d.attr("data-tm").replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2")).is(":visible") == true) {
            d.remove()
        }
    });
    b = c.find(".Editar");
    b.each(function () {
        var d = $(this);
        if (permissaoBotoes(d.attr("data-tm").replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2"), "Editar") == true || $("#Modal" + d.attr("data-tm").replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2")).is(":visible") == true) {
            d.remove()
        }
    })
};
$.fn.criaFormModal = function (titulo, agrid, continuar) {
    var attrB = this;
    attrB.dateTimePicker();
    attrB.traduzItens();
    var attrC = attrB.find("form");
    if (attrC.attr("data-rs") == undefined) {
        attrC.trigger("reset");
        attrB.find('[data-tp="Dinamico"]').empty();
        var attrD = attrB.find('input[data-rs="false"]');
        attrD.each(function () {
            var thisA = $(this),
                n = thisA.prop("name"),
                v = thisA.val();
            attrC.find('input[name="' + n + '"]').val(v)
        });
        attrB.find('[data-b="ajax"]').empty()
    }
    attrB.find('[data-h="updateFile"] div').empty();
    attrB.find(".note-editable").empty();
    var attrH = attrB.find('[data-eh="true"]');
    attrH.each(function () {
        var thisA = $(this);
        thisA.summernote("destroy");
        thisA.summernote({
            toolbar: [
                ["font", ["bold"]],
                ["fontname", ["fontname"]],
                ["color", ["color"]],
                ["fontsize", ["fontsize"]],
                ["table", ["table"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["insert", ["link", "picture", "video"]],
                ["codeview", ["codeview"]]
            ],
            height: 200
        })
    });
    var attrE = attrB.find("input[data-frs]");
    attrE.each(function () {
        var thisA = $(this),
            n = thisA.prop("name"),
            json = JSON.parse(thisA.attr("data-frs").replace(/'/g, '"')),
            v = json.v,
            f = json.f,
            l = json.L;
        if (v == undefined && f == undefined) {
            v = L[l]
        } else {
            if (v == undefined && l == undefined) {
                eval("v = " + f + "()")
            }
        }
        attrC.find('input[name="' + n + '"]').val(v)
    });
    var attrF = attrB.find("h4:eq(0)"),
        attrG = attrF.find("span:eq(0)");
    if (attrG.attr("data-l") == undefined) {
        attrG.html(titulo)
    }
    attrF.find("small").text("");
    attrB.find(".Salvar").attr("data-ag", agrid).text(titulo);
    attrB.find(".Clonar").addClass("hide");
    attrB.criaBuscaAjax();
    attrB.criaBuscaLocal();
    if (continuar == false) {
        attrB.zIndex();
        attrB.modal("show")
    } else {
        if ($(location).prop("hash") == "#Chamados") {
            setTimeout(function () {
                $(".btnABLUnico:eq(0)").trigger("click")
            }, 0)
        }
    }
    validaPermissaoLista(attrB);
    attrB.find(".panel-collapse").removeClass("in");
    attrB.find('[data-ad="true"]').trigger("click")
};

function criaDataFiltro(c, e) {
    if (c) {
        var d = c.split(","),
            c = ',"Filtro":{',
            b = "";
        $.each(d, function (g, f) {
            var l = f.split(" ");
            if (l[3]) {
                var j = $(l[1]).find(l[2]).val();
                b = '["' + (j == null ? "" : j) + '","' + l[3] + '"]'
            } else {
                if (l[1].search("data-tp") != 1) {
                    b = '"' + $(l[1]).find(l[2]).val() + '"'
                } else {
                    b = '"' + $(e).closest(l[1]).find(l[2]).val() + '"'
                }
            }
            c += '"' + l[0] + '":' + b + ","
        });
        c = c.slice(0, -1);
        c += "}"
    } else {
        c = ""
    }
    return c
}

function direcionaPagamento(c, b) {
    if (c.Irregular == true) {
        $("#Msg").exibeMsg("#MsgFalha", L.DirecionamentoFaturamento);
        setTimeout(function () {
            sessionStorage.setItem("hash", "Home");
            localStorage.setItem("Irregular", "true");
            window.location.assign("?Panel#Home")
        }, 6000);
        return false
    } else {
        if (b == true) {
            window.location = "?Login"
        }
    }
}
$.fn.criaBuscaAjax = function () {
    var d = this.find('[data-b="ajax"]'),
        b = "";
    try {
        b = d.closest(".modal").prop("id").replace("Modal", "")
    } catch (c) {}
    d.each(function () {
        var k = $(this),
            e = k.attr("data-filtro"),
            j = k.attr("data-bfr"),
            g = k.attr("data-bfs"),
            f = k.attr("data-bw");
        k.select2({
            ajax: {
                dataType: "json",
                delay: 200,
                type: "POST",
                data: function (l) {
                    if (l.term == undefined) {
                        l.term = ""
                    }
                    return {
                        Dados: '{"Pesquisa":"' + l.term.replace(/\\/gi, "/").replace(/\"/g, "") + '","Ativo":"1","Ordem":[],"Ajax":"true"' + criaDataFiltro(e, d) + "}",
                        Menu: sessionStorage.getItem("hash"),
                        Modal: b,
                        App: glbAppName
                    }
                },
                processResults: function (m) {
                    try {
                        $("#Msg").exibeMsg("#MsgFalha", m.erro)
                    } catch (l) {}
                    return {
                        results: m.root
                    }
                },
                cache: false
            },
            language: {
                inputTooShort: function () {
                    return L.PesquiseAqui
                },
                noResults: function () {
                    return L.NaoEncontrado
                },
                searching: function () {
                    return L.Aguarde
                }
            },
            width: (f == undefined ? "100%" : f),
            templateResult: window["formatoBA" + (j != undefined ? j : "Default")],
            templateSelection: window["formatoBA" + (g != undefined ? g : "Default")]
        })
    })
};
$.fn.criaBuscaLocal = function (b) {
    var c = this.find('[data-b="local"]');
    c.each(function () {
        if ($(this).attr("data-fl") == "true") {
            $(this).html($(this).html().replace(/selected=""|selected/g, ""))
        }
        $(this).select2({
            width: "100%",
            tags: (b != false ? true : false),
            language: {
                noResults: function () {
                    return L.NaoEncontrado
                }
            }
        })
    })
};
$.fn.zIndex = function () {
    try {
        this.attr("class", this.attr("class").replace(/ ?Zi105([0-9]+) ?/g, " "));
        this.addClass("Zi105" + $(".modal.in").length)
    } catch (b) {}
};
$.fn.required = function (d) {
    var f = 0,
        j = new Array(),
        b = new Array(),
        k = new Array(),
        c = new Array();
    try {
        var g = d.closest
    } catch (e) {}
    this.find("form :required").each(function () {
        var o = $(this);
        var l = parseInt((o.attr("data-mr") == undefined ? 0 : o.attr("data-mr")));
        var m = (l < 1 ? "" : "Mais1");
        if (o.attr("data-mc") == "Valor" && (o.val() == "0,00" || o.val() == "0,00" || o.val() == "0,0000")) {
            o.val("")
        }
        var p = (g ? o.closest(g) : o.parent());
        if (this.checkValidity() == false && (l <= 0 || (o.closest(".modal").find('[name="' + o.prop("name") + '"]:checked').length < l && o.prop("type") == "checkbox"))) {
            p.addClass("has-error");
            p.find('[role="combobox"]').css("border-color", "#eb6761");
            j[f] = L["Valida" + o.prop("type").replace("-", "") + m];
            b[f] = o.closest(".tab-pane").prop("id");
            k[f] = o.closest(".panel-collapse").prop("id");
            c[f] = o.attr("name");
            f++
        } else {
            p.removeClass("has-error");
            p.find('[role="combobox"]').removeAttr("style")
        }
    });
    return {
        total: f,
        msgs: j,
        abas: b,
        collapse: k,
        name: c
    }
};
var requiredMsgErro = function (c, b) {
    $('[href="#' + c.abas[0] + '"]').trigger("click");
    $("#" + c.collapse[0]).collapse("show");
    b.exibeMsg("#MsgFalhaModal", c.msgs[0] + " " + (L[c.name[0].match(/\[(.+)?\]/)[1]] != undefined ? L[c.name[0].match(/\[(.+)?\]/)[1]] : ""))
};
$.fn.blocosDashboard = function (d, c) {
    var b = "",
        c = (c ? c : (12 / Object.keys(d).length));
    $.each(d, function (f, e) {
        b += '<div class="col-lg-' + c + ' col-md-6">';
        if (e.panel) {
            b += '<div class="panel panel-' + e.panel + ' Fs13">';
            b += '<div class="panel-heading">';
            b += '<div class="row" ' + (e.tooltip ? 'data-toggle="tooltip" data-placement="auto top" title="' + e.tooltip + '"' : "") + " >";
            b += '<div class="col-xs-3">';
            if (e.icon) {
                b += '<i class="fa fa-' + e.icon + ' fa-5x"></i>'
            } else {
                if (e.img) {
                    b += '<img src="' + e.img + '" style="border-radius: 5px;" />'
                } else {
                    b += '<div style="height:39px;width:39px;" ></div>'
                }
            }
            b += "</div>";
            if (e.click) {
                b += '<a href="javascript:void(0);" onClick="' + e.click + '" >';
                b += '<div class="col-xs-9 text-right">';
                b += '<div class="huge">' + e.value + "</div>";
                b += "<div>" + e.label + "</div>";
                b += "</div>";
                b += "</a>"
            } else {
                if (e.link) {
                    b += '<a href="' + e.link + '" >';
                    b += '<div class="col-xs-9 text-right">';
                    b += '<div class="huge">' + e.value + "</div>";
                    b += "<div>" + e.label + "</div>";
                    b += "</div>";
                    b += "</a>"
                } else {
                    b += '<div class="col-xs-9 text-right">';
                    b += '<div class="huge">' + e.value + "</div>";
                    b += "<div>" + e.label + "</div>";
                    b += "</div>"
                }
            }
            b += "</div>";
            b += "</div>";
            b += "</div>"
        }
        b += "</div>"
    });
    this.html(b)
};

function formataNumero(b) {
    if (b) {
        return b.replace(/[.]/g, "").replace(",", ".")
    }
}

function pad(d, b, c) {
    c = c || "0";
    d = d + "";
    return d.length >= b ? d : new Array(b - d.length + 1).join(c) + d
}
var dataAtual = function (b) {
    var e = new Date(),
        c = "";
    if (glbLang == "en_us") {
        c = pad(e.getMonth() + 1, 2) + "-" + pad(e.getDate(), 2) + "-" + e.getFullYear()
    } else {
        if (glbLang == "ja" || glbLang == "zh" || b == true) {
            c = e.getFullYear() + "-" + pad(e.getMonth() + 1, 2) + "-" + pad(e.getDate(), 2)
        } else {
            c = pad(e.getDate(), 2) + "-" + pad(e.getMonth() + 1, 2) + "-" + e.getFullYear()
        }
    }
    return c
};
var horaAtual = function (b) {
    var c = new Date();
    return pad(c.getHours(), 2) + ":" + pad(c.getMinutes(), 2) + (b == true ? ":" + pad(c.getSeconds(), 2) : "")
};
var dataRev = function (b) {
    return b.replace(/([0-9]{4}-[0-9]{1,2})(-[0-9]{1,2})?$/g, function (c) {
        c = c.split("-");
        return (c.length == 3 ? diaFixo(c[2], c[1] + "-" + c[0]) : mesAnoFixoRev(c[0] + "-" + c[1]))
    })
};
var diaFixo = function (g, e) {
    var f = new Date(),
        c = "",
        b = "";
    e = e.split("-");
    if (glbLang == "en_us") {
        c = (e[1] == undefined ? f.getFullYear() : e[1]);
        b = (e[0] == "" ? pad(f.getMonth() + 1, 2) : e[0]);
        g = (g == "" ? (new Date(c, b, 0).getDate()) : g);
        vRetorno = b + "-" + g + "-" + c
    } else {
        if (glbLang == "ja" || glbLang == "zh") {
            c = (e[0] == "" ? f.getFullYear() : e[0]);
            b = (e[1] == undefined ? pad(f.getMonth() + 1, 2) : e[1]);
            g = (g == "" ? (new Date(c, b, 0).getDate()) : g);
            vRetorno = c + "-" + b + "-" + g
        } else {
            c = (e[1] == undefined ? f.getFullYear() : e[1]);
            b = (e[0] == "" ? pad(f.getMonth() + 1, 2) : e[0]);
            g = (g == "" ? (new Date(c, b, 0).getDate()) : g);
            vRetorno = g + "-" + b + "-" + c
        }
    }
    return vRetorno
};
var mesAnoFixoRev = function (b) {
    b = b.split("-");
    if (!(glbLang == "ja" || glbLang == "zh")) {
        vRetorno = b[1] + "-" + b[0]
    } else {
        vRetorno = b[0] + "-" + b[1]
    }
    return vRetorno
};
var somaDias = function (g, c) {
    var j = g.split("-"),
        b = new Date(parseInt(j[2], 10), parseInt(j[1], 10) - 1, parseInt(j[0], 10)),
        f = c;
    b.setDate(b.getDate() + f);
    var l = b.getDate(),
        e = b.getMonth() + 1,
        k = b.getFullYear(),
        d = pad(l, 2) + "-" + pad(e, 2) + "-" + k;
    return d
};

function somaHoras(d, c) {
    d = d.split(":");
    c = c.split(":");
    segundos = (parseInt(d[2]) + parseInt(c[2]));
    if (segundos >= 60) {
        minutos = 1;
        segundos = (segundos - 60)
    } else {
        minutos = 0
    }
    minutos = minutos + (parseInt(d[1]) + parseInt(c[1]));
    if (minutos >= 60) {
        horas = 1;
        minutos = (minutos - 60)
    } else {
        horas = 0
    }
    horas = horas + (parseInt(d[0]) + parseInt(c[0]));
    return ((horas <= 9 ? "0" + horas : horas) + ":" + (minutos <= 9 ? "0" + minutos : minutos) + ":" + (segundos <= 9 ? "0" + segundos : segundos))
}

function somaDataVencimento(f, c, k) {
    var k = parseInt(k),
        g = f.split("-"),
        b = new Date(parseInt(g[2], 10), parseInt(g[1], 10) - 1, parseInt(g[0], 10)),
        l = pad(c, 2);
    if (g[0] <= l && k == 0) {
        n = 0
    } else {
        if (g[0] > l) {
            n = ((k + 1) * 31)
        } else {
            n = (k * 31)
        }
    }
    b.setDate(b.getDate() + n);
    var e = b.getMonth() + 1,
        j = b.getFullYear(),
        d = l + "-" + pad(e, 2) + "-" + j;
    return d
}
var loadJS = function (l, c, f, b) {
    if ($.inArray(l, glbAppConf.similar) > -1) {
        l = l + glbAppName
    }
    if (l) {
        var d, k = 0,
            e = 0,
            g = (glbAppConf.ajaxCDN == "" ? "model/" + l + ".js" + glbVersion : glbAppConf.ajaxCDN + "model/" + sessionStorage.getItem("random") + "/" + l + ".js");
        if (sessionStorage.getItem(l) == glbVersion) {
            e++;
            if (b == true) {
                $(".HControler").addClass("hide");
                $("#Panel" + l).removeClass("hide")
            }
        }
        if (e == 0 && f == true) {
            $.ajax({
                url: g,
                dataType: "script",
                cache: true
            }).done(function () {
                sessionStorage.setItem(l, glbVersion)
            })
        }
    }
};
var loadFunction = function (b, d, e) {
    e = (e == undefined ? "" : e);
    if (b != undefined && d != undefined) {
        if (sessionStorage.getItem(b) == glbVersion) {
            window[d](e)
        } else {
            var c = (glbAppConf.ajaxCDN == "" ? "model/" + b + ".js" + glbVersion : glbAppConf.ajaxCDN + "model/" + sessionStorage.getItem("random") + "/" + b + ".js");
            $.ajax({
                url: c,
                dataType: "script",
                cache: true
            }).done(function () {
                sessionStorage.setItem(b, glbVersion);
                window[d](e)
            })
        }
    }
};
var direcionaUsuario = function (b, f, g) {
    var l = (g ? g : glbAppName),
        k = LZString.decompressFromUTF16(localStorage.getItem("TPermissao" + l + glbLC)),
        c = sessionStorage.getItem("hash"),
        m = [],
        d = "";
    if (k) {
        d = JSON.parse(k)
    }
    if (d != "") {
        $.each(d.Menu, function (p, o) {
            m.push(o.Elemento)
        })
    }
    var j = $.inArray(c, m);
    if (b == false) {
        if (c == undefined || j < 0) {
            sessionStorage.setItem("hash", "Home")
        }
        if (f == undefined) {
            f = ""
        }
        if (glbAppConf.nome == "erp" && $.inArray(l, glbAppConf.apps) > -1) {
            window.location.assign(f + "?" + l + "#" + sessionStorage.getItem("hash"))
        } else {
            if (glbAppConf.nome == "csc" && $.inArray(l.replace("Login", ""), glbAppConf.apps) > -1) {
                var e = LZString.decompressFromUTF16(localStorage.getItem("Continue" + glbLC));
                if (e) {
                    window.location.assign(f + "?" + l.replace("Login", "") + "#" + (sessionStorage.getItem("hash") != "Home" ? JSON.parse(e)["Item"] : "Home"))
                } else {
                    window.location.assign(f + "?" + l.replace("Login", "") + "#" + sessionStorage.getItem("hash"))
                }
            } else {
                if (glbAppConf.nome == "erp") {
                    window.location.assign(f + "?Financial#Home")
                }
            }
        }
    } else {
        return j
    }
};
var criaHtmlArquivos = function (b, f, g) {
    var k = f.split("/"),
        j = g.find('[data-flabel="' + b + '"]').length,
        l = "",
        c = decodeEntities(decodeURIComponent(k[1])).replace(/\+/g, " "),
        e = "TFiles[][" + b + "]";
    k[2] = (k[2] == undefined ? "" : k[2]);
    try {
        if (b.split("[]").length > 1) {
            e = b
        }
    } catch (d) {}
    l += '<div class="form-group" data-closest="" >';
    l += '<input type="text" name="' + e + '" value="' + k[0] + '" class="hide" >';
    if (j < 1) {
        l += '<label class="control-label col-sm-2" ></label>'
    }
    l += '<div class="col-sm-10">';
    if (glbAppName == "Files" && b == "Anexos") {
        l += '<button type="button" class="btn btn-xs btn-primary AtualizaArquivo" >';
        l += '<span class="glyphicon glyphicon-cloud-upload"></span>';
        l += "</button> "
    } else {
        if (glbAppName == "Files" && b == "CompartilhamentoAlterar") {
            l += '<button type="button" class="btn btn-xs btn-primary AtualizaArquivo" >';
            l += '<span class="glyphicon glyphicon-cloud-upload"></span>';
            l += "</button> "
        }
    }
    l += '<button type="button" class="btn btn-xs btn-info VisualizarArquivo" data-ntmp="' + c + '" ' + k[2] + " >" + c + "</button> ";
    if (b != "Publico" && b != "CompartilhamentoAlterar" && b != "CompartilhamentoVer") {
        l += '<button type="button" class="btn btn-xs btn-danger ExcluirArquivos" >';
        l += '<span class="glyphicon glyphicon-trash"></span>';
        l += "</button>"
    }
    l += "</div>";
    l += "</div>";
    return l
};
var criaBaseGridPadrao = function (d, j) {
    var e = ((glbWidth < 768) ? "<br>" : ""),
        m = [];
    if (j.Titulo != false) {
        m.push($("<div>").attr({
            "class": "row"
        }).append($("<div>").attr({
            "class": "col-lg-12 " + (glbWidth > 768 ? "Mt3" : "")
        }).append($("<h3>").attr({
            "class": "page-header " + (glbWidth > 768 ? "hide" : "")
        }).text(L[d]).append($(e + "<small>")))))
    }
    m.push($("<div>").attr({
        "class": "row col-md-12 Fn BotoesGridPadrao"
    }).append($("<div>").attr({
        "class": "panel panel-default"
    }).append($("<div>").attr({
        "class": "panel-body"
    }).append($("<div>").attr({
        "class": "table-responsive"
    }).append($("<table>").attr({
        "class": "table table-hover table-striped"
    }).append($("<thead>").attr({
        "class": "TheadC sorted_head"
    }), $("<tbody>").attr({
        "class": "TbodyC"
    }))), $("<p>").attr({
        "class": "text-right RodapeGridPadrao"
    })))));
    $("#Panel" + d).html(m);
    var g = $("#BotoesGridPadrao").find("div:first").clone().prependTo("#Panel" + d + " .BotoesGridPadrao");
    g.traduzItens();
    var l = $("#Panel" + d + " .panel-body:first");
    $("#FormPesquisaGridPadrao").find("div:first").clone().prependTo(l);
    l.traduzItens();
    if (j.CheckedAtivo == undefined) {
        j.CheckedAtivo = "1"
    }
    l.find(".aGrid:eq(" + j.CheckedAtivo + ")").prop("checked", true);
    if (j.LabelAtivar) {
        l.find('[data-l="Ativos"]').text(j.LabelAtivar)
    }
    if (j.LabelDesativar) {
        l.find('[data-l="NaoAtivos"]').text(j.LabelDesativar)
    }
    var f = l.find('[name="Ativo"]').attr("name", d + "Ativo");
    $("#PaginacaoGridPadrao").find("ul:first").clone().insertAfter("#Panel" + d + " .RodapeGridPadrao:first");
    if (j.BtnCriar == false || permissaoBotoes(d, "Criar") == true) {
        g.find(".Criar").remove()
    } else {
        g.find(".Criar").attr({
            "data-toggle": "tooltip",
            "data-placement": "auto top",
            title: L.Criar + " (c)",
            id: "Panel" + d + "Criar"
        })
    }
    if (j.BtnAtivar == false) {
        g.find(".Ativar").remove()
    } else {
        if (permissaoBotoes(d, "Editar") == true && j.BtnAtivar == false) {
            g.find(".Ativar").remove()
        } else {
            g.find(".Ativar").attr({
                "data-toggle": "tooltip",
                "data-placement": "auto top",
                title: L[(j.TTAtivar ? j.TTAtivar : "Desativar")]
            })
        }
    }
    if (j.IconAtivar) {
        g.find(".Ativar span").removeClass("glyphicon-remove").addClass(j.IconAtivar)
    }
    if (j.BtnExcluir == false || permissaoBotoes(d, "Excluir") == true) {
        g.find(".Excluir").remove()
    } else {
        g.find(".Excluir").attr({
            "data-toggle": "tooltip",
            "data-placement": "auto top",
            title: L[(j.TTExcluir ? j.TTExcluir : "Excluir")]
        })
    }
    if (j.IconExcluir) {
        g.find(".Excluir span").removeClass("glyphicon-trash").addClass(j.IconExcluir)
    }
    if (j.Ativar == false) {
        f.closest("div").parent().remove()
    }
    if (j.Importar == false || permissaoBotoes(d, "Criar") == true) {
        l.find(".Importar").parent().remove()
    }
    if (j.Exportar == false) {
        l.find(".Exportar").addClass("hide")
    }
    if (j.MenuAdicional) {
        var k = j.MenuAdicional.length;
        var b = "";
        var c = "";
        var m = "<form>";
        for (i = 0; i < k; i++) {
            $.each(j.MenuAdicional[i], function (p, o) {
                if (j.MenuAdicionalChecked[o.name] == o.value) {
                    b = "checked";
                    c += ((k == 1 || i > 0) ? " " + o.label + " " : " (" + o.label + ") ")
                } else {
                    b = ""
                }
                m += "<div>";
                m += '<label class="control-label col-sm-1" ></label>';
                m += '<div class="col-sm-11">';
                m += '<label class="radio-inline">';
                m += '<input type="radio" name="' + o.name + '" value="' + o.value + '" ' + b + ' class="aGrid" >';
                m += "<span>" + o.label + "</span>";
                m += "</label>";
                m += "</div>";
                m += "</div>"
            });
            if (i < k) {
                m += "<div>";
                m += '<label class="control-label col-sm-1" ></label>';
                m += '<div class="col-sm-11"></div>';
                m += "</div>"
            }
        }
        m += "</form>";
        $("#Panel" + d).find("small").text(c);
        $("#Panel" + d).find('[data-h="menuAdicional"]').append(m)
    }
    if (j.PesquisaPanel) {
        $("#Panel" + d).find('[name="Pesquisa"]').val(j.PesquisaPanel)
    }
    if (glbWidth > 768) {
        $("#my-page-header").text("» " + $("#Panel" + d).find(".page-header").text())
    }
};
var aplicaCorBotaoPA = function (b, g) {
    var k = $("#ModalPA" + g),
        d = "",
        l = k.find("form").serializeJSON(),
        c = JSON.stringify(l),
        f = b.find(".PAvancada"),
        j = f.closest('[data-h="botoesBase"]').find(".popoverPA");
    try {
        if (f.attr("class").search("btn-danger") >= 0) {
            return ""
        }
    } catch (e) {}
    if (c != "{}") {
        c = "," + c.substring(1);
        c = c.substring(0, c.length - 1);
        if (glbAppConf.nome == "erp") {
            l = l.Filtro;
            $.each(l, function (o, m) {
                if (typeof m === "object") {
                    if (Array.isArray(m) == true) {
                        d += m[0] + m[2]
                    } else {
                        $.each(m, function (q, p) {
                            if (typeof p === "object") {
                                $.each(p, function (s, r) {
                                    if (s != "Campo") {
                                        d += r
                                    }
                                })
                            } else {
                                d += p
                            }
                        })
                    }
                } else {
                    if (k.find('[name="Filtro[' + o + ']"]').attr("type") != "hidden") {
                        d += m
                    }
                }
            })
        } else {
            $.each(l, function (o, m) {
                if (typeof m === "object") {
                    $.each(m, function (q, p) {
                        if (k.find('[name^="' + o + "[" + q + ']"]').attr("type") != "hidden") {
                            if (typeof p === "object") {
                                $.each(p, function (s, r) {
                                    if (s != "Campo") {
                                        d += r
                                    }
                                })
                            } else {
                                d += p
                            }
                        }
                    })
                } else {
                    if (k.find('[name="' + o + '"]').attr("type") != "hidden") {
                        d += m
                    }
                }
            })
        }
        d = d.replace(/undefined/g, "");
        if (d == "") {
            f.addClass("btn-info").removeClass("btn-warning");
            j.remove()
        } else {
            f.addClass("btn-warning").removeClass("btn-info");
            if (j.length == 0 && g.indexOf("Home") < 0 && glbWidth > 768) {
                f.after('<div class="popover fade right popoverPA in" role="tooltip" style="display: block;"><div class="arrow" style="top: 50%;"></div><div class="popover-content Cp lFormAvancadoPanel">Ativo <i class=\'fa fa-eraser fa-fw Cp\'></i></div></div>')
            }
        }
    } else {
        c = "";
        f.addClass("btn-info").removeClass("btn-warning");
        j.remove()
    }
    return c
};
var carregaGridPadrao = function (e, c, o, k) {
    var m = e.split(",");
    e = m[0];
    c = typeof c !== "undefined" ? c : "";
    o = typeof o !== "undefined" ? o : "";
    k = typeof k !== "undefined" ? k : "";
    var f = "",
        q = [],
        t = [],
        d = (m[1] == undefined ? e : m[1]),
        j = (m[2] == undefined ? (!glbAppConf.bp ? "lista" : "list") : m[2]),
        r = $("#Panel" + e),
        w = r.find('[data-direcao="true"],[data-direcao="false"]');
    w.each(function (x) {
        var y = $(this),
            A = y.attr("data-direcao"),
            B = y.attr("data-coluna"),
            z = y.attr("data-ordem");
        q[z] = ',{"Coluna":"' + B + '","Direcao":"' + A + '"}';
        t[x] = z
    });
    t.sort();
    for (i = 0; i < t.length; i++) {
        f += q[t[i]]
    }
    var l = r.find("[name=Pesquisa]").val(),
        b = r.find("[name=" + e + "Ativo]:checked").val();
    l = typeof l !== "undefined" ? l : "";
    if (l) {
        l = l.replace(/"|\u200e/g, "")
    }
    b = typeof b !== "undefined" ? b : "";
    var u = r.find(".lGrid");
    if (l) {
        if (u.length == 0) {
            r.find(".aGrid:eq(1)").before('<button data-original-title="' + L.Limpar + '" data-placement="auto top" data-toggle="tooltip" class="btn btn-default lGrid" type="button" style="left:1px;color:#772581;background-color:#fff;border-color:#fff;"><span class="glyphicon glyphicon-erase"></span></button>')
        }
    } else {
        u.remove()
    }
    if (o == "") {
        o = JSON.stringify(r.find('[data-h="menuAdicional"]').find("form").serializeJSON())
    }
    if (o != "{}") {
        o = "," + o.substring(1);
        o = o.substring(0, o.length - 1)
    } else {
        o = ""
    }
    var s = aplicaCorBotaoPA(r, e);
    if (glbAppConf.nome == "erp") {
        var p = "";
        if (s == "" && o) {
            p = ',"Filtro":{' + o.slice(1) + "}"
        } else {
            if (s) {
                p = s.slice(0, -1) + o + "}"
            }
        }
        var g = "{" + c + '"Pesquisa":"' + l + '","Ativo":"' + b + '","Ordem":[' + f.substring(1) + "]" + p + "}"
    } else {
        var g = "{" + c + '"Pesquisa":"' + l + '","Ativo":"' + b + '","Ordem":[' + f.substring(1) + "]" + o + s + "}"
    }
    if (k.retornafiltro == true) {
        return g
    }
    r.find(".aGrid,.aGridAvancado,.Mais").prop("disabled", true);
    $.ajax({
        url: glbAppConf.base + d + glbAppConf.extensao + "/" + j,
        type: "POST",
        contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
        data: (glbAppConf.ct != "json" ? {
            Dados: g,
            App: glbAppName,
            Mobile: (glbWidth > 768 ? false : true)
        } : g)
    }).done(function (O) {
        r.find(".aGrid,.aGridAvancado,.Mais").prop("disabled", false);
        if (O) {
            var F = JSON.parse(feT(O));
            if (F.erro) {
                $("#Msg").exibeMsg("#MsgFalha", F.erro);
                try {
                    callNenhumRegistro(r)
                } catch (D) {}
            } else {
                direcionaPagamento(F, false);
                var K = F.root,
                    P = F.total,
                    N = F.session,
                    y = "Editar",
                    A = false,
                    G = F.trigger,
                    x = F.rodape,
                    E = F["function"],
                    z = [],
                    H = "",
                    B = r.find(".TheadC th");
                if (N == "0") {
                    window.location = "?" + (glbAppName == "Portal" ? "LoginPortal" : "LoginTicket")
                }
                if (F.edicao == false) {
                    y = "";
                    A = true
                } else {
                    if (F.visualizacao == true) {
                        A = true
                    } else {
                        if (F.marcacao == true) {
                            y = ""
                        }
                    }
                }
                if (localStorage.getItem("teste" + glbLC) == "true") {
                    $.each(K, function (R, Q) {
                        var S = "";
                        S += '<div class="col-lg-4 col-md-4 TrC" >';
                        S += '<div class="panel Fs13"><div class="panel-heading"><div class="row"><div class="col-xs-12">';
                        B.each(function (V) {
                            var U = $(this).attr("data-coluna");
                            var Y = $(this).attr("data-formato");
                            if (U == "Chave") {
                                S += '<div><input type="checkbox" value="' + Q.Chave + '" ' + (A == true ? 'disabled class="hide"' : (glbCHide.indexOf(glbAppName + "." + e) < 0 ? "" : 'class="hide"')) + " ></div>"
                            } else {
                                var X = "";
                                X += Q[U];
                                if (Y != undefined) {
                                    var T = {};
                                    farray = Y.split(",");
                                    Y = farray[0];
                                    if (farray.length > 1) {
                                        farray[0] = U;
                                        $.each(farray, function (aa, Z) {
                                            T[Z] = (Q[Z] != undefined ? Q[Z] : "")
                                        })
                                    } else {
                                        T = (Q[U] != undefined ? Q[U] : "")
                                    }
                                    try {
                                        X = window["formatoHtml" + Y](T)
                                    } catch (W) {}
                                }
                                try {
                                    X = X.replace("undefined", "");
                                    if (X != "" && X != "0") {
                                        S += '<div class="' + (Q.classAction == undefined ? y : Q.classAction) + ' text-nowrap Oh Toe" ><small>' + (L[U] != undefined ? L[U] + ": " : "") + "</small>" + X.replace(/<br>/g, " ") + "</div>"
                                    }
                                } catch (W) {}
                            }
                        });
                        S += "</div></div></div></div></div>";
                        z.push(S)
                    })
                } else {
                    $.each(K, function (R, Q) {
                        var S = [];
                        B.each(function (V) {
                            var U = $(this).attr("data-coluna");
                            var Y = $(this).attr("data-formato");
                            if (U == "Chave") {
                                S.push($("<th>").append($("<input>").attr({
                                    type: "checkbox",
                                    value: Q.Chave,
                                    disabled: A
                                })))
                            } else {
                                var X = Q[U];
                                if (Y != undefined) {
                                    var T = {};
                                    farray = Y.split(",");
                                    Y = farray[0];
                                    if (farray.length > 1) {
                                        farray[0] = U;
                                        $.each(farray, function (aa, Z) {
                                            T[Z] = (Q[Z] != undefined ? Q[Z] : "")
                                        })
                                    } else {
                                        T = (Q[U] != undefined ? Q[U] : "")
                                    }
                                    try {
                                        X = window["formatoHtml" + Y](T)
                                    } catch (W) {
                                        r.find(".agrid:eq(0)").trigger("click")
                                    }
                                }
                                S.push($("<td>").attr({
                                    "class": (Q.classAction == undefined ? y : Q.classAction)
                                }).html(escapeTags(X, "script")))
                            }
                        });
                        z.push($('<tr class="TrC" >').append(S))
                    })
                }
                if (localStorage.getItem("teste" + glbLC) == "true") {
                    var J = r.find("tbody");
                    if (J.hasClass("TbodyC")) {
                        r.find(".table-responsive:first").after('<div class="row TbodyC"></div>');
                        r.find(".TheadC").addClass("hide");
                        J.remove()
                    }
                } else {
                    var J = r.find("div");
                    if (J.hasClass("TbodyC")) {
                        J.find(".TbodyC").remove();
                        r.find(".TheadC").after('<tbody class="TbodyC" ></tbody>').addClass("sorted_head")
                    }
                }
                if (z[0] != undefined) {
                    var I = "";
                    if (c == "" || c.search('"Tudo":"true"') >= 0) {
                        r.find(".TbodyC:first").html(z);
                        I = K.length;
                        r.find(".Total").text(I + "/" + P);
                        r.find(".TotalSelected").text("")
                    } else {
                        r.find(".TbodyC:first").append(z);
                        I = r.find(".TbodyC .TrC").length;
                        r.find(".Total").text(I + "/" + P);
                        r.find(".TotalSelected").text("")
                    }
                    if (I >= P) {
                        r.find(".Total").text(P + "/" + P);
                        r.find(".Mais").prop("disabled", true)
                    } else {
                        r.find(".Mais").prop("disabled", false)
                    }
                    if (x) {
                        try {
                            window["rodape" + e](x)
                        } catch (D) {
                            attrRodape = r.find(".RodapeGridPadrao");
                            attrRodape.html(escapeTags(x, "script"));
                            if (attrRodape.find("table").length) {
                                r.find(".TheadC th").each(function (Q) {
                                    attrRodape.find("th:eq(" + Q + ")").css("width", $(this).width())
                                })
                            }
                        }
                    }
                } else {
                    if (localStorage.getItem("teste" + glbLC) == "true") {
                        var z = '<div class="col-lg-12 col-md-12">';
                        z += '<div class="panel Fs13">';
                        z += '<div class="panel-heading">';
                        z += '<div class="row">';
                        z += '<div class="col-xs-12">' + L.MsgNenhumRegistro + "</div>";
                        z += "</div>";
                        z += "</div>";
                        z += "</div>";
                        z += "</div>"
                    } else {
                        var z = "<tr>";
                        z += (A == true ? "<td></td>" : "");
                        z += '<td colspan="' + (B.length) + '" >';
                        z += L.MsgNenhumRegistro;
                        z += "</td>";
                        z += "</tr>"
                    }
                    try {
                        window["rodape" + e](x)
                    } catch (D) {
                        r.find(".RodapeGridPadrao").html(escapeTags(x, "script"))
                    }
                    r.find(".TbodyC:first").html(escapeTags(z, "script"));
                    r.find(".Mais").prop("disabled", true);
                    r.find(".Total").text("0/0");
                    r.find(".TotalSelected").text("");
                    try {
                        callNenhumRegistro(r)
                    } catch (D) {}
                }
                if (G) {
                    $(G).trigger("click")
                }
                if (E) {
                    E = JSON.parse(E);
                    window["retornoGrid" + E.name](E.parameters)
                }
            }
            r.find(".iAtualiza").removeClass("fa-spin");
            r.find(".Mais span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-chevron-down");
            var M = r.find('[name="PesquisaLocal"]').val();
            if (M) {
                r.find(".TbodyC:first").removeHighlight().highlight(M)
            }
            r.find(".CheckBoxAll").prop("disabled", A);
            r.find(".CBED").prop("disabled", true);
            if (glbWidth > 768) {
                var C;
                r.find(".sorted_head tr").sortable({
                    delay: 150,
                    containerSelector: "tr",
                    itemSelector: "th",
                    placeholder: '<th class="placeholder"/>',
                    vertical: false,
                    onDragStart: function (R, Q, S) {
                        C = R.index();
                        R.appendTo(R.parent());
                        S(R, Q)
                    },
                    onDrop: function (R, Q, T) {
                        var V, S = R.index();
                        if (S != C) {
                            R.closest("table").find("tbody tr").each(function (W, X) {
                                X = $(X);
                                if (S < C) {
                                    X.children().eq(S).before(X.children()[C])
                                } else {
                                    if (S > C) {
                                        X.children().eq(S).after(X.children()[C])
                                    }
                                }
                            })
                        }
                        var U = [];
                        R.parent().find("[data-coluna]").each(function () {
                            U.push($(this).attr("data-coluna"))
                        });
                        T(R, Q)
                    }
                })
            }
        }
        if (glbWidth > 768) {
            r.find('[data-toggle="tooltip"]').tooltip({
                html: true,
                container: "body"
            });
            try {
                r.find(".popoverPA").css("left", (r.find(".PAvancada").position().left + 41) + "px").addClass("in")
            } catch (D) {}
        }
        r.find('[data-h="contextMenu"]').hide();
        r.find('[type="checkbox"][value="' + sessionStorage.getItem("Cg" + $(location).prop("hash").substring(1)) + '"]').closest(".TrC").addClass("Cg")
    }).fail(function (x) {
        r.find(".aGrid,.aGridAvancado,.Mais").prop("disabled", false);
        r.find(".iAtualiza").removeClass("fa-spin");
        r.find(".Mais span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-chevron-down");
        $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + x.status]);
        if (glbWidth > 768) {
            r.find('[data-toggle="tooltip"]').tooltip({
                html: true
            })
        }
    });
    if (!(c && r.find(".TbodyC :checked").length)) {
        r.find(".Excluir,.Ativar").addClass("hide")
    }
    r.find(".CheckBoxAll").prop("checked", false)
};
var permissaoBotoes = function (d, c) {
    var f = LZString.decompressFromUTF16(localStorage.getItem("TPermissaoControles" + glbLC));
    if (f != null) {
        var b = JSON.parse(f),
            e = false;
        if ($.inArray(d + "." + c, b) < 0) {
            e = true
        }
        return e
    }
};
var modalLoginTipo = function (e, d) {
    var c = LZString.decompressFromUTF16(localStorage.getItem("T" + e + glbLC)),
        g = LZString.decompressFromUTF16(localStorage.getItem(e + "Descricao" + glbLC)),
        f = 0;
    if (c) {
        c = JSON.parse(c);
        var k = $("#ModalLogin" + e),
            b = '<select class="form-control" name="' + e + '" data-b="local" required >';
        $.each(c, function (m, l) {
            if (g == l.Descricao || (g == null && m == 0)) {
                f = m;
                b += '<option value="' + l[e] + '" selected="selected" >' + l.Descricao + "</option>"
            } else {
                b += '<option value="' + l[e] + '" >' + l.Descricao + "</option>"
            }
        });
        b += "</select>";
        k.find('[data-h="Login' + e + '"]').html(b);
        if (e == "Empresa") {
            $("#ModalLoginEmpresa").find('[name="Prefixo"]').val(LZString.decompressFromUTF16(localStorage.getItem("Prefixo" + glbLC)))
        }
        if (c.length > 10) {
            k.criaBuscaLocal()
        }
        k.traduzItens();
        k.modal("show");
        try {
            if (c[f]["UnificarMulti"] == "S" && (d > 0)) {
                setTimeout(function () {
                    k.find(".Logar:eq(0)").trigger("click")
                }, d)
            }
        } catch (j) {}
    }
};
var geraUrl = function (l) {
    if (l.href) {
        var d = $("<a>").attr({
            href: l.href,
            target: "_blank",
            "class": "btn btn-success FM",
            role: "button"
        }).html(l.text)
    } else {
        if (l.click) {
            var d = $("<a>").attr({
                href: "javascript:void(0);",
                onClick: l.click,
                "class": "btn btn-success FM",
                role: "button"
            }).html(l.text)
        } else {
            if (l.format == true) {
                var j = l.content.split("\n");
                var c = $("#Modal" + sessionStorage.getItem("hash"));
                var k = "";
                $.each(j, function (q, p) {
                    var o = "";
                    $.each(p.split('","'), function (s, r) {
                        r = r.replace(/"/g, "");
                        o += ',"' + r + '"'
                    });
                    k += o.substring(1) + "\n"
                });
                l.base64 = window.btoa(k)
            }
            var m = (((glbWVAndroid < 0 || glbWViOS == false) && l.file) ? 'download="' + l.file + '"' : "");
            if (window.chrome != undefined && glbWVAndroid < 0) {
                var e = "data:" + l.type + (l.charset == undefined ? "" : ";charset=" + l.charset) + ";base64," + encodeURIComponent(l.base64)
            } else {
                var e = "data:" + l.type + ";base64," + l.base64
            }
            var d = '<a href="' + e + '" target="_blank" class="btn btn-success FM" role="button" ' + m + " >" + l.text + "</a>"
        }
    }
    if (l.file) {
        $("#Msg").exibeMsg("#MsgSucesso", L.EnvioSucesso, false, false);
        $("#Msg").find("div:first").delay((L.EnvioSucesso.length * 150)).fadeOut();
        if (l.type != "application/msexcel") {
            if (window.chrome != undefined && glbWVAndroid < 0) {
                function f(r, q) {
                    if (q.indexOf("text/") < 0) {
                        var o = new Uint8Array(r.length);
                        for (var p = 0; p < r.length; p++) {
                            o[p] = r.charCodeAt(p)
                        }
                        return o
                    } else {
                        return r
                    }
                }
                var b = new Blob([f(window.atob(l.base64), l.type)], {
                    type: l.type
                });
                var g = document.createElement("a");
                g.href = window.URL.createObjectURL(b);
                g.download = l.file;
                g.click()
            } else {
                var g = document.createElement("a");
                g.href = e;
                g.download = l.file;
                document.body.appendChild(g);
                g.click()
            }
        } else {
            $.ajax({
                url: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.12.9/xlsx.full.min.js",
                cache: true
            }).done(function () {
                $("#idTempDownload").html(decodeURIComponent(escape(window.atob(l.base64))));
                var r = "xlsx";
                var p = document.getElementById("idTempDownload");
                var s = XLSX.utils.table_to_book(p);
                var o;
                var q;
                $("#idTempDownload").empty();
                return o ? XLSX.write(s, {
                    bookType: r,
                    bookSST: true,
                    type: "base64"
                }) : XLSX.writeFile(s, q || (l.file + "." + (r || "xlsx")))
            })
        }
    } else {
        $("#Msg").exibeMsg("#MsgSucesso", d, false, false);
        if (l.timeout) {
            $("#Msg").find("div:first").delay(parseInt(l.timeout)).fadeOut()
        }
    }
};
var fbsExportar = function (b) {
    var c = $(b).closest(".modal");
    if (c.find("form :checked").length < 1) {
        c.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L.MarqueMinimoColuna);
        return false
    } else {
        return true
    }
};
$("#ContainerApp").on("click", ".CNPJ", function () {
    var f = $(this),
        j = f.closest(".modal"),
        d = j.prop("id").replace("Modal", ""),
        b = j.find('[data-mc="CNPJ"]').val(),
        g = j.find("#Chave" + d),
        e = g.val(),
        c = g.prop("name").split("[")[0];
    if (b) {
        f.prop("disabled", true);
        var g = f.find("span");
        g.removeClass("glyphicon-search").addClass("fa fa-refresh fa-spin");
        $.ajax({
            url: glbAppConf.base + "CNPJ" + glbAppConf.extensao,
            type: "POST",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: {
                Valor: b,
                Entidade: c,
                App: glbAppName
            }
        }).done(function (l) {
            f.prop("disabled", false);
            var k = JSON.parse(l);
            if (!k.erro) {
                j.find(".TEnderecos_Form").empty();
                j.populaForm(k);
                j.dateTimePicker()
            } else {
                j.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", k.erro)
            }
            g.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-search")
        }).fail(function (k) {
            f.prop("disabled", false);
            g.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-search");
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + k.status])
        })
    }
});
$("#Menu,#Base,#ContainerApp").on("click", ".CEP,.Suframa", function () {
    var d = $(this),
        j = d.closest('[role="form"]'),
        f = j.find("[data-ws]"),
        b = f.attr("data-ws"),
        g = f.val();
    if (g) {
        var c = d.find("span"),
            e = new RegExp(/(\w+)(\[(\w+)?\])?(\[(\w+)\])?/g),
            k = e.exec(f.prop("name"));
        c.removeClass("glyphicon-search").addClass("fa fa-refresh fa-spin");
        $.ajax({
            url: glbAppConf.base + b,
            type: "POST",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: {
                Valor: g,
                App: glbAppName
            }
        }).done(function (m) {
            var l = JSON.parse(m);
            if (k[2] == undefined) {
                $.each(l, function (p, o) {
                    j.find('[name="' + p + '"]').populaBuscaAjaxForm(o)
                })
            } else {
                if (k[4] == undefined) {
                    $.each(l, function (p, o) {
                        j.find('[name="' + k[1] + "[" + p + ']"]').populaBuscaAjaxForm(o)
                    })
                } else {
                    k[2] = k[2].replace(/[CEP]|Suframa|[CNPJ]/, "");
                    $.each(l, function (p, o) {
                        j.find('[name="' + k[1] + k[2] + "[" + p + ']"]').populaBuscaAjaxForm(o)
                    })
                }
            }
            if (l.Uf) {
                j.find('[data-fc="true"]').focus()
            }
            c.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-search")
        }).fail(function (l) {
            c.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-search");
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + l.status])
        })
    }
});
$("#Menu,#Base").on("click", ".Logar", function () {
    var j = $(this),
        k = j.attr("data-tm"),
        o = j.attr("data-ag"),
        p = j.closest(".modal"),
        b = p.find(".MsgModal:eq(0)"),
        e = p.prop("id").replace("Modal", ""),
        c = p.find("form"),
        d = c.serializeJSON(),
        m = JSON.stringify(d),
        f = p.required();
    if (f.total == 0) {
        var l = "",
            g = j.text();
        j.text(L.Aguarde).prop("disabled", true);
        if (d.Email != undefined || d.Login != undefined) {
            localStorage.setItem("EmailUser" + glbLC, LZString.compressToUTF16(d.Email));
            localStorage.setItem("LoginUser" + glbLC, LZString.compressToUTF16(d.Login));
            if (d.LembrarMeusDados == "on") {
                localStorage.setItem("LMD" + glbLC, LZString.compressToUTF16(d.Senha))
            } else {
                localStorage.removeItem("LMD")
            }
        }
        $.ajax({
            url: glbAppConf.base + k,
            type: "POST",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: (glbAppConf.ct != "json" ? {
                Dados: m
            } : m)
        }).done(function (w) {
            try {
                var u = (glbAppConf.ct != "json" ? JSON.parse(w) : w);
                l = u.erro, sucesso = u.sucesso, erropanel = u.erropanel, sucessopanel = u.sucessopanel
            } catch (r) {}
            if (typeof u === "object") {
                var x = u.root;
                if (x) {
                    if (x.DuasEtapas && x.TipoDuasEtapas) {
                        var A = $("#ModalLoginToken");
                        A.find('[name="Chave"]').val(x.Chave);
                        A.find('[name="Prefixo"]').val(x.Prefixo);
                        A.find('[name="TipoDuasEtapas"]').val(x.TipoDuasEtapas);
                        A.find("h4 span").text(L[x.TipoDuasEtapas]);
                        A.traduzItens();
                        A.modal("show");
                        var z = A.find(".ReenviarSMS");
                        if (x.TipoDuasEtapas != "GA") {
                            z.prop("disabled", true);
                            setTimeout(function () {
                                z.prop("disabled", false)
                            }, 10000)
                        } else {
                            z.addClass("hide")
                        }
                        j.text(g).prop("disabled", false)
                    } else {
                        if (x.Dispositivo) {
                            localStorage.setItem("Dispositivo" + glbLC, LZString.compressToUTF16(x.Dispositivo.toString()))
                        }
                        if (u.TPrefixo || u.TEmpresa) {
                            var q = u.TPrefixo ? "Prefixo" : "Empresa";
                            localStorage.setItem("T" + q + glbLC, LZString.compressToUTF16(JSON.stringify(u["T" + q])));
                            modalLoginTipo(q, 1);
                            j.text(g).prop("disabled", false)
                        } else {
                            if (u.TPrefixo == "" || u.TEmpresa == "") {
                                localStorage.removeItem("TPrefixo" + glbLC);
                                localStorage.removeItem("TEmpresa" + glbLC)
                            }
                            localStorage.setItem("UserName" + glbLC, LZString.compressToUTF16(x.Nome));
                            localStorage.setItem("UserCod" + glbLC, x.Codigo);
                            localStorage.setItem("Sessao" + glbLC, LZString.compressToUTF16(x.Sessao));
                            localStorage.setItem("PrefixoNome" + glbLC, LZString.compressToUTF16(x.PrefixoNome));
                            localStorage.setItem("PrefixoDescricao" + glbLC, LZString.compressToUTF16(x.PrefixoDescricao));
                            localStorage.setItem("EmpresaDescricao" + glbLC, LZString.compressToUTF16(x.EmpresaDescricao));
                            localStorage.setItem("Idioma" + glbLC, LZString.compressToUTF16(x.Idioma));
                            localStorage.setItem("MudarSenhaAtivo" + glbLC, LZString.compressToUTF16(x.MudarSenhaAtivo));
                            localStorage.setItem("Geral" + glbLC, LZString.compressToUTF16(JSON.stringify(x.Geral)));
                            $.each(glbAppConf.cache, function (C, B) {
                                localStorage.setItem(B + glbLC, LZString.compressToUTF16(JSON.stringify(u[B])))
                            });
                            if (x.AtivoLogo == "S" && x.Logo) {
                                localStorage.setItem("Logo" + glbLC, LZString.compressToUTF16(glbAppConf.CDN + x.Logo))
                            }
                            if ((typeof x.portalclientecss) != "undefined") {
                                localStorage.setItem("portalclientecss" + glbLC, LZString.compressToUTF16(x.portalclientecss))
                            }
                            $.each(glbAppConf.apps, function (C, B) {
                                localStorage.removeItem("TPermissao" + B + glbLC)
                            });
                            $.each(u.TPermissao, function (C, B) {
                                localStorage.setItem("TPermissao" + C + glbLC, LZString.compressToUTF16(JSON.stringify(B)))
                            });
                            var y = $(location).prop("search").replace("?", "").split("/")[0];
                            if ((glbAppConf.nome == "erp") && (y == "Login" || y == "AlteraSenha" || y == "AutoRegistration" || y == "Report" || y == "Warning")) {
                                direcionaUsuario(false, "", LZString.decompressFromUTF16(localStorage.getItem("App" + glbLC)))
                            } else {
                                if (glbAppConf.nome == "csc" && (y == "LoginTicket" || y == "LoginPortal")) {
                                    if (y == "LoginTicket") {
                                        for (var t = 0; t < localStorage.length; t++) {
                                            var s = localStorage.key(t);
                                            if (s.search("ModalPA") >= 0) {
                                                localStorage.removeItem(s)
                                            }
                                        }
                                        direcionaUsuario(false, "", LZString.decompressFromUTF16(localStorage.getItem("App" + glbLC)))
                                    } else {
                                        direcionaUsuario(false)
                                    }
                                } else {
                                    location.reload()
                                }
                            }
                        }
                    }
                } else {
                    if (l) {
                        b.exibeMsg("#MsgFalhaModal", l)
                    } else {
                        if (erropanel) {
                            $("#Msg").exibeMsg("#MsgFalha", erropanel)
                        } else {
                            if (sucessopanel) {
                                p.modal("hide");
                                $("#Msg").exibeMsg("#MsgSucesso", sucessopanel)
                            } else {
                                b.exibeMsg("#MsgSucessoModal", sucesso)
                            }
                        }
                    }
                    j.text(g).prop("disabled", false)
                }
            } else {
                b.exibeMsg("#MsgFalhaModal", l);
                j.text(g).prop("disabled", false)
            }
        }).fail(function (q) {
            j.text(g).prop("disabled", false);
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + q.status])
        })
    }
});
var removeVirgulas = function (e, c) {
    var b = JSON.stringify(c),
        d = e.find('[data-mc^="Valor"]');
    d.each(function () {
        var j = $(this),
            f = j.val();
        if (f) {
            var g = new RegExp(/.*\[(\w+)\]/).exec(j.prop("name")),
                k = formataNumero(f);
            b = b.replace('"' + g[1] + '":"' + f + '"', '"' + g[1] + '":"' + k + '"')
        }
    });
    return b
};
var marcaIntervaloCheckbox = function (j, f) {
    var d = "";
    f.each(function (m, l) {
        if ($(this).is(":checked")) {
            d += "," + m
        }
    });
    var c = d.substring(1).split(","),
        g = Math.min.apply(null, c),
        e = Math.max.apply(null, c),
        b = "";
    for (i = g; i < e; i++) {
        b += ",input:eq(" + i + ")"
    }
    if (b) {
        return j.find(b.substring(1))
    } else {
        return ""
    }
};
$("#Menu,#Base,#ContainerApp").on("click", ".Salvar,.Enviar", function () {
    var k = true;
    if (!($(this).attr("data-fbs") == undefined)) {
        k = window["fbs" + $(this).attr("data-fbs")](this)
    }
    if (k == true) {
        var p = $(this),
            q = p.attr("data-tm"),
            s = p.attr("data-ag"),
            g = p.closest(".modal").prop("id"),
            t = $("#" + g),
            b = t.find(".MsgModal:eq(0)"),
            j = g.replace(/^Modal(2|3|4|5|6|7|8|9|10|11|12|13)?/, ""),
            e = t.find("form"),
            o = e.attr("method"),
            d = e.attr("data-ac"),
            l = t.required();
        if (glbAppConf.serialize) {
            var c = e.serializeJSON({
                checkboxUncheckedValue: glbAppConf.serialize["unchecked"]
            })
        } else {
            var c = e.serializeJSON()
        }
        json = removeVirgulas(e, c);
        if (l.total == 0) {
            var r = "",
                f = "",
                m = p.html();
            p.text(L.Aguarde).prop("disabled", true);
            $.ajax({
                url: glbAppConf.base + q,
                type: o,
                contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
                data: (glbAppConf.ct != "json" ? {
                    Dados: json,
                    Menu: $(location).prop("hash").substring(1),
                    App: glbAppName
                } : json)
            }).done(function (R) {
                try {
                    var D = JSON.parse(R),
                        E = D.erro,
                        u = D.erropanel,
                        w = D.url,
                        A = D.sucesso,
                        y = D.sucessopanel,
                        B = D.trigger,
                        C = D["function"],
                        F = D.limite
                } catch (x) {}
                if ((E == "" || E == undefined) && (u == "" || u == undefined)) {
                    t.find('[name="' + j + '[Chave]"]').val("");
                    if (s == "true") {
                        j = (p.attr("data-agn") || j);
                        var G = $("#Panel" + j);
                        G.find(".iAtualiza").addClass("fa-spin");
                        var I = (G.find(".TbodyC .TrC").length);
                        if (I <= 15) {
                            carregaGridPadrao(j)
                        } else {
                            carregaGridPadrao(j, '"Tudo":"true","Tatual":"' + I + '",')
                        }
                    }
                    p.html(m).prop("disabled", false);
                    var N = sessionStorage.getItem("qtdListasAjax");
                    var O = sessionStorage.getItem("aListasAjax" + N);
                    if (O) {
                        var M = JSON.parse(O),
                            P = M.text.split(","),
                            z = "";
                        $.each(P, function (U, T) {
                            var S = t.find('[name="' + T + '"]');
                            if (S.attr("type") != undefined) {
                                z += " - " + S.val()
                            } else {
                                var V = S.find("option:selected").text();
                                z += (V != "" ? " - " + V : "")
                            }
                        });
                        M.eq = (M.eq != undefined ? ":eq(" + M.eq + ")" : "");
                        if (z != "") {
                            var H = $("#Modal" + M.modal).find('select[name*="' + M.retorno + '"]' + M.eq + ":enabled"),
                                Q = '<option value="' + R.replace(/[{"root":"]|["}]/g, "").replace("\\\\", "\\").trim() + '" selected >' + z.substring(3) + "</option>";
                            if (M.retorno.match(/.*\[\]$/g) == null) {
                                H.html(Q).change()
                            } else {
                                H.append(Q).change()
                            }
                            if (M.trigger) {
                                H.trigger(M.trigger)
                            }
                        }
                        sessionStorage.removeItem("aListasAjax" + N);
                        N = parseInt(N - 1);
                        sessionStorage.setItem("qtdListasAjax", (N < 0 ? 0 : N));
                        sessionStorage.setItem("modalListasAjax", "false")
                    }
                    if (d) {
                        var M = JSON.parse(d),
                            K = $("#Modal" + M.modal);
                        $.each(M.formReset, function (T, S) {
                            K.find(S.value).empty()
                        });
                        K.populaForm(D)
                    }
                    if (p.closest("div").find(".Continuar").prop("checked")) {
                        var J = t.find('input[data-rs="false"]');
                        J.each(function () {
                            var T = $(this),
                                U = T.prop("name"),
                                S = t.find('form input[name="' + U + '"]').val();
                            T.val(S)
                        });
                        if (w) {
                            geraUrl(w)
                        } else {
                            b.exibeMsg("#MsgSucessoModal", L.SalvoSucesso)
                        }
                        t.criaFormModal(L.Criar, true, true);
                        t.find(":required").first().focus();
                        t.find(".ContinuarTrigger").trigger("click");
                        t.find(".Editar,[data-lselect2]").addClass("hide");
                        t.find(".Criar").removeClass("hide")
                    } else {
                        if (w) {
                            geraUrl(w);
                            t.modal("hide")
                        } else {
                            if (A == undefined && y == undefined) {
                                t.modal("hide");
                                $("#Msg").exibeMsg("#MsgSucesso", L.SalvoSucesso)
                            } else {
                                if (y) {
                                    t.modal("hide");
                                    $("#Msg").exibeMsg("#MsgSucesso", y)
                                } else {
                                    b.exibeMsg("#MsgSucessoModal", A, true, "", F)
                                }
                            }
                        }
                    }
                } else {
                    if (u) {
                        $("#Msg").exibeMsg("#MsgFalha", u);
                        p.html(m).prop("disabled", false)
                    } else {
                        b.exibeMsg("#MsgFalhaModal", E);
                        p.html(m).prop("disabled", false)
                    }
                }
                if (B) {
                    $(B).trigger("click")
                }
                if (C) {
                    C = JSON.parse(C);
                    window["retornoSalvar" + C.name](C.parameters)
                }
            }).fail(function (u) {
                p.html(m).prop("disabled", false);
                $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + u.status])
            })
        } else {
            requiredMsgErro(l, b)
        }
    }
});
$("#ContainerApp").on("click", "th[data-direcao]", function () {
    var d = $(this),
        b = d.attr("data-direcao"),
        e = sessionStorage.getItem("nDirecao"),
        c = d.closest(".HControler").prop("id");
    c = (c == undefined ? d.closest(".modal").prop("id").replace("Modal", "") : c.replace("Panel", ""));
    if (!(e == null)) {
        var f = parseInt(e);
        f = f + 1;
        sessionStorage.setItem("nDirecao", f)
    } else {
        sessionStorage.setItem("nDirecao", 1)
    }
    d.attr("data-ordem", sessionStorage.getItem("nDirecao"));
    if (b == "false") {
        d.attr("data-direcao", "true");
        d.find(".glyphicon:last").addClass("glyphicon-sort-by-attributes").removeClass("glyphicon-sort-by-attributes-alt")
    } else {
        if (b == "true") {
            d.attr("data-direcao", "");
            d.find(".glyphicon:last").removeClass("glyphicon-sort-by-attributes")
        } else {
            d.attr("data-direcao", "false");
            d.find(".glyphicon:last").addClass("glyphicon-sort-by-attributes-alt")
        }
    }
    d.closest(".BotoesGridPadrao").find(".iAtualiza").addClass("fa-spin");
    carregaGridPadrao(c)
});
$("#Base,#ContainerApp").on("click", ".Criar", function () {
    var j = $(this),
        f = "",
        c = j.attr("data-tm");
    if (c) {
        f = c;
        aGrid = j.attr("data-ag");
        aListasAjax = j.attr("data-alistaajax");
        if (aListasAjax) {
            var b = j.closest("[data-tp]");
            if (b.length > 0) {
                aListasAjax = aListasAjax.substring(1);
                aListasAjax = "{'eq':'" + b.index() + "'," + aListasAjax
            }
            var e = sessionStorage.getItem("qtdListasAjax");
            e = parseInt((e == null ? 0 : parseInt(e)) + 1);
            sessionStorage.setItem("qtdListasAjax", e);
            sessionStorage.setItem("aListasAjax" + e, aListasAjax.replace(/'/g, '"'))
        }
    } else {
        aGrid = true;
        attrA = j.closest(".HControler");
        f = attrA.prop("id").replace("Panel", "")
    }
    var m = $("#Modal" + f);
    m.criaFormModal(L.Criar, aGrid, false);
    var g = permissaoBotoes(f, "Criar");
    if (c) {
        m.find(".Continuar").parent().addClass("hide")
    } else {
        m.find(".Continuar").parent().removeClass("hide");
        m.find(".Continuar").prop("disabled", g)
    }
    m.find(".Salvar").prop("disabled", g);
    try {
        var k = attrA.find('.dropdown-menu-right [name="' + f + 'Ativo"]:checked').val()
    } catch (d) {}
    if (k == 0) {
        if (L.AlertaVisualizarRegistroAtivo) {
            m.find(".MsgModal:eq(0)").html($("#MsgAlertaOffline div:first").clone().text(L.AlertaVisualizarRegistroAtivo))
        }
    } else {
        m.find(".MsgModal").empty()
    }
    var l = m.find("[data-ecm]");
    l.each(function () {
        var p = $(this);
        var o = JSON.parse(p.attr("data-ecm").replace(/'/g, '"'));
        p.prop(o)
    });
    m.find(".tabLogGenerico,.Editar,[data-lselect2],.ExibirCodigo,.CodigoExibido").addClass("hide");
    m.find(".Criar").removeClass("hide");
    m.required()
});
$("#ContainerApp").on("click", ".ExibirCodigo", function () {
    var c = $(this).closest("[data-tp]");
    if (c.length) {
        var b = c.find('[name="' + c.attr("data-tp") + '[][Chave]"]:eq(0)').val();
        var d = c.find(".CodigoExibido:eq(0)")
    } else {
        var b = $("#" + $(this).closest(".modal").prop("id").replace("Modal", "Chave")).val();
        var d = $(this).closest(".modal").find(".CodigoExibido:eq(0)")
    }
    d.find("input").val(b);
    d.toggleClass("hide")
});
$("#ContainerApp").on("click", ".lGrid", function () {
    var b = $(this).closest(".input-group");
    b.find('[name="Pesquisa"]').val("");
    b.find(".aGrid").trigger("click")
});
$("#ContainerApp").on("click", ".aGrid,.aGridAvancado,.Mais", function (c, k) {
    var g = "",
        j = $(this),
        l = j.prop("class").split(" "),
        m = j.attr("data-tm");
    if (l[(l.length - 1)] == "Mais") {
        var b = j.closest('[id^="Panel"]'),
            e = b.prop("id").replace("Panel", "");
        g = '"Tatual":"' + (b.find(".TbodyC .TrC").length) + '",';
        j.find("span").removeClass("glyphicon-chevron-down").addClass("fa fa-refresh fa-spin");
        carregaGridPadrao(e, g)
    } else {
        if (l[(l.length - 1)] == "aGrid") {
            var b = j.closest('[id^="Panel"]'),
                e = b.prop("id").replace("Panel", "");
            var d = 0;
            if (k == "Manual") {
                d = (parseInt(b.find(".Total:eq(0)").text().split("/")[0]) - 15)
            }
            if (d < 15) {
                j.closest(".BotoesGridPadrao").find(".iAtualiza").addClass("fa-spin");
                carregaGridPadrao(e, g)
            }
        } else {
            if (l[(l.length - 1)] == "aGridAvancado") {
                var b = j.closest(".modal"),
                    f = b.required();
                if (f.total == 0) {
                    var e = b.prop("id").replace("ModalPA", "");
                    $("#Panel" + e).find(".iAtualiza").addClass("fa-spin");
                    b.modal("hide");
                    carregaGridPadrao((m == undefined ? e : m), g)
                }
            }
        }
    }
});
$("#ContainerApp").on("click", ".CustomaGridAvancado", function () {
    var b = $(this).closest(".modal");
    name = b.attr("id").replace("ModalPAHome", ""), vActive = $("#PanelHome" + name + " .page-header").find(".active").attr("onclick");
    if (vActive == undefined) {
        window["graficosHome" + name]()
    } else {
        window["graficosHome" + vActive.replace(/graficosHome(.*?)\(\);/, "$1")]()
    }
    b.find(".close").trigger("click")
});
$("#ContainerApp").on("click", '.HControler [name$="Ativo"]', function () {
    var c = $(this),
        f = c.closest(".HControler"),
        d = f.find(".Ativar"),
        e = d.attr("data-original-title"),
        b = d.find("span:first");
    if (e == L.Ativar || e == L.Desativar) {
        if (c.val() == "0") {
            d.attr("data-original-title", L.Ativar);
            b.removeClass("glyphicon-remove").addClass("glyphicon-ok")
        } else {
            d.attr("data-original-title", L.Desativar);
            b.removeClass("glyphicon-ok").addClass("glyphicon-remove")
        }
    }
});
$("#ContainerApp").on("click", ".Excluir,.Ativar", function () {
    var l = $(this);
    if (l.prop("id") == "") {
        var q = "",
            b = $(this).closest(".HControler"),
            d = b.prop("id").replace("Panel", ""),
            t = $("#ModalConfirmacao"),
            s = $("#ModalConfirmacaoLabel"),
            m = l.val(),
            j = b.find(".TbodyC:first :checked").length + " " + L.Registros;
        t.find(".Confirmar").prop("disabled", false);
        t.find("form").empty();
        t.traduzItens();
        var p = $("#Permanentemente");
        p.addClass("hide");
        if (m == "Ativar") {
            if (b.find("[name=" + d + "Ativo]:checked").val() == "1") {
                var g = L["TipoDesativar" + d];
                if (g) {
                    m = g
                } else {
                    m = L.Desativar
                }
                t.find("[name=Tipo]").val("dt" + d)
            } else {
                var f = L["TipoAtivar" + d];
                if (f) {
                    m = f
                } else {
                    m = L.Ativar
                }
                t.find("[name=Tipo]").val("at" + d)
            }
        } else {
            p.removeClass("hide");
            var e = l.attr("data-original-title").trim();
            var o = p.find("input:eq(0)");
            o.val("");
            o.attr("placeholder", e);
            p.find("small").html("<i>*" + L.Preencha + " <b>" + e + "</b> " + L.ConcluirAcao + "</i>");
            var k = L["TipoExcluir" + d];
            if (k) {
                m = k
            } else {
                m = L.Excluir
            }
            t.find("[name=Tipo]").val("ex" + d);
            var c = L["AlertaExcluir" + d];
            if (c) {
                q = '<div class="alert alert-warning" role="alert" >';
                q += "<strong>" + L.Atencao + "</strong> " + c;
                q += "</div>"
            }
        }
        s.text(m + L[$("#ModalLabel" + d).find("span:eq(1)").attr("data-l")]);
        var r = t.find(".modal-body");
        r.find("#ConfirmacaoTotal").text(j);
        r.find("#ConfirmacaoDeseja").text(L.Deseja + " " + m);
        t.zIndex();
        t.find(".MsgModal:eq(0)").html(q);
        t.modal("show")
    }
});
$("#ContainerApp").on("click", ".Clonar", function () {
    var d = $(this),
        b = d.attr("data-tm"),
        f = $("#Modal" + b);
    f.find("#ModalLabel" + b + " span:eq(0)").text(L.Criar);
    f.find(".Salvar").text(L.Criar);
    $("#Chave" + b).val("");
    var e = f.find("div>[data-tp]");
    e.each(function () {
        var g = $(this).attr("data-tp");
        if (g != "Dinamico") {
            f.find('[name="' + g + '[][Chave]"]').val("")
        }
    });
    f.find('[data-h="updateFile"] div').empty();
    d.addClass("hide");
    f.find(".Salvar").prop("disabled", permissaoBotoes(b.replace(/2|3|4|5|6|7|8|9|10|11|12|13/g, ""), "Criar"));
    f.find('[data-ad="true"]').trigger("click");
    var c = f.find("[data-ecm]");
    c.each(function () {
        var j = $(this);
        var g = JSON.parse(j.attr("data-ecm").replace(/'/g, '"'));
        j.attr(g)
    });
    f.find(".tabLogGenerico,.ExibirCodigo,.CodigoExibido").addClass("hide")
});
$("#Base,#ContainerApp").on("click", ".Editar", function () {
    if (window.getSelection().toString()) {
        return false
    }
    var k = "",
        o = true,
        f = $(this),
        l = f.attr("data-alistaajax");
    if (l) {
        var e = l,
            m = JSON.parse(l.replace(/'/g, '"')),
            b = f.closest("[data-tp]");
        if (b.length > 0) {
            e = e.substring(1);
            e = "{'eq':'" + b.index() + "'," + e;
            k = b.find('[name*="' + m.retorno + '"] option:selected').val();
            if (k == undefined) {
                k = b.find('[name="' + m.retorno + '"]:eq(0)').val()
            }
        } else {
            var g = f.closest(".modal");
            if (g.length < 1) {
                g = f.closest(".HControler")
            }
            k = g.find('[name="' + m.retorno + '"] option:selected').val();
            if (k == undefined) {
                k = g.find('[name="' + m.retorno + '"]:eq(0)').val()
            }
        }
        var d = f.attr("data-tm"),
            p = $("#Modal" + d);
        o = f.attr("data-ag");
        if (k) {
            var c = sessionStorage.getItem("qtdListasAjax");
            c = parseInt((c == null ? 0 : parseInt(c)) + 1);
            sessionStorage.setItem("qtdListasAjax", c);
            sessionStorage.setItem("aListasAjax" + c, e.replace(/'/g, '"'))
        }
    } else {
        var d = f.closest(".modal").prop("id"),
            d = (d == undefined ? f.closest(".HControler").prop("id").replace("Panel", "") : f.attr("data-tm")),
            d = (f.attr("data-ftm") != "true" ? d : f.attr("data-tm")),
            p = $("#Modal" + d);
        k = f.parent().find('input[type="checkbox"]').val();
        if (k == undefined) {
            k = f.parent().find('input[type="text"]:eq(0)').val()
        }
        if (f.attr("data-ag") != undefined) {
            o = f.attr("data-ag")
        }
    }
    if (k) {
        $("#Msg").exibeMsg("#MsgSucesso", L.Aguarde, false);
        var j = d.replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2");
        f.prop("disabled", true);
        $.ajax({
            url: glbAppConf.base + j + glbAppConf.extensao,
            type: "POST",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: {
                Chave: k.trim(),
                App: glbAppName
            }
        }).done(function (r) {
            f.prop("disabled", false);
            var q = JSON.parse(feT(r));
            if (q.erro) {
                if (q.redireciona == undefined) {
                    $("#Msg").exibeMsg("#MsgFalha", q.erro, false);
                    $("#Msg").find("div:first").delay((q.erro.length * 150)).fadeOut()
                } else {
                    $("#Msg").find("div:first").fadeOut();
                    window.location = "?Login"
                }
            } else {
                setTimeout(function () {
                    $("#Msg").find("div:first").fadeOut();
                    var s = p.find(".Salvar");
                    p.criaFormModal(L[s.attr("data-l")], o, false);
                    var t = permissaoBotoes(j, "Criar");
                    s.prop("disabled", permissaoBotoes(j, "Editar"));
                    p.find(".Continuar").prop({
                        disabled: t,
                        checked: false
                    });
                    p.find(".Clonar").prop("disabled", t).removeClass("hide");
                    if ($("#Panel" + d).find('[name="' + d + 'Ativo"]:checked').val() == 1) {
                        p.find(".MsgModal").empty()
                    }
                    if (q.populaFormCustom == true) {
                        window["populaFormCustom" + d](r)
                    } else {
                        p.populaForm(q)
                    }
                    setTimeout(function () {
                        p.dateTimePicker()
                    }, 0);
                    if (glbWidth > 768) {
                        setTimeout(function () {
                            $("#Modal" + d).find('[data-dd="TPDinamico"]').sortable({
                                containerSelector: "form",
                                itemSelector: 'div[role="form"]',
                                handle: "label,div",
                                delay: 150
                            })
                        }, 0)
                    }
                }, 0)
            }
        }).fail(function (r) {
            f.prop("disabled", false);
            var q = L["ErrojqXHR" + r.status];
            $("#Msg").exibeMsg("#MsgFalha", q, false);
            $("#Msg").find("div:first").delay((q.length * 150)).fadeOut()
        })
    } else {
        $("#Msg").exibeMsg("#MsgFalha", L.AlertaSelecioneUmRegistro)
    }
    setTimeout(function () {
        var q = p.find("[data-eem]");
        q.each(function () {
            var s = $(this);
            var r = JSON.parse(s.attr("data-eem").replace(/'/g, '"'));
            s.prop(r)
        })
    }, 0);
    p.find(".tabLogGenerico,.ExibirCodigo").removeClass("hide");
    p.find(".CodigoExibido").addClass("hide");
    p.find(".has-error").removeClass("has-error");
    setTimeout(function () {
        cLineGrid(f, k)
    }, 0)
});
$("#ContainerApp").on("click", ".Exportar", function () {
    var b = $(this).closest(".HControler"),
        e = b.prop("id").replace("Panel", ""),
        o = $("#Modal" + e),
        p = [],
        m = o.find('[data-ms="ei"],[data-ms="e"]');
    m.each(function () {
        var u = $(this),
            s = new RegExp(/\w+\[(.+?)\]|(\w+)/g),
            w = u.prop("name"),
            q = s.exec(w)[1],
            k = "",
            r = "";
        if (q == undefined) {
            q = w;
            k = u.closest('[role="tabpanel"]').find(".panel-heading").attr("data-l");
            k = (k == undefined ? u.closest('[data-lms="e"]').find(".panel-heading").attr("data-l") : k);
            k = "(" + k + ") ";
            r = u.closest('[role="form"]').attr("data-tp");
            w = r + "[" + w + "]"
        } else {
            s = new RegExp(/(.+?)\[.+?\]/g);
            w = u.prop("name");
            r = s.exec(w)[1]
        }
        p.push($("<div>").append($("<label>").attr({
            "class": "checkbox-inline"
        }).append($("<input>").attr({
            type: "checkbox",
            name: w.replace("[]", ""),
            checked: "checked"
        }), $("<span>").html(k + L[q]))));
        p.push($("<input>").attr({
            type: "hidden",
            name: "Labels[" + (r + q).replace(/[-]/g, "") + "]",
            value: k + L[q]
        }))
    });
    p.push($("<input>").attr({
        type: "hidden",
        name: "Filtros",
        value: carregaGridPadrao(e, "", "", {
            retornafiltro: true
        })
    }));
    var o = $("#ModalExportar");
    o.zIndex();
    o.modal("show");
    o.traduzItens();
    o.find("h4 span:eq(1)").text(L[e]);
    o.find("button:last").attr("data-tm", e + "/exportar");
    var j = o.find("#ModalExportarBody");
    j.html(p);
    o.find('[name="MarcarTodos"]').prop("checked", true);
    var f = parseInt(b.find(".Total").text().split("/")[1]),
        g = 3000;
    if (f > g) {
        o.find('[role="alert"]:first span').text(L.AtencaoExportacaoLimite);
        var l = "<br>";
        l += '<div class="form-group">';
        l += '<label class="control-label col-sm-3" >' + L.APartirRegistro + "</label>";
        l += '<div class="col-sm-3">';
        l += '<select name="APartirDe" class="form-control" >';
        var c = parseInt((f / g));
        for (i = 0; i <= c; i++) {
            var d = (i * g);
            l += '<option value="' + d + '" >' + (d + 1) + "-" + (d + g) + "</option>"
        }
        l += "</select>";
        l += "</div>";
        l += "</div>";
        j.append(l)
    } else {
        o.find('[role="alert"]:first span').text(L.AtencaoExportacao)
    }
    o.find('[data-tp="Dinamico"]').empty();
    o.find('[data-ad="true"]').trigger("click")
});
$("#Base").on("click", "#ModalExportarBody .checkbox-inline", function (b) {
    var e = $(this).closest("#ModalExportarBody"),
        d = e.find("input");
    if (b.shiftKey) {
        var c = marcaIntervaloCheckbox(e, d);
        if (c) {
            c.prop("checked", true)
        }
    }
});
$("#Base").on("click", '#ModalExportar [name="MarcarTodos"]', function () {
    var b = $("#ModalExportar").find("form :checkbox");
    if ($(this).prop("checked") == true) {
        b.prop("checked", true)
    } else {
        b.prop("checked", false)
    }
});
var requiredImportar = function (k) {
    var f = $("#Modal" + k),
        d = f.find('[data-ms="i"],[data-ms="ei"]'),
        g = "";
    d.each(function (o) {
        if (($(this).attr("required") == "required" && $(this).attr("data-ir") != "false") || $(this).attr("data-ir") == "true") {
            var m = $(this).closest(".panel").find(".panel-heading").attr("data-l");
            g += "," + (m != undefined ? "(" + L[m] + ") " : "") + $(this).attr("name")
        }
    });
    if (g) {
        var e = $("#ModalImportar"),
            c = e.find("select"),
            l = [];
        c.each(function (m) {
            var o = $(this).find("option:selected");
            l[m] = o.attr("value")
        });
        var b = "",
            j = g.substring(1).split(",");
        $.each(j, function (o, m) {
            if (containsValue(l, m.replace(/([(].*[)] )?(.*)/, "$2")) < 0) {
                var q = m.match(/([(].*[)] )?(.*)/);
                if (q[1] == undefined) {
                    q[1] = ""
                }
                var r = f.find('[name="' + m + '"]').attr("data-li"),
                    p = q[2].replace(/(.*?)\[(.*?)\]\[?\]?/, "$2");
                p = (p != undefined ? p : m);
                b += "<br>" + (r == undefined ? q[1] + L[p] : L[r])
            }
        });
        if (b) {
            e.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", L.InformeColunasObrigatorias + b, false, false);
            return false
        }
    }
};
$("#ContainerApp").on("click", ".Importar", function () {
    var b = $(this).closest(".HControler").prop("id").replace("Panel", ""),
        c = $("#ModalImportar");
    c.zIndex();
    c.attr("data-keyboard", "true");
    c.find("form,.close,.btn-danger,.PrepararImportacao,.ProcessarImportacao").removeClass("hide");
    c.modal("show");
    c.traduzItens();
    c.find("h4 span:eq(1)").text(L[b]);
    c.find("input:eq(0)").val(b);
    c.find("textarea:eq(0)").val("").show();
    c.find('[data-h="Importar"]').empty();
    c.find(".progress,.CancelarProcessarImportacao,.CancelarPrepararImportacao").addClass("hide");
    c.find(".ProcessarImportacao").prop("disabled", true);
    c.find('[data-l="AtencaoImportacao"]').html(L.AtencaoImportacao);
    requiredImportar(b)
});
$("#Base").on("click", ".CancelarPrepararImportacao", function () {
    $(this).addClass("hide");
    var b = $("#ModalImportar");
    b.attr("data-keyboard", "true");
    b.find("form,.close,.btn-danger,.PrepararImportacao,.ProcessarImportacao").removeClass("hide");
    b.find("textarea:eq(0)").show();
    b.find('[data-h="Importar"]').empty();
    b.find(".progress,.CancelarPrepararImportacao,.CancelarProcessarImportacao").addClass("hide");
    b.find(".ProcessarImportacao").prop("disabled", true);
    b.find('[data-l="AtencaoImportacao"]').html(L.AtencaoImportacao);
    b.find(".MsgModal").empty()
});
$("#Base").on("click", ".CancelarProcessarImportacao", function () {
    $.each(glbAbortAjax, function (d, c) {
        c.abort()
    });
    var b = $("#ModalImportar");
    b.attr("data-keyboard", "true");
    b.find("form,.close,.btn-danger,.PrepararImportacao,.ProcessarImportacao").removeClass("hide");
    b.find("input:eq(0)").val(h);
    b.find("textarea:eq(0)").val("").show();
    b.find('[data-h="Importar"]').empty();
    b.find(".progress,.CancelarPrepararImportacao,.CancelarProcessarImportacao").addClass("hide");
    b.find(".ProcessarImportacao").prop("disabled", true);
    b.find('[data-l="AtencaoImportacao"]').html(L.AtencaoImportacao)
});
$("#Base").on("click", ".PrepararImportacao", function () {
    var l = $(this).closest(".modal"),
        g = l.find("input:eq(0)").val();
    attrB = $("#Modal" + g), htmlA = "", htmlB = "", attrC = attrB.find('[data-ms="ei"],[data-ms="i"]'), attrD = l.find("textarea:eq(0)"), required = l.required();
    if (required.total == 0) {
        l.attr("data-keyboard", "false");
        l.find(".close:eq(0)").addClass("hide");
        attrD.hide();
        $(this).addClass("hide");
        l.find(".CancelarPrepararImportacao").removeClass("hide");
        l.find(".ProcessarImportacao").prop("disabled", false);
        htmlA += '<select class="form-control" >';
        attrC.each(function () {
            var p = $(this),
                o = new RegExp(/\w+\[(.+?)\]|(\w+)/g),
                q = p.attr("data-li"),
                r = p.prop("name"),
                m = (q == undefined ? o.exec(r)[1] : q),
                j = "";
            if (m == undefined) {
                m = r;
                j = "(" + p.closest('[role="tabpanel"]').find(".panel-heading").attr("data-l") + ") ";
                r = p.closest('[role="form"]').attr("data-tp") + "[][" + r + "]"
            }
            htmlA += '<option value="' + r + '" >' + j + L[m] + "</option>"
        });
        htmlA += "</select>";
        var b = attrD.val().split("\n");
        var k = b[0].split("	");
        htmlB += "<tr>";
        for (var d = 0; d < k.length; d++) {
            htmlB += "<th>" + htmlA.replace(">" + k[d] + "<", "selected >" + k[d] + "<") + "</th>"
        }
        htmlB += "</tr>";
        if (b.length > 1) {
            var c = b[0].split("	");
            htmlB += '<tr style="color:#cccccc;" >';
            for (var d = 0; d < k.length; d++) {
                htmlB += "<td>" + (c[d] != undefined ? c[d] : "").replace(/"/g, "") + "</td>"
            }
            htmlB += "</tr>"
        }
        for (var f = 1; f < b.length; f++) {
            var c = b[f].split("	");
            htmlB += "<tr>";
            for (var d = 0; d < k.length; d++) {
                htmlB += "<td>" + (c[d] != undefined ? c[d] : "").replace(/"/g, "") + "</td>"
            }
            htmlB += "</tr>"
        }
        var e = '<div class="table-responsive" >';
        e += '<table class="table table-hover table-striped" >';
        e += "<thead>" + htmlB + "</thead>";
        e += "</table>";
        e += "</div>";
        l.find('[data-h="Importar"]').html(e);
        l.find('[data-l="AtencaoImportacao"]').html(L.AtencaoImportacao2)
    } else {
        l.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", required.msgs[0])
    }
});
$("#Base").on("click", ".ProcessarImportacao", function () {
    var b = $(this).closest(".modal"),
        p = b.find("input:eq(0)").val(),
        l = $("#Modal" + p);
    if (requiredImportar(p) == false) {
        return false
    }
    b.find(".btn-danger,.PrepararImportacao,.ProcessarImportacao,.CancelarPrepararImportacao").addClass("hide");
    b.find(".CancelarProcessarImportacao").removeClass("hide");
    b.find('[data-l="AtencaoImportacao"]').html(L.AtencaoImportacao3);
    var t = b.find("textarea:eq(0)").val().split("\n"),
        c = t[0].split("	"),
        m = (t.length - 1);
    var r = [];
    var d = [];
    for (var g = 1; g <= m; g++) {
        var k = t[g].split("	");
        for (var f = 0; f < c.length; f++) {
            var o = new RegExp(/\w+\[\]\[(\w+)\]|\w+\[(.+)\]/g),
                q = o.exec(b.find("select:eq(" + f + ")").val()),
                e = 'form [name*="' + q[2] + '"]';
            if (q[2] == undefined) {
                e = '[name="' + q[1] + '"]'
            } else {
                q[1] = q[2]
            }
            if (l.find(e + ":first").attr("data-ajax--url")) {
                r.push('{"' + q[1] + '":"' + (k[f] != undefined ? k[f] : "") + '"}')
            }
        }
    }
    r = unique(r);
    var s = r.length;
    sessionStorage.setItem("ImportarProgresso", s);
    if (s) {
        $.each(r, function (u, j) {
            $.each(JSON.parse(j), function (C, F) {
                var G = l.find('[name*="' + C + '"]:first'),
                    D = G.attr("data-ajax--url"),
                    B = G.attr("data-if"),
                    w = '{"Pesquisa":"' + F + '","Ativo":"1","Ordem":[],"Ajax":"true"}',
                    A = "";
                try {
                    A = L[D.replace(/\/|lista|todos|cgi-bin/g, "")]
                } catch (z) {}
                A = (A != undefined ? A : "");
                if (B != undefined) {
                    var E = "",
                        B = B.split(","),
                        x = F.split("::"),
                        y = G.attr("data-ifd");
                    if (x.length > 1) {
                        for (g = 1; g <= B.length; g++) {
                            E += ',"' + B[(g - 1)] + '":"' + x[(g - 1)] + '"'
                        }
                        E = '"Filtro":{' + E.substring(1);
                        if (y) {
                            E += ',"' + y + '":"' + x[B.length] + '"';
                            x[B.length] = ""
                        }
                        E += "}";
                        w = '{"Pesquisa":"' + x[B.length] + '","Ativo":"1","Ordem":[],"Ajax":"true",' + E + "}"
                    }
                }
                b.find(".MsgModal:eq(0)").exibeMsg("#MsgSucessoModal", L.Validando + " " + A + "...", false);
                $.ajax({
                    delay: 500,
                    url: D,
                    type: "POST",
                    contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
                    data: (glbAppConf.ct != "json" ? {
                        Dados: w,
                        Importar: true,
                        App: glbAppName
                    } : w)
                }).done(function (N) {
                    var M = JSON.parse(N),
                        U = M.root,
                        S = M.total;
                    if (S == 0) {
                        var I = G.closest("[data-closest]").find(".Criar").attr("data-alistaajax");
                        if (I == undefined) {
                            b.find(".MsgModal:eq(0)").exibeMsg("#MsgFalhaModal", A + " " + L.NaoEncontrado + "...", false);
                            var T = sessionStorage.getItem("ImportarProgresso");
                            sessionStorage.setItem("ImportarProgresso", (T - 1));
                            d.push('{"' + C + '":["' + F + '",""]}');
                            if (T <= 1) {
                                processaImportacao(d)
                            }
                        } else {
                            try {
                                var Q = JSON.parse(I.replace(/'/g, '"'));
                                var P = new RegExp(/(\w+)\[(\w+)\]/g),
                                    V = P.exec(Q.text);
                                var O = G.attr("data-filtro"),
                                    R = "";
                                if (!(O === undefined)) {
                                    var K = O.split(",");
                                    $.each(K, function (X, W) {
                                        var Y = W.split(" ");
                                        R += ',"' + Y[0] + '":"' + $(Y[1]).find(Y[2]).val() + '"'
                                    })
                                }
                                b.find(".MsgModal:eq(0)").exibeMsg("#MsgSucessoModal", L.Criando + " " + A + "...", false);
                                var H = '{"' + V[1] + '":{"Chave":"","' + V[2] + '":"' + F + '"' + R + "}}";
                                $.ajax({
                                    delay: 500,
                                    url: D.replace("/lista", ""),
                                    type: "PUT",
                                    contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
                                    data: (glbAppConf.ct != "json" ? {
                                        Dados: H,
                                        Importar: true,
                                        App: glbAppName
                                    } : H)
                                }).done(function (Y) {
                                    if (Y.match(/erro/g)) {
                                        Y = ""
                                    } else {
                                        try {
                                            Y = Y.trim().replace(/"/g, "")
                                        } catch (X) {
                                            Y = ""
                                        }
                                    }
                                    var W = sessionStorage.getItem("ImportarProgresso");
                                    sessionStorage.setItem("ImportarProgresso", (W - 1));
                                    d.push('{"' + C + '":["' + F + '","' + Y + '"]}');
                                    if (W <= 1) {
                                        processaImportacao(d)
                                    }
                                })
                            } catch (J) {}
                        }
                    } else {
                        var T = sessionStorage.getItem("ImportarProgresso");
                        sessionStorage.setItem("ImportarProgresso", (T - 1));
                        try {
                            U[0]["id"] = U[0]["id"].toString().replace(/"/g, "")
                        } catch (J) {
                            try {
                                U[0]["id"] = ""
                            } catch (J) {
                                U[0] = {
                                    id: F
                                }
                            }
                        }
                        if (S > 1) {
                            $.each(U, function (X, W) {
                                if (W.text == F) {
                                    U[0]["id"] = W.id;
                                    return false
                                }
                            })
                        }
                        d.push('{"' + C + '":["' + F + '","' + U[0]["id"] + '"]}');
                        if (T <= 1) {
                            processaImportacao(d)
                        }
                    }
                })
            })
        })
    } else {
        processaImportacao(d)
    }
});

function processaImportacao(arrayUnicaFR) {
    var attrA = $("#ModalImportar");
    var lines = attrA.find("textarea:eq(0)").val().split("\n");
    var headers = lines[0].split("	");
    var tlines = (lines.length - 1);
    var ida = attrA.find("input:eq(0)").val();
    var coletaErros = "";
    var nLinhaErros = 0;
    attrA.find("form").addClass("hide");
    var arrayUnicaT = [];
    for (var j = 0; j < headers.length; j++) {
        var regexp = new RegExp(/(\w+)(\[\])?\[.+?\]/g),
            v = regexp.exec(attrA.find("select:eq(" + j + ")").val());
        v[2] = (v[2] == undefined ? "" : "_");
        eval("var " + v[1] + v[2] + " = {};");
        arrayUnicaT.push(v[1] + v[2])
    }
    sessionStorage.setItem("ImportarProgresso", tlines);
    for (var i = 1; i <= tlines; i++) {
        var htmlA = "";
        var json = {};
        var currentline = lines[i].split("	");
        for (var j = 0; j < headers.length; j++) {
            var regexp = new RegExp(/(\w+)(\[\])?\[(.+?)\]/g),
                v = regexp.exec(attrA.find("select:eq(" + j + ")").val());
            v[2] = (v[2] == undefined ? "" : "_");
            $.each(arrayUnicaFR, function (k1, v1) {
                $.each(JSON.parse(v1), function (k2, v2) {
                    if (v[3] == k2 && v2[0] == currentline[j]) {
                        currentline[j] = v2[1]
                    }
                })
            });
            currentline[j] = (currentline[j] != undefined ? currentline[j] : "").replace(/"/g, "");
            eval(v[1] + v[2] + '["' + v[3] + '"] = "' + currentline[j].trim().replace(new RegExp("^([0-9]{1,4})[/]([0-9]{1,2})[/]([0-9]{1,4})$"), "$1-$2-$3").replace(new RegExp("^([0-9]{1,3})?[.]?([0-9]{1,3})?[.]?([0-9]{1,3})[,]([0-9]{1,4})$"), "$1$2$3.$4") + '";')
        }
        arrayUnicaT = unique(arrayUnicaT);
        $.each(arrayUnicaT, function (k, v) {
            var v1 = JSON.stringify(eval(v));
            v1 = (v1.search('"Chave":') < 0 ? v1.replace("{", '{"Chave":"",') : v1);
            if (v.slice(-1) != "_") {
                htmlA += ',"' + v + '":' + v1
            } else {
                htmlA += ',"' + v.slice(0, -1) + '":[' + v1 + "]"
            }
        });
        attrA.find(".MsgModal:eq(0)").exibeMsg("#MsgSucessoModal", L.Criando + " " + L[ida], false);
        htmlA = "{" + htmlA.substring(1) + "}";
        var minhaRequisicao = $.ajax({
            delay: 500,
            url: glbAppConf.base + ida,
            type: "PUT",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: (glbAppConf.ct != "json" ? {
                Dados: htmlA,
                Importar: true,
                App: glbAppName
            } : htmlA)
        }).done(function (data) {
            try {
                var erro = JSON.parse(data)["erro"]
            } catch (err) {
                var erro = ""
            }
            nLinhaErros++;
            attrA.find(".MsgModal").empty();
            if (erro) {
                coletaErros += nLinhaErros + ": " + erro + "<br>"
            }
            var ipv = sessionStorage.getItem("ImportarProgresso");
            sessionStorage.setItem("ImportarProgresso", (ipv - 1));
            var vpb = Math.round((((tlines - ipv) * 100) / tlines));
            var attrB = $("#ModalImportar .progress-bar");
            attrB.parent().removeClass("hide");
            attrB.attr("style", "width: " + vpb + "%;");
            attrB.text(vpb + "%");
            if (ipv <= 1) {
                attrA.modal("hide");
                var textoMsg = L.EnvioSucesso;
                if (coletaErros) {
                    textoMsg = coletaErros;
                    $("#Msg").exibeMsg("#MsgFalha", textoMsg, true)
                } else {
                    $("#Msg").exibeMsg("#MsgSucesso", textoMsg, false)
                }
                $("#Msg").find("div:first").delay((textoMsg.length * 150)).fadeOut();
                if ($(".modal-backdrop").length <= 0) {
                    $("#Panel" + ida).find(".aGrid:eq(0)").trigger("click")
                }
            }
        }).fail(function (jqXHR) {
            var ipv = sessionStorage.getItem("ImportarProgresso");
            sessionStorage.setItem("ImportarProgresso", (ipv - 1))
        });
        glbAbortAjax.push(minhaRequisicao)
    }
}
$("#Base").on("keydown", "#ModalImportar textarea", function (f) {
    if (f.keyCode === 9) {
        var g = this.selectionStart;
        var b = this.selectionEnd;
        var d = $(this);
        var c = d.val();
        d.val(c.substring(0, g) + "\t" + c.substring(b));
        this.selectionStart = this.selectionEnd = g + 1;
        f.preventDefault()
    }
});
$("#Base,#ContainerApp").on("click", "tbody :checkbox,.TbodyC :checkbox", function (e) { {
    var g = this,
        d = $(g).closest(".TrC");
    if ($(g).is(":checked")) {
        d.addClass("cc");
        cLineGrid($(g), $(g).val())
    } else {
        d.removeClass("cc")
    }
    var j = $(g).closest(".TbodyC"),
        f = j.find("input");
    if (e.shiftKey) {
        var c = marcaIntervaloCheckbox(j, f);
        if (c) {
            c.closest(".TrC").addClass("cc");
            c.prop("checked", true)
        }
    }
    var k = $(g).closest(".HControler"),
        b = 0;
    k.find(".TbodyC:first :checked").each(function () {
        b++
    });
    if (b >= 1) {
        k.find(".Ativar,.Excluir").removeClass("hide");
        k.find(".CBED").prop("disabled", false);
        k.find(".TotalSelected").text(" (" + b + ")")
    } else {
        k.find(".Ativar,.Excluir").addClass("hide");
        k.find(".CBED").prop("disabled", true);
        k.find(".TotalSelected").text("")
    }
    if (k.find(".Criar,.CriarAlias").is(":visible") == false && k.find(".Ativar").is(":visible") == false) {
        k.find(".Excluir").removeClass("R142 R78").addClass("R14")
    } else {
        if (k.find(".Criar,.CriarAlias").is(":visible") == false && k.find(".Ativar").is(":visible") == true) {
            k.find(".Ativar").removeClass("R142 R78").addClass("R14");
            k.find(".Excluir").removeClass("R142 R14").addClass("R78")
        } else {
            if (k.find(".Criar,.CriarAlias").is(":visible") == true && k.find(".Ativar").is(":visible") == false) {
                k.find(".Excluir").removeClass("R142 R14").addClass("R78")
            } else {
                k.find(".Criar,.CriarAlias").removeClass("R142 R78").addClass("R14");
                k.find(".Ativar").removeClass("R142 R14").addClass("R78");
                k.find(".Excluir").removeClass("R78 R14").addClass("R142")
            }
        }
    }
});

$("#Base,#ContainerApp").on("click", ".CheckBoxAll", function () {
    var c = $(this).closest(".HControler");
    if (c.length == 0) {
        var c = $(this).closest(".modal")
    }
    var b = c.find("tbody :checkbox:not(:disabled):visible,.TbodyC :checkbox:not(:disabled):visible");
    if (b.length > 0) {
        if ($(this).prop("checked") == true) {
            b.closest(".TrC").addClass("cc");
            b.prop("checked", true);
            c.find(".Ativar,.Excluir").removeClass("hide");
            c.find(".CBED").prop("disabled", false);
            c.find(".TotalSelected").text(" (" + b.length + ")")
        } else {
            b.closest(".TrC").removeClass("cc");
            b.prop("checked", false);
            c.find(".Ativar,.Excluir").addClass("hide");
            c.find(".CBED").prop("disabled", true);
            c.find(".TotalSelected").text("")
        }
    }
    if (c.find(".Criar,.CriarAlias").is(":visible") == false && c.find(".Ativar").is(":visible") == false) {
        c.find(".Excluir").removeClass("R142 R78").addClass("R14")
    } else {
        if (c.find(".Criar,.CriarAlias").is(":visible") == false && c.find(".Ativar").is(":visible") == true) {
            c.find(".Ativar").removeClass("R142 R78").addClass("R14");
            c.find(".Excluir").removeClass("R142 R14").addClass("R78")
        } else {
            if (c.find(".Criar,.CriarAlias").is(":visible") == true && c.find(".Ativar").is(":visible") == false) {
                c.find(".Excluir").removeClass("R142 R14").addClass("R78")
            } else {
                c.find(".Criar,.CriarAlias").removeClass("R142 R78").addClass("R14");
                c.find(".Ativar").removeClass("R142 R14").addClass("R78");
                c.find(".Excluir").removeClass("R78 R14").addClass("R142")
            }
        }
    }
});
$("#Menu,#Base,#ContainerApp").on("change", ".DSH", function () {
    var c = $(this),
        d = $(this).closest(".modal"),
        e = c.prop("name").replace(/[\[\]\/\\]/g, ""),
        b = c.prop("type");
    if (b != "checkbox") {
        v = c.find(":selected").val()
    } else {
        v = $(this).is(":checked")
    }
    d.find("." + e).addClass("hide");
    d.find("#Div" + e + v).removeClass("hide")
});
$("#Base,#ContainerApp").on("click", ".RemoveDadoGridModal", function () {
    var e = $(this),
        b = e.closest(".modal").prop("id"),
        f = e.parent().parent().parent(),
        d = e.parent().find("input"),
        c = d.prop("name").replace("Ex", "Chave");
    if (f.find('[name="' + c + '"]').val() == "") {
        f.remove()
    } else {
        f.addClass("hide");
        d.prop("value", "1")
    }
    $("#" + b + " [data-tp=" + f.attr("data-tp") + "]").find("input,select,textarea").removeAttr("required")
});
$("#Base,#ContainerApp").on("click", ".ADGM", function () {
    var f = $(this),
        d = f.closest(".modal").prop("id").replace("Panel", ""),
        e = f.closest("[data-tp]"),
        b = e.attr("data-tp"),
        c = f.attr("data-tpo");
    e.gridGenericoModal(b, c);
    e.find('input[type="text"],input[type="email"],input[type="tel"],input[type="number"],input[type="hidden"],select,textarea').val("").change();
    e.find('input[type="checkbox"]').prop("checked", false)
});
$("#Base,#ContainerApp").on("click", ".aliasADGM", function () {
    $(this).closest(".panel-body").find(".ADGM").trigger("click")
});
$("#ContainerApp").on("click", ".PAvancada", function () {
    var e = $(this),
        g = e.closest(".HControler"),
        b = g.attr("id"),
        b = (b == undefined ? e.attr("data-tm") : b.replace("Panel", "")),
        f = $("#ModalPA" + b);
    f.find("[name]:first").focus();
    f.criaFormModal(L.Pesquisa + " " + L.Avancada, false, false);
    var d = f.find(".panel-collapse"),
        c = d.find(":selected:first,:checked:first,input:not(:empty):first");
    c.each(function () {
        $(this).closest(".panel-collapse").collapse("show")
    })
});
$("#ContainerApp").on("click", ".lFormAvancado", function () {
    $(this).lForm()
});
$("#ContainerApp").on("click", ".lFormAvancadoPanel", function () {
    $(this).lForm($("#" + $(this).closest(".HControler,[id^=Panel]").attr("id").replace("Panel", "ModalPA")))
});
$("#Base,#ContainerApp").on("click", "[data-lselect2]", function () {
    var d = $(this),
        b = JSON.parse(d.attr("data-lselect2").replace(/'/g, '"')),
        f = d.closest("[data-closest]"),
        e = f.find('select[name="' + b.campo + '"]');
    if (!e.attr("multiple")) {
        e.val("")
    } else {
        e.html("")
    }
    f.find('[data-h="' + b.campo + '"]').html('<input type="hidden" name="' + b.campo + '" />');
    e.change();
    if (b.trigger.match(/select2/g)) {
        e.trigger(b.trigger)
    }
    var c = d.parent();
    c.find(".Editar,[data-lselect2]").addClass("hide");
    c.find(".Criar").removeClass("hide")
});
$(document).on("focus", ".select2", function (b) {
    if (b.originalEvent && $(this).find(".select2-selection__rendered:eq(0)").text() == "" && $(this).find(".select2-selection--multiple").length < 1) {
        $(this).siblings("select").select2("open")
    }
});
$("#Base,#ContainerApp").on("change", '[data-b="ajax"]', function () {
    var b = $(this),
        d = b.closest("[data-closest]"),
        c = d.find(".Criar");
    if (b.val() != null) {
        if (b.attr("multiple")) {
            c.removeClass("hide")
        } else {
            c.addClass("hide")
        }
        d.find('[data-h="' + b.attr("name") + '"]').empty();
        d.find(".Editar,[data-lselect2]").removeClass("hide")
    } else {
        c.removeClass("hide");
        d.find('[data-h="' + b.attr("name") + '"]').html('<input type="hidden" name="' + b.attr("name") + '" />');
        d.find(".Editar,[data-lselect2]").addClass("hide")
    }
});
$("#Base,#ContainerApp").on("click", ".Confirmar", function () {
    var w = function (D, A) {
        D.find(".TbodyC:first :checked").closest(".TrC").remove();
        var y = D.find(".Total").text().split("/"),
            C = A.split(",").length,
            B = parseInt(parseInt(y[0]) - C),
            z = parseInt(parseInt(y[(y.length - 1)]) - C);
        D.find(".Total").text(B + "/" + z);
        D.find(".TotalSelected").text("")
    };
    var d = function (B, A, z, y) {
        B.find(".CheckBoxAll").prop("checked", false);
        B.find(".Excluir,.Ativar").addClass("hide");
        A.find("[name=Tipo]").val("");
        z.text(y).prop("disabled", false);
        A.modal("hide");
        $("body").trigger("click")
    };
    var c = "",
        t = "",
        u = $(this),
        b = u.closest(".modal"),
        p = b.prop("id"),
        k = b.required();
    if (k.total == 0) {
        var m = u.text();
        u.text(L.Aguarde).prop("disabled", true);
        if (p == "ModalConfirmacao") {
            var r = $(".HControler:visible"),
                s = r.prop("id").replace("Panel", "") + glbAppConf.extensao,
                o = s,
                q = $("#ModalConfirmacao")
        } else {
            var s = u.attr("data-tm"),
                o = u.attr("data-hag"),
                r = b,
                q = b;
            if (o == "") {
                o = s
            }
        }
        r.find(".TbodyC:first :checked").each(function () {
            c += "," + $(this).val()
        });
        c = c.substring(1);
        var x = q.find("form").serializeJSON();
        if (c == "") {
            c = b.find('[name="Chave"]').val()
        }
        if (q.find("[name=Tipo]").val() == "ex" + s) {
            var g = $("#Permanentemente");
            var l = g.find("input:eq(0)");
            var f = l.attr("placeholder");
            if (g.hasClass("hide") == false && l.val().toLowerCase().trim() != f.toLowerCase().trim()) {
                u.text(m).prop("disabled", false);
                $("#Msg").exibeMsg("#MsgFalha", L.Preencha + ' "' + f + '" ' + L.ConcluirAcao + ".")
            } else {
                $.ajax({
                    url: glbAppConf.base + s,
                    type: "DELETE",
                    contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
                    data: {
                        Chave: c,
                        Json: (glbAppConf.ct != "json" ? JSON.stringify(x) : x),
                        App: glbAppName
                    }
                }).done(function (C) {
                    try {
                        var E = JSON.parse(C),
                            z = E.atualiza,
                            B = E.erro,
                            y = E.trigger,
                            D = E["function"];
                        if (E.url) {
                            geraUrl(E.url)
                        } else {
                            if (B) {
                                $("#Msg").exibeMsg("#MsgFalha", B)
                            } else {
                                if (E.sucesso) {
                                    $("#Msg").exibeMsg("#MsgSucesso", E.sucesso)
                                }
                            }
                        }
                    } catch (A) {}
                    if (z == true) {
                        $("#Panel" + o).find(".iAtualiza").addClass("fa-spin");
                        carregaGridPadrao(o)
                    } else {
                        if (B == undefined) {
                            w(r, c)
                        }
                    }
                    d(r, q, u, m);
                    if (y) {
                        $(y).trigger("click")
                    }
                    if (D) {
                        window["retornoSalvar" + D.name](D.parameters)
                    }
                }).fail(function (y) {
                    u.text(m).prop("disabled", false);
                    $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + y.status])
                })
            }
        } else {
            if (q.find("[name=Tipo]").val() == "at" + s) {
                var e = q.find("form").serializeJSON();
                $.ajax({
                    url: glbAppConf.base + s,
                    type: glbAppConf.sm["unlock"],
                    contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
                    data: {
                        Chave: c,
                        Ativo: "S",
                        Json: (glbAppConf.ct != "json" ? JSON.stringify(e) : e),
                        App: glbAppName
                    }
                }).done(function (C) {
                    try {
                        var E = JSON.parse(C),
                            z = E.atualiza,
                            B = E.erro,
                            y = E.trigger,
                            D = E["function"];
                        if (E.url) {
                            geraUrl(E.url)
                        } else {
                            if (B) {
                                $("#Msg").exibeMsg("#MsgFalha", B);
                                u.text(m).prop("disabled", false);
                                return false
                            } else {
                                if (E.sucesso) {
                                    $("#Msg").exibeMsg("#MsgSucesso", E.sucesso)
                                } else {
                                    if (E.realtime) {
                                        $("#Msg").exibeMsg("#MsgSucesso", E.realtime, false)
                                    }
                                }
                            }
                        }
                    } catch (A) {}
                    if (z == true) {
                        $("#Panel" + o).find(".iAtualiza").addClass("fa-spin");
                        carregaGridPadrao(o)
                    } else {
                        if (B == undefined) {
                            w(r, c)
                        }
                    }
                    d(r, q, u, m);
                    if (y) {
                        $(y).trigger("click")
                    }
                    if (D) {
                        window["retornoSalvar" + D.name](D.parameters)
                    }
                }).fail(function (y) {
                    u.text(m).prop("disabled", false);
                    $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + y.status])
                })
            } else {
                if (q.find("[name=Tipo]").val() == "dt" + s) {
                    var j = q.find("form").serializeJSON();
                    $.ajax({
                        url: glbAppConf.base + s,
                        type: glbAppConf.sm["lock"],
                        data: {
                            Chave: c,
                            Ativo: "N",
                            Json: (glbAppConf.ct != "json" ? JSON.stringify(j) : j),
                            App: glbAppName
                        }
                    }).done(function (C) {
                        try {
                            var E = JSON.parse(C),
                                z = E.atualiza,
                                B = E.erro,
                                y = E.trigger,
                                D = E["function"];
                            if (E.url) {
                                geraUrl(E.url)
                            } else {
                                if (B) {
                                    $("#Msg").exibeMsg("#MsgFalha", B)
                                } else {
                                    if (E.sucesso) {
                                        $("#Msg").exibeMsg("#MsgSucesso", E.sucesso)
                                    }
                                }
                            }
                        } catch (A) {}
                        if (z == true) {
                            $("#Panel" + o).find(".iAtualiza").addClass("fa-spin");
                            carregaGridPadrao(o)
                        } else {
                            if (B == undefined) {
                                w(r, c)
                            }
                        }
                        d(r, q, u, m);
                        if (y) {
                            $(y).trigger("click")
                        }
                        if (D) {
                            window["retornoSalvar" + D.name](D.parameters)
                        }
                    }).fail(function (y) {
                        u.text(m).prop("disabled", false);
                        $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + y.status])
                    })
                }
            }
        }
    }
});
$("#Base,#Menu,#ContainerApp").on("dragover", ".AnexaArquivo", function (b) {
    b.preventDefault();
    b.stopPropagation()
});
$("#Base,#Menu,#ContainerApp").on("dragenter", ".AnexaArquivo", function (b) {
    b.preventDefault();
    b.stopPropagation()
});
$("#Base,#Menu,#ContainerApp").on("drop", ".AnexaArquivo", function (c) {
    if (c.originalEvent.dataTransfer) {
        if (c.originalEvent.dataTransfer.files.length) {
            c.preventDefault();
            c.stopPropagation();
            for (var b = 0; b < c.originalEvent.dataTransfer.files.length; b++) {
                $(this).parent().find("[data-updatefile]").trigger("change", c.originalEvent.dataTransfer.files[b])
            }
        }
    }
});
$("#Base,#ContainerApp").on("click", ".ExcluirArquivos", function () {
    var f = $(this),
        j = f.closest(".modal"),
        g = f.closest("[data-closest]"),
        e = g.find("button:first"),
        d = f.text(),
        c = g.find("[name]").val(),
        b = j.prop("id").replace("Modal", "");
    f.text(L.Excluindo);
    if (c) {
        $.ajax({
            url: glbAppConf.base + "Files" + glbAppConf.extensao + "/excluir",
            type: "DELETE",
            data: {
                Chave: c,
                Origem: b,
                App: glbAppName
            }
        }).done(function (m) {
            var o = JSON.parse(m),
                l = o.sucesso,
                k = o.erro;
            if (k == undefined) {
                g.remove();
                $("#Msg").exibeMsg("#MsgSucesso", L.ExcluidoSucesso)
            } else {
                $("#Msg").exibeMsg("#MsgFalha", k);
                f.text(d)
            }
        }).fail(function (k) {
            f.text(d);
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + k.status])
        })
    }
});
$("#Menu,#Base,#ContainerApp").on("click", ".VisualizarArquivoMini", function () {
    $(this).parent().find(".VisualizarArquivo").trigger("click")
});
$("#Menu,#Base,#ContainerApp").on("click", ".VisualizarArquivo", function (c, j) {
    if (j == "thumbnail") {
        if ($(this).parent().find("img").length > 0) {
            return false
        }
    }
    var f = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/bmp", "signature"],
        m = ["text/plain", "application/pdf", "application/excel", "application/vnd.openxmlformats-officedocument.spre", "application/msword", "application/vnd.openxmlformats-officedocument.word", "application/mspowerpoint", "application/vnd.openxmlformats-officedocument.pres"],
        b = ["text/css", "text/html", "application/json", "text/json", "text/javascript"],
        s = ["video/mp4"],
        k = ["audio/mp3", "audio/oga", "audio/ogg", "audio/mpeg"];

    function r(E, C, G, F, B, x, A, D, w) {
        $("#Msg").find("div:first").fadeOut();
        var u = C.url,
            t = E.attr("data-ntmp"),
            I = ((glbWVAndroid < 0 || glbWViOS == false) ? 'download="' + t + '"' : "");
        F.criaFormModal(t, false, false);
        if (I == "") {
            F.find(".BaixarArquivo").html('<a href="' + u + '" ' + I + ' target="_blank" role="button" class="btn btn-primary" >' + L.Download + "</a>")
        } else {
            F.find(".BaixarArquivo").html('<a href="javascript:void(0);" onclick="window.open(\'' + u.replace(/'/g, "\\'") + '\');" role="button" class="btn btn-primary" >' + L.Download + "</a>")
        }
        F.find('[name="File"]').val(G.attr("data-h"));
        if (B > 1) {
            if (x == 1) {
                A.prop({
                    disabled: true,
                    value: ""
                });
                D.prop({
                    disabled: false,
                    value: x
                })
            } else {
                if (x == B) {
                    A.prop({
                        disabled: false,
                        value: x - 2
                    });
                    D.prop({
                        disabled: true,
                        value: ""
                    })
                } else {
                    A.prop({
                        disabled: false,
                        value: x - 2
                    });
                    D.prop({
                        disabled: false,
                        value: x
                    })
                }
            }
        } else {
            A.prop({
                disabled: true,
                value: ""
            });
            D.prop({
                disabled: true,
                value: ""
            })
        }
        if (glbWidth > 768) {
            F.find(".modal-dialog").removeClass("W98p");
            F.find(".modal-body").addClass("H500").removeClass("H600")
        }
        if ($.inArray(C.type, f) > -1) {
            F.find(".modal-body").html('<img src="' + u + '" class="Mw100p" >')
        } else {
            if (($.inArray(C.type, m) > -1 || u.search("[.]pdf$|[.]txt$|[.]sheet$|[.]xls$|[.]xlsx$|[.]doc$|[.]docx$") > 1) && (glbWVAndroid < 0 || glbWViOS == false)) {
                F.find(".modal-body").html(L.Aguarde);
                var y = "455";
                if (glbWidth > 768) {
                    F.find(".modal-dialog").addClass("W98p");
                    F.find(".modal-body").addClass("H600").removeClass("H500");
                    y = "100%"
                }
                if (w != "Conversas" || u.search("[.]txt$") > 1) {
                    setTimeout(function () {
                        var J = "https://drive.google.com/viewerng/viewer?url=" + u + "&embedded=true";
                        if (u.search("[.]xls$|[.]xlsx$") > 1) {
                            J = "https://view.officeapps.live.com/op/embed.aspx?src=" + u
                        }
                        F.find(".modal-body").html('<iframe src="' + J + '" type="' + C.type + '" frameborder="0" height="' + y + '" width="100%" ></iframe>')
                    }, 4000)
                } else {
                    setTimeout(function () {
                        F.find(".modal-body").html('<iframe src="' + u + '" type="' + C.type + '" frameborder="0" height="' + y + '" width="100%" ></iframe>')
                    }, 3000)
                }
            } else {
                if ($.inArray(C.type, b) > -1) {
                    var z = F.find(".modal-body");
                    z.html(L.Aguarde + " " + L.AplicandoIndentacao);
                    $.ajax({
                        url: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
                        cache: true
                    }).done(function () {
                        $.ajax({
                            url: u,
                            dataType: "text",
                            cache: true
                        }).done(function (J) {
                            z.html('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/agate.min.css"><pre style="padding:0px;" ><code class="' + C.type.replace("text/", "") + '" style="width:100%;max-width:100%;" >' + J.replace(/[<]/g, "&lt;") + "</code></pre>");
                            z.find("pre code").each(function (K, M) {
                                hljs.highlightBlock(M)
                            })
                        })
                    })
                } else {
                    if ($.inArray(C.type, s) > -1) {
                        F.find(".modal-body").html('<video style="height:350px;width:100%;max-width:100%;" controls ><source src="' + u + '" type="' + C.type + '">Your browser does not support HTML5 video.</video>')
                    } else {
                        if ($.inArray(C.type, k) > -1) {
                            F.find(".modal-body").html('<audio controls ><source src="' + u + '" type="' + C.type + '">Your browser does not support the audio element.</audio>')
                        } else {
                            var H = "";
                            H += '<div class="panel panel-warning">';
                            H += '<div class="panel-heading">';
                            H += '<h3 class="panel-title">' + L.FormatoNaoSuportado + "</h3>";
                            H += "</div>";
                            H += '<div class="panel-body">';
                            H += L.UseBotaoDownload;
                            H += "</div>";
                            H += "</div>";
                            F.find(".modal-body").html(H)
                        }
                    }
                }
            }
        }
        E.text(t);
        A.find("span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-triangle-left");
        D.find("span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-triangle-right")
    }
    var p = $(this);
    attrA = p.closest(".modal"), attrB = p.closest("[data-closest]"), attrC = attrB.find("button:first"), attrD = attrB.closest("[data-h]"), attrE = attrD.find(".VisualizarArquivo"), total = attrE.length, atual = (attrE.index(this) + 1), chave = attrB.find("[name]").val();
    try {
        var d = attrA.prop("id").replace("Modal", "").replace(/(2|3|4|5|6|7|8|9|10|11|12|13)(.*)/, "$2")
    } catch (e) {
        attrA = p.closest(".HControler");
        try {
            var d = attrA.prop("id").replace("Panel", "")
        } catch (e) {
            if ($("#chatMensagens").length) {
                var d = "Conversas"
            }
        }
    }
    var q = $("#ModalVisualizarArquivo"),
        g = q.find(".AnteriorArquivo"),
        o = q.find(".ProximoArquivo");
    p.text(L.Aguarde);
    if (d == "Conversas" || (d == "LoginPortal" && chave == undefined)) {
        chave = " "
    }
    if (chave) {
        if (p.attr("data-tmpurl")) {
            try {
                var l = JSON.parse(p.attr("data-tmpurl"));
                r(p, l, attrD, q, total, atual, g, o, d)
            } catch (e) {}
        } else {
            $.ajax({
                url: glbAppConf.base + "Files" + glbAppConf.extensao + "/visualizar",
                type: "POST",
                data: {
                    Chave: chave,
                    Origem: d,
                    App: glbAppName
                }
            }).done(function (w) {
                var x = JSON.parse(w),
                    t = x.root,
                    u = x.erro;
                if (t) {
                    p.attr({
                        "data-tmpurl": JSON.stringify(t)
                    });
                    if (j == "thumbnail") {
                        p.parent().append('<br><img src="' + t.url + '" title="' + p.attr("data-ntmp") + '" class="Cp VisualizarArquivoMini" loading="lazy" style="max-width:100%;padding-top:5px;" >');
                        p.text(p.attr("data-ntmp"))
                    } else {
                        r(p, t, attrD, q, total, atual, g, o, d)
                    }
                } else {
                    $("#Msg").exibeMsg("#MsgFalha", u)
                }
            }).fail(function (t) {
                p.text(p.attr("data-ntmp"));
                g.find("span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-triangle-left");
                o.find("span").removeClass("fa fa-refresh fa-spin").addClass("glyphicon-triangle-right");
                if (t.status == "500") {
                    $("#Msg").exibeMsg("#MsgAlerta", L.Erro500Alerta)
                } else {
                    $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + t.status])
                }
            })
        }
    }
});
$("#Base").on("click", ".AnteriorArquivo", function () {
    var d = $(this),
        b = d.val(),
        e = $("#ModalVisualizarArquivo"),
        c = e.find('[name="File"]').val();
    d.find("span").removeClass("glyphicon-triangle-left").addClass("fa fa-refresh fa-spin");
    $('[data-h="' + c + '"] .VisualizarArquivo:eq(' + b + ")").trigger("click")
});
$("#Base").on("click", ".ProximoArquivo", function () {
    var d = $(this),
        b = d.val(),
        e = $("#ModalVisualizarArquivo"),
        c = e.find('[name="File"]').val();
    d.find("span").removeClass("glyphicon-triangle-right").addClass("fa fa-refresh fa-spin");
    $('[data-h="' + c + '"] .VisualizarArquivo:eq(' + b + ")").trigger("click")
});
$("#Base,#ContainerApp").on("click", ".EditarArquivos", function () {
    var d = $(this),
        b = d.closest(".HControler"),
        c = b.prop("id").replace("Panel", ""),
        l = $("#Modal2" + c),
        k = b.find(".TbodyC:first :checked"),
        g = l.find("form .form-group:first"),
        j = "";
    if (k.length > 1) {
        k.each(function () {
            j += "," + $(this).closest(".TrC").find('span:not([aria-hidden="true"]):eq(0)').text()
        });
        j = j.substring(1);
        g.addClass("hide");
        var e = g.find(".form-control");
        e.prop("disabled", true);
        e.removeAttr("required");
        l.criaFormModal(L.Salvar, true, false);
        l.find("#Chave2" + c).val(j)
    } else {
        var f = d.find("span");
        f.removeClass("glyphicon-cog").addClass("fa fa-refresh fa-spin");
        j = k.closest(".TrC").find('span:not([aria-hidden="true"]):eq(0)').text();
        $.ajax({
            url: glbAppConf.base + c + glbAppConf.extensao + "/editar",
            type: "POST",
            data: {
                Chave: j,
                App: glbAppName
            }
        }).done(function (p) {
            f.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-cog");
            g.removeClass("hide");
            var o = g.find(".form-control"),
                m = JSON.parse(p);
            o.prop("disabled", false);
            o.attr("required");
            l.criaFormModal(L.Salvar, true, false);
            l.populaForm(m);
            l.dateTimePicker()
        }).fail(function (m) {
            f.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-cog");
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + m.status])
        })
    }
});
$("#Base,#Menu,#ContainerApp").on("click", ".AnexaArquivo", function () {
    var b = $(this),
        c = b.parent();
    c.find('[type="file"]').trigger("click")
});
$("#Base,#ContainerApp").on("click", ".AtualizaArquivo", function () {
    var c = $(this),
        e = c.closest(".modal"),
        d = e.find("[data-updatefile]"),
        b = c.closest("[data-closest]").find("[name]").val();
    d.attr("data-fileversao", b);
    d.removeAttr("multiple");
    d.trigger("click")
});
$("#Base,#ContainerApp").on("click", ".FavoritarArquivos", function () {
    var d = $(this),
        f = d.closest(".HControler"),
        b = f.prop("id").replace("Panel", ""),
        e = d.find("span"),
        c = "";
    e.removeClass("glyphicon-star").addClass("fa fa-refresh fa-spin");
    f.find(".TbodyC:first :checked").each(function () {
        c += "," + $(this).closest(".TrC").find('span:not([aria-hidden="true"]):eq(0)').text()
    });
    c = c.substring(1);
    if (c) {
        $.ajax({
            url: glbAppConf.base + b + glbAppConf.extensao + "/favoritar",
            type: "POST",
            data: {
                Chave: c
            }
        }).done(function () {
            e.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-star");
            f.find(".iAtualiza").addClass("fa-spin");
            carregaGridPadrao(b)
        }).fail(function (g) {
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + g.status])
        })
    } else {
        $("#Msg").exibeMsg("#MsgFalha", L.MarqueApenas1)
    }
});
$("#Base,#ContainerApp").on("click", ".RestaurarArquivos", function () {
    var e = $(this),
        g = e.closest(".HControler"),
        b = g.prop("id").replace("Panel", ""),
        f = e.find("span"),
        c = "";
    var d = g.find(".TbodyC:first :checked");
    d.each(function () {
        c += "," + $(this).closest(".TrC").find('span:not([aria-hidden="true"]):eq(1)').text()
    });
    c = c.substring(1);
    if (c && d.length == 1) {
        f.removeClass("fa fa-reply").addClass("fa fa-refresh fa-spin");
        $.ajax({
            url: glbAppConf.base + b + glbAppConf.extensao + "/restaurar",
            type: "POST",
            data: {
                Chave: c
            }
        }).done(function () {
            f.removeClass("fa fa-refresh fa-spin").addClass("fa fa-reply");
            g.find(".iAtualiza").addClass("fa-spin");
            carregaGridPadrao(b)
        }).fail(function (j) {
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + j.status])
        })
    } else {
        $("#Msg").exibeMsg("#MsgFalha", L.MarqueApenas1)
    }
});
$("#Base,#ContainerApp").on("click", ".DownloadArquivos", function () {
    var d = $(this),
        f = d.closest(".HControler"),
        b = f.prop("id").replace("Panel", ""),
        e = d.find("span"),
        c = "";
    e.removeClass("glyphicon-cloud-download").addClass("fa fa-refresh fa-spin");
    attrC = f.find(".TbodyC:first");
    attrC.find(":checked").each(function () {
        c += "," + $(this).closest(".TrC").find('span:not([aria-hidden="true"]):eq(1)').text()
    });
    c = c.substring(1);
    if (c) {
        $.ajax({
            url: glbAppConf.base + b + glbAppConf.extensao + "/compactar",
            type: "POST",
            data: {
                Chave: c
            }
        }).done(function (l) {
            var m = JSON.parse(l),
                k = m.erro,
                j = m.root;
            if (k) {
                var g = k;
                $("#Msg").exibeMsg("#MsgFalha", g, false);
                $("#Msg").find("div:first").delay((g.length * 150)).fadeOut()
            } else {
                geraUrl(j)
            }
            e.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-cloud-download")
        }).fail(function (g) {
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + g.status])
        })
    } else {
        $("#Msg").exibeMsg("#MsgFalha", L.MarqueApenas1)
    }
});
$("#Base,#ContainerApp").on("click", ".tabLogGenerico", function () {
    var g = $(this),
        e = g.find("span.fa-history");
    if (g.hasClass("active") == false) {
        e.removeClass("fa-history").addClass("fa-refresh fa-spin");
        var c = g.attr("data-lc"),
            b = g.closest(".modal"),
            f = c == undefined || c == "" ? b.prop("id").replace("Modal", "") : g.attr("data-lc"),
            l = b.find(".tabPanelLogGenerico"),
            j = b.find(".chaveLogGenerico").val(),
            k = b.find('[name="Item"]').val(),
            k = (k == undefined ? "" : k),
            d = b.find('[name="Extra"]').val(),
            d = (d == undefined ? "" : d);
        l.find("thead").empty();
        l.find("tbody").empty();
        l.criaColunaGridPadrao("LogGenerico" + k);
        $.ajax({
            url: glbAppConf.base + "Logs" + glbAppConf.extensao + "/" + (!glbAppConf.bp ? "lista" : "list"),
            type: "POST",
            contentType: "application/" + glbAppConf.ct + "; charset=UTF-8",
            data: {
                Chave: j,
                Local: f,
                Item: k,
                Extra: d,
                App: glbAppName
            }
        }).done(function (s) {
            var o = [],
                t = JSON.parse(s),
                p = t.total,
                m = t.root,
                r = l.find("thead th");
            if (p > 0) {
                var u = 0;
                $.each(m, function (x, w) {
                    var y = [];
                    r.each(function (A) {
                        var z = $(this).attr("data-coluna");
                        if (z == "Acao") {
                            y.push($("<td>").html(L["Log" + w[z]]))
                        } else {
                            if (z == "Adicional") {
                                y.push($("<td>").html((w[z] ? '<span class="label label-' + (w.Cor ? "danger" : "success") + '2" ' + (w[z] ? 'data-toggle="tooltip" data-original-title="' + w[z] + '"' : "") + " >" + L.Detalhes + "</span>" : "")))
                            } else {
                                var C = $(this).attr("data-formato");
                                if (C != undefined) {
                                    try {
                                        w[z] = window["formatoHtml" + C](w[z])
                                    } catch (B) {}
                                }
                                y.push($("<td>").html(w[z]))
                            }
                        }
                    });
                    o.push($('<tr class="TrC" >').append(y));
                    if (w.Descricao) {
                        u++
                    }
                });
                l.find("tbody").html(o);
                l.find('[data-toggle="tooltip"]').tooltip({
                    html: true,
                    container: "body"
                });
                if (u == 0) {
                    l.find('[data-coluna="Descricao"]').addClass("hide")
                }
            } else {
                l.find("tbody").html($("<tr>").append($("<td>").attr({
                    colspan: r.length
                }).text(L.MsgNenhumRegistro)))
            }
            e.removeClass("fa-refresh fa-spin").addClass("fa-history");
            if (l.find(".pager").html() == undefined) {
                var q = $("#PaginacaoGridPadrao").find("ul:first").clone().insertAfter(l.find(".table-responsive"));
                attrD = q.find(".Mais");
                attrD.removeClass("Mais").addClass("maisLogGenerico");
                if (parseInt(p) > 15) {
                    attrD.prop("disabled", false)
                }
            }
        }).fail(function (m) {
            l.find("tbody").html($("<tr>").append($("<td>").attr({
                colspan: "5"
            }).text(L.MsgNenhumRegistro)));
            e.removeClass("fa-refresh fa-spin").addClass("fa-history");
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + m.status])
        })
    }
});
$("#ContainerApp").on("click", ".maisLogGenerico", function () {
    var g = $(this),
        f = g.attr("data-lc"),
        k = g.closest(".modal"),
        b = f == undefined || f == "" ? k.prop("id").replace("Modal", "") : g.attr("data-lc"),
        j = k.find(".tabPanelLogGenerico"),
        e = j.find(".TrC").length,
        c = k.find(".chaveLogGenerico").val(),
        d = g.find("span");
    d.addClass("fa fa-refresh fa-spin").removeClass("glyphicon-chevron-down");
    $.ajax({
        url: glbAppConf.base + "Logs" + glbAppConf.extensao + "/lista",
        type: "POST",
        data: {
            Chave: c,
            Local: b,
            Tatual: e,
            App: glbAppName
        }
    }).done(function (q) {
        var m = [],
            r = JSON.parse(q),
            o = r.total,
            l = r.root,
            p = j.find("thead th");
        if (l[0]) {
            $.each(l, function (t, s) {
                var u = [];
                p.each(function (x) {
                    var w = $(this).attr("data-coluna");
                    if (w == "Acao") {
                        u.push($("<td>").html(L["Log" + s[w]]))
                    } else {
                        u.push($("<td>").html(s[w]))
                    }
                });
                m.push($('<tr class="TrC" >').append(u))
            });
            j.find("tbody").append(m)
        }
        if ((e + l.length) >= parseInt(o)) {
            j.find(".maisLogGenerico").prop("disabled", true)
        }
        d.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-chevron-down")
    }).fail(function (l) {
        d.removeClass("fa fa-refresh fa-spin").addClass("glyphicon-chevron-down");
        $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + l.status])
    })
});
$("#ContainerApp").on("change", ".tabPanelCronGenerico [data-cronc]", function () {
    var j = $(this),
        l = j.closest(".tabPanelCronGenerico"),
        g = j.attr("data-cronc").split(":"),
        c = j.closest(".panel"),
        q = c.find(".panel-body"),
        p = q.find('[type="checkbox"]'),
        o = q.find(":checked");
    if (g[1] == "") {
        c.find('[type="checkbox"]').prop({
            checked: j.prop("checked")
        })
    } else {
        if (o.length == p.length) {
            c.find('[type="checkbox"]:first').prop({
                checked: "checked"
            })
        } else {
            c.find('[type="checkbox"]:first').removeAttr("checked")
        }
    }
    var d = ["Hora", "Dia", "Mes", "Semana", "Ano"],
        f = d.length,
        b = "",
        e = "";
    for (i = 0; i < f; i++) {
        var k = l.find('[data-cronc^="' + d[i] + ':"]:checked');
        if (k.attr("data-cronc") != undefined) {
            if (k.attr("data-cronc").split(":")[1] != "") {
                b += " ";
                e = "";
                var m = 0;
                k.each(function (r) {
                    e += "," + $(this).attr("data-cronc").split(":")[1]
                });
                b += e.substring(1)
            } else {
                b += " *"
            }
        } else {
            b += " ?"
        }
    }
    l.find('[name="TCron[Timer]"]').val("?" + b);
    return false
});
$("#ContainerApp").on("change", '.tabPanelCronGenerico [name="TCron[Timer]"]', function () {
    var d = $(this);
    if (d.val()) {
        var b = d.closest(".tabPanelCronGenerico"),
            e = d.val().split(" "),
            c = {
                Hora: e[1],
                Dia: e[2],
                Mes: e[3],
                Semana: e[4],
                Ano: e[5]
            };
        $.each(c, function (g, f) {
            if (f == "?") {
                b.find('[data-cronc^="' + g + ':"]').prop({
                    checked: false
                })
            } else {
                if (f == "*") {
                    b.find('[data-cronc^="' + g + ':"]').prop({
                        checked: true
                    })
                } else {
                    var l = f.split(","),
                        j = "";
                    $.each(l, function (m, k) {
                        j += ',[data-cronc="' + g + ":" + k + '"]'
                    });
                    if (j) {
                        b.find('[data-cronc^="' + g + '"]').prop({
                            checked: false
                        });
                        b.find(j.substring(1)).prop({
                            checked: true
                        })
                    }
                }
            }
        })
    }
});
$("#ContainerApp").on("change", '.tabPanelCronGenerico [name="TCron[Ativar]"]', function () {
    var d = $(this),
        c = d.closest(".tabPanelCronGenerico"),
        b = c.find('[name="TCron[Notificars][]"]');
    if (d.val() == "S") {
        b.attr({
            required: "required"
        })
    } else {
        b.removeAttr("required")
    }
});
$("#ContainerApp").on("click", ".ListaAddTags", function () {
    var f = $(this),
        j = f.closest("[data-closest]").find("select:first"),
        b = j.attr("name"),
        d = f.closest(".modal").attr("id");
    var e = $("#ModalListaAddTags");
    e.find(".modal-title").text(L.GerarTags);
    e.find('[name="Modal"]').val(d);
    e.find('[name="Campo"]').val(b);
    var g = j.find("option:selected");
    var c = " ";
    g.each(function (k) {
        c += "\n" + $(this).val()
    });
    e.find('[name="Tags"]').val(c.substring(2));
    e.traduzItens();
    e.zIndex();
    e.modal("show")
});
$("#Base").on("click", "#ModalListaAddTags .Aplicar", function () {
    var j = $("#ModalListaAddTags");
    var g = j.find('[name="Modal"]').val();
    var c = j.find('[name="Campo"]').val();
    var e = j.find('[name="Tags"]').val();
    var f = e.replace(/"/g, "").trim().split("\n");
    var b = "";
    var d = [];
    for (let i = 0; i < f.length; i++) {
        if (d.indexOf(f[i].trim()) == -1) {
            d.push(f[i].trim())
        }
    }
    $.each(d, function (k, l) {
        if (l) {
            b += '<option value="' + l + '" selected >' + l + "</option>"
        }
    });
    $("#" + g).find('[name="' + c + '"]').html(b).change()
});
$("#ContainerApp").on("click", ".ListaMultiplo", function () {
    var l = $(this),
        o = l.text(),
        f = "Cp Tdu ListaMultiplo",
        b = l.closest("[data-closest]").find("select:first"),
        g = b.find("option:selected"),
        c = l.closest(".modal").attr("id"),
        k = l.closest("[data-tp]").index().toString().replace("-1", "0");
    try {
        var j = b.attr("data-ajax--url").replace("/", "")
    } catch (e) {
        var j = b.attr("name").replace("[]", "");
        var k = "0";
        var m = "";
        b.find("option").each(function (p) {
            m += ',{"id":"' + $(this).val() + '","text":"' + $(this).text() + '"}'
        });
        sessionStorage.setItem("GLM" + j, '{"root":[' + m.substring(1) + "]}")
    }
    if (b.attr("multiple") == undefined) {
        $("#Msg").exibeMsg("#MsgFalha", L.UtilizeUmaListaMultipla);
        return false
    }
    l.text(L.Aguarde);
    l.removeClass(f);

    function d(z, A, q, w, r, t) {
        var s = JSON.parse(t),
            y = s.total,
            x = s.root;
        var p = [];
        w.each(function (C) {
            p[C] = $(this).val().toString()
        });
        var u = $("#ModalListaMultiplo");
        u.find(".modal-title").text(L.ListaDe + A);
        u.traduzItens();
        u.zIndex();
        u.find('[name="PLGridModal"]').val("");
        var B = '<input type="hidden" name="nSel" value="' + q.attr("name") + '" >';
        B += '<input type="hidden" name="pSel" value="' + k + '" >';
        B += '<input type="hidden" name="modal" value="' + r + '" >';
        B += '<div class="table-responsive" style="height:' + ($(window).height() - 300) + 'px;" >';
        B += '<table class="table table-hover table-striped" >';
        B += '<thead class="TheadC sorted_head" style="position:fixed;background:#fff;" >';
        B += "<tr>";
        B += '<th data-coluna="Chave" ><input type="checkbox" class="CheckBoxAll"></th>';
        B += '<th style="width: 92.65%;">' + L.Nome + "</th>";
        B += "</tr>";
        B += "</thead>";
        B += '<tbody class="TbodyC" >';
        B += "<tr>";
        B += "<td>&nbsp;</td><td></td>";
        B += "</tr>";
        $.each(x, function (D, C) {
            var H = p.indexOf(C.id.toString());
            try {
                var E = (q.attr("data-bfr") ? $(window["formatoBA" + q.attr("data-bfr")](C)).text() : C.text)
            } catch (F) {
                var E = C.text
            }
            try {
                var G = (C.ex != "S" ? "" : "text-danger")
            } catch (F) {
                var G = ""
            }
            B += '<tr class="TrC ' + G + " " + (H >= 0 ? "cc" : "") + '" >';
            B += '<td style="width: 40px;" ><input type="hidden" name="id" value="' + C.id + '" ><input type="checkbox" ' + (H >= 0 ? "checked" : "") + " ></td>";
            B += '<td id="TdC" >' + E + "</td>";
            B += "</tr>"
        });
        B += "</tbody>";
        B += "</table>";
        B += "</div>";
        u.find("form").html(B);
        u.modal("show");
        z.text(A);
        z.addClass(f)
    }
    if (sessionStorage.getItem("GLM" + j) != null) {
        d(l, o, b, g, c, sessionStorage.getItem("GLM" + j))
    } else {
        $.ajax({
            url: b.attr("data-ajax--url"),
            type: "POST",
            data: {
                Dados: '{"Pesquisa":"","Ativo":"1","Ordem":[],"Ajax":"true","Tudo":"true"' + criaDataFiltro(b.attr("data-filtro")) + "}",
                Menu: sessionStorage.getItem("hash"),
                Modal: c.replace("Modal", ""),
                App: glbAppName
            }
        }).done(function (p) {
            if (p.length <= 20000) {
                sessionStorage.setItem("GLM" + j, p)
            }
            d(l, o, b, g, c, p)
        }).fail(function (p) {
            l.text(o);
            l.addClass(f);
            $("#Msg").exibeMsg("#MsgFalha", L["ErrojqXHR" + p.status])
        })
    }
});
$("#Base").on("click", "#ModalListaMultiplo .Aplicar", function () {
    var c = $(this),
        e = c.closest(".modal"),
        d = e.find('tbody [type="checkbox"]'),
        b = "";
    d.each(function (f) {
        var g = $(this).closest(".TrC");
        b += '<option value="' + g.find('[name="id"]').val() + '" ' + ($(this).prop("checked") ? "selected" : "") + " >" + g.find("td:eq(1)").text() + "</option>"
    });
    $("#" + e.find('[name="modal"]').val() + ' select[name="' + e.find('[name="nSel"]').val() + '"]:eq(' + e.find('[name="pSel"]').val() + ")").html(b).change()
});
$("#ContainerApp").on("click", ".ConfirmarFechar", function () {
    var c = $(this);
    attrA = c.closest(".modal"), pSalvar = attrA.find(".Salvar");
    if (pSalvar.prop("disabled") == false && pSalvar.attr("class").match("hide") == null && localStorage.getItem("FecharModalNPN" + glbLC) != "true") {
        var d = $("#ModalConfirmarFechar"),
            b = attrA.prop("id");
        d.find('[name="Modal"]').val(b);
        d.traduzItens();
        d.zIndex();
        d.modal("show")
    } else {
        attrA.modal("hide")
    }
});
$("#Base").on("click", "#ModalConfirmarFechar .FecharModalTrue", function () {
    var b = $(this);
    attrA = b.closest(".modal"), valA = attrA.find('[name="Modal"]').val(), vNPN = attrA.find('[name="NaoPerguntarNovamente"]').prop("checked");
    localStorage.setItem("FecharModalNPN" + glbLC, vNPN);
    attrA.modal("hide");
    $("#" + valA).modal("hide")
});
$("#ContainerApp").on("click", ".FM", function () {
    $("#Msg").empty()
});
$("#ContainerApp").on("change", '[data-sm="true"]', function () {
    var d = $(this),
        e = d.closest(".modal"),
        c = e.attr("aria-labelledby"),
        b = "";
    if (d.closest(".tab-pane").hasClass("active") == false) {
        b = d.val();
        b = ((glbWidth < 768) ? b.substring(0, 15) : b)
    }
    $("#" + c + " small").text(b)
});
$("#ContainerApp").on("click", ".AtalhosHome", function () {
    $(this).find("span").toggleClass("glyphicon-minus", "glyphicon-triangle-bottom");
    $("#HistNav" + glbAppName).fadeToggle("slow", "swing")
});
$('a[data-toggle="tab"]').on("show.bs.tab", function (j) {
    var f = $(this),
        k = f.closest(".modal"),
        d = k.attr("aria-labelledby"),
        c = "",
        b = $(j.target).attr("aria-controls"),
        g = k.find('[data-sm="true"]');
    if (g.length > 0) {
        if (b.search("Aba1") < 0) {
            c = g.val();
            c = ((glbWidth < 768) ? c.substring(0, 15) : c)
        }
        $("#" + d + " small").text(c)
    }
});
$("#ContainerApp").on("hide.bs.modal", function (d) {
    if ($(d.target).attr("data-ala") != "false") {
        var b = sessionStorage.getItem("qtdListasAjax");
        var c = sessionStorage.getItem("modalListasAjax");
        if (b && c != "false") {
            b = parseInt(b);
            sessionStorage.removeItem("aListasAjax" + b);
            b = (b - 1);
            sessionStorage.setItem("qtdListasAjax", (b < 0 ? 0 : b))
        } else {
            sessionStorage.setItem("modalListasAjax", "true")
        }
    }
});
var h = $(location).prop("hash").substring(1);
if (direcionaUsuario(true) >= 0 || h == "Home") {
    loadJS(h, true, true, true)
}
var hashChange = function () {
    var d = $(location).prop("hash").substring(1);
    sessionStorage.setItem("hash", d);
    if (direcionaUsuario(true) >= 0 || d == "Home") {
        $(".sidebar-nav").collapse("hide");
        loadJS(d, true, true, true);
        $("#side-menu").find("a").removeClass("active");
        $('[href="#' + d + '"]').addClass("active")
    }
    if (glbWidth > 768) {
        var c = $("#Panel" + d).find(".page-header").text();
        $("#my-page-header").text((d != "Home" ? (c ? "» " + c : "") : ""))
    }
    if (d.search(/Quadro$/) >= 0) {
        $("body").css("background-color", "#d5dde6")
    } else {
        $("body").css("background-color", "#fff")
    }
    if (d != "Conversas") {
        var b = $("#open-chat").find("span");
        if (b.hasClass("fa-window-minimize")) {
            b.toggleClass("fa-comment");
            b.toggleClass("fa-window-minimize")
        }
    }
    $("#" + d + "TmpTop").remove()
};
var ocultaMenu = function (b) {
    if (glbWidth > 768 && glbAppName != "Portal" && localStorage.getItem("mostraareamenu") != "Manual") {
        try {
            var k = $("#side-menu"),
                j = $("#open-chat,#count-chat,.render-chat"),
                g = $("#page-wrapper"),
                f = $(location).prop("hash").substring(1),
                d = JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("TPermissao" + glbAppName))),
                c = 0;
            $.each(d.Menu, function (m, l) {
                if (l.Elemento == f && (l.Modulo == "Lancamentos" || l.Modulo == "Indicadores")) {
                    c = 1;
                    return false
                }
            });
            if (b == true) {
                if (f != "Home" && c == 1) {
                    k.hide();
                    $(window).trigger("resize");
                    g.css("margin", "0 8px 0 8px");
                    j.css("left", "10px")
                } else {
                    k.show();
                    $(window).trigger("resize");
                    j.css("left", "210px")
                }
            } else {
                if (f != "Home" && c == 1) {
                    k.show();
                    $(window).trigger("resize");
                    j.css("left", "210px")
                } else {
                    k.hide();
                    $(window).trigger("resize");
                    g.css("margin", "0 8px 0 8px");
                    j.css("left", "10px")
                }
            }
        } catch (e) {}
    }
};
$(window).on("hashchange", function () {
    var b = $(location).prop("hash").substring(1);
    if (b.search(":") < 0) {
        hashChange();
        ocultaMenu(true)
    }
});
$(function () {
    $(window).bind("load resize", function () {
        var j = $("#side-menu"),
            g = $("#page-wrapper"),
            f = $(".navbar-collapse"),
            e = $(".navbar-toggle"),
            c = 50,
            d = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width,
            b = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        if (d < 768) {
            f.addClass("collapse");
            e.attr("data-toggle", "collapse");
            j.show();
            g.css("margin", "0");
            c = 100;
            j.css("overflow", "auto")
        } else {
            f.removeClass("collapse");
            e.attr("data-toggle", "mostraAreaMenu");
            if (j.is(":visible") == true) {
                g.css("margin", "0 0 0 190px");
                if (localStorage.getItem("mostraareamenu") == "Manual") {
                    e.addClass("mostraAreaMenuForce");
                    e.find("span").addClass("iconBarForce")
                }
            } else {
                g.css("margin", "0px 8px")
            }
        }
        b = b - c;
        if (b < 1) {
            b = 1
        }
        if (b > c) {
            g.css("min-height", (b) + "px")
        }
        j.css("height", ($(window).height() - 50) + "px")
    })
});
$("#Menu").on("click", '[data-toggle="mostraAreaMenu"]', function (b) {
    $("#side-menu").toggle();
    $(window).trigger("resize");
    var e = $("#open-chat,#count-chat,.render-chat");
    var d = $(this);
    var c = d.find("span");
    if ($("#side-menu").is(":visible")) {
        if (glbWidth > 768) {
            e.css("left", "210px");
            localStorage.setItem("mostraareamenu", "Manual");
            d.addClass("mostraAreaMenuForce");
            c.addClass("iconBarForce")
        }
    } else {
        if (glbWidth > 768) {
            e.css("left", "10px");
            localStorage.removeItem("mostraareamenu");
            d.removeClass("mostraAreaMenuForce");
            c.removeClass("iconBarForce")
        }
    }
});
$("#Menu").on("dblclick", "#side-menu a.active", function () {
    location.reload()
});
$("#Menu").on("click", "#TriggerAP", function () {
    location.reload()
});
$("#Menu").on("click", ".mostraMenu", function () {
    var d = $(this),
        f = d.parent(),
        e = f.find(".collapse");
    if (f.attr("class") == undefined) {
        f.attr({
            "class": "active"
        });
        e.addClass("in");
        var c = f.next(),
            b = c.index();
        if (b == -1) {
            c = f.prev()
        }
        c.removeAttr("class");
        c.find(".collapse").removeClass("in")
    } else {
        f.removeAttr("class");
        e.removeClass("in")
    }
});
$("#Base,#ContainerApp").on("blur", '.date>input[type="text"]', function () {
    var e = $(this),
        b = e.val(),
        f = new Date(),
        c = f.getFullYear().toString().substring(0, 2);
    e.val(b.replace(/00([0-9]{2})/, c + "$1"))
});
if (glbWidth > 768) {
    $(document).on("keypress", function (f) {
        if (f.target.localName != "input" && f.target.localName != "textarea" && f.target.getAttribute("contenteditable") != "true" && $(f.target).prop("id") != "DescricaoPortalCliente" && $(f.target).prop("id") != "DescricaoPortalOperador") {
            if ($(".modal-backdrop").is(":visible") == false) {
                if (f.charCode == 97) {
                    var e = $(location).prop("hash").substring(1);
                    e = (e == "Home" ? "Home" + glbAppName : e);
                    $("#Panel" + e).find(".PAvancada:first").trigger("click");
                    return false
                } else {
                    if (f.charCode == 65) {
                        var g = $("#DropdownMenuAlertas");
                        if (g.find(".fa-spin").length <= 0) {
                            g.trigger("click")
                        }
                        return false
                    } else {
                        if (f.charCode == 99) {
                            var e = $(location).prop("hash").substring(1);
                            e = (e == "Home" ? "Home" + glbAppName : e);
                            $("#Panel" + e).find(".Criar:first,.CriarAlias:first").trigger("click");
                            return false
                        } else {
                            if (f.charCode == 47) {
                                var e = $(location).prop("hash").substring(1);
                                e = (e == "Home" ? "Home" + glbAppName : e);
                                $("#Panel" + e).find('[name="Pesquisa"]').focus().select();
                                return false
                            } else {
                                if (f.charCode == 109) {
                                    $("#Menu").find('[data-toggle="mostraAreaMenu"]').trigger("click");
                                    return false
                                } else {
                                    if (f.charCode == 101) {
                                        var e = $(location).prop("hash").substring(1);
                                        if (e != "Home") {
                                            if ($("#Panel" + e).find(".PAvancada").hasClass("btn-warning") == true) {
                                                $("#ModalPA" + e).find(".lFormAvancado:first,.aGridAvancado:first").trigger("click")
                                            }
                                        } else {
                                            var g = $("#PanelHome" + glbAppName).find(".PAvancada");
                                            if (g.hasClass("btn-warning") == true) {
                                                $("#ModalPAHome" + glbAppName).find(".lFormAvancado:first").trigger("click");
                                                g.addClass("btn-info").removeClass("btn-warning")
                                            }
                                            window["graficosHome" + glbAppName]()
                                        }
                                        return false
                                    } else {
                                        if (f.charCode == 100) {
                                            window.location.assign("?" + glbAppName + "#Home");
                                            if ($("#PanelHome" + glbAppName + " .page-header").find(".fa-spin").length <= 0) {
                                                $("#Menu").find('[href="#Home"]:eq(1)').trigger("click")
                                            }
                                            return false
                                        } else {
                                            if (f.charCode == 68) {
                                                $("body").animate({
                                                    scrollTop: $(document).height()
                                                }, 1000);
                                                return false
                                            } else {
                                                if (f.charCode == 117) {
                                                    $("#Base").find("#ControleUsuario").trigger("click");
                                                    return false
                                                } else {
                                                    if (f.charCode == 85) {
                                                        $("body").animate({
                                                            scrollTop: 0
                                                        }, 1000);
                                                        return false
                                                    } else {
                                                        if (f.charCode == 63) {
                                                            var g = $("#ModalTeclasAtalho");
                                                            if (glbAppName == "Portal") {
                                                                g.find('[data-l="Teclan"]').parent().remove()
                                                            }
                                                            g.traduzItens();
                                                            g.modal("show")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (f.charCode == 106 || f.charCode == 107) {
                    var e = $(location).prop("hash").substring(1);
                    e = (e == "Home" ? "Home" + glbAppName : e);
                    if (f.target.id == "Modal" + e) {
                        var b = $(".chaveAtalho" + e).val(),
                            g = $("#Panel" + e + " .TbodyC:first"),
                            d = g.find('[type="checkbox"][value="' + b + '"]:first').closest(".TrC").index(),
                            c = g.find(".TrC").length;
                        d = (f.charCode == 107 ? d - 1 : d + 1);
                        if (d >= 0 && d < c) {
                            sessionStorage.setItem("modalkeyboard", "true");
                            g.find(".TrC:eq(" + d + ") td:first").trigger("click")
                        }
                    }
                    return false
                } else {
                    if (f.charCode == 101 && $(".modal .PAvancada").is(":visible") == true) {
                        var e = $(".PAvancada:visible").attr("data-tm");
                        if ($("#Panel" + e).find(".PAvancada").hasClass("btn-warning") == true) {
                            $("#ModalPA" + e).find(".lFormAvancado:first,.aGridAvancado:first").trigger("click")
                        }
                        return false
                    }
                }
            }
            if ((f.charCode == 110) && $("#ModalBlocoNotas").is(":visible") == false) {
                $("#BlocoNotas").trigger("click");
                return false
            }
            if (f.charCode == 67 && $("#ModalCalculadora").is(":visible") == false) {
                $("#Calculadora").trigger("click")
            }
        }
    })
} else {
    $("#Menu").on("click", ".navbar-toggle", function () {
        var c = $("#side-menu"),
            b = c.find("li");
        b.addClass("active");
        b.find("a").removeClass("mostraMenu");
        c.find(".nav-second-level").addClass("in")
    })
}
if (glbWidth > 768) {
    $("#Menu,#Base,#ContainerApp").on("keydown", "[data-e]", function (b) {
        var f = (b.keyCode ? b.keyCode : b.which);
        if ((b.ctrlKey && f == "13") || ((b.target.localName == "input" || b.target.localName == "select") && f == "13")) {
            var e = ["aGrid", "Salvar", "Logar", "Enviar", "CEP", "Suframa", "CNPJ", "DirecionaPrefixo", "aGridAvancado", "Interagir", "EnviarArquivo", "Confirmar", "FecharModalTrue", "FecharModalPACSTrue"],
                d = [".HControler", ".modal", ".modal", ".modal", '[role="form"]', '[role="form"]', "div", ".modal", ".modal", ".modal", ".modal", ".modal", ".modal"],
                j = $(this),
                l = j.attr("data-e"),
                g = d[$.inArray(l, e)],
                m = j.closest(g),
                k = m.find("." + l + ":first");
            k.trigger("click");
            if (b.target.localName == "input" || b.target.localName == "select") {
                return false
            }
        }
    })
}
$("#ContainerApp").on("keyup", ".has-error", function () {
    $(this).removeClass("has-error")
});
$("#ContainerApp").on("keyup", '[name="PesquisaLocal"]', function () {
    var c = $(this),
        b = c.val(),
        e = c.closest(".HControler"),
        d = e.find(".TbodyC:first");
    d.removeHighlight().highlight(b)
});
$("#Menu").on("keyup", "#PesquisaMenu", function () {
    var b = $(this).val();
    $(".nav-second-level li").each(function (d) {
        var f = $(this),
            e = f.text(),
            c = new RegExp(b, "i");
        if (e.search(c) == "-1") {
            f.hide()
        } else {
            f.show()
        }
    })
});
$("#Base").on("keyup", '[name="PLGridModal"]', function () {
    var b = document.getElementById("ModalListaMultiplo").querySelectorAll(".TrC"),
        d;
    var c = this.value.replace("(", "[(]").replace(")", "[)]");
    for (d = 0; d < b.length; ++d) {
        if (b[d].querySelector("#TdC").textContent.search(new RegExp(c, "i")) == -1) {
            b[d].style.display = "none"
        } else {
            b[d].style.display = "block"
        }
    }
    $("#ModalListaMultiplo .CheckBoxAll").removeAttr("checked")
});
$("#Base,#ContainerApp").on("blur", "input:text,textarea", function () {
    $(this).val($(this).val().trim().replace(/“|”/g, '"').replace(/\u200e/g, ""))
});
var dGD = function (f) {
    var e = glbVersion,
        d = f.Item,
        b = f.Dados;
    if (f.App && f.Target) {
        localStorage.setItem("Continue" + glbLC, LZString.compressToUTF16('{"Item":"' + d + '","Dados":' + JSON.stringify(b) + "}"));
        window.open("?" + f.App + "#Home", f.Target);
        return false
    }
    var c = LZString.decompressFromUTF16(localStorage.getItem("Continue" + glbLC));
    sessionStorage.setItem("dGD", JSON.stringify(b));
    sessionStorage.removeItem(d);
    localStorage.removeItem("Continue" + glbLC);
    if ($(location).prop("hash") != "#" + d || c) {
        location = "?" + glbAppName + "#" + d
    } else {
        loadJS(d, true, true, true)
    }
    $(".modal").modal("hide");
    setTimeout(function () {
        if ($("#open-chat").find(".fa-window-minimize").length) {
            $("#open-chat").trigger("click")
        }
    }, 0)
};
var cNavegacao = function () {
    if (localStorage.getItem("Continue" + glbLC)) {
        dGD(JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("Continue" + glbLC))))
    }
};
var slideShowVisualiza = function (e, o, B, z, b) {
    try {
        var r = parseInt(sessionStorage.getItem("SlideShowTop"));
        r = (Number.isNaN(r) ? 15 : r)
    } catch (K) {
        var r = 15
    }
    var H = "",
        e = JSON.parse(e.replace(/\\"/g, "")),
        J = "";
    try {
        var J = e.soma
    } catch (K) {
        var J = ""
    }
    sessionStorage.setItem("somaSS", J);
    var N = o,
        G = e.root,
        u = G.reduce(function (Q, R) {
            Q[R[N]] = Q[R[N]] || [];
            Q[R[N]].push(R);
            return Q
        }, {});
    var O = [],
        I = 0,
        s = 0,
        w = "",
        m = B;
    $.each(e.colunas, function (R, Q) {
        var S = Q.split("|"),
            T = "";
        if (S.length < 2) {
            T = L[S[0]]
        } else {
            T = S[1];
            L[S[0]] = T
        }
        w += '<label class="btn btn-default btn-xs prop-type BoxS0">';
        w += '<input type="radio" name="SlideShowTipo" value="' + S[0] + '" data-eq="' + R + '" autocomplete="off"><span></span><span class="prop-type-word text-capitalize">' + T + "</span>";
        w += "</label>"
    });
    $.each(u, function (R, Q) {
        s += Q.length
    });
    $.each(u, function (R, Q) {
        O[I] = [R, Q.length, Q];
        I++
    });
    if (!(J && m == "V")) {
        if (z == "1") {
            O.sort(function (S, Q) {
                var R = S[1],
                    T = Q[1];
                if (R == T) {
                    return 0
                }
                return R < T ? 1 : -1
            })
        } else {
            O.sort(function (S, Q) {
                var R = S[1],
                    T = Q[1];
                if (R == T) {
                    return 0
                }
                return R > T ? 1 : -1
            })
        }
    }
    var g = parseInt(514 / (O.length - 1)),
        j = 1,
        t = "",
        x = [],
        l = "";
    $.each(O, function (R, Q) {
        Q[0] = (Q[0] == "undefined" || Q[0] == "" ? L.NaoHaItem : Q[0]);
        Q[0] = Q[0].replace(/<(?:.|\n)*?>/gm, " ");
        var S = '<div class="huge" style="font-size:17px;font-weight: bold;" >' + Q[1] + " / " + ((Q[1] * 100) / s).toFixed(2) + "%</div>";
        if (J && m == "V") {
            var T = 0;
            $.each(Q[2], function (W, V) {
                T += parseFloat(V[J].replace(",", ""))
            });
            T = T.toFixed(2);
            var U = ((Q[1] * 100) / s).toFixed(2);
            S = '<div class="huge" style="font-size:17px;font-weight: bold;" >' + (T.toString().replace(".", ",")) + "</div>";
            S += "<div>" + Q[1] + " / " + U + "%</div>"
        }
        t = '<div class="col-lg-4 col-md-6" >';
        t += '<div class="panel cor_' + j + '" style="background-color:#000;" >';
        t += '<div class="panel-heading">';
        t += '<div class="row">';
        t += '<div class="col-xs-3"><i class="fa fa-genderless fa-5x cor_' + j + '"></i></div>';
        t += '<a href="javascript:void(0);" data-json=\'' + JSON.stringify(Q[2]).replace(/'/g, "&#39;") + '\' class="modalslideshow" >';
        t += '<div class="col-xs-9 text-right" style="color:#FFF;" >';
        t += S;
        t += "<span>" + dataRev(Q[0]) + "</span>";
        t += "</div>";
        t += "</a>";
        t += "</div>";
        t += "</div>";
        t += "</div>";
        t += "</div>";
        j += g;
        x[R] = [T, t];
        if (!(J && m == "V")) {
            if (R < r) {
                l += ',{"label":"' + dataRev(Q[0]) + " " + (b == "1" ? "(" + Q[1] + ")" : "") + '","value":' + Q[1] + ',"click":' + JSON.stringify(Q[2]) + "}"
            }
        } else {
            l += ',{"label":"' + dataRev(Q[0]) + " " + (b == "1" ? "(" + T + ")" : "") + '","value":' + T + ',"click":' + JSON.stringify(Q[2]) + "}"
        }
    });
    if (J && m == "V") {
        var A = JSON.parse("[" + l.substring(1) + "]");
        if (z == 1) {
            A.sort(function (S, Q) {
                var R = parseFloat(S.value),
                    T = parseFloat(Q.value);
                if (R == T) {
                    return 0
                }
                return R < T ? 1 : -1
            })
        } else {
            A.sort(function (S, Q) {
                var R = parseFloat(S.value),
                    T = parseFloat(Q.value);
                if (R == T) {
                    return 0
                }
                return R > T ? 1 : -1
            })
        }
        var l = "";
        $.each(A, function (R, Q) {
            if (R < r) {
                l += ',{"label":"' + Q.label + '","value":' + Q.value + ',"click":' + JSON.stringify(Q.click) + "}"
            } else {
                return false
            }
        })
    }
    t = "";
    $.each(x, function (R, Q) {
        t += Q["1"]
    });
    var C = '<div id="prop-type-group_tipo" data-toggle="buttons" ' + (glbWidth > 768 ? "" : 'class="btn-group-vertical"') + " >";
    C += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;margin-left:10px;" >';
    C += w;
    C += "</div>";
    C += "</div>";
    $("#SlideShowTipo").html(C);
    if (glbWidth > 768) {
        var P = parseInt(($("#SlideShowTipo").text().length * 8.6) / $(window).width());
        if (P > 0) {
            $("#SlideShowHTML").css("margin-top", (P * 35))
        }
    }
    var D = "";
    if (J || H) {
        D += '<div id="prop-type-group_agrupar" data-toggle="buttons">';
        D += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
        D += '<label class="btn btn-default btn-xs prop-type Mw12 BoxS0">';
        D += '<input type="radio" name="SlideShowAgrupar" value="" autocomplete="off"><span class="fa fa-plus" ></span><span class="prop-type-word"></span>';
        D += "</label>";
        if (J) {
            D += '<label class="btn btn-default btn-xs prop-type Mw12 BoxS0">';
            D += '<input type="radio" name="SlideShowAgrupar" value="V" autocomplete="off"><span class="fa fa-usd" ></span><span class="prop-type-word"></span>';
            D += "</label>"
        } else {
            if (H) {
                D += '<label class="btn btn-default btn-xs prop-type Mw12 BoxS0">';
                D += '<input type="radio" name="SlideShowAgrupar" value="H" autocomplete="off"><span class="fa fa-clock-o" ></span><span class="prop-type-word"></span>';
                D += "</label>";
                D += "</div>"
            }
        }
        D += "</div>"
    }
    $("#SlideShowAgrupar").html(D);
    var M = ' <div id="prop-type-group_ordem" data-toggle="buttons">';
    M += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
    M += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    M += '<input type="radio" name="SlideShowOrdem" value="1" autocomplete="off"><span class="fa fa-sort-alpha-desc" ></span><span class="prop-type-word"></span>';
    M += "</label>";
    M += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    M += '<input type="radio" name="SlideShowOrdem" value="0" autocomplete="off"><span class="fa fa-sort-alpha-asc" ></span><span class="prop-type-word"></span>';
    M += "</label>";
    M += "</div>";
    M += "</div>";
    $("#SlideShowOrdem").html(M);
    var y = ' <div id="prop-type-group_tipoexibicao" data-toggle="buttons">';
    y += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
    y += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    y += '<input type="radio" name="SlideShowTipoExibicao" value="0" autocomplete="off"><span class="fa fa-th-large" ></span><span class="prop-type-word"></span>';
    y += "</label>";
    y += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    y += '<input type="radio" name="SlideShowTipoExibicao" value="1" autocomplete="off"><span class="fa fa-align-left" ></span><span class="prop-type-word"></span>';
    y += "</label>";
    y += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    y += '<input type="radio" name="SlideShowTipoExibicao" value="2" autocomplete="off"><span class="fa fa-pie-chart" ></span><span class="prop-type-word"></span>';
    y += "</label>";
    try {
        if (e.colunas.toString().match(/(AnoMesData|Data|SomenteHora|Hora)(.*?),/)[1]) {
            y += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
            y += '<input type="radio" name="SlideShowTipoExibicao" value="3" autocomplete="off"><span class="fa fa-line-chart" ></span><span class="prop-type-word"></span>';
            y += "</label>"
        }
    } catch (K) {}
    y += "</div>";
    y += "</div>";
    $("#SlideShowTipoExibicao").html(y);
    var E = ' <div id="prop-type-group_timer" data-toggle="buttons">';
    E += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
    E += '<label class="btn btn-default btn-xs prop-type Mw50" style="cursor:not-allowed;" onclick="javascript:void(0);" >';
    E += '<span></span><span class="prop-type-word text-capitalize">00:00</span>';
    E += "</label>";
    E += "</div>";
    E += "</div>";
    $("#SlideShowTimer").html(E);
    var f = ' <div id="prop-type-group_ap" data-toggle="buttons">';
    f += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
    f += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    f += '<input type="radio" name="SlideShowAP" value="A" autocomplete="off"><span class="fa fa-caret-left" ></span><span class="prop-type-word"></span>';
    f += "</label>";
    f += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    f += '<input type="radio" name="SlideShowAP" value="P" autocomplete="off"><span class="fa fa-caret-right" ></span><span class="prop-type-word"></span>';
    f += "</label>";
    f += "</div>";
    f += "</div>";
    $("#SlideShowAP").html(f);
    var p = ' <div id="prop-type-group_i" data-toggle="buttons">';
    p += '<div class="btn-group prop-type-group" style="display:block;padding-top:0px;" >';
    p += '<label class="btn btn-default btn-xs prop-type BoxS0 Mw12">';
    p += '<input type="radio" name="SlideShowI" value="I" autocomplete="off"><span class="glyphicon glyphicon-print" ></span><span class="prop-type-word" onClick="return false;" ></span>';
    p += "</label>";
    p += "</div>";
    p += "</div>";
    $("#SlideShowI").html(p);
    $("#SlideShowHTML").html('<div class="row" id="meuGrafico" ' + (b == "2" && glbWidth > 768 ? 'style="position: absolute;margin-left: 30%;width: 60%;"' : "") + " >" + (b == "0" ? t : "") + "</div>" + (b == "2" ? '<div id="donut-legend" style="padding-top:5%;" ></div>' : ""));
    if (b == "1") {
        var k = $("#meuGrafico");
        k.css("height", ($(window).height() - 80) + "px");
        Morris.Bar({
            element: "meuGrafico",
            horizontal: true,
            data: JSON.parse("[" + l.substring(1) + "]"),
            barColors: function (S, Q, R) {
                return glbColors[S.x]
            },
            xkey: "label",
            ykeys: ["value"],
            labels: ["Value"],
            hoverCallback: function (R, Q, S, T) {
                return T.x
            },
            gridTextColor: "#FFF",
            gridTextSize: (glbWidth > 768 ? (r > 10 ? 20 : 30) : 10)
        }).on("click", function (Q, R) {
            clearTimeout(pSS);
            populaModalGridSS(R.click, R.label.replace(/(.*) [(][0-9.]+[)]$/, "$1"), R.value)
        });
        k.find("rect").addClass("Cp")
    } else {
        if (b == "2") {
            var k = $("#meuGrafico");
            k.css("height", ($(window).height() - 80) + "px");
            var q = Morris.Donut({
                element: "meuGrafico",
                data: JSON.parse("[" + l.substring(1) + "]"),
                labelColor: "#FFF",
                colors: glbColors,
            }).on("click", function (Q, R) {
                clearTimeout(pSS);
                populaModalGridSS(R.click, R.label, R.value)
            });
            k.find("path").addClass("Cp");
            q.options.data.forEach(function (R, S) {
                var Q = $('<span style="color:#FFF" ></span><br>').text(R.label + " (" + R.value + ")").prepend("<span>&nbsp;</span>");
                Q.find("span").css("backgroundColor", q.options.colors[S]).css("width", "20px").css("display", "inline-block").css("margin", "5px");
                $("#donut-legend").append(Q)
            })
        } else {
            if (b == "3") {
                var k = $("#meuGrafico"),
                    F = slideShowLinhas(e, o);
                k.css("height", ($(window).height() - 160) + "px");
                Morris.Line({
                    element: "meuGrafico",
                    data: F.data,
                    xkey: "period",
                    ykeys: F.ykeys,
                    labels: F.labels,
                    lineColors: glbColors,
                    lineWidth: 1,
                    pointSize: 2,
                    hideHover: "auto",
                    resize: true,
                    xLabelFormat: function (Q) {
                        if (F.xLabels.search(/AnoMesData.*/) >= 0) {
                            return mesAnoFixoRev(Q.getFullYear() + "-" + (Q.getMonth() + 1))
                        } else {
                            if (F.xLabels.search(/Data.*/) >= 0) {
                                return diaFixo(Q.getDate(), ((Q.getMonth() + 1) + "-" + Q.getFullYear()))
                            } else {
                                if (F.xLabels.search(/Hora.*/) >= 0) {
                                    return Q.getFullYear().toString().replace(/[0-9]{2}/, "")
                                }
                            }
                        }
                    },
                    hoverCallback: function (T, S, V) {
                        V = V.replace(/\n/g, "");
                        var U = V.match(/[#].*?[']/g);
                        for (I = 0; I < U.length; I++) {
                            V = V.replace(/color: [#].*?[']/, "color:" + glbColors[I] + "'")
                        }
                        var U = V.match(/<div.*?<\/div>/g),
                            W = [],
                            V = "",
                            R = $("#line-legend").find('[value!="All"]:checked'),
                            Q = [];
                        R.each(function (X) {
                            Q[X] = $(this).val()
                        });
                        for (I = 0; I < U.length; I++) {
                            W[I] = [U[I].replace(/(.*)[:]  ([0-9.]+)(.*)/, "$2"), U[I]]
                        }
                        W = W.sort(function (Z, X) {
                            var Y = parseInt(Z[0]),
                                aa = parseInt(X[0]);
                            if (Y == aa) {
                                return 0
                            }
                            return Y < aa ? 1 : -1
                        });
                        for (I = 1; I < W.length; I++) {
                            if (Q.indexOf("#" + W[I][1].replace(/(.*)#(.*?)'.*/, "$2")) >= 0) {
                                V += W[I][1]
                            }
                        }
                        V = U[0] + V + "</div>";
                        return dataRev(V)
                    }
                }).on("click", function (S, V) {
                    var Q = Object.values(V),
                        U = 0;
                    for (iRow = 0; iRow < (Q.length - 1); iRow++) {
                        U = (U + parseInt(Q[iRow]))
                    }

                    function R(Y, aa, ac) {
                        var ad = aa,
                            ae = Y.root,
                            W = ae.reduce(function (af, ag) {
                                af[ag[ad]] = af[ag[ad]] || [];
                                af[ag[ad]].push(ag);
                                return af
                            }, {});
                        var X = [],
                            Z = 0;
                        $.each(W, function (ag, af) {
                            X[Z] = [ag, af.length, af];
                            Z++
                        });
                        if (z == "1") {
                            X.sort(function (ah, af) {
                                var ag = ah[1],
                                    ai = af[1];
                                if (ag == ai) {
                                    return 0
                                }
                                return ag < ai ? 1 : -1
                            })
                        } else {
                            X.sort(function (ah, af) {
                                var ag = ah[1],
                                    ai = af[1];
                                if (ag == ai) {
                                    return 0
                                }
                                return ag > ai ? 1 : -1
                            })
                        }
                        var ab = "";
                        $.each(X, function (ag, af) {
                            if (af[0] == ac) {
                                ab += ',{"' + af[0] + '":' + JSON.stringify(af[2]) + "}";
                                return false
                            }
                        });
                        return JSON.parse("[" + ab.substring(1) + "]")[0][ac]
                    }
                    var T = e.colunas.toString().match(/(AnoMesData|Data|SomenteHora|Hora)(.*?),/);
                    clearTimeout(pSS);
                    populaModalGridSS(R(e, (T[1] + T[2]), V.period), V.period, U)
                });
                k.find(".morris-default-style").css("background", "#000");
                k.find("circle").addClass("Cp");
                var c = F.labels;
                var d = "";
                d += '<div id="line-legend" >';
                d += '<div class="form-group">';
                d += '<label class="checkbox col-sm-12">';
                d += '<input type="checkbox" name="LineLegend" value="All" ' + (c.length != r ? "" : "checked") + " >";
                d += '<span class="control-label Cp" style="color:#fff;" >' + L.Todos + "</span>";
                d += "</label>";
                d += "</div>";
                d += '<div class="form-group">';
                for (I = 0; I < c.length; I++) {
                    d += '<label class="checkbox col-sm-4">';
                    d += '<input type="checkbox" name="LineLegend" value="' + glbColors[I] + '" ' + (I < r ? "checked" : "") + " >";
                    d += '<span style="background-color:' + glbColors[I] + ';margin:5px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                    d += '<span class="control-label Cp" style="color:#fff;" >' + dataRev(c[I]) + "</span>";
                    d += "</label>"
                }
                d += "</div>";
                d += "</div>";
                k.after(d)
            }
        }
    }
};
var slideShowActive = function (d, c, f, b) {
    var e = $("#ContainerHomeSlideShow");
    e.find('[name="SlideShowTipo"][value="' + d + '"]').parent().addClass("active");
    e.find('[name="SlideShowAgrupar"][value="' + c + '"]').parent().addClass("active");
    e.find('[name="SlideShowOrdem"][value="' + f + '"]').parent().addClass("active");
    e.find('[name="SlideShowTipoExibicao"][value="' + b + '"]').parent().addClass("active")
};
if (glbWidth > 1100) {
    $(".modal").on("show.bs.modal", function (b) {
        if ($("#ModalTopDownScroll").length == 0) {
            $("body").append('<div id="btnTopDownScroll" class="hide" ><button type="button" class="btn btn-success btn-lg Pf B2vh Br50" id="ModalTopDownScroll" style="width:61px;height:59px;right: 30px;z-index: 2050;" > <span class="glyphicon" ></span> </button></div>')
        }
    });
    $(".modal").on("hide.bs.modal", function (b) {
        $("#btnTopDownScroll").addClass("hide")
    });
    $(".modal").scroll(function () {
        if (parseInt($("#" + $(this).prop("id")).find(".modal-content").height()) > parseInt($(window).height())) {
            var c = $("#btnTopDownScroll");
            var b = c.find("span:eq(0)");
            c.removeClass("hide");
            if ($(this).scrollTop() > (parseInt($("#" + $(this).prop("id")).find(".modal-content").height()) - parseInt($(window).height())) + 50) {
                b.addClass("glyphicon-menu-up").removeClass("glyphicon-menu-down")
            } else {
                b.addClass("glyphicon-menu-down").removeClass("glyphicon-menu-up")
            }
        }
    });
    $("body").on("click", "#ModalTopDownScroll", function (b) {
        if ($(this).find("span:eq(0)").hasClass("glyphicon-menu-down")) {
            $(".modal").scrollTop(100000)
        } else {
            $(".modal").scrollTop(0)
        }
    })
}
$("body").on("click", "#prop-type-group_timer", function (b) {
    return false
});
var slideShowLinhas = function (c, q) {
    var b = c,
        o = "",
        f = sessionStorage.getItem("somaSS");
    $.each(b.colunas, function (s, r) {
        if (r.search(/(AnoMesData|Data|SomenteHora|Hora).*/) >= 0) {
            o = r;
            return false
        }
    });
    var p = {},
        m = {},
        k = [],
        j = [],
        d = "",
        l = "",
        e = "",
        g = 0;
    $.each(b.root, function (s, r) {
        p[r[o]] = r[o];
        m[r[q]] = "";
        k[s] = [r[o], r[q]]
    });
    k = k.sort();
    $.each(p, function (t, s) {
        if (t) {
            d += ',{"period":"' + t + '"';
            var r = 0;
            l = "";
            e = "";
            $.each(m, function (x, w) {
                var u = 0;
                $.each(k, function (z, y) {
                    if (t == y[0] && x == y[1]) {
                        u++
                    }
                });
                d += ',"' + r + '":"' + u + '"';
                l += ',"' + r + '"';
                e += ',"' + (x != "undefined" ? x : L.NaoHaItem) + '"';
                r++
            });
            d += "}"
        }
    });
    return JSON.parse('{"data":[' + d.substring(1) + '], "ykeys":[' + l.substring(1) + '], "labels":[' + e.substring(1) + '],"xLabels":"' + o + '"}')
};
$("#ContainerHomeSlideShow").on("change", '[name="LineLegend"]', function () {
    var d = $(this),
        b = d.val().toLowerCase(),
        f = $("#meuGrafico"),
        c = $("#line-legend").find("input");
    if (b == "all") {
        var e = f.find('circle,path[stroke!="#aaaaaa"]')
    } else {
        var e = f.find('circle[fill="' + b + '"],path[stroke="' + b + '"]')
    }
    if (d.prop("checked")) {
        if (b == "all") {
            c.prop("checked", true)
        }
        e.removeClass("hide")
    } else {
        if (b == "all") {
            c.prop("checked", false)
        }
        e.addClass("hide")
    }
});
$("#ContainerHomeSlideShow").on("change", '[name="SlideShowTipo"]', function (d, g) {
    var e = $(this).val(),
        c = localStorage.getItem("SlideShowAgrupar"),
        f = localStorage.getItem("SlideShowOrdem"),
        b = localStorage.getItem("SlideShowTipoExibicao");
    c = (c != null ? c : "");
    f = (f != null ? f : "1");
    b = (b != null ? b : "0");
    localStorage.setItem("SlideShowTipo", e);
    slideShowVisualiza(glbTempSSJSON, e, c, f, b);
    slideShowActive(e, c, f, b);
    if (g != true) {
        clearTimeout(pSS);
        startTimerSS($("#SlideShowTimer span:eq(1)"), (parseInt($(this).attr("data-eq")) + 1))
    }
});
$("#ContainerHomeSlideShow").on("change", '[name="SlideShowAgrupar"]', function (d, g) {
    var e = localStorage.getItem("SlideShowTipo"),
        c = $(this).val(),
        f = localStorage.getItem("SlideShowOrdem"),
        b = localStorage.getItem("SlideShowTipoExibicao");
    localStorage.setItem("SlideShowAgrupar", c);
    slideShowVisualiza(glbTempSSJSON, e, c, f, b);
    slideShowActive(e, c, f, b);
    if (g != true) {
        clearTimeout(pSS);
        startTimerSS($("#SlideShowTimer span:eq(1)"), (parseInt($("#SlideShowTipo .active").find("[data-eq]").attr("data-eq")) + 1))
    }
});
$("#ContainerHomeSlideShow").on("change", '[name="SlideShowOrdem"]', function (d, g) {
    var e = localStorage.getItem("SlideShowTipo"),
        c = localStorage.getItem("SlideShowAgrupar"),
        f = $(this).val(),
        b = localStorage.getItem("SlideShowTipoExibicao");
    localStorage.setItem("SlideShowOrdem", f);
    slideShowVisualiza(glbTempSSJSON, e, c, f, b);
    slideShowActive(e, c, f, b);
    if (g != true) {
        clearTimeout(pSS);
        startTimerSS($("#SlideShowTimer span:eq(1)"), (parseInt($("#SlideShowTipo .active").find("[data-eq]").attr("data-eq")) + 1))
    }
});
$("#ContainerHomeSlideShow").on("change", '[name="SlideShowTipoExibicao"]', function (d, g) {
    var e = localStorage.getItem("SlideShowTipo"),
        c = localStorage.getItem("SlideShowAgrupar"),
        f = localStorage.getItem("SlideShowOrdem"),
        b = $(this).val();
    localStorage.setItem("SlideShowTipoExibicao", b);
    slideShowVisualiza(glbTempSSJSON, e, c, f, b);
    slideShowActive(e, c, f, b);
    if (g != true) {
        clearTimeout(pSS);
        startTimerSS($("#SlideShowTimer span:eq(1)"), (parseInt($("#SlideShowTipo .active").find("[data-eq]").attr("data-eq")) + 1))
    }
});
var populaModalGridSS = function (k, d, e) {
    var g = "";
    k.reduce(function (q, p) {
        var o = Object.keys(p).length;
        var r = Math.max(q, o);
        if (r == o) {
            g = p
        }
        return r
    }, 0);
    var m = [],
        l = "",
        j = $("#ModalDSlideShow"),
        b = Object.keys(g),
        f = b.length;
    for (i = 0; i < f; i++) {
        l += '<input type="hidden" name="_[' + b[i] + ']" data-cg="' + (i + 1) + '" data-ocg="false" >'
    }
    j.find('[data-h="colunasSlideShow"]').html(l);
    j.find("thead").empty();
    j.find("tbody").empty();
    j.criaFormModal("_", false, false);
    j.criaColunaGridPadrao("DSlideShow");
    var c = $("#Menu .navbar-brand").find("span:eq(1)").text();
    $.each(k, function (q, p) {
        var r = [];
        for (i = 0; i < f; i++) {
            try {
                p[b[i]] = p[b[i]].toString().replace(/\n/g, "<br>");
                if (p[b[i]].length > 200) {
                    var o = p[b[i]].substring(0, 200);
                    o = o.substring(0, Math.min(o.length, o.lastIndexOf(" ")));
                    p[b[i]] = o + ' <b class="moretextslideshow Cp" >...</b><span class="hide" >' + p[b[i]].replace(o, "") + "</span>"
                }
            } catch (s) {
                p[b[i]] = L.NaoHaItem
            }
            r.push($("<td>").html((p[b[i]].replace(/([0-9]{4}-[0-9]{6})$/, (localStorage.getItem("Sessao") ? '<a href="?Ticket#' + (c.search("GMUD") < 0 ? "ChamadosSuporte" : "GMUDs") + ':$1R" target="blank" >$1</a>' : "$1")) || L.NaoHaItem)))
        }
        m.push($("<tr>").append(r))
    });
    j.find("tbody").html(m);
    j.find(".modal-title").html(L.Detalhes + " " + c + "<br><small>" + $("#SlideShowTipo .active").find(".prop-type-word").text() + " » " + d + " (" + e + ")</small>");
    agrupaColunasSS(j, f, k.length)
};
var agrupaColunasSS = function (x, q, k) {
    var u = [],
        w = [],
        s = [],
        t = x.find("tbody tr:not(.rodapeslideshow)"),
        p = x.find("thead"),
        z = p.find('[data-coluna="' + sessionStorage.getItem("somaSS") + '"]').index();
    if (z < 0) {
        for (i = 0; i < q; i++) {
            var g = {};
            t.each(function (B) {
                u[B] = $(this).find("td:eq(" + i + ")").text()
            });
            for (a in u) {
                if (g[u[a]]) {
                    g[u[a]]++
                } else {
                    g[u[a]] = 1
                }
            }
            var A = Object.keys(g).length;
            if (A != 2 && A != (k + 1) && A != 1) {
                var o = p.find("th:eq(" + i + ")");
                try {
                    if (o.attr("data-coluna").indexOf("escricao") >= 0) {
                        o.attr("style", "width:250px;")
                    }
                } catch (e) {}
                o.attr("data-json", JSON.stringify(g));
                o.prepend('<div data-toggle="buttons"><div class="btn-group prop-type-group" style="display:block;padding-top:0px;"><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="0" autocomplete="off"><span class="fa fa-th-large"></span><span class="prop-type-word"></span></label><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="1" autocomplete="off"><span class="fa fa-align-left"></span><span class="prop-type-word"></span></label><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="2" autocomplete="off"><span class="fa fa-pie-chart"></span><span class="prop-type-word"></span></label></div></div><br><br>')
            }
        }
    } else {
        for (i = 0; i < q; i++) {
            var g = {},
                d = {},
                j = "";
            t.each(function (B) {
                u[B] = $(this).find("td:eq(" + i + ")").text();
                j += ',{"label":"' + $(this).find("td:eq(" + i + ")").text() + '","value":' + parseFloat($(this).find("td:eq(" + z + ")").text().replace(",", "")) + "}"
            });
            for (a in u) {
                if (g[u[a]]) {
                    g[u[a]]++
                } else {
                    g[u[a]] = 1
                }
            }
            var c = JSON.parse("[" + j.substring(1) + "]"),
                m = 0,
                b = "";
            $.each(c, function (C, B) {
                if (B.label != b) {
                    m = 0
                }
                b = B.label;
                m = (m + parseFloat(B.value));
                d[b + " (" + m + ")"] = m
            });
            var A = Object.keys(g).length;
            if (A != 2 && A != (k + 1) && A != 1) {
                var o = p.find("th:eq(" + i + ")");
                try {
                    if (o.attr("data-coluna").indexOf("escricao") >= 0) {
                        o.attr("style", "width:250px;")
                    }
                } catch (e) {}
                o.attr("data-json", JSON.stringify(d));
                o.prepend('<div data-toggle="buttons"><div class="btn-group prop-type-group" style="display:block;padding-top:0px;"><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="0" autocomplete="off"><span class="fa fa-th-large"></span><span class="prop-type-word"></span></label><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="1" autocomplete="off"><span class="fa fa-align-left"></span><span class="prop-type-word"></span></label><label class="btn btn-default btn-xs prop-type BoxS0 Mw12"><input type="radio" name="__" value="2" autocomplete="off"><span class="fa fa-pie-chart"></span><span class="prop-type-word"></span></label></div></div><br><br>')
            }
        }
    }
    var l = p.find('[data-coluna*="TotalHoras"]').index();
    var y = undefined;
    t.each(function (B) {
        y = somaHoras((y != undefined ? y : "00:00:00"), $(this).find("td:eq(" + l + ")").text())
    });
    var r = "",
        f = 0;
    for (i = 0; i <= q; i++) {
        r += "<td><b>";
        if (l == i) {
            r += y;
            f = 1
        } else {
            r += ""
        }
        r += "</b></td>"
    }
    if (f > 0) {
        x.find("tbody").append($('<tr class="rodapeslideshow" >').html(r.replace("NaN:NaN:NaN", "")))
    }
};
$("#ContainerHomeSlideShow").on("click", ".modalslideshow", function () {
    clearTimeout(pSS);
    var b = $(this);
    populaModalGridSS(JSON.parse($(this).attr("data-json")), b.find("span:first").text(), b.find(".huge:first").text().split(" / ")[0])
});
$("#Menu").on("click", ".IESlideShow a", function () {
    var f = $(this),
        j = f.closest(".modal");

    function e(k) {
        return k.replace(/<b class="moretextslideshow Cp">...<.b>/g, "").replace(/class="hide"/g, "")
    }
    var g = j.find("thead th"),
        d = "",
        c = "",
        b = "";
    g.each(function (k) {
        c += "<td><b>" + $(this).text() + "</b></td>"
    });
    d = "<html>";
    d += "<head>";
    if (!(f.index() == 0)) {
        d += '<meta charset="utf-8">'
    }
    d += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
    d += '<link rel="stylesheet" href="https://dqnkcwgy21udk.cloudfront.net/sistema/layout/css/bloco_v02_desknew.css">';
    d += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" >';
    d += "</head>";
    d += "<body>";
    d += '<div class="table-responsive">';
    b += '<table width="100%" class="table table-striped" >';
    b += '<tr><td colspan="' + g.length + '" ><center><b>' + j.find(".modal-title").html().replace(/<br>/g, " » ") + "</b></center></td></tr>";
    if (c) {
        b += "<tr>" + c + "</tr>";
        b += j.find("tbody").html();
        b = b.replace(/<a.*?>(.*?)<.a>/g, "$1")
    } else {
        b += "<tr><td><center>" + j.find(".modal-body div:first").html() + "</center></td></tr>"
    }
    b += "</table>";
    d += b;
    d += "</div>";
    d += "</body>";
    d += "</html>";
    if (f.index() == 0) {
        geraUrl({
            type: "text/html",
            text: L.Imprimir,
            base64: window.btoa(e(d)),
            file: "SlideShow.html"
        })
    } else {
        geraUrl({
            type: "text/html",
            text: "Download",
            base64: window.btoa(e(d)),
            file: "SlideShow.xls"
        })
    }
});
$("#Menu").on("click", ".moretextslideshow", function () {
    var b = $("#ModalDetalhesMensagem");
    b.find(".modal-body").html($(this).closest("td").html().replace('<b class="moretextslideshow Cp">...</b>', "").replace('class="hide"', ""));
    b.traduzItens();
    b.zIndex();
    b.modal("show")
});
$("#ContainerApp").on("click", "#prop-type-group_i", function () {
    var j = $("#ContainerApp"),
        e = "",
        c = "",
        g = j.find("#donut-legend").html();
    e = "<html>";
    e += "<head>";
    e += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
    e += "</head>";
    e += "<body>";
    e += '<div class="table-responsive">';
    e += '<table width="100%" class="table table-striped" >';
    e += "<tr><td " + (g ? 'colspan="2"' : "") + " ><center><b>" + $("#Menu").find(".navbar-brand span:eq(1)").html().substring(1) + "</b></center></td></tr>";
    e += "<tr>";
    if (g) {
        e += "<td>" + g.replace(/#FFF/g, "#000") + "</td>"
    }
    if (j.find("svg").length) {
        e += "<td><center>" + j.find("#meuGrafico").html().replace(/fill="#ffffff"/g, 'fill="#000"') + "</center></td>"
    } else {
        var f = j.find(".panel"),
            d = 0,
            c = '<table width="100%" style="padding: 10px;" >',
            b = "";
        f.each(function () {
            d++;
            b += '<td style="width:10px;" ></td>';
            b += '<td style="border-style:solid;border-color:#f8f8f8;text-align:right;padding-right:10px;border-left-color:' + $(this).css("color") + ';" >';
            b += $(this).find(".text-right").html();
            b += "</td>";
            if (d == 3) {
                c += '<tr height="66" >' + b + "</tr>";
                c += '<tr height="5" ><td colspan="5" ></td></tr>';
                d = 0;
                b = ""
            }
        });
        c += "</table>"
    }
    e += c;
    e += "</tr>";
    var f = j.find('#line-legend [name="LineLegend"]:checked');
    if (f.length) {
        e += "<tr><td>";
        f.each(function (k) {
            var l = $(this);
            e += '<span style="color:#000"><span style="background-color: ' + l.val() + '; width: 20px; display: inline-block; margin: 5px;">&nbsp;</span>' + l.parent().find("span:eq(1)").text() + "</span><br>"
        });
        e += "</td></tr>"
    }
    e += "</table>";
    e += "</div>";
    e += "</body>";
    e += "</html>";
    geraUrl({
        type: "text/html",
        text: L.Imprimir,
        base64: window.btoa(e),
        file: "SlideShow.html"
    })
});
$("#Menu").on("hide.bs.modal", "#ModalDSlideShow", function () {
    colunaSS($("#SlideShowTipo .active").find("[data-eq]").attr("data-eq"))
});
$("#ContainerHomeSlideShow").on("change", '[name="SlideShowAP"]', function () {
    $('#ContainerHomeSlideShow [name="SlideShowAP"]').prop("disabled", true);
    var b = $(this).val(),
        d = $("#SlideShowTipo"),
        c = d.find(".active").find("[data-eq]").attr("data-eq");
    clearTimeout(pSS);
    if (b == "P") {
        colunaSS((parseInt(c) + 1))
    } else {
        colunaSS((parseInt(c) - 1), true)
    }
});
$("#Menu").on("click", ".ModalGSlideShow .prop-type", function () {
    try {
        var o = parseInt(sessionStorage.getItem("SlideShowTop"));
        o = (Number.isNaN(o) ? 15 : o)
    } catch (g) {
        var o = 15
    }
    var f = function (w, t, s) {
        var r = '<div class="modal ModalGSlideShow" id="ModalGSlideShow' + w + '" tabindex="-1" role="dialog" aria-labelledby="ModalGSlideShow' + w + 'Label" aria-hidden="true" data-keyboard="true" data-backdrop="static" >';
        r += '<div class="modal-dialog modal-lg W90p">';
        r += '<div class="modal-content">';
        r += '<div class="modal-header">';
        r += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" data-toggle="tooltip" data-placement="auto top" title="TeclaFechar" data-ltooltip="Nao" ><span aria-hidden="true">X</span></button>';
        r += '<h4 class="modal-title" id="ModalGSlideShow' + w + 'Label" ' + (glbWidth < 768 ? 'style="font-size:100%;"' : "") + " >" + s + "</h4>";
        r += '<small class="IESlideShow" ><a href="javascript:void(0);" onclick="return false;" >' + L.Imprimir + '</a><span> / </span><a href="javascript:void(0);" onclick="return false;" >' + L.Exportar + "</a></small>";
        r += "</div>";
        r += '<div class="modal-body" >';
        r += t;
        r += "</div>";
        r += '<div class="panel-footer">';
        r += '<div class="form-horizontal" role="form">';
        r += '<div class="form-group">';
        r += '<div class="col-sm-10">';
        r += '<button type="button" class="btn btn-default btn-lg" data-dismiss="modal" data-l="Fechar" data-toggle="tooltip" data-placement="auto top" title="(Esc)" ></button>';
        r += "</div>";
        r += "</div>";
        r += "</div>";
        r += "</div>";
        r += "</div>";
        r += "</div>";
        r += "</div>";
        var u = $('[data-h="ModaisGSlideShow"]');
        u.find("#ModalGSlideShow" + w).remove();
        u.append(r)
    };
    var m = $(this),
        c = m.closest(".modal"),
        q = m.closest("th"),
        p = JSON.parse(q.attr("data-json").replace(/(.*)(,"function.*?:1)/, "$1")),
        k = q.attr("data-coluna");
    var j = 0,
        d = [];
    $.each(p, function (s, r) {
        d[j] = {
            label: s,
            value: r,
            coluna: k
        };
        j++
    });
    d.sort(function (t, r) {
        var s = t.value,
            u = r.value;
        if (s == u) {
            return 0
        }
        return s < u ? 1 : -1
    });
    var l = [];
    if (m.find("input").val() != "0") {
        for (j = 0; j < o; j++) {
            if (d[j] != undefined) {
                l[j] = d[j]
            }
        }
    } else {
        for (j = 0; j < d.length; j++) {
            if (d[j] != undefined) {
                l[j] = d[j]
            }
        }
    }
    var e = c.find(".modal-title").html() + "<br><small>" + L[k] + "</small>";
    f(k, '<div id="GraficoGSlideShow' + k + '" style="width:' + (glbWidth > 768 ? "980" : "320") + "px;height:" + (m.find("input:eq(0)").val() != "0" ? "400px" : "-webkit-fill-available") + ';" ></div>', e);
    var q = $("#ModalGSlideShow" + k);
    q.traduzItens();
    q.zIndex();
    q.modal("show");
    var b = function (y) {
        var z = c.find('[data-coluna="' + y.coluna + '"]').index(),
            r = "",
            w = c.find("tr"),
            u = w.find("td:eq(" + z + ")");
        r += '<div class="table-responsive">';
        r += '<table class="table table-hover table-striped">';
        r += "<thead>";
        r += "<tr>";
        var t = 0;
        c.find("[data-coluna]").each(function (A) {
            var B = $(this).attr("data-coluna");
            r += '<th data-coluna="' + B + '" ' + (B.indexOf("escricao") >= 0 ? 'style="width:250px;"' : "") + " >" + L[B] + "</th>";
            t++
        });
        r += "</tr>";
        r += "</thead>";
        r += "<tbody>";
        var s = 0;
        u.each(function (A) {
            if ($(this).text() == y.label) {
                r += "<tr>";
                r += $(this).parent().html();
                r += "</tr>";
                s++
            }
        });
        r += "</tbody>";
        r += "</table>";
        r += "</div>";
        f(k + "Grid", r, e + "<small> » " + y.label.replace(/(.*?) [(][0-9.]+?[)]/g, "$1") + " (" + y.value + ")</small>");
        var x = $("#ModalGSlideShow" + k + "Grid");
        x.traduzItens();
        x.zIndex();
        x.modal("show");
        agrupaColunasSS(x, t, s)
    };
    setTimeout(function () {
        var y = $("#GraficoGSlideShow" + k);
        y.closest(".ModalGSlideShow").find(".IESlideShow").find("span,a:eq(1)").addClass("hide");
        y.empty().unbind();
        if (m.find("input").val() == "1") {
            Morris.Bar({
                element: "GraficoGSlideShow" + k,
                horizontal: true,
                data: JSON.parse(JSON.stringify(l).replace(/(.*?) [(][0-9.]+?[)]/g, "$1")),
                hideHover: "auto",
                barColors: function (B, z, A) {
                    return glbColors[B.x]
                },
                xkey: "label",
                ykeys: ["value"],
                labels: ["Value"],
                gridTextSize: "10",
                hoverCallback: function (A, z, B, C) {
                    return C.x
                }
            }).on("click", function (z, A) {
                b(A)
            });
            y.find("rect").addClass("Cp")
        } else {
            if (m.find("input").val() == "0") {
                var t = JSON.parse(JSON.stringify(l).replace(/(.*?) [(][0-9.]+?[)]/g, "$1")),
                    x = parseInt(514 / (t.length - 1)),
                    s = 1,
                    r = "",
                    w = 0;
                $.each(t, function (A, z) {
                    w += z.value
                });
                $.each(t, function (A, z) {
                    z.label = (z.label == "undefined" || z.label == "" ? L.NaoHaItem : z.label);
                    z.label = z.label.replace(/<(?:.|\n)*?>/gm, " ");
                    var C = ((z.value * 100) / w).toFixed(2);
                    var B = '<div class="huge" style="font-size:17px;font-weight: bold;" >' + z.value + " / " + C + "%</div>";
                    r += '<div class="col-lg-4 col-md-6" >';
                    r += '<div class="panel cor_' + s + '" style="background-color:#FFF;" >';
                    r += '<div class="panel-heading">';
                    r += '<div class="row">';
                    r += '<div class="col-xs-3"><i class="fa fa-genderless fa-5x cor_' + s + '"></i></div>';
                    r += "<a href=\"javascript:void(0);\" data-json=\"{'coluna':'" + z.coluna + "','value':'" + z.value + "','label':'" + z.label + '\'}" class="detalhesGraficosRecursivoSS" >';
                    r += '<div class="col-xs-9 text-right" style="color:#000;" >';
                    r += B;
                    r += "<span>" + z.label + "</span>";
                    r += "</div>";
                    r += "</a>";
                    r += "</div>";
                    r += "</div>";
                    r += "</div>";
                    r += "</div>";
                    s += x
                });
                var u = $("#GraficoGSlideShow" + t[0]["coluna"]).html(r);
                u.on("click", ".detalhesGraficosRecursivoSS", function () {
                    b(JSON.parse($(this).attr("data-json").replace(/'/g, '"')))
                })
            } else {
                Morris.Donut({
                    element: "GraficoGSlideShow" + k,
                    data: JSON.parse(JSON.stringify(l).replace(/(.*?) [(][0-9.]+?[)]/g, "$1")),
                    colors: glbColors
                }).on("click", function (z, A) {
                    b(A)
                });
                y.find("path").addClass("Cp");
                y.find("path:eq(1)").trigger("mouseover")
            }
        }
        y.find("svg:first").css("height", "400").css("width", (glbWidth > 768 ? "980" : "320"))
    }, 300)
});
var configuracaoSS = function (d, b) {
    try {
        clearTimeout(pSS)
    } catch (c) {}
    $("#Menu").find(".navbar-brand").html("/&nbsp;&nbsp;" + b);
    $.post(glbAppConf.base + "SlideShow", {
        Chave: d
    }, function (j) {
        var k = JSON.parse(j),
            g = k.TSlideShowConfiguracoes,
            f = "",
            e = 0;
        sessionStorage.setItem("renderizarSS", JSON.stringify(g));
        renderizarSS(g[0], 0)
    })
};
var colunaSS = function (c, b) {
    var f = $("#SlideShowTipo").find('[data-eq="' + c + '"]');
    if (f.val() != undefined) {
        f.trigger("change", [true]);
        f.parent().addClass("active");
        startTimerSS($("#SlideShowTimer span:eq(1)"), (parseInt(c) + 1))
    } else {
        var d = JSON.parse(sessionStorage.getItem("renderizarSS"));
        var e = parseInt($("#Menu").find(".navbar-brand span:eq(0)").text());
        e = (!isNaN(e) ? e : 0);
        e = (b != true ? (e + 1) : (e - 1));
        e = (e >= d.length ? 0 : e);
        renderizarSS(d[e], e)
    }
};
var pSS;

function startTimerSS(d, f) {
    var c = parseInt(sessionStorage.getItem("SlideShowDuration"));
    var g = c,
        b, e;
    pSS = setInterval(function () {
        b = parseInt(g / 60, 10);
        e = parseInt(g % 60, 10);
        b = b < 10 ? "0" + b : b;
        e = e < 10 ? "0" + e : e;
        d.text(b + ":" + e);
        if (--g < 0) {
            g = c;
            clearTimeout(pSS);
            colunaSS(f)
        }
    }, 1000)
}
var renderizarSS = function (c, d) {
    var g = $("#Menu").find(".navbar-brand");
    try {
        var j = JSON.parse(c.CodRelatorioTemp)[0]
    } catch (e) {
        var j = 0
    }
    if (c.CodRelatorioTemp == "[]" || j == 0) {
        $("#SlideShowTipo,#SlideShowAgrupar,#SlideShowOrdem,#SlideShowTipoExibicao").html("");
        startTimerSS($("#SlideShowTimer span:eq(1)"), 1);
        g.html('<span class="hide" >' + d + "</span>/&nbsp;&nbsp;" + c.Url);
        sessionStorage.setItem("SlideShowDuration", c.Time);
        $("#SlideShowHTML").html('<iframe src="' + c.Url + '" width="100%" height="' + $("#page-wrapper").height() + '" frameborder="0" ></iframe>')
    } else {
        $("#Msg").html(L.Aguarde);
        $("#Msg").exibeMsg("#MsgSucesso", L.Aguarde, false);
        var f = "Relatorios/imprimir";
        if (c.PublicToken) {
            var b = {
                PublicToken: c.PublicToken,
                Imprimir: "JRelatorio" + (c.Tipo == undefined ? "" : c.Tipo),
                App: c.App
            }
        } else {
            if (c.PublicFiltro) {
                var b = c.PublicFiltro;
                f = c.PublicUrl
            } else {
                var b = {
                    Chave: Object.keys(j),
                    Imprimir: "JRelatorio" + c.Tipo
                }
            }
        }
        $.post(glbAppConf.base + f, b, function (p) {
            $("#Msg").find("div:first").fadeOut();
            if (p) {
                p = p.replace(/&quot;/g, " ").replace(/[\\]u2013/g, "-");
                var q = JSON.parse(p),
                    o = q.erro,
                    l = q.root,
                    m = q.colunas,
                    s = q.rodape;
                if (q.total) {
                    var r = m.length;
                    if ($("#side-menu .nav-second-level").text() == "") {
                        var k = $("#prop-type-group_tipoexibicao .active").find("input:eq(0)").val();
                        if (k) {
                            c.TipoExibicao = k
                        }
                    }
                    glbTempSSJSON = p;
                    localStorage.setItem("SlideShowOrdem", c.Ordem);
                    localStorage.setItem("SlideShowTipoExibicao", c.TipoExibicao);
                    sessionStorage.setItem("SlideShowDuration", c.Time);
                    sessionStorage.setItem("SlideShowTop", c.Top);
                    slideShowVisualiza(p, m[0], c.Agrupa, c.Ordem, c.TipoExibicao);
                    slideShowActive(m[0], c.Agrupa, c.Ordem, c.TipoExibicao);
                    colunaSS(0);
                    g.html('<span class="hide" >' + d + "</span><span>/&nbsp;" + j[Object.keys(j)] + "</span>");
                    $("#SlideShowRodape i:eq(0)").html(s)
                } else {
                    if (o == undefined) {
                        o = L.Relatorio + " " + L.Vazio
                    }
                    $("#Msg").exibeMsg("#MsgFalha", o, false);
                    $("#Msg").find("div:first").delay((o.length * 150)).fadeOut();
                    setTimeout(function () {
                        var t = JSON.parse(sessionStorage.getItem("renderizarSS"));
                        $.each(t, function (w, u) {
                            if (u.CodRelatorioTemp.indexOf(l.NomeRelatorio) >= 0) {
                                var x = (w + 1);
                                if ((w + 1) >= t.length) {
                                    x = 0
                                }
                                renderizarSS(t[x], x);
                                return false
                            }
                        })
                    }, (o.length * 150))
                }
            }
        }).fail(function (l) {
            colunaSS(0);
            var k = L["ErrojqXHR" + l.status];
            $("#Msg").exibeMsg("#MsgFalha", k, false);
            $("#Msg").find("div:first").delay((k.length * 150)).fadeOut()
        })
    }
};
$(function () {
    $("body").on("contextmenu", ".TbodyC .TrC,.TbodyC th", function (g) {
        var b = $(this).closest(".HControler"),
            o = b.find(".table :checkbox");
        if (o.length > 1 && $(this).find(":checkbox").prop("disabled") == false) {
            o.prop("checked", false);
            var m = b.find('[data-h="botoesBase"]'),
                l = b.find('[data-h="contextMenu"]'),
                f = 0,
                d = 0;
            f = (glbWidth < 768 ? g.pageX : ($("#side-menu").is(":visible") ? g.pageX - 230 : g.pageX - 40));
            d = (g.pageY - (glbWidth < 768 ? 130 : 70));
            l.css({
                display: "block",
                left: f,
                top: d
            });
            var k = l.html(m.html().replace(/\n|\t/g, "").replace(/(.*)(<button .*?Excluir.*?<.button>) ?(<button .*?Ativar.*?<.button>)(.*)/, "$3 $1$4 $2"));
            k.find("button").removeAttr("disabled");
            k.find(".Criar,.CriarAlias,.PAvancada,.popoverPA").remove();
            k.find("button:not(.CBED,.CBEDForce)").addClass("hide");
            k.find(".Ativar,.Excluir,.aGrid").removeClass("btn-lg Pf Zi3 B2vh Br50 R14 R78 R142 hide");
            k.traduzItens();
            if (glbWidth > 768) {
                k.find(".hideForce").removeClass("hideForce")
            }
            var j = $(this).find(":checkbox");
            if (j.prop("disabled") == false) {
                o.closest(".TrC").removeClass("cc");
                j.closest(".TrC").addClass("cc");
                j.prop("checked", true);
                cLineGrid(j, j.val());
                try {
                    k.callContextMenu()
                } catch (c) {}
                return false
            } else {
                return true
            }
        }
    });
    $("body").on("click", function (c) {
        var d = $('[data-h="contextMenu"]');
        if (d.is(":visible") == true && $(this).attr("class") != "modal-open") {
            var b = $("#Panel" + $(location).prop("hash").substring(1) + " .table").find(":checkbox");
            b.closest(".TrC").removeClass("cc");
            b.prop("checked", false);
            d.hide()
        }
        $('.btnDirSelect2,.btnDirPACSCustom,.btnDirKanban,[id^="tooltip"]').remove();
        if (!$(c.target).hasClass("btnOutros") && !$(c.target).hasClass("btnTOutros")) {
            $(".btnTOutros").each(function (e) {
                if ($(this).attr("style").search("position:absolute;") >= 0) {
                    $(this).addClass("hide")
                }
            })
        }
    });
    $("#ContainerApp").on("click", ".btnDirSelect2", function () {
        var d = $(this).closest("[data-closest]");
        if ($(this).hasClass("btnDirSelect2")) {
            var b = d.find(".select2-selection__rendered").text().replace(/×/g, "\r\n")
        } else {
            var b = d.find("input").val()
        }
        var c = $("<textarea>");
        $("body").append(c);
        c.val(b.trim()).select();
        document.execCommand("copy");
        c.remove();
        $("#Msg").exibeMsg("#MsgSucesso", L.Copiado)
    });
    $("#ContainerApp,#Menu").on("click", ".btnCopyValue", function () {
        var b = $("<textarea>");
        $("body").append(b);
        b.val($(this).closest("[data-closest]").find("input").val()).select();
        document.execCommand("copy");
        b.remove();
        $("#Msg").exibeMsg("#MsgSucesso", L.Copiado)
    });
    $("body").on("contextmenu", ".select2", function (b) {
        var c = $(this).closest("[data-closest]").find(".btnDirSelect2");
        if (c.length < 1) {
            $(this).before('<button type="button" class="btn btn-info btnDirSelect2" data-toggle="tooltip" data-placement="auto top" data-original-title="' + L.Copiar + '" style="position: absolute;' + (glbWidth > 768 ? "left:-30px;" : "z-index:1;") + '" ><span class="fa fa-files-o"></span></button>');
            $(".btnDirSelect2").tooltip({
                container: "body"
            })
        }
        return false
    })
});

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else {
            if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen()
            } else {
                if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen()
                } else {
                    if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                    }
                }
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else {
            if (document.msExitFullscreen) {
                document.msExitFullscreen()
            } else {
                if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else {
                    if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen()
                    }
                }
            }
        }
    }
}
$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        var b = $(location).prop("hash").substring(1);
        var c = $("#Panel" + b);
        if (c.find(".RodapeGridPadrao").html() == "") {
            c.find(".Mais").trigger("click")
        }
    }
});
$("#Base").on("click", "#ModalCalculadora button", function () {
    var thisA = $(this);
    if (thisA.hasClass("close") == false) {
        var attrA = thisA.closest(".modal"),
            attrB = thisA.closest(".modal-body"),
            valA = thisA.find("span").text(),
            valB = attrB.find("input:eq(0)"),
            primeiraletra = valB.val().slice(0, 1),
            ultimaletra = valB.val().substring(valB.val().length - 1);
        if (valA == "C") {
            valB.val("")
        } else {
            if (valA == "=" && valB.val()) {
                valB.val(eval(valB.val().replace(/([0-9]+)([+]|[-]|[x]|[/])([0-9]+)([%])/g, "$1*($3/100)").replace(/(.*)([.]|[+]|[-]|[x]|[/])$/, "$1").replace("x", "*")))
            } else {
                if ((valA.search(/[.]|[+]|[-]|[x]|[/]|[%]/) >= 0 && primeiraletra == "") || (valA.search(/[.]|[+]|[-]|[x]|[/]|[%]/) >= 0 && ultimaletra.search(/[.]|[+]|[-]|[x]|[/]|[%]/) >= 0)) {} else {
                    if (valA == "+-") {
                        if (primeiraletra == "-") {
                            valB.val(valB.val().slice(1, valB.val().length))
                        } else {
                            valB.val("-" + valB.val())
                        }
                    } else {
                        valB.val(valB.val() + valA)
                    }
                }
            }
        }
        valB.val(valB.val().replace(/([.][0-9]+)[.]/g, "$1").replace(/([%][0-9]+)[%]/g, "$1"))
    }
});
var visRefresh = function () {
    var b = $(location).prop("hash").substring(1);
    if (b.search(":") < 0 && $(".modal-backdrop").length < 1 && $(".render-chat").is(":visible") == false) {
        if (b != "Home") {
            var d = $("#Panel" + b);
            if (d.find(".TbodyC :checked").length < 1 && $(".RTGCircle").length < 1) {
                var c = d.find('[data-h="botoesBase"] .aGrid:first');
                if (c.length < 1) {
                    c = d.find(".pth:first")
                }
                c.trigger("click", "Manual")
            }
        } else {
            var d = $("#PanelHome" + glbAppName);
            d.find(".page-header button:first").trigger("click")
        }
    } else {
        hashChangeTemp()
    }
};
var vis = (function () {
    var d, b, c = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (d in c) {
        if (d in document) {
            b = c[d];
            break
        }
    }
    return function (e) {
        if (e) {
            document.addEventListener(b, e)
        }
        return !document[d]
    }
})();
var intervalBarraTmp;
var iBarraTmp = 0;

function barraTop() {
    $("#timerPanel").attr("style", "width:" + iBarraTmp + "%;");
    iBarraTmp = (iBarraTmp + 1.66)
}

function timerPanelAnimate() {
    iBarraTmp = 0;
    clearTimeout(intervalBarraTmp);
    intervalBarraTmp = setInterval(barraTop, 1000)
}

function timerPanelPlay() {
    if (glbWidth > 768) {
        if (glbAppConf.pth.indexOf($(location).prop("hash").substring(1)) >= 0 && $(".modal-backdrop").length < 1) {
            clearTimeout(glbTimerPanel);
            timerPanelAnimate();
            glbTimerPanel = setInterval(function () {
                visRefresh();
                timerPanelAnimate()
            }, 60000)
        } else {
            $("#timerPanel").attr("style", "width:0%;");
            clearTimeout(intervalBarraTmp);
            clearTimeout(glbTimerPanel)
        }
    }
}
timerPanelPlay();
vis(function () {
    if (vis()) {
        visRefresh();
        timerPanelPlay()
    } else {
        $("#timerPanel").attr("style", "width:0%;");
        clearTimeout(intervalBarraTmp);
        clearTimeout(glbTimerPanel)
    }
    return false
});
if (glbWidth > 768 && (glbAppName != "Portal" && glbAppName != "LoginPortal")) {
    $("body").mousemove(function (b) {
        setTimeout(function () {
            var d = $(location).prop("hash").substring(1);
            if (d != "Home") {
                var c = b.pageX;
                if (c <= 5) {
                    ocultaMenu(false)
                } else {
                    if (c > 200 && $("#side-menu").is(":visible")) {
                        ocultaMenu(true)
                    }
                }
            }
            timerPanelPlay()
        }, 500)
    })
}
$("#ContainerApp").on("click", ".MIRelatorio", function () {
    var c = ["fa fa-500px", "fa fa-address-book", "fa fa-address-book-o", "fa fa-address-card", "fa fa-address-card-o", "fa fa-adjust", "fa fa-adn", "fa fa-align-center", "fa fa-align-justify", "fa fa-align-left", "fa fa-align-right", "fa fa-amazon", "fa fa-ambulance", "fa fa-american-sign-language-interpreting", "fa fa-anchor", "fa fa-android", "fa fa-angellist", "fa fa-angle-double-down", "fa fa-angle-double-left", "fa fa-angle-double-right", "fa fa-angle-double-up", "fa fa-angle-down", "fa fa-angle-left", "fa fa-angle-right", "fa fa-angle-up", "fa fa-apple", "fa fa-archive", "fa fa-area-chart", "fa fa-arrow-circle-down", "fa fa-arrow-circle-left", "fa fa-arrow-circle-o-down", "fa fa-arrow-circle-o-left", "fa fa-arrow-circle-o-right", "fa fa-arrow-circle-o-up", "fa fa-arrow-circle-right", "fa fa-arrow-circle-up", "fa fa-arrow-down", "fa fa-arrow-left", "fa fa-arrow-right", "fa fa-arrow-up", "fa fa-arrows", "fa fa-arrows-alt", "fa fa-arrows-h", "fa fa-arrows-v", "fa fa-assistive-listening-systems", "fa fa-asterisk", "fa fa-at", "fa fa-audio-description", "fa fa-backward", "fa fa-balance-scale", "fa fa-ban", "fa fa-bandcamp", "fa fa-bar-chart", "fa fa-barcode", "fa fa-bars", "fa fa-bath", "fa fa-battery-empty", "fa fa-battery-full", "fa fa-battery-half", "fa fa-battery-quarter", "fa fa-battery-three-quarters", "fa fa-bed", "fa fa-beer", "fa fa-behance", "fa fa-behance-square", "fa fa-bell", "fa fa-bell-o", "fa fa-bell-slash", "fa fa-bell-slash-o", "fa fa-bicycle", "fa fa-binoculars", "fa fa-birthday-cake", "fa fa-bitbucket", "fa fa-bitbucket-square", "fa fa-black-tie", "fa fa-blind", "fa fa-bluetooth", "fa fa-bluetooth-b", "fa fa-bold", "fa fa-bolt", "fa fa-bomb", "fa fa-book", "fa fa-bookmark", "fa fa-bookmark-o", "fa fa-braille", "fa fa-briefcase", "fa fa-btc", "fa fa-bug", "fa fa-building", "fa fa-building-o", "fa fa-bullhorn", "fa fa-bullseye", "fa fa-bus", "fa fa-buysellads", "fa fa-calculator", "fa fa-calendar", "fa fa-calendar-check-o", "fa fa-calendar-minus-o", "fa fa-calendar-o", "fa fa-calendar-plus-o", "fa fa-calendar-times-o", "fa fa-camera", "fa fa-camera-retro", "fa fa-car", "fa fa-caret-down", "fa fa-caret-left", "fa fa-caret-right", "fa fa-caret-square-o-down", "fa fa-caret-square-o-left", "fa fa-caret-square-o-right", "fa fa-caret-square-o-up", "fa fa-caret-up", "fa fa-cart-arrow-down", "fa fa-cart-plus", "fa fa-cc", "fa fa-cc-amex", "fa fa-cc-diners-club", "fa fa-cc-discover", "fa fa-cc-jcb", "fa fa-cc-mastercard", "fa fa-cc-paypal", "fa fa-cc-stripe", "fa fa-cc-visa", "fa fa-certificate", "fa fa-chain-broken", "fa fa-check", "fa fa-check-circle", "fa fa-check-circle-o", "fa fa-check-square", "fa fa-check-square-o", "fa fa-chevron-circle-down", "fa fa-chevron-circle-left", "fa fa-chevron-circle-right", "fa fa-chevron-circle-up", "fa fa-chevron-down", "fa fa-chevron-left", "fa fa-chevron-right", "fa fa-chevron-up", "fa fa-child", "fa fa-chrome", "fa fa-circle", "fa fa-circle-o", "fa fa-circle-o-notch", "fa fa-circle-thin", "fa fa-clipboard", "fa fa-clock-o", "fa fa-clone", "fa fa-cloud", "fa fa-cloud-download", "fa fa-cloud-upload", "fa fa-code", "fa fa-code-fork", "fa fa-codepen", "fa fa-codiepie", "fa fa-coffee", "fa fa-cog", "fa fa-cogs", "fa fa-columns", "fa fa-comment", "fa fa-comment-o", "fa fa-commenting", "fa fa-commenting-o", "fa fa-comments", "fa fa-comments-o", "fa fa-compass", "fa fa-compress", "fa fa-connectdevelop", "fa fa-contao", "fa fa-copyright", "fa fa-creative-commons", "fa fa-credit-card", "fa fa-credit-card-alt", "fa fa-crop", "fa fa-crosshairs", "fa fa-css3", "fa fa-cube", "fa fa-cubes", "fa fa-cutlery", "fa fa-dashcube", "fa fa-database", "fa fa-deaf", "fa fa-delicious", "fa fa-desktop", "fa fa-deviantart", "fa fa-diamond", "fa fa-digg", "fa fa-dot-circle-o", "fa fa-download", "fa fa-dribbble", "fa fa-dropbox", "fa fa-drupal", "fa fa-edge", "fa fa-eercast", "fa fa-eject", "fa fa-ellipsis-h", "fa fa-ellipsis-v", "fa fa-empire", "fa fa-envelope", "fa fa-envelope-o", "fa fa-envelope-open", "fa fa-envelope-open-o", "fa fa-envelope-square", "fa fa-envira", "fa fa-eraser", "fa fa-etsy", "fa fa-eur", "fa fa-exchange", "fa fa-exclamation", "fa fa-exclamation-circle", "fa fa-exclamation-triangle", "fa fa-expand", "fa fa-expeditedssl", "fa fa-external-link", "fa fa-external-link-square", "fa fa-eye", "fa fa-eye-slash", "fa fa-eyedropper", "fa fa-facebook", "fa fa-facebook-official", "fa fa-facebook-square", "fa fa-fast-backward", "fa fa-fast-forward", "fa fa-fax", "fa fa-female", "fa fa-fighter-jet", "fa fa-file", "fa fa-file-archive-o", "fa fa-file-audio-o", "fa fa-file-code-o", "fa fa-file-excel-o", "fa fa-file-image-o", "fa fa-file-o", "fa fa-file-pdf-o", "fa fa-file-powerpoint-o", "fa fa-file-text", "fa fa-file-text-o", "fa fa-file-video-o", "fa fa-file-word-o", "fa fa-files-o", "fa fa-film", "fa fa-filter", "fa fa-fire", "fa fa-fire-extinguisher", "fa fa-firefox", "fa fa-first-order", "fa fa-flag", "fa fa-flag-checkered", "fa fa-flag-o", "fa fa-flask", "fa fa-flickr", "fa fa-floppy-o", "fa fa-folder", "fa fa-folder-o", "fa fa-folder-open", "fa fa-folder-open-o", "fa fa-font", "fa fa-font-awesome", "fa fa-fonticons", "fa fa-fort-awesome", "fa fa-forumbee", "fa fa-forward", "fa fa-foursquare", "fa fa-free-code-camp", "fa fa-frown-o", "fa fa-futbol-o", "fa fa-gamepad", "fa fa-gavel", "fa fa-gbp", "fa fa-genderless", "fa fa-get-pocket", "fa fa-gg", "fa fa-gg-circle", "fa fa-gift", "fa fa-git", "fa fa-git-square", "fa fa-github", "fa fa-github-alt", "fa fa-github-square", "fa fa-gitlab", "fa fa-glass", "fa fa-glide", "fa fa-glide-g", "fa fa-globe", "fa fa-google", "fa fa-google-plus", "fa fa-google-plus-official", "fa fa-google-plus-square", "fa fa-google-wallet", "fa fa-graduation-cap", "fa fa-gratipay", "fa fa-grav", "fa fa-h-square", "fa fa-hacker-news", "fa fa-hand-lizard-o", "fa fa-hand-o-down", "fa fa-hand-o-left", "fa fa-hand-o-right", "fa fa-hand-o-up", "fa fa-hand-paper-o", "fa fa-hand-peace-o", "fa fa-hand-pointer-o", "fa fa-hand-rock-o", "fa fa-hand-scissors-o", "fa fa-hand-spock-o", "fa fa-handshake-o", "fa fa-hashtag", "fa fa-hdd-o", "fa fa-header", "fa fa-headphones", "fa fa-heart", "fa fa-heart-o", "fa fa-heartbeat", "fa fa-history", "fa fa-home", "fa fa-hospital-o", "fa fa-hourglass", "fa fa-hourglass-end", "fa fa-hourglass-half", "fa fa-hourglass-o", "fa fa-hourglass-start", "fa fa-houzz", "fa fa-html5", "fa fa-i-cursor", "fa fa-id-badge", "fa fa-id-card", "fa fa-id-card-o", "fa fa-ils", "fa fa-imdb", "fa fa-inbox", "fa fa-indent", "fa fa-industry", "fa fa-info", "fa fa-info-circle", "fa fa-inr", "fa fa-instagram", "fa fa-internet-explorer", "fa fa-ioxhost", "fa fa-italic", "fa fa-joomla", "fa fa-jpy", "fa fa-jsfiddle", "fa fa-key", "fa fa-keyboard-o", "fa fa-krw", "fa fa-language", "fa fa-laptop", "fa fa-lastfm", "fa fa-lastfm-square", "fa fa-leaf", "fa fa-leanpub", "fa fa-lemon-o", "fa fa-level-down", "fa fa-level-up", "fa fa-life-ring", "fa fa-lightbulb-o", "fa fa-line-chart", "fa fa-link", "fa fa-linkedin", "fa fa-linkedin-square", "fa fa-linode", "fa fa-linux", "fa fa-list", "fa fa-list-alt", "fa fa-list-ol", "fa fa-list-ul", "fa fa-location-arrow", "fa fa-lock", "fa fa-long-arrow-down", "fa fa-long-arrow-left", "fa fa-long-arrow-right", "fa fa-long-arrow-up", "fa fa-low-vision", "fa fa-magic", "fa fa-magnet", "fa fa-male", "fa fa-map", "fa fa-map-marker", "fa fa-map-o", "fa fa-map-pin", "fa fa-map-signs", "fa fa-mars", "fa fa-mars-double", "fa fa-mars-stroke", "fa fa-mars-stroke-h", "fa fa-mars-stroke-v", "fa fa-maxcdn", "fa fa-meanpath", "fa fa-medium", "fa fa-medkit", "fa fa-meetup", "fa fa-meh-o", "fa fa-mercury", "fa fa-microchip", "fa fa-microphone", "fa fa-microphone-slash", "fa fa-minus", "fa fa-minus-circle", "fa fa-minus-square", "fa fa-minus-square-o", "fa fa-mixcloud", "fa fa-mobile", "fa fa-modx", "fa fa-money", "fa fa-moon-o", "fa fa-motorcycle", "fa fa-mouse-pointer", "fa fa-music", "fa fa-neuter", "fa fa-newspaper-o", "fa fa-object-group", "fa fa-object-ungroup", "fa fa-odnoklassniki", "fa fa-odnoklassniki-square", "fa fa-opencart", "fa fa-openid", "fa fa-opera", "fa fa-optin-monster", "fa fa-outdent", "fa fa-pagelines", "fa fa-paint-brush", "fa fa-paper-plane", "fa fa-paper-plane-o", "fa fa-paperclip", "fa fa-paragraph", "fa fa-pause", "fa fa-pause-circle", "fa fa-pause-circle-o", "fa fa-paw", "fa fa-paypal", "fa fa-pencil", "fa fa-pencil-square", "fa fa-pencil-square-o", "fa fa-percent", "fa fa-phone", "fa fa-phone-square", "fa fa-picture-o", "fa fa-pie-chart", "fa fa-pied-piper", "fa fa-pied-piper-alt", "fa fa-pied-piper-pp", "fa fa-pinterest", "fa fa-pinterest-p", "fa fa-pinterest-square", "fa fa-plane", "fa fa-play", "fa fa-play-circle", "fa fa-play-circle-o", "fa fa-plug", "fa fa-plus", "fa fa-plus-circle", "fa fa-plus-square", "fa fa-plus-square-o", "fa fa-podcast", "fa fa-power-off", "fa fa-print", "fa fa-product-hunt", "fa fa-puzzle-piece", "fa fa-qq", "fa fa-qrcode", "fa fa-question", "fa fa-question-circle", "fa fa-question-circle-o", "fa fa-quora", "fa fa-quote-left", "fa fa-quote-right", "fa fa-random", "fa fa-ravelry", "fa fa-rebel", "fa fa-recycle", "fa fa-reddit", "fa fa-reddit-alien", "fa fa-reddit-square", "fa fa-refresh", "fa fa-registered", "fa fa-renren", "fa fa-repeat", "fa fa-reply", "fa fa-reply-all", "fa fa-retweet", "fa fa-road", "fa fa-rocket", "fa fa-rss", "fa fa-rss-square", "fa fa-rub", "fa fa-safari", "fa fa-scissors", "fa fa-scribd", "fa fa-search", "fa fa-search-minus", "fa fa-search-plus", "fa fa-sellsy", "fa fa-server", "fa fa-share", "fa fa-share-alt", "fa fa-share-alt-square", "fa fa-share-square", "fa fa-share-square-o", "fa fa-shield", "fa fa-ship", "fa fa-shirtsinbulk", "fa fa-shopping-bag", "fa fa-shopping-basket", "fa fa-shopping-cart", "fa fa-shower", "fa fa-sign-in", "fa fa-sign-language", "fa fa-sign-out", "fa fa-signal", "fa fa-simplybuilt", "fa fa-sitemap", "fa fa-skyatlas", "fa fa-skype", "fa fa-slack", "fa fa-sliders", "fa fa-slideshare", "fa fa-smile-o", "fa fa-snapchat", "fa fa-snapchat-ghost", "fa fa-snapchat-square", "fa fa-snowflake-o", "fa fa-sort", "fa fa-sort-alpha-asc", "fa fa-sort-alpha-desc", "fa fa-sort-amount-asc", "fa fa-sort-amount-desc", "fa fa-sort-asc", "fa fa-sort-desc", "fa fa-sort-numeric-asc", "fa fa-sort-numeric-desc", "fa fa-soundcloud", "fa fa-space-shuttle", "fa fa-spinner", "fa fa-spoon", "fa fa-spotify", "fa fa-square", "fa fa-square-o", "fa fa-stack-exchange", "fa fa-stack-overflow", "fa fa-star", "fa fa-star-half", "fa fa-star-half-o", "fa fa-star-o", "fa fa-steam", "fa fa-steam-square", "fa fa-step-backward", "fa fa-step-forward", "fa fa-stethoscope", "fa fa-sticky-note", "fa fa-sticky-note-o", "fa fa-stop", "fa fa-stop-circle", "fa fa-stop-circle-o", "fa fa-street-view", "fa fa-strikethrough", "fa fa-stumbleupon", "fa fa-stumbleupon-circle", "fa fa-subscript", "fa fa-subway", "fa fa-suitcase", "fa fa-sun-o", "fa fa-superpowers", "fa fa-superscript", "fa fa-table", "fa fa-tablet", "fa fa-tachometer", "fa fa-tag", "fa fa-tags", "fa fa-tasks", "fa fa-taxi", "fa fa-telegram", "fa fa-television", "fa fa-tencent-weibo", "fa fa-terminal", "fa fa-text-height", "fa fa-text-width", "fa fa-th", "fa fa-th-large", "fa fa-th-list", "fa fa-themeisle", "fa fa-thermometer-empty", "fa fa-thermometer-full", "fa fa-thermometer-half", "fa fa-thermometer-quarter", "fa fa-thermometer-three-quarters", "fa fa-thumb-tack", "fa fa-thumbs-down", "fa fa-thumbs-o-down", "fa fa-thumbs-o-up", "fa fa-thumbs-up", "fa fa-ticket", "fa fa-times", "fa fa-times-circle", "fa fa-times-circle-o", "fa fa-tint", "fa fa-toggle-off", "fa fa-toggle-on", "fa fa-trademark", "fa fa-train", "fa fa-transgender", "fa fa-transgender-alt", "fa fa-trash", "fa fa-trash-o", "fa fa-tree", "fa fa-trello", "fa fa-tripadvisor", "fa fa-trophy", "fa fa-truck", "fa fa-try", "fa fa-tty", "fa fa-tumblr", "fa fa-tumblr-square", "fa fa-twitch", "fa fa-twitter", "fa fa-twitter-square", "fa fa-umbrella", "fa fa-underline", "fa fa-undo", "fa fa-universal-access", "fa fa-university", "fa fa-unlock", "fa fa-unlock-alt", "fa fa-upload", "fa fa-usb", "fa fa-usd", "fa fa-user", "fa fa-user-circle", "fa fa-user-circle-o", "fa fa-user-md", "fa fa-user-o", "fa fa-user-plus", "fa fa-user-secret", "fa fa-user-times", "fa fa-users", "fa fa-venus", "fa fa-venus-double", "fa fa-venus-mars", "fa fa-viacoin", "fa fa-viadeo", "fa fa-viadeo-square", "fa fa-video-camera", "fa fa-vimeo", "fa fa-vimeo-square", "fa fa-vine", "fa fa-vk", "fa fa-volume-control-phone", "fa fa-volume-down", "fa fa-volume-off", "fa fa-volume-up", "fa fa-weibo", "fa fa-weixin", "fa fa-whatsapp", "fa fa-wheelchair", "fa fa-wheelchair-alt", "fa fa-wifi", "fa fa-wikipedia-w", "fa fa-window-close", "fa fa-window-close-o", "fa fa-window-maximize", "fa fa-window-minimize", "fa fa-window-restore", "fa fa-windows", "fa fa-wordpress", "fa fa-wpbeginner", "fa fa-wpexplorer", "fa fa-wpforms", "fa fa-wrench", "fa fa-xing", "fa fa-xing-square", "fa fa-y-combinator", "fa fa-yahoo", "fa fa-yelp", "fa fa-yoast", "fa fa-youtube", "fa fa-youtube-play", "fa fa-youtube-square"];
    var b = "";
    var d = $("#ModalMIRelatorios");
    d.traduzItens();
    d.zIndex();
    d.modal("show");
    $.each(c, function (f, e) {
        b += '<label class="radio-inline" style="width:50px;height:50px;" >';
        b += '<input type="radio" name="RelatorioIcone" value="' + e + '" class="Cp" ><span class="' + e + '" aria-hidden="true"></span>';
        b += "</label>"
    });
    d.find('[name="Origem"]').val($(this).closest(".modal").prop("id"));
    d.find(".form-horizontal:eq(0)").html(b)
});
$("#Base").on("change", '#ModalMIRelatorios [name="RelatorioIcone"]', function () {
    var b = $("#ModalMIRelatorios");
    $("#" + b.find('[name="Origem"]').val()).find(".ClassIcons").val($(this).val()).change();
    b.modal("hide")
});
$("#ContainerApp").on("click", ".HControler .DAVerTodos", function () {
    var c = $("#PanelHome" + glbAppName + ' [data-h="DA' + glbAppName + 'Filtro"]');
    var d = "";
    if (c.hasClass("hide") == false) {
        d = '<div class="row">' + c.html().replace(/(<i.*?<.i>)/, "") + "</div>"
    }
    var e = $(this).closest(".col-lg-4,.col-lg-3");
    var b = $("#ModalDARelatorios");
    b.traduzItens();
    b.find(".modal-title").html($("#PanelHome" + glbAppName + " .DAdicional:disabled").attr("data-original-title"));
    b.find(".form-horizontal:eq(0)").html(d + '<div class="row"><div class="col-lg-12" id="' + e.prop("id") + '" >' + e.html().replace(/hide/g, "").replace("DAEHIDE", "hide").replace(/text-overflow:ellipsis;white-space:nowrap;overflow:hidden;/g, "") + "</div></div>");
    b.find('[id^="' + e.prop("id") + '-Grafico"]').remove();
    b.find(".DAVerTodos").remove();
    b.zIndex();
    b.modal("show")
});
$("#ContainerApp").on("click", ".HControler .DHome", function () {
    $(this).attr({
        disabled: "disabled"
    });
    var b = $("#PanelHome" + glbAppName);
    b.find(".DAdicional,.PAvancada").removeAttr("disabled");
    b.find('[data-h="' + glbAppName + 'Bloco"],[data-h="' + glbAppName + 'LD"],[data-h="HomeAlertaPonto"]').removeClass("hide");
    b.find('[data-h="DA' + glbAppName + '"],[data-h="DA' + glbAppName + 'Filtro"],.DAListaDonut').addClass("hide");
    if (glbWidth > 768) {
        $("#my-page-header").html("")
    }
    localStorage.removeItem("DA" + glbAppName);
    window["graficosHome" + glbAppName]()
});
$("#ContainerApp").on("click", ".HControler .DAVerExcluir", function () {
    var b = "";
    $(this).removeClass("DAVerFiltrado");
    criaFiltroDA(b)
});
$("#Base,#ContainerApp").on("click", ".HControler .DAVer,#ModalDARelatorios .DAVer", function () {
    var b = "";
    var e = $(this);
    var d = e.closest("[id]").prop("id").replace("DAF-", "");
    var c = e.find(".txtValue").text();
    b += ',"' + d + '":"' + c + '"';
    criaFiltroDA(b);
    $("#ModalDARelatorios").modal("hide")
});

function somaSQL0(b) {
    return parseFloat(b).formataMoeda(2, 3, ".", ",")
}

function somaSQL1(b) {
    return b
}

function colorSQL0(b) {
    return "background-color:#" + (b.search("-") < 0 ? "4ba146" : "d9534f") + ";"
}

function colorSQL1(b) {
    return "background-color:#4ba146;"
}

function colorBar0(b, c) {
    return "background-color:#" + (c.search("-") < 0 ? "4ba146" : "d9534f") + ";"
}

function colorBar1(b, c) {
    return "background-color:" + glbColors[b] + ";"
}

function renderDA(x, w, f, u) {
    $(".page-header").find("span:first").removeClass("fa-spin");
    var m = JSON.parse(x),
        d = "",
        p = JSON.parse(w),
        q = "",
        l = ["SUM(Valor)", "COUNT(1)"],
        j = (glbAppConf.nome != "csc" ? 0 : 1);
    if (j) {
        if (m.colunas.length < 1) {
            m.erro = L.NaoPossuiColunas
        }
    }
    if (m.erro) {
        texto = m.erro;
        $("#Msg").exibeMsg("#MsgFalha", texto, false);
        $("#Msg").find("div:first").delay((texto.length * 150)).fadeOut();
        $("#PanelHome" + glbAppName).find(".DHome").trigger("click");
        return false
    } else {
        if (m.root.length) {
            $.each(p, function (z, y) {
                q += "AND IF(CONCAT(" + z + ",'')='','" + L.NaoPreenchido + "',CONCAT(" + z + ",''))=\"" + y + '" '
            });
            var t = "";
            if (m.root[0]["TotalHorasChamado"] || m.root[0]["TotalHoras"]) {
                alasql.fn.sminutes = function (y) {
                    y = y.split(":");
                    return parseInt(parseInt(y[0]) * 60 * 60) + (parseInt(y[1]) * 60) + parseInt(y[2])
                };

                function k(z) {
                    var C = parseInt(z, 10);
                    var y = Math.floor(C / 3600);
                    var A = Math.floor((C - (y * 3600)) / 60);
                    var B = C - (y * 3600) - (A * 60);
                    if (y < 10) {
                        y = "0" + y
                    }
                    if (A < 10) {
                        A = "0" + A
                    }
                    if (B < 10) {
                        B = "0" + B
                    }
                    return y + ":" + A + ":" + B
                }
                var b = "TotalHorasChamado";
                t = ", SUM(sminutes(TotalHorasChamado)) as " + b;
                if (m.root[0]["TotalHoras"]) {
                    b = "TotalHoras";
                    t = ", SUM(sminutes(TotalHoras)) as " + b
                }
            }
            var e = [];
            var o = [];
            var c = ",ARRAY(CodChamado) as Referencias";
            $.each(m.traducao, function (A, z) {
                var B = alasql("SELECT  IF(CONCAT(" + A + ",'')='','" + L.NaoPreenchido + "',CONCAT(" + A + ",'')) as Descricao, " + l[j] + " as Valor" + t + " " + c + " FROM ? " + (q ? "WHERE " + q.substring(3) : "") + " GROUP BY IF(CONCAT(" + A + ",'')='','" + L.NaoPreenchido + "',CONCAT(" + A + ",'')) ORDER BY 2 DESC ", [m.root]);
                e[B[0]["Referencias"].length] = B[0]["Referencias"];
                d += '<div class="col-lg-' + (glbWidth > 1625 ? "3" : "4") + '" id="DAF-' + A + '" >';
                d += '<div class="panel panel-default">';
                d += '<div class="panel-heading" style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;" >';
                d += z;
                d += "</div>";
                d += '<div class="panel-body">';
                d += '<div class="DAHeight" ' + (glbWidth > 768 ? 'style="height:310px;"' : "") + " >";
                d += '<ul class="list-group" style="font-size:unset;">';
                var C = 0;
                var D = 0;
                if (B.length == 1) {
                    $.each(B, function (F, E) {
                        C += E.Valor;
                        E.Valor = window["somaSQL" + j](E.Valor);
                        d += '<li class="list-group-item DAVerGrafico DAOpcaoGrafico" style="border:none;border-top: 1px solid #dddddd !important;" >';
                        d += '<span class="badge" style="' + (window["colorSQL" + j](E.Valor)) + '"><i>' + E.Valor + "</i></span>";
                        if (t) {
                            D += E[b];
                            d += '<span class="badge" style="background-color:#42bcd5;" ><i>' + k(E[b]) + "</i></span>"
                        }
                        if (w != "{}") {
                            if (p[A] == E.Descricao) {
                                d += '<i class="fa fa-filter Cp DAVerExcluir DAVerFiltrado" aria-hidden="true" style="color:#772581;" data-toggle="tooltip" data-placement="auto top" title="' + L.RemoverFiltro + '" ></i> '
                            }
                        }
                        d += '<span class="txtValue" ><i>' + E.Descricao + "</i></span>";
                        d += "</li>"
                    })
                } else {
                    $.each(B, function (F, E) {
                        C += E.Valor;
                        E.Valor = window["somaSQL" + j](E.Valor);
                        d += '<li class="Cp list-group-item ' + (F > 6 ? "hide" : "DAOpcaoGrafico") + ' DAVer DAVerGrafico" style="border:none;border-top: 1px solid #dddddd !important;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:39px;" >';
                        d += '<span class="badge" style="' + (window["colorSQL" + j](E.Valor)) + '" >' + E.Valor + "</span>";
                        if (t) {
                            D += E[b];
                            d += '<span class="badge" style="background-color:#42bcd5;" >' + k(E[b]) + "</span>"
                        }
                        d += '<span class="txtValue" >' + E.Descricao + "</span>";
                        d += "</li>"
                    });
                    if (B.length < 6) {
                        for (i = B.length; i <= 6; i++) {
                            d += '<li class="list-group-item DAOpcaoGrafico" style="border:none;border-top: 1px solid #fff !important;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:39px;" ></li>'
                        }
                        var y = ""
                    } else {
                        var y = '<button type="button" class="btn btn-info btn-xs DAVerTodos">' + L.VerTodos + "</button>"
                    }
                    d += '<li class="list-group-item" style="padding:7px 15px;border:none;border-top: 1px solid #dddddd !important;" >';
                    d += '<span class="badge" >' + window["somaSQL" + j](C) + "</span>";
                    if (t) {
                        d += '<span class="badge" >' + k(D) + "</span>"
                    }
                    d += '<span class="DAEHIDE" >';
                    d += '<div class="btn-group" role="group" >';
                    d += y;
                    d += '<button type="button" class="btn btn-info btn-xs DAEHTML">';
                    d += '<i class="fa fa-print" aria-hidden="true"></i>';
                    d += "</button>";
                    d += '<button type="button" class="btn btn-info btn-xs DAECSV">';
                    d += '<i class="fa fa-file-excel-o" aria-hidden="true"></i>';
                    d += "</button>";
                    d += "</div>";
                    d += "</span>";
                    d += "</li>"
                }
                d += "</ul>";
                d += "</div>";
                d += "</div>";
                d += "</div>";
                d += "</div>"
            });
            if (glbAppName == "Ticket") {
                e.sort(function (z, y) {
                    return y.length - z.length
                });
                sessionStorage.setItem("TmpReferencias", e[0].join())
            }
        } else {
            d += L.MsgNenhumRegistro
        }
    }
    var g = localStorage.getItem("DAOpcoes");
    var s = $("#PanelHome" + glbAppName);
    var r = s.find('[data-h="DA' + glbAppName + '"]');
    r.html(d);
    r.find('[data-toggle="tooltip"]').tooltip({
        container: "body"
    });
    localStorage.setItem("DA" + glbAppName, f);
    s.find(".PAvancada").attr({
        disabled: "disabled"
    });
    s.find(".DHome").removeAttr("disabled");
    s.find('[data-h="' + glbAppName + 'Bloco"],[data-h="' + glbAppName + 'LD"],[data-h="HomeAlertaPonto"]').addClass("hide");
    r.removeClass("hide");
    if (glbWidth > 768) {
        $("#my-page-header").html("» " + u.attr("data-original-title"))
    }
    $("#Msg").find("div:first").fadeOut();
    $('[id^="DAF-"]:visible').each(function (B) {
        var C = $(this).find(".DAEHIDE").parent().find(".badge:eq(0)").text().replace(/[.]/g, "").replace(",", "");
        var E = $(this).prop("id") + "-Grafico-" + B;
        var D = $(this).prop("id") + "-Donut-" + B;
        var z = $(this).prop("id") + "-Bar-" + B;
        var y = [];
        var F = [];
        $(this).find(".DAVerGrafico:not(.hide)").each(function (H) {
            var I = $(this).find("span:first").text();
            y[H] = {
                label: $(this).find("span:last").text(),
                value: I.replace(/[.]/g, "").replace(",", ".").replace("-", ""),
                click: H + " " + E,
                vOriginal: I,
                vTH: ($(this).find("span").length == 3 ? $(this).find("span:eq(1)").text() : "")
            }
        });
        $("#" + E).remove();
        var A = $(this).find(".list-group");
        A.prepend('<div id="' + E + '" class="DAOpcaoLista" ><div id="' + D + '" class="DAOpcaoDonut ' + (g == "D" ? "" : "hide") + '" style="height:255px;text-align:center;" ></div><div id="' + z + '" class="DAOpcaoBar ' + (g == "B" ? "" : "hide") + '" style="height:255px;padding:10px;text-align: left;" ></div></div>');
        if (glbWidth > 768) {
            A.parent().css("height", "565px")
        }
        $("#" + D).empty().unbind();
        if (y.length > 1) {
            Morris.Donut({
                element: D,
                data: y,
                resize: true,
                colors: glbColors,
                formatter: function (I, H) {
                    return H.vOriginal
                }
            }).on("click", function (H, J) {
                var I = J.click.split(" ");
                $("#" + I[1]).parent().find(".DAVer:eq(" + I[0] + ")").trigger("click")
            });
            $("#" + D).find("path").addClass("Cp")
        } else {
            Morris.Donut({
                element: D,
                data: y,
                resize: true,
                colors: glbColors,
                formatter: function (I, H) {
                    return (I.indexOf(".") > 0 ? formataValor(I, "") : I)
                }
            })
        }
        if (y.length > 1) {
            var G = "";
            $.each(y, function (I, H) {
                if (I < 6) {
                    var J = (parseInt(H.vOriginal.replace("-", "").replace(/[.]/g, "").replace(",", "")) * 100) / parseInt(C);
                    G += '<span class="Cp DAFilerBar" data-index="' + I + '" >';
                    G += formatoHtmlLimitStrToolTip((H.label != "" ? H.label : "&nbsp;"), 40) + ' <small style="float: right;font-size: 70%;padding-top: 5px;">' + H.vTH + " " + H.vOriginal + "</small>";
                    G += '<div class="progress" style="height: 10px;margin-bottom: 10px;border:unset;padding:unset;">';
                    G += '<div class="progress-bar" role="progressbar" style="width: ' + J + "%;" + (window["colorBar" + j](I, H.vOriginal)) + '" ></div>';
                    G += "</div>";
                    G += "</span>"
                }
            })
        } else {
            var G = "";
            $.each(y, function (I, H) {
                G += "<span>";
                G += formatoHtmlLimitStrToolTip((H.label != "" ? H.label : "&nbsp;"), 40) + ' <small style="float: right;font-size: 70%;padding-top: 5px;">' + H.vTH + " " + H.vOriginal + "</small>";
                G += '<div class="progress" style="height: 10px;margin-bottom: 10px;border:unset;padding:unset;">';
                G += '<div class="progress-bar" role="progressbar" style="width:100%;' + (window["colorBar" + j](I, H.vOriginal)) + '" ></div>';
                G += "</div>";
                G += "</span>"
            })
        }
        $("#" + z).html(G).find('[data-toggle="tooltip"]').tooltip({
            html: true,
            container: "body"
        })
    });
    if (glbWidth > 768) {
        if (g != null) {
            $(".DAOpcao" + g).trigger("click")
        } else {
            $(".DAOpcaoDL").trigger("click")
        }
    }
}
$("#ContainerApp").on("click", ".HControler .DAFilerBar", function () {
    $(this).closest(".DAHeight").find(".DAVer:eq(" + $(this).attr("data-index") + ")").trigger("click")
});
$("#ContainerApp").on("click", ".HControler .DAEHTML", function () {
    var b = $("#PanelHome" + glbAppName + ' [data-h="DA' + glbAppName + 'Filtro"]');
    var c = "";
    if (b.hasClass("hide") == false) {
        c = '<div class="row">' + b.html().replace(/(<i.*?<.i>)/, "") + "</div>"
    }
    var e = $(this).closest('[id^="DAF-"]').html();
    var d = "<html>";
    d += "<head>";
    d += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';
    d += "</head>";
    d += "<body>";
    d += '<div class="container" >' + c + e.replace(/hide/g, "").replace("DAEHIDE", "hide").replace('style="height:310px;"', "") + "</div>";
    d += "</body>";
    d += "</html>";
    if ($(".DAOpcaoB").hasClass("disabled")) {
        d = d.replace("DAOpcaoDonut", "DAOpcaoDonut hide")
    } else {
        if ($(".DAOpcaoL").hasClass("disabled")) {
            d = d.replace("DAOpcaoDonut", "DAOpcaoDonut hide").replace("DAOpcaoBar", "DAOpcaoBar hide")
        } else {
            if ($(".DAOpcaoDL").hasClass("disabled") || $(".DAOpcaoD").hasClass("disabled")) {
                d = d.replace("DAOpcaoBar", "DAOpcaoBar hide")
            }
        }
    }
    geraUrl({
        type: "text/html",
        text: L.Imprimir,
        base64: window.btoa(d),
        file: "Dashboard.html"
    })
});
$("#ContainerApp").on("click", ".HControler .DAECSV", function () {
    var g = $(this).closest('[id^="DAF-"]');
    var e = g.find(".list-group-item");
    var d = "";
    d += '"' + g.find(".panel-heading").text() + '";';
    d += '"' + L.Total + '";';
    d += "\n";
    e.each(function (j) {
        d += '"' + $(this).find("span:eq(1)").text().replace(L.VerTodos, L.Total) + '";';
        d += '"' + $(this).find("span:eq(0)").text() + '";';
        d += "\n"
    });
    var c = d.replace(/"";"";\n/g, "");
    var f = "\uFEFF";
    var b = window.document.createElement("a");
    b.setAttribute("href", "data:text/csv; charset=utf-8," + encodeURIComponent(f + c));
    b.setAttribute("download", "Dashboard.csv");
    window.document.body.appendChild(b);
    b.click()
});
$("#ContainerApp").on("click", ".HControler .DAdicional", function (f, c) {
    try {
        if (sDAglb == 1) {
            sDAglb = 0;
            return false
        }
    } catch (e) {}
    if (c == undefined) {
        c = "{}"
    }
    $("#PanelHome" + glbAppName + " .DAdicional").removeAttr("disabled");
    $("#PanelHome" + glbAppName + ' [data-h="DA' + glbAppName + 'Filtro"]').addClass("hide");
    $("#PanelHome" + glbAppName).find(".DAListaDonut").removeClass("hide");
    var g = $(this);
    var d = g.prop("id").substring(glbAppName.length + 3);
    var b = L.Aguarde;
    g.attr({
        disabled: "disabled"
    });
    $("#Msg").exibeMsg("#MsgSucesso", b, false);
    if (sessionStorage.getItem("renderDA" + d) === null) {
        $.ajax({
            url: glbAppConf.base + "Relatorios/imprimir",
            type: "POST",
            data: {
                Chave: d,
                Imprimir: (glbAppConf.nome == "csc" ? "J" : "X") + "Relatorio",
                App: glbAppName
            }
        }).done(function (p) {
            var o = JSON.parse(p),
                u = o.erro;
            if (u) {
                b = u;
                $("#Msg").exibeMsg("#MsgFalha", b, false);
                $("#Msg").find("div:first").delay((b.length * 150)).fadeOut();
                g.removeAttr("disabled");
                $("#PanelHome" + glbAppName).find(".DHome").trigger("click")
            } else {
                var w = o.root.length;
                if (w > 0) {
                    try {
                        var t = o.colunas.length
                    } catch (l) {
                        var t = 0
                    }
                    if (glbAppConf.nome == "csc" && w && t > 0) {
                        if (o.root[0]["Assunto"]) {
                            var q, m, s = [],
                                r = [];
                            for (q = 0; q < w; q++) {
                                try {
                                    r[q] = o.root[q]["Assunto"].split(" - ").length
                                } catch (l) {
                                    r[q] = 0
                                }
                            }
                            var k = r.sort()[(w - 1)];
                            k = (k <= 1 ? 0 : k);
                            if (k > 0) {
                                for (m = 0; m < k; m++) {
                                    o.colunas[(t + (m))] = "Ass" + (m + 1) + "|" + L.Assunto + " (" + L.No + " " + (m + 1) + ")"
                                }
                                for (q = 0; q < w; q++) {
                                    try {
                                        s = o.root[q]["Assunto"].split(" - ")
                                    } catch (l) {
                                        s = []
                                    }
                                    for (m = 0; m < k; m++) {
                                        o.root[q]["Ass" + (m + 1)] = (s[m] || "")
                                    }
                                }
                            }
                        }
                        var x = "";
                        $.each(o.colunas, function (y, j) {
                            var z = j.split("|"),
                                A = "";
                            if (z.length < 2) {
                                A = L[z[0]]
                            } else {
                                A = z[1]
                            }
                            x += ',"' + z[0] + '":"' + A + '"'
                        });
                        o.traducao = JSON.parse("{" + x.substring(1) + "}");
                        p = JSON.stringify(o)
                    }
                    sessionStorage.setItem("renderDA" + d, p);
                    renderDA(p, "{}", d, g)
                } else {
                    b = L.MsgNenhumRegistro;
                    $("#Msg").exibeMsg("#MsgFalha", b, false);
                    $("#Msg").find("div:first").delay((b.length * 150)).fadeOut();
                    g.removeAttr("disabled");
                    $("#PanelHome" + glbAppName).find(".DHome").trigger("click")
                }
            }
        }).fail(function (j) {
            b = L["ErrojqXHR" + j.status];
            $("#Msg").exibeMsg("#MsgFalha", b, false);
            $("#Msg").find("div:first").delay((b.length * 150)).fadeOut();
            g.removeAttr("disabled");
            $("#PanelHome" + glbAppName).find(".DHome").trigger("click")
        })
    } else {
        renderDA(sessionStorage.getItem("renderDA" + d), c, d, g)
    }
});
$("#ContainerApp").on("change", ".ClassIcons", function () {
    $("#Modal" + $(location).prop("hash").substring(1) + " .MIRelatorio").html('<span class="' + $(this).val() + '" aria-hidden="true"></span>')
});
$("#ContainerApp").on("click", ".HControler .DALFiltros", function () {
    $("#PanelHome" + glbAppName + " .DAVerExcluir").removeClass("DAVerFiltrado");
    criaFiltroDA("", false, true)
});

function criaFiltroDA(l, j, f) {
    $("#PanelHome" + glbAppName + " .DAVerFiltrado").each(function (p) {
        var t = $(this);
        var s = t.closest("[id]");
        var r = s.prop("id").replace("DAF-", "");
        var q = s.find(".txtValue").text();
        l += ',"' + r + '":"' + q + '"'
    });
    l = "{" + l.substring(1) + "}";
    var b = $("#PanelHome" + glbAppName + " .DAdicional:disabled");
    if (j == true) {
        sessionStorage.removeItem("render" + b.prop("id").replace(glbAppName + "-", ""))
    }
    b.prop("disabled", false);
    b.trigger("click", l);
    var o = $("#PanelHome" + glbAppName + ' [data-h="DA' + glbAppName + 'Filtro"]');
    if (f == undefined && l != "{}") {
        var k = [];
        var m = "";
        var c = JSON.parse(l);
        var e = 0;
        $.each(c, function (q, p) {
            k[e] = "» " + $("#DAF-" + q).find(".panel-heading").text() + " " + (p ? "(" + p + ") " : "");
            e++
        });
        m = k.reverse().join("");
        o.removeClass("hide");
        var g = "";
        try {
            g = sessionStorage.getItem("TmpReferencias").replace(/,/g, "")
        } catch (d) {}
        o.html('<div class="col-lg-12" style="margin-bottom: 7px;" ><small>' + m + " " + (glbAppName == "Ticket" && g ? '<i class="Cp DAPFiltros" style="color:#2fa2c7;" >' + L.ChamadosSuporte + "</i>" : "") + ' <i class="Cp DALFiltros" style="color:#DB0000;" >' + L.LimparFiltros + "</i></small></div>")
    } else {
        o.addClass("hide")
    }
}

function callDA(d) {
    var c = $("#PanelHome" + glbAppName);
    var b = "";
    d = (d == undefined ? ["Relatorios"] : d);
    c.find(".DHome,.DAdicional").closest(".btn-group").remove();
    $.each(d, function (f, e) {
        $.ajax({
            url: glbAppConf.base + e + "/lista",
            type: "POST",
            data: {
                Dados: '{"Pesquisa":"","Ativo":"1","Ordem":[],"Filtro":{"DashBoard":"' + (glbAppConf.nome == "csc" ? "S" : "1") + '"}}',
                App: glbAppName
            }
        }).done(function (p) {
            var q = JSON.parse(p),
                o = q.erro,
                j = q.root;
            try {
                var m = j.length
            } catch (l) {
                var m = 0
            }
            try {
                var g = q.fixos.length
            } catch (l) {
                var g = 0
            }
            if (m > 0 || g) {
                if (g) {
                    b += ' <div class="btn-group" role="group" >';
                    if (f == 0) {
                        b += '<button type="button" class="btn btn-info DHome" data-toggle="tooltip" data-placement="auto top" title="Home">';
                        b += '<span class="glyphicon glyphicon-home"></span>';
                        b += "</button>"
                    }
                    $.each(q.fixos, function (s, r) {
                        b += '<button type="button" class="btn btn-info DAdicional" style="width:41px;" id="DA' + glbAppName + "-" + r.Chave + '" data-toggle="tooltip" data-placement="auto top" title="' + r.Nome + '">';
                        b += '<span class="' + (r.ClassDashBoard ? r.ClassDashBoard : "fa fa-circle-o") + '" aria-hidden="true"></span>';
                        b += "</button>"
                    });
                    b += "</div>";
                    b += ' <div class="btn-group" role="group" >';
                    $.each(j, function (s, r) {
                        b += '<button type="button" class="btn btn-info DAdicional" style="width:41px;" id="DA' + glbAppName + "-" + r.Chave + '" data-toggle="tooltip" data-placement="auto top" title="' + r.Nome + '">';
                        b += '<span class="' + (r.ClassDashBoard ? r.ClassDashBoard : "fa fa-circle-o") + '" aria-hidden="true"></span>';
                        b += "</button>"
                    });
                    b += "</div>"
                } else {
                    b += ' <div class="btn-group" role="group" >';
                    if (f == 0) {
                        b += '<button type="button" class="btn btn-info DHome" data-toggle="tooltip" data-placement="auto top" title="Home">';
                        b += '<span class="glyphicon glyphicon-home"></span>';
                        b += "</button>"
                    }
                    $.each(j, function (s, r) {
                        b += '<button type="button" class="btn btn-info DAdicional" style="width:41px;" id="DA' + glbAppName + "-" + r.Chave + '" data-toggle="tooltip" data-placement="auto top" title="' + r.Nome + '">';
                        b += '<span class="' + (r.ClassDashBoard ? r.ClassDashBoard : "fa fa-circle-o") + '" aria-hidden="true"></span>';
                        b += "</button>"
                    });
                    b += "</div>"
                }
                if (glbWidth > 768) {
                    b += ' <div class="btn-group hide DAListaDonut" role="group" style="position:absolute;right:15px;" >';
                    b += '<button type="button" class="btn btn-info DAOpcaoDL disabled" data-toggle="tooltip" data-placement="auto top" title="Donut+' + L.Lista + '" >';
                    b += '<i class="fa fa-asterisk" aria-hidden="true"></i>';
                    b += "</button>";
                    b += '<button type="button" class="btn btn-info DAOpcaoD" data-toggle="tooltip" data-placement="auto top" title="Donut">';
                    b += '<i class="fa fa-pie-chart" aria-hidden="true"></i>';
                    b += "</button>";
                    b += '<button type="button" class="btn btn-info DAOpcaoB" data-toggle="tooltip" data-placement="auto top" title="' + L.Barras + '">';
                    b += '<i class="fa fa-align-left" aria-hidden="true"></i>';
                    b += "</button>";
                    b += '<button type="button" class="btn btn-info DAOpcaoL" data-toggle="tooltip" data-placement="auto top" title="' + L.Lista + '">';
                    b += '<i class="fa fa-th" aria-hidden="true"></i>';
                    b += "</button>";
                    b += "</div>"
                }
                if (d.length == (f + 1)) {
                    c.find(".PAvancada").after(b);
                    c.find('[data-toggle="tooltip"]').tooltip({
                        container: "body"
                    });
                    var k = "view/js/sql.min.js";
                    if (glbAppConf.ajaxCDN) {
                        k = glbAppConf.ajaxCDN + "view/" + sessionStorage.getItem("random") + "/js/sql.min.js"
                    }
                    $.ajax({
                        url: k,
                        cache: true
                    }).done(function () {
                        var r = localStorage.getItem("DA" + glbAppName);
                        if (r && $("#DA" + glbAppName + "-" + r).length > 0) {
                            $("#DA" + glbAppName + "-" + r).trigger("click")
                        } else {
                            $("#PanelHome" + glbAppName).find(".DHome").trigger("click")
                        }
                    })
                }
            } else {
                if (d.length == (f + 1)) {
                    $("#PanelHome" + glbAppName).find("button:eq(0)").trigger("click")
                }
            }
        }).fail(function (g) {
            if (d.length == (f + 1)) {
                $("#PanelHome" + glbAppName).find("button:eq(0)").trigger("click")
            }
        })
    })
}
$("#ContainerApp").on("click", '[id^="ModalRelatorio"] .Salvar', function (b) {
    sessionStorage.removeItem("Home" + glbAppName)
});
if (glbWidth > 768) {
    $("#ContainerApp").on("click", ".HControler .DAOpcaoDL", function () {
        $(this).addClass("disabled");
        $(".DAOpcaoD,.DAOpcaoL,.DAOpcaoB").removeClass("disabled");
        $(".DAOpcaoLista,.DAOpcaoGrafico,.DAOpcaoDonut").removeClass("hide");
        $(".DAOpcaoBar").addClass("hide");
        $(".DAHeight").css("height", "565px");
        localStorage.setItem("DAOpcoes", "DL");
        $(window).trigger("resize")
    });
    $("#ContainerApp").on("click", ".HControler .DAOpcaoL", function () {
        $(this).addClass("disabled");
        $(".DAOpcaoD,.DAOpcaoDL,.DAOpcaoB").removeClass("disabled");
        $(".DAOpcaoLista,.DAOpcaoBar").addClass("hide");
        $(".DAOpcaoGrafico,.DAOpcaoDonut").removeClass("hide");
        $(".DAHeight").css("height", "310px");
        localStorage.setItem("DAOpcoes", "L");
        $(window).trigger("resize")
    });
    $("#ContainerApp").on("click", ".HControler .DAOpcaoD", function () {
        $(this).addClass("disabled");
        $(".DAOpcaoL,.DAOpcaoDL,.DAOpcaoB").removeClass("disabled");
        $(".DAOpcaoLista,.DAOpcaoDonut").removeClass("hide");
        $(".DAOpcaoGrafico,.DAOpcaoBar").addClass("hide");
        $(".DAHeight").css("height", "298px");
        localStorage.setItem("DAOpcoes", "D");
        $(window).trigger("resize")
    });
    $("#ContainerApp").on("click", ".HControler .DAOpcaoB", function () {
        $(this).addClass("disabled");
        $(".DAOpcaoL,.DAOpcaoDL,.DAOpcaoD").removeClass("disabled");
        $(".DAOpcaoLista,.DAOpcaoBar").removeClass("hide");
        $(".DAOpcaoGrafico,.DAOpcaoDonut").addClass("hide");
        $(".DAHeight").css("height", "298px");
        localStorage.setItem("DAOpcoes", "B");
        $(window).trigger("resize")
    })
}
$("#ContainerApp").bind("paste", ".note-editable", function (g) {
    var d = $(location).prop("hash");
    if ((!(d == "#Conversas" || (glbAppName == "Portal" && (d == "#Home" || d == "#Chamados")) || (glbAppName == "Ticket" && (d == "#Home" || d == "#ChamadosSuporte" || d == "#GMUDs"))) || $(g.originalEvent.srcElement).closest('[data-h="ComentarioChamado"]').length) && g.originalEvent.clipboardData.getData("text") == "" && /Chrome/i.test(navigator.userAgent)) {
        var c = (g.clipboardData || g.originalEvent.clipboardData).items;
        console.log(c.length);
        var b = null;
        for (var f = 0; f < c.length; f++) {
            console.log(c[f].type.indexOf("image"));
            if (c[f].type.indexOf("image") === 0 && c.length < 2) {
                b = c[f].getAsFile()
            }
        }
        if (b !== null) {
            return false
        }
    }
});