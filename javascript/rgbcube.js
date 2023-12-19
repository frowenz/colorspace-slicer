// GNU public license
const rgbScene = new THREE.Scene();
rgbScene.background = new THREE.Color("#dddddd");

// Create Plane
const planeGeometry = new THREE.CircleGeometry(longDiagonal / 2, 20);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.MeshBasicMaterial({ depthWrite: true, color: "black", transparent: true, opacity: 0.25, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = 0.5 * longDiagonal;
rgbScene.add(plane);
plane.renderOrder = 1; 

// Custom vertices
var vertices = [
    0.0, 0.0, 0.0,
    0.788675135, 0.577350269, -0.211324865,
    0.577350269, 1.154700538, 0.577350269,
    -0.211324865, 0.577350269, 0.788675135,
    -0.577350269, 0.577350269, -0.577350269,
    0.211324865, 1.154700538, -0.788675135,
    1.11022302e-16, 1.732050808, 1.11022302e-16,
    -0.788675135, 1.154700538, 0.211324865,
];
for (var i = 0; i < vertices.length; i++) {
    vertices[i] = vertices[i] * factor;
}

// Wireframe indices
const indices = [
    0, 1, 1, 2, 2, 3, 3, 0,
    4, 5, 5, 6, 6, 7, 7, 4,
    0, 4, 1, 5, 2, 6, 3, 7
];

// Custom colors to align with the vertices
const colors = [
    0, 0, 0, // black
    1, 0, 0, // red
    1, 0, 1, // magenta
    0, 0, 1, // blue
    0, 1, 0, // green
    1, 1, 0,  // yellow
    1, 1, 1, // white
    0, 1, 1, // cyan
];

// Create the geometry
const geometry = new THREE.BufferGeometry();
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(vertices), 3);
geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(colors), 3);
geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));


// Create material
const material = new THREE.LineBasicMaterial({ vertexColors: true });

// Create mesh
const cube = new THREE.LineSegments(geometry, material);
rgbScene.add(cube);


// Intersection Logic
let intersectionPoints = [];
let pointsOfIntersection = new THREE.Geometry();
let planeYPos = 0.5;
let yDirection = 0.01;

function sortPoints(points) {
    const sum = points.reduce((acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        acc.z += point.z;
        return acc;
    }, new THREE.Vector3(0, 0, 0));

    const centroid = new THREE.Vector3(sum.x / points.length, sum.y / points.length, sum.z / points.length);

    return points.sort((a, b) => {
        const angleA = Math.atan2(a.z - centroid.z, a.x - centroid.x);
        const angleB = Math.atan2(b.z - centroid.z, b.x - centroid.x);
        return angleA - angleB;
    });
}

function drawIntersectionPoints() {
    rgbScene.remove(rgbScene.getObjectByName('points'));
    rgbScene.remove(rgbScene.getObjectByName('lines'));

    pointsOfIntersection = new THREE.Geometry();
    const planeEquation = new THREE.Plane(new THREE.Vector3(0, 1, 0), -plane.position.y);

    const { array: positions, count } = cube.geometry.attributes.position;
    const indices = cube.geometry.index.array;

    for (let i = 0; i < indices.length; i += 2) {
        const start = new THREE.Vector3(positions[indices[i] * 3], positions[indices[i] * 3 + 1], positions[indices[i] * 3 + 2]);
        const end = new THREE.Vector3(positions[indices[i + 1] * 3], positions[indices[i + 1] * 3 + 1], positions[indices[i + 1] * 3 + 2]);
        const line = new THREE.Line3(start, end);
        const intersect = planeEquation.intersectLine(line, new THREE.Vector3());

        if (intersect) {
            pointsOfIntersection.vertices.push(intersect.clone());
        }
    }

    const sortedPoints = sortPoints(pointsOfIntersection.vertices);
    const sortedGeometry = new THREE.Geometry();
    sortedPoints.forEach(point => sortedGeometry.vertices.push(point));
    sortedGeometry.vertices.push(sortedPoints[0]);

    const pointsMaterial = new THREE.PointsMaterial({ size: 1, color: "white" });
    const pointsObj = new THREE.Points(pointsOfIntersection, pointsMaterial);
    pointsObj.name = 'points';
    // rgbScene.add(pointsObj);

    const linesMaterial = new THREE.LineBasicMaterial({ linewidth: 10, color: "white" });
    const linesObj = new THREE.Line(sortedGeometry, linesMaterial);
    linesObj.name = 'lines';
    rgbScene.add(linesObj);
}

// Slider logic
function updateRGB () {
    plane.position.y = cs3.value / cs3.max * longDiagonal
}


// 3D CUBE 
// Attribution: https://cs.wellesley.edu/~cs307/threejs/demos/Color/colorcube.html

computeFaceColors = function (geom) {
    if (!(geom instanceof THREE.Geometry)) {
        throw "computeFaceColors needs a geometry object";
    }
    var colors = geom.vertexColors;
    var i, faces = geom.faces, len = faces.length;

    for (i = 0; i < len; ++i) {
        var face = faces[i];
        var facecolors = [];
        facecolors[0] = colors[face.a];
        facecolors[1] = colors[face.b];
        facecolors[2] = colors[face.c];
        face.vertexColors = facecolors;
    }
}

addQuadFace = function (geom, a, b, c, d) {
    geom.faces.push(new THREE.Face3(a, b, c));
    geom.faces.push(new THREE.Face3(c, d, a));
};

createColorCube = function () {
    /* I've thought of these vertex numbers in octal, with three bits
     * corresponding (right to left) to red, green, and blue.
       */
    var colors = [];
    colors[0] = new THREE.Color(0, 0, 0);
    colors[1] = new THREE.Color(0, 0, 1);
    colors[2] = new THREE.Color(0, 1, 0);
    colors[3] = new THREE.Color(0, 1, 1); // green+blue
    colors[4] = new THREE.Color(1, 0, 0);
    colors[5] = new THREE.Color(1, 0, 1); // red+blue
    colors[6] = new THREE.Color(1, 1, 0); // red+green
    colors[7] = new THREE.Color(1, 1, 1);

    // the index is the decimal/octal equivalent of the three bits of the coords
    var vertices = [];
    vertices[0] = new THREE.Vector3(0, 0, 0);
    vertices[1] = new THREE.Vector3(0, 0, 1);
    vertices[2] = new THREE.Vector3(0, 1, 0);
    vertices[3] = new THREE.Vector3(0, 1, 1);
    vertices[4] = new THREE.Vector3(1, 0, 0);
    vertices[5] = new THREE.Vector3(1, 0, 1);
    vertices[6] = new THREE.Vector3(1, 1, 0);
    vertices[7] = new THREE.Vector3(1, 1, 1);

    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.vertexColors = colors;
    // front face is z=1, so just those vertices
    addQuadFace(geom, 1, 5, 7, 3);
    // top face is y=1, so just those
    addQuadFace(geom, 2, 3, 7, 6);
    addQuadFace(geom, 0, 1, 3, 2);  // left face is x=0
    addQuadFace(geom, 4, 6, 7, 5);  // right face, x=1
    addQuadFace(geom, 0, 4, 5, 1);  // bottom face, y=0
    addQuadFace(geom, 0, 2, 6, 4);  // back face, z=0

    computeFaceColors(geom);

    var material = new THREE.MeshBasicMaterial(
        {
            vertexColors: THREE.VertexColors,
            // side: THREE.DoubleSide, // in case we go inside the cube
            depthWrite: false,
            transparent: true,
            // opacity: 0.8,
        });
    var mesh = new THREE.Mesh(geom, material);

    // Rotation logic here
    const axis = new THREE.Vector3(-1, 1, -1).normalize();
    const yAxis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, axis);
    mesh.setRotationFromQuaternion(quaternion);

    // Scale 
    mesh.scale.set(factor, factor, factor);
    return mesh;
};


var solidCube = undefined
function handleRGBShape(isShapeVisible) {
    if (isShapeVisible) {
        solidCube = createColorCube();
        rgbScene.add(solidCube);
    } else {
        rgbScene.remove(solidCube);
        solidCube = undefined;
    }
}