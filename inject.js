gf = {
    init: function() {
        $(".legend>li").unbind("click").click(gf.setBrush);
        $("svg rect").unbind("click").click(gf.colorCell);
    },

    brush: null,

    brushMappings: ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"],

    setBrush: function(e) {
        console.log($(e.target).index());
        console.log($(e.target));
        var color = gf.brushMappings[$(e.target).index()];
        gf.brush = color;
        console.log(gf.brush);
    },

    colorCell: function(e) {
        console.log($(e.target).attr("fill"));
        $(e.target).attr("fill", gf.brush)
    }

}

gf.init();
