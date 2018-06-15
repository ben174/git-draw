/*jslint browser: true*/
/*global Promise, chrome*/
"use strict";

var gf = {
    init: function() {
        $("rect[data-count]").each(function(i, item) {
            gf.maxCommits = Math.max(gf.maxCommits, item.getAttribute("data-count"));
        })
        gf.commitBlockSize = Math.ceil(gf.maxCommits/4);
        $(".legend>li").unbind("click").click(gf.setBrush);
        $("svg rect").unbind("click").on("mousedown", gf.colorCell);
        $("svg rect").on("mouseover", gf.cellOver);
        var btnGroupNode = $("<div>").addClass("btn-group");
        var renderBtnNode = $("<button>").text("Render").addClass("btn").addClass("btn-sm");
        var downloadBtnNode = $(renderBtnNode).clone().text("");
        var downloadTextNode = $("<span>").text(" Download Script...");
        var downloadIconNode = $("<span>").addClass("octicon").addClass("octicon-desktop-download");
        $(downloadBtnNode).append(downloadIconNode).append(downloadTextNode);
        $(renderBtnNode).click(gf.output);
        $(downloadBtnNode).click(gf.save);
        $(btnGroupNode).append(downloadBtnNode).append(renderBtnNode);
        $(".contrib-legend > span:first").html("Brush Colors:").next().css("cursor", "pointer").next().remove();
        $(".contrib-footer > div.float-left").empty().append(btnGroupNode);
    },
    brushMappings: ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"],
    maxCommits: 4,
    shade: 1,
    script: null,
    brushColor: function() {
        return gf.brushMappings[gf.shade];
    },
    setBrush: function(e) {
        $(".legend>li").removeClass("selected");
        gf.shade = $(e.target).index();
        $(e.target).addClass("selected");
    },
    colorCell: function(e) {
        $(e.target).attr("fill", gf.brushColor())
            .attr("data-touched", "true")
            .attr("data-target-shade", gf.shade);
    },
    cellOver: function(e) {
        // mouse drag
        if (e.buttons==1) {
            gf.colorCell(e);
        }
    },
    render: function() {
        gf.script = "#!/bin/bash\n\n" +
            "REPO=gf\n" +
            "git init $REPO\n" +
            "cd $REPO\n" +
            "echo \"Created with Git Draw (http://github.com/ben174/git-draw)\" > README.md\n" +
            "git add README.md\n" +
            "touch gf\n" +
            "git add gf\n" +
            "echo 0 > gf\n";
        $("svg rect").each(function(i, item) {
            if (!item.hasAttribute("data-touched")) {
                return true; // read as "continue"
            }
            var targetShade = gf.brushMappings.indexOf($(item).attr("fill"));
            if ( targetShade == -1 ) {
                targetShade = 0;
            }
            var existingCommitCount = $(item).attr("data-count");
            var targetCommitCount = targetShade * gf.commitBlockSize;
            var commitsToAdd = targetCommitCount - existingCommitCount;
            var dateStr = $(item).attr("data-date");
            var canvas = $('svg')[0]
            canvas.onselectstart = function () { return false; }
            for(var j=0; j < commitsToAdd; j++) {
                gf.script += "GIT_AUTHOR_DATE=" + dateStr + "T12:00:00 GIT_COMMITTER_DATE=" + dateStr + "T12:00:00 git commit -a -m \"gf\" > /dev/null\n"
                gf.script += "echo " + i % 2 + "-" + j % 2 + " > gf\n";
            }
        });
    },
    output: function() {
        gf.render();
        $(".activity-listing").html("<pre><code>"+gf.script+"</code></pre>");
        $(".activity-listing").css("font-size", "8px")
            .css("color", "#FFE")
            .css("background-color", "#333")
            .css("padding", "5px");
        var downloadBtnNode = $("<button>").text("").addClass("btn").addClass("btn-sm");
        var downloadTextNode = $("<span>").text(" Download Script...");
        var downloadIconNode = $("<span>").addClass("octicon").addClass("octicon-desktop-download");
        $(downloadBtnNode).append(downloadIconNode).append(downloadTextNode).css("margin", "10px 0px");
        $(downloadBtnNode).click(gf.save);
        $(".activity-listing").append(downloadBtnNode);
    },
    save: function() {
        gf.render();
        // creates an invisible download link and clicks it
        var textFileAsBlob = new Blob([gf.script], {type:'text/plain'});
        var fileNameToSaveAs = 'git-draw.sh';
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    }
}

chrome.extension.sendMessage({}, function () {
    gf.init();
});
