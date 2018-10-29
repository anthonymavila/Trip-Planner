
$("#vacation").inViewport(function(px){
    if(px) $(this).css({
    	"opacity": 1,
    });
});

$("#gpsimg").inViewport(function(px){
    if(px) $(this).css({
    	"height": "25vh",
    });
});

$(".rimg").inViewport(function(px){
    if(px) $(this).css({
    	"transform": "none",
    	"opacity": 1
    });
});