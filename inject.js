gf = {
    init: function() {
        $(".legend>li").unbind("click").click(gf.setBrush);
        $("svg rect").unbind("click").click(gf.colorCell);
        $("svg rect").on("mouseover").on("mouseover", gf.cellOver);
    },
    brushMappings: ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"],
    brush: 1,
    brushColor: function() { 
        return gf.brushMappings[gf.brush];
    },       
    setBrush: function(e) {
        console.log($(e.target).index());
        console.log($(e.target));
        gf.brush = $(e.target).index();
    },

    colorCell: function(e) {
        $(e.target).attr("fill", gf.brushColor());
    },
    cellOver: function(e) {
        if (e.buttons==1) {
            gf.colorCell(e);            
        }
    },
    render: function() {
        var ret = "";
        $("svg rect").each(function(i, item) { 
            console.log($(item).attr("data-date"));
            var dateStr = $(item).attr("data-date");
            m = dateStr.split("-")[1];
            y = dateStr.split("-")[0];
            m = dateStr.split("-")[2];
            ret += "GIT_AUTHOR_DATE=" + dateStr + "T12:00:00 GIT_COMMITTER_DATE=" + dateStr + "T12:00:00 git commit -a -m \"gf\" > /dev/null echo 1 >> gitfiti\n";
        });
        console.log(ret);
    }
}

gf.init();
