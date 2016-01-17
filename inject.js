gf = {
    init: function() {
        $(".legend>li").unbind("click").click(gf.setBrush);
        $("svg rect").unbind("click").click(gf.colorCell);
        $("svg rect").on("mouseover").on("mouseover", gf.cellOver);
        var btnHtml = "<button class=\"btn btn-sm\" type=\"button\">Render to Script...</button>";
        var btnNode = $(btnHtml);
        $(".contrib-legend > span:first").html("Brush:").next().css("cursor", "pointer").next().remove();
        $(".contrib-footer > div.left").empty().append(btnNode);
        $(btnNode).click(gf.render);
    },
    brushMappings: ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"],
    shade: 1,
    script: null,
    brushColor: function() { 
        return gf.brushMappings[gf.shade];
    },       
    setBrush: function(e) {
        gf.shade = $(e.target).index();
    },

    colorCell: function(e) {
        console.log(e.target);
        $(e.target).attr("fill", gf.brushColor());
        $(e.target).attr("data-target-shade", gf.shade);
    },
    cellOver: function(e) {
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
            "echo 0 >> gf\n";
        $("svg rect").each(function(i, item) { 
            var targetShade = gf.brushMappings.indexOf($(item).attr("fill"));
            if ( targetShade == -1 ) {
                targetShade = 0;
            }
            var existingCommitCount = $(item).attr("data-count");
            var targetCommitCount = targetShade * 8;
            var commitsToAdd = targetCommitCount - existingCommitCount;
            var dateStr = $(item).attr("data-date");
            console.log(dateStr);
            console.log("Target Shade: " + targetShade);            
            console.log("Current Commit Count: " + existingCommitCount);
            console.log("Commits to add: " + commitsToAdd);
            for(var j=0; j < commitsToAdd; j++) {
                gf.script += "GIT_AUTHOR_DATE=" + dateStr + "T12:00:00 GIT_COMMITTER_DATE=" + dateStr + "T12:00:00 git commit -a -m \"gf\" > /dev/null\n"
                gf.script += "echo " + i % 2 + "-" + j%2 + " >> gf\n";
            }
            $(".activity-listing").html("<pre>"+gf.script+"</pre>");
        });
        console.log(gf.script);
    }
}

gf.init();
