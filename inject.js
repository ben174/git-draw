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
    }
    render: function() {
        $("svg rect").each(function(i, item) { 

        });
    }
}

gf.init();
