var isMouseDown = false;
var theColor;
var theSpace = "dRGB"; // HEY: reflects initialization in index.html
var theMaxChroma = 135;
var theMaxSat = 1.05;
var theMaxRadius = 0.84;
var theCDesc = {
    "dRGB": "Red Green Blue",
    "HSL": "Hue-Saturation-Lightness",
    "HSV": "Hue-Saturation-Value (&quot;single cone&quot;)",
    "HCL": "CIE Hue-Chroma-L*"
};

function lerp5([minOut, maxOut], [minIn, maxIn], inVal) {
    var alpha = (inVal - minIn) / (maxIn - minIn);
    return (1 - alpha) * minOut + alpha * maxOut;
}

// clamp to interval, and record how much clamping was needed
function clampto([min, max], val) {
    var ret;
    if (val < min) {
        ret = [min, min - val];
    } else if (val > max) {
        ret = [max, val - max];
    } else {
        ret = [val, 0];
    }
    return ret;
}

function rgbToHex({ r, g, b }) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    let hexR = r.toString(16);
    let hexG = g.toString(16);
    let hexB = b.toString(16);

    if (hexR.length === 1) hexR = '0' + hexR;
    if (hexG.length === 1) hexG = '0' + hexG;
    if (hexB.length === 1) hexB = '0' + hexB;

    return '#' + hexR + hexG + hexB;
}
// set slider from text
function setColorSlider() {
    var newval = parseFloat(tx3.value);
    if (!isNaN(newval)) {
        cs3.value = newval;
    } else {
        tx3.value = Number(cs3.value).toFixed(2);
    }
}

// set text from slider
function setColorText() {
    tx3.value = Number(cs3.value).toFixed(2);
}

/* determines color for pixel (ii,jj) of canvas
   ocskip: outside circle skip: don't try to compute an rgb
   for locations outside the circle */
function IJtoRGB(ii, jj, ocskip) {
    var xx, yy, ll, hh, rgb, circle = true;
    if ("HCL" == theSpace) {
        yy = lerp5([theMaxChroma, -theMaxChroma], [0, theSize - 1], jj);
        xx = lerp5([-theMaxChroma, theMaxChroma], [0, theSize - 1], ii);
        var cc = Math.sqrt(xx * xx + yy * yy);
        if (cc > theMaxChroma) {
            circle = false;
            if (ocskip) return ([circle, false, null]);
        }
        hh = lerp5([-180, 180], [-Math.PI, Math.PI], Math.atan2(yy, xx));
        ll = cs3.value;
        rgb = d3.rgb(d3.hcl(hh, cc, ll));
    } else if ("HSL" == theSpace || "HSV" == theSpace) {
        yy = lerp5([theMaxSat, -theMaxSat], [0, theSize - 1], jj);
        xx = lerp5([-theMaxSat, theMaxSat], [0, theSize - 1], ii);
        var ss = Math.sqrt(xx * xx + yy * yy);
        if (ss > 1) {
            circle = false;
            if (ocskip) return ([false, false, null]);
        }
        hh = lerp5([-180, 180], [-Math.PI, Math.PI], Math.atan2(yy, xx));
        ll = cs3.value / 100;
        rgb = d3.rgb("HSL" == theSpace ? d3.hsl(hh, ss, ll) : d3.hsv(hh, ss, ll));
    } else if ("dRGB" == theSpace) {
        yy = lerp5([theMaxRadius, -theMaxRadius], [0, theSize - 1], jj);
        xx = lerp5([-theMaxRadius, theMaxRadius], [0, theSize - 1], ii);
        if (xx * xx + yy * yy > theMaxRadius * theMaxRadius) {
            circle = false;
            if (ocskip) return ([false, false, null]);
        }
        var mean = cs3.value / 100;
        var pg = [0.408248, -0.816497, 0.408248];
        var lr = [0.707107, 0.0, -0.707107];
        var rr, rrE, gg, ggE, bb, bbE;
        rgb = d3.rgb(255 * (mean + pg[0] * xx + lr[0] * yy),
            255 * (mean + pg[1] * xx + lr[1] * yy),
            255 * (mean + pg[2] * xx + lr[2] * yy));
    }
    var rr, rrE, gg, ggE, bb, bbE;
    [rr, rrE] = clampto([0, 255], rgb.r);
    [gg, ggE] = clampto([0, 255], rgb.g);
    [bb, bbE] = clampto([0, 255], rgb.b);
    return ([circle, rrE + ggE + bbE == 0, d3.rgb(rr, gg, bb)]);
}

function RGBtoIJ(rr, gg, bb) {
    var ii, jj, phi, xx, yy, ll, hh, rgb = d3.rgb(rr, gg, bb);
    if ("HCL" == theSpace) {
        var hcl = d3.hcl(rgb);
        phi = lerp5([-Math.PI, Math.PI], [-180, 180], hcl.h);
        ii = lerp5([0, theSize - 1], [-theMaxChroma, theMaxChroma], hcl.c * Math.cos(phi));
        jj = lerp5([0, theSize - 1], [theMaxChroma, -theMaxChroma], hcl.c * Math.sin(phi));
    } else if ("HSL" == theSpace || "HSV" == theSpace) {
        var hsq = theSpace == "HSL" ? d3.hsl(rgb) : d3.hsv(rgb);
        phi = lerp5([-Math.PI, Math.PI], [-180, 180], hsq.h);
        if (isNaN(phi)) phi = 0;
        var sat = hsq.s;
        if (isNaN(sat)) sat = 0;
        ii = lerp5([0, theSize - 1], [-theMaxSat, theMaxSat], sat * Math.cos(phi));
        jj = lerp5([0, theSize - 1], [theMaxSat, -theMaxSat], sat * Math.sin(phi));
    } else if ("dRGB" == theSpace) {
        xx = (0.408248 * rgb.r - 0.816497 * rgb.g + 0.408248 * rgb.b) / 255;
        yy = (0.707107 * rgb.r - 0.707107 * rgb.b) / 255;
        jj = lerp5([0, theSize - 1], [theMaxRadius, -theMaxRadius], yy);
        ii = lerp5([0, theSize - 1], [-theMaxRadius, theMaxRadius], xx);
    }
    return ([ii, jj]);
}

function refreshCanvas() {
    for (var jj = 0, kk = 0; jj < theSize; ++jj) {
        for (var ii = 0; ii < theSize; ++ii) {
            var circle, gamut, rgb, rr, rrE, gg, ggE, bb, bbE;
            [circle, gamut, rgb] = IJtoRGB(ii, jj, true);
            if (!circle) {
                theImage.data[kk++] = 128;
                theImage.data[kk++] = 128;
                theImage.data[kk++] = 128;
                theImage.data[kk++] = 0;
                continue;
            }
            theImage.data[kk++] = rgb.r;
            theImage.data[kk++] = rgb.g;
            theImage.data[kk++] = rgb.b;
            theImage.data[kk++] = gamut ? 255 : 128 * ((Math.floor(ii / 2) + Math.floor(jj / 2)) % 2);
        }
    }
    theContext.putImageData(theImage, 0, 0);
}

function inputColorSlider() { // Color Slider changed
    setColorText();
    var [ii, jj] = RGBtoIJ(theColor.r, theColor.g, theColor.b);
    pick(ii, jj);
    refreshCanvas();
}

function inputColorText() {   // Color Text changed
    setColorSlider();
    setColorText(); // shows results of possible clamping
    var [ii, jj] = RGBtoIJ(theColor.r, theColor.g, theColor.b);
    pick(ii, jj);
    refreshCanvas();
}

function radio(newSpace) {
    if (theSpace == newSpace) {
        return;
    }
    theSpace = newSpace;
    d3.select("#cdesc").html(theCDesc[theSpace]);
    if ("dRGB" == newSpace) {
        d3.select("#tl3").html(
            '&nbsp;' +
            '<span class="fraction">' +
            '<span class="numerator">mean(R,G,B) * 100</span>' +
            '<span class="division">/</span>' +
            '<span class="denominator">255</span>' +
            '</span>'
        );
        var rgb = d3.rgb(theColor);
        cs3.value = 100 * (rgb.r + rgb.g + rgb.b) / (3 * 255);
    } else if ("HSL" == newSpace) {
        d3.select("#tl3").html(" lightness * 100");
        cs3.value = d3.hsl(theColor).l * 100;
    } else if ("HSV" == newSpace) {
        d3.select("#tl3").html(" = Value*100");
        cs3.value = d3.hsv(theColor).v * 100;
    } else {
        d3.select("#tl3").html(" L* ~=" + '<math xmlns="http://www.w3.org/1998/Math/MathML"> <mroot>  <mn>luminance</mn>  <mn>3</mn>  </mroot> </math> ');
        cs3.value = d3.hcl(theColor).l;
    }
    setColorText(); // update text from slider
    var [ii, jj] = RGBtoIJ(theColor.r, theColor.g, theColor.b);
    pick(ii, jj);
    refreshCanvas();
}

/* called with no arguments: when clicking (or dragging) inside canvas
   called with arguments: repositioning curser because of GUI change */
function pick(_ii, _jj, e) {
    var ii, jj;
    if (typeof _ii == 'undefined' || typeof _jj == 'undefined') {
        var rect = theCanvas.getBoundingClientRect();
        ii = e.clientX - rect.left;  // Changed from event.clientX
        jj = e.clientY - rect.top;   // Changed from event.clientY
    } else {
        ii = _ii;
        jj = _jj;
    }
    var [circle, gamut, rgb] = IJtoRGB(ii, jj, false);
    if (!gamut) {
        [ii, jj] = RGBtoIJ(rgb.r, rgb.g, rgb.b);
        /* repeatedly clamp to RGB gamut to get (ii,jj) location
           inside current slice of gamut */
        for (var iter = 1; iter < 20; iter++) {
            [circle, gamut, rgb] = IJtoRGB(ii, jj, false);
            [ii, jj] = RGBtoIJ(rgb.r, rgb.g, rgb.b);
        }
    }
    d3.select("#xhair").attr("transform", "translate(" + ii + "," + jj + ")");
    d3.select("#outRect").attr("fill", rgb);

    var hsq = d3.hsl(rgb);
    var hcl = d3.hcl(rgb);
    document.querySelector("#rgbVal").innerHTML = rgb;
    document.querySelector("#hslVal").innerHTML = "hsl(" + Math.round(hsq.h) + ", " + Math.round(hsq.s * 100) + "%, " + Math.round(hsq.l * 100) + "%)";
    document.querySelector("#hexVal").innerHTML = rgbToHex(rgb)
    document.querySelector("#hclVal").innerHTML = "hcl(" + Math.round(hcl.h) + ", " + Math.round(hcl.c) + ", " + Math.round(hcl.l) + ")";

    theColor = rgb;
}

