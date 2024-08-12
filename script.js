var canvases = document.querySelectorAll(".myCanvas");
canvases.forEach(function (cvs) {
    var context = cvs.getContext("2d");

    var numDots = 600, n = numDots, currDot, maxRad = 800, minRad = 200, radDiff = maxRad - minRad, dots = [], pairs = [], PI = Math.PI, rightTopPt = {
        x: 0,
        y: 0
    };

    resizeHandler();
    window.onresize = resizeHandler;

    // create dots
    n = numDots;
    while (n--) {
        currDot = {};
        currDot.x = currDot.y = 0;
        currDot.radius = minRad + Math.random() * radDiff;
        currDot.radiusV = 10 + Math.random() * 50;
        currDot.radiusVS = (1 - Math.random() * 2) * 0.015 * 0.5;
        currDot.radiusVP = Math.random() * PI;
        currDot.ang = (1 - Math.random() * 2) * PI;
        currDot.speed = (0.4 - Math.random() * 0.7) * 0.5;
        currDot.intensity = Math.round(Math.random() * 255);
        currDot.fillColor = "rgb(" + currDot.intensity + "," + currDot.intensity + "," + currDot.intensity + ")";
        dots.push(currDot);
    }

    // create all pairs
    n = numDots;
    while (n--) {
        var ni = n;
        while (ni--) {
            pairs.push([n, ni]);
        }
    }

    function drawPoints() {
        n = numDots;
        var _rightTopPt = rightTopPt
            , _context = context
            , dX = 0
            , dY = 0;

        _context.clearRect(0, 0, cvs.width, cvs.height);

        var radDiff;
        // move dots
        n = numDots;
        while (n--) {
            currDot = dots[n];
            currDot.radiusVP += currDot.radiusVS;
            radDiff = currDot.radius + Math.sin(currDot.radiusVP) * currDot.radiusV;
            currDot.x = _rightTopPt.x + Math.sin(currDot.ang) * radDiff;
            currDot.y = _rightTopPt.y + Math.cos(currDot.ang) * radDiff;
            currDot.ang += (currDot.speed * radDiff) / 20000;
        }

        var pair, dot0, dot1, dist, bright, maxDist = Math.pow(100, 2);
        // draw lines
        n = pairs.length;
        while (n--) {
            pair = pairs[n];
            dot0 = dots[pair[0]];
            dot1 = dots[pair[1]];
            dist = Math.pow(dot1.x - dot0.x, 2) + Math.pow(dot1.y - dot0.y, 2);
            if (dist < maxDist) {
                bright = Math.round((60 * (maxDist - dist)) / maxDist);
                _context.beginPath();
                _context.moveTo(dot0.x, dot0.y);
                _context.lineTo(dot1.x, dot1.y);
                _context.lineWidth = 1;
                _context.strokeStyle = "rgb(" + bright + "," + bright + "," + bright + ")";
                _context.stroke();
            }
        }

        // draw dots
        n = numDots;
        while (n--) {
            _context.fillStyle = dots[n].fillColor;
            _context.fillRect(dots[n].x, dots[n].y, 1, 1);
        }
        window.requestAnimationFrame(drawPoints);
    }

    function resizeHandler() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        cvs.width = w;
        cvs.height = h;
        rightTopPt.x = w;
        rightTopPt.y = 0;
    }

    drawPoints();
});