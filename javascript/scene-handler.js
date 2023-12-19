// Copyright (C) 2023 Owen Fahey. All rights reserved.

// Initialization
const camera = new THREE.PerspectiveCamera(25, 1, 1, 150);

camera.position.set(0, 35, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(350, 350);
const canvasFormatter = document.getElementById("threeCanvasContainer");
const threeCanvas = canvasFormatter.appendChild(renderer.domElement);
threeCanvas.id = "threeCanvas";

// Scaling
const factor = 10
const longDiagonal = Math.sqrt(3) * factor;

