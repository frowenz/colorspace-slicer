if (!Detector.webgl) Detector.addGetWebGLinfo();
var primaryColourspace = 'sRGB';
var colourspaceModel = 'CIE Lab';

var gamutView = new ColourAnalysis.GamutView(
    document.getElementById('threeCanvasContainer'),
    {
        primaryColourspace: primaryColourspace,
        colourspaceModel: colourspaceModel,

        scene: {
            background: '#ddd', // Different background color for example
        },
        fog: {
            enable: false,
        },
        camera: {
            position: {
                x: 5,
                y: 5,
                z: 5,
            },
            fov: 21,
            up: { x: 0, y: 1, z: 0 },
            near: 1,
            far: 100

        },
        axes: { enable: false },

        grid: {
            enable: false, // Disable grid
        },
    }
);

// select canvas child of threeCanvasContainer
const gamutCanvas = document.getElementById('threeCanvasContainer').children[2];
gamutCanvas.id = "gamutCanvas"

// Create gamutPlane
const gamutPlaneGeometry = new THREE.CircleGeometry(1.5, 20);
gamutPlaneGeometry.rotateX(-Math.PI / 2);
const gamutPlaneMaterial = new THREE.MeshBasicMaterial({ color: "black", transparent: true, opacity: 0.25, side: THREE.DoubleSide });
const gamutPlane = new THREE.Mesh(gamutPlaneGeometry, gamutPlaneMaterial);
gamutPlane.position.y = 0.5;

gamutView.scene.add(gamutPlane);
gamutObject = gamutView.addPrimaryColourspaceVisual();
// console.log(gamutObject)

gamutView.primaryColourspaceVisual.uniformOpacity = 0.8;
gamutView.primaryColourspaceVisual.wireframe = true
gamutView.animate();

let gamutIntersectionPoints = [];
let gamutPointsOfIntersection = new THREE.Geometry();


function drawGamutgamutIntersectionPoints() {
    gamutView.scene.remove(gamutView.scene.getObjectByName('points'));
    gamutView.scene.remove(gamutView.scene.getObjectByName('lines'));

    gamutPointsOfIntersection = new THREE.Geometry();
    const gamutPlaneEquation = new THREE.Plane(new THREE.Vector3(0, 1, 0), -gamutPlane.position.y);

    const { array: positions, count } = gamutGeometry.attributes.position;
    const indices = gamutGeometry.index.array;

    for (let i = 0; i < indices.length; i += 2) {
        const start = new THREE.Vector3(positions[indices[i] * 3], positions[indices[i] * 3 + 1], positions[indices[i] * 3 + 2]);
        const end = new THREE.Vector3(positions[indices[i + 1] * 3], positions[indices[i + 1] * 3 + 1], positions[indices[i + 1] * 3 + 2]);
        const line = new THREE.Line3(start, end);
        const intersect = gamutPlaneEquation.intersectLine(line, new THREE.Vector3());

        if (intersect) {
            gamutPointsOfIntersection.vertices.push(intersect.clone());
        }
    }

    const sortedPoints = sortPoints(gamutPointsOfIntersection.vertices);
    const sortedGeometry = new THREE.Geometry();
    sortedPoints.forEach(point => sortedGeometry.vertices.push(point));
    sortedGeometry.vertices.push(sortedPoints[0]);

    const linesMaterial = new THREE.LineBasicMaterial({ color: "white" });
    const linesObj = new THREE.Line(sortedGeometry, linesMaterial);
    linesObj.name = 'lines';
    gamutView.scene.add(linesObj);
}

var gamutGeometry = undefined
const checkInterval = setInterval(() => {
    if (!gamutObject._loading) { // Replace with actual reference
        clearInterval(checkInterval); // Stop checking
        gamutGeometry = gamutObject._visual.geometry
        drawGamutgamutIntersectionPoints();
    }
}, 500); // Check every 100 milliseconds

function handleHCLShape(isShapeVisible) {
    if (isShapeVisible)
    {
        gamutView.primaryColourspaceVisual.wireframe = false
    }
    else {
        gamutView.primaryColourspaceVisual.wireframe = true
    }
}

function updateHCL () {
    gamutPlane.position.y = cs3.value / cs3.max 
    drawGamutgamutIntersectionPoints();
}