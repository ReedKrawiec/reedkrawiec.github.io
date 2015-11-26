var input = document.getElementById('input');
input.addEventListener('change', handleFiles);

function handleFiles(e) {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image;
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = function () {
        var canvas1 = document.getElementById("canvas1").getContext("2d");
        var canvas  = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        document.getElementById("canvas1").height=img.height;
        document.getElementById("canvas1").width=img.width;
        canvas.height = img.height;
        canvas.width = img.width;
        canvas1.drawImage(img,0,0);
        var dropdownvalue = document.getElementById("dropdown").value;
        ctx.drawImage(img, 0, 0);
        if(dropdownvalue == "Black and White")
        grayScale(context, canvas);
        else
        Inverted(context,canvas);    
        document.getElementById("canvascontainer").style.display = "initial";
    }
}
function grayScale(context, canvas) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels  = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
        var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
        pixels[i  ] = grayscale;        // red
        pixels[i+1] = grayscale;        // green
        pixels[i+2] = grayscale;        // blue
        //pixels[i+3]              is alpha
    }
    //redraw the image in black & white
    context.putImageData(imgData, 0, 0);
}
function Inverted(context, canvas) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels  = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
        pixels[i  ] = 255 - pixels[i];        // red
        pixels[i+1] = 255 - pixels[i+1];        // green
        pixels[i+2] = 255 - pixels[i+2];        // blue
        //pixels[i+3]              is alpha
    }
    //redraw the image in black & white
    context.putImageData(imgData, 0, 0);
}    