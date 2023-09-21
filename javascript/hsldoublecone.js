// Copyright (C) 2023 Owen Fahey. All rights reserved.

// Global Variables
const hslScene = new THREE.Scene();
hslScene.background = new THREE.Color("#dddddd");

// Orbit
const orbit = new THREE.OrbitControls(camera, renderer.domElement);

var currentShape = 'lines';
var outlineObjects = [];

// Function to Draw Outlines
function drawOutLines() {
    cleanUpOutlines();  // Clear previous outlines

    // Line material and points to connect
    const lineMaterial = new THREE.LineBasicMaterial({ color: "black", transparent: true, opacity: 0.4 });
    const pointsList = [
        [new THREE.Vector3(-longDiagonal / 2, longDiagonal / 2, 0), new THREE.Vector3(0, longDiagonal, 0)],
        [new THREE.Vector3(longDiagonal / 2, longDiagonal / 2, 0), new THREE.Vector3(0, longDiagonal, 0)],
        [new THREE.Vector3(-longDiagonal / 2, longDiagonal / 2, 0), new THREE.Vector3(0, 0, 0)],
        [new THREE.Vector3(longDiagonal / 2, longDiagonal / 2, 0), new THREE.Vector3(0, 0, 0)]
    ];

    // Create and add lines to the scene
    pointsList.forEach(points => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        outlineObjects.push(line);
        hslScene.add(line);
    });

    // Create and add the cone circle to the scene
    createConeCircle();
}
drawOutLines();

// Function to Create Cone Circle
function createConeCircle() {
    const radius = longDiagonal / 2;
    const circleSegments = 40;
    const circleMaterial = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 });
    const circleGeometry = new THREE.CircleGeometry(radius, circleSegments);
    circleGeometry.rotateX(-Math.PI / 2);
    circleGeometry.vertices.shift();
    const coneCircle = new THREE.LineLoop(circleGeometry, circleMaterial);
    coneCircle.position.y = 0.5 * longDiagonal;
    outlineObjects.push(coneCircle);
    hslScene.add(coneCircle);
}

// Function to Clean Up Outlines
function cleanUpOutlines() {
    outlineObjects.forEach(obj => hslScene.remove(obj));
    outlineObjects = [];
}

var topCone;
var bottomCone;

function createHSLCone(top = true) {
    // Remove existing cones if creating a top cone
    removeExistingCones(top);

    // Create geometry
    const geometry = createConeGeometry();

    // Set colors
    setVertexColors(geometry, top);

    // Create material
    const material = createConeMaterial();

    // Add cone to scene
    addToScene(geometry, material, top);
}

function removeExistingCones(top) {
    if (top && topCone) {
        hslScene.remove(topCone);
        hslScene.remove(bottomCone);
    }
}

function createConeGeometry() {
    const height = longDiagonal / 2;
    const radius = longDiagonal / 2;
    const radialSegments = 40;
    const heightSegments = 40;
    return new THREE.ConeBufferGeometry(radius, height, radialSegments, heightSegments, openEnded=true);
}

function setVertexColors(geometry, top) {
    const height = longDiagonal / 2;
    let positions = geometry.attributes.position.array;
    let numVertices = geometry.attributes.position.count;
    const colors = new Float32Array(numVertices * 3);

    for (let i = 0; i < numVertices; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];
        let [angle, normalizedY] = calculateNormalizedAngleAndY(x, y, z, height, top);

        let color = new THREE.Color();
        color.setHSL(angle, 1.0, normalizedY);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    geometry.attributes.color =  new THREE.BufferAttribute(colors, 3);
}

function calculateNormalizedAngleAndY(x, y, z, height, top) {
    let angle = Math.atan2(z, x) / (2 * Math.PI);
    if (!top) angle = 1 - angle;
    if (angle < 0) angle += 1;
    let normalizedY = (y + height / 2) / height;
    if (top) normalizedY = 1 / 2 * normalizedY + 1 / 2;
    else normalizedY = 1 / 2 - 1 / 2 * normalizedY;

    return [angle, normalizedY];
}

function createConeMaterial() {
    return new THREE.MeshBasicMaterial({
        vertexColors: true,
        // side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
    });
}

function addToScene(geometry, material, top) {
    const cone = new THREE.Mesh(geometry, material);
    if (top) {
        topCone = cone;
        cone.position.y = 3 * longDiagonal / 4;
        hslScene.add(cone);
        createHSLCone(false);
    } else {
        bottomCone = cone;
        cone.rotation.x = Math.PI;
        cone.position.y = longDiagonal / 4;
        hslScene.add(cone);
    }
}

var circle;
function createCircle(radius, y_pos = longDiagonal / 2) {
    // Remove existing circle from the scene if any
    if (circle) {
        hslScene.remove(circle);
    }

    // Initialize geometry and material
    let segments = 40;
    let geometry = new THREE.CircleBufferGeometry(radius, segments);
    geometry.rotateX(-Math.PI / 2);

    // Initialize material
    let material = new THREE.MeshBasicMaterial({
        vertexColors: true, // tells the material to use vertex colors
        side: THREE.DoubleSide // render both sides
    });

    // Generate and set colors based on geometry
    setGeometryColors(geometry, radius, y_pos);

    // Create and add the new circle to the scene
    circle = new THREE.Mesh(geometry, material);
    circle.position.y = y_pos;
    hslScene.add(circle);
}

function setGeometryColors(geometry, radius, y_pos) {
    let numVertices = geometry.attributes.position.count;
    let colors = new Float32Array(numVertices * 3);
    let positions = geometry.attributes.position.array;

    for (let i = 0; i < numVertices; i++) {
        let index = i * 3;
        let x = positions[index];
        let y = positions[index + 1];
        let z = positions[index + 2];

        // Calculate HSL values based on geometry
        let hsl = calculateHSL(x, y, z, radius, y_pos);

        colors[index] = hsl.r;
        colors[index + 1] = hsl.g;
        colors[index + 2] = hsl.b;
    }
    geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(colors), 3);
}

function calculateHSL(x, y, z, radius, y_pos) {
    let distanceToCenter = Math.sqrt(x * x + y * y + z * z);
    let normalizedDistance = distanceToCenter / radius;
    let angle = Math.atan2(z, x) / (2 * Math.PI);

    if (angle < 0) angle += 1;

    let h = angle;
    let s = normalizedDistance;
    let l = y_pos / longDiagonal;

    let color = new THREE.Color();
    color.setHSL(h, s, l);

    return {
        r: color.r,
        g: color.g,
        b: color.b
    };
}

createCircle(longDiagonal / 2);

function updateHSL() {
    const newRadius = -Math.abs(longDiagonal * ((cs3.value / cs3.max) - 0.5)) + 0.5 * longDiagonal;
    if (newRadius === 0) {
        hslScene.remove(circle);
        circle = undefined;
    } else {
        createCircle(newRadius, (y_pos = (cs3.value / cs3.max) * longDiagonal));
    }
}

// Toggle shape button event listener
function handleHSLShape(isShapeVisible) {
    if (isShapeVisible) {
        shapeToggle.innerHTML = "Show Cross Section";
        createHSLCone();
        cleanUpOutlines();
        currentShape = "cones";
    } else {
        shapeToggle.innerHTML = "Show Shape";
        hslScene.remove(topCone);
        hslScene.remove(bottomCone);
        drawOutLines();
        currentShape = "lines";
    }
};
