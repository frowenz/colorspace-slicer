// Copyright (C) 2013-2021, Colour Developers
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Colour Developers nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL COLOUR DEVELOPERS BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var ColourAnalysis;
ColourAnalysis = (() => {
    "use strict";
    var e = {
        996: (e) => {
            var t = function (e) {
                return (
                    (function (e) {
                        return !!e && "object" == typeof e;
                    })(e) &&
                    !(function (e) {
                        var t = Object.prototype.toString.call(e);
                        return (
                            "[object RegExp]" === t ||
                            "[object Date]" === t ||
                            (function (e) {
                                return e.$$typeof === r;
                            })(e)
                        );
                    })(e)
                );
            },
                r = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
            function a(e, t) {
                return !1 !== t.clone && t.isMergeableObject(e) ? c(((r = e), Array.isArray(r) ? [] : {}), e, t) : e;
                var r;
            }
            function i(e, t, r) {
                return e.concat(t).map(function (e) {
                    return a(e, r);
                });
            }
            function o(e) {
                return Object.keys(e).concat(
                    (function (e) {
                        return Object.getOwnPropertySymbols
                            ? Object.getOwnPropertySymbols(e).filter(function (t) {
                                return e.propertyIsEnumerable(t);
                            })
                            : [];
                    })(e)
                );
            }
            function s(e, t) {
                try {
                    return t in e;
                } catch (e) {
                    return !1;
                }
            }
            function c(e, r, n) {
                ((n = n || {}).arrayMerge = n.arrayMerge || i), (n.isMergeableObject = n.isMergeableObject || t), (n.cloneUnlessOtherwiseSpecified = a);
                var u = Array.isArray(r);
                return u === Array.isArray(e)
                    ? u
                        ? n.arrayMerge(e, r, n)
                        : (function (e, t, r) {
                            var i = {};
                            return (
                                r.isMergeableObject(e) &&
                                o(e).forEach(function (t) {
                                    i[t] = a(e[t], r);
                                }),
                                o(t).forEach(function (o) {
                                    (function (e, t) {
                                        return s(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
                                    })(e, o) ||
                                        (s(e, o) && r.isMergeableObject(t[o])
                                            ? (i[o] = (function (e, t) {
                                                if (!t.customMerge) return c;
                                                var r = t.customMerge(e);
                                                return "function" == typeof r ? r : c;
                                            })(o, r)(e[o], t[o], r))
                                            : (i[o] = a(t[o], r)));
                                }),
                                i
                            );
                        })(e, r, n)
                    : a(r, n);
            }
            c.all = function (e, t) {
                if (!Array.isArray(e)) throw new Error("first argument should be an array");
                return e.reduce(function (e, r) {
                    return c(e, r, t);
                }, {});
            };
            var n = c;
            e.exports = n;
        },
        187: (e, t, r) => {
            r.r(t), r.d(t, { GamutView: () => O, ImageView: () => b, dropdownOptions: () => S, info: () => n, isLinearFileFormat: () => h, saveFile: () => p, serverRoute: () => o, updateDropdown: () => M, warning: () => u });
            var a = r(996),
                i = r.n(a);
            function o(e) {
                return null != window.colourAnalysisServer ? `${window.colourAnalysisServer}${e}` : e;
            }
            function s(e, t) {
                for (; null != e.getObjectByName(t);) {
                    var r = e.getObjectByName(t);
                    r.parent.remove(r);
                }
            }
            function c(e, t, r, a, i) {
                null != t &&
                    null != t &&
                    ((t.innerText = e),
                        (function (e, t) {
                            for (e.style.opacity = 1; t.length > 0;) {
                                var r = t.shift();
                                window.clearInterval(r), window.clearTimeout(r);
                            }
                        })(t, r),
                        (function (e, t, r, a) {
                            (r = r || 5e3),
                                (a = a || 10),
                                t.push(
                                    setTimeout(function () {
                                        e.style.opacity = 1;
                                        var r = setInterval(function () {
                                            var t = e.style.opacity;
                                            0 == t ? clearInterval(r) : (e.style.opacity = t - 0.01);
                                        }, a);
                                        t.push(r);
                                    }, r)
                                );
                        })(t, r, a, i));
            }
            function n(e, t, r) {
                c(e, document.getElementById("info"), window.info_id_registry, t, r);
            }
            function u(e, t, r) {
                c(e, document.getElementById("warning"), window.warning_id_registry, t, r);
            }
            function l(e) {
                var t = Math.round((e.loaded / parseFloat(e.target.getResponseHeader("x-content-length"))) * 100);
                n(`${this.name}: ${t}% loaded...`);
            }
            function h(e) {
                var t = e.split(".");
                return ["exr", "hdr"].indexOf(t[t.length - 1].toLowerCase()) >= 0;
            }
            (window.info_id_registry = new Array()), (window.warning_id_registry = new Array());
            var p = function (e, t) {
                var r = document.createElement("a");
                "string" == typeof r.download ? (document.body.appendChild(r), (r.download = t), (r.href = e), r.click(), document.body.removeChild(r)) : location.replace(uri);
            };
            class m {
                constructor(e, t) {
                    (this._container = e),
                        (t = i()({ renderer: { antialias: !0 } }, t || {})),
                        (this._renderer = new THREE.WebGLRenderer({ antialias: t.renderer.antialias })),
                        this._renderer.setPixelRatio(window.devicePixelRatio),
                        this._renderer.setSize(this._container.clientWidth, this._container.clientHeight),
                        this._container.appendChild(this._renderer.domElement),
                        (this._scene = new THREE.Scene()),
                        (this._observer = new MutationObserver(this.resizeToContainer.bind(this))),
                        this._observer.observe(this._container, { attributes: !0 }),
                        this._theta = 0;
                        this._cameraSpinRate = 0.0025
                        window.gamutRenderer = this
                }
                get theta () {
                    return this._theta;
                }
                set theta (e) {
                    this._theta = e;
                }
                get cameraSpinRate() {
                    return this._cameraSpinRate;
                }
                set cameraSpinRate(e) {
                    this._cameraSpinRate = e;
                }
                get container() {
                    return this._container;
                }
                set container(e) {
                    throw new Error('"container" property is read only!');
                }
                get renderer() {
                    return this._renderer;
                }
                set renderer(e) {
                    throw new Error('"renderer" property is read only!');
                }
                get scene() {
                    return this._scene;
                }
                set scene(e) {
                    throw new Error('"scene" property is read only!');
                }
                capture() {
                    return this.render(), this._renderer.domElement.toDataURL("image/png");
                }
                removeObjectByName(e) {
                    s(this._scene, e);
                }
                resizeToContainer() {
                    var e = this._container.clientWidth,
                        t = this._container.clientHeight;
                    (this._container.width === e && this._container.height === t) || this._renderer.setSize(e, t);
                }
                animate() {
                    this._theta = this._theta + this._cameraSpinRate;
                    this._camera.position.x = 10 * Math.sin(this._theta);
                    this._camera.position.z = 10 * Math.cos(this._theta);
                    
                    requestAnimationFrame(this.animate.bind(this));
                    this._controls.update();
                    this.render();
                }
                render() {
                    this._camera.lookAt(new THREE.Vector3(0, 0.5, 0));
                    this._renderer.render(this._scene, this._camera);
                }
            }
            class d extends m {
                constructor(e, t) {
                    super(e, t),
                        (t = i()({ camera: { fov: 45, up: { x: 0, y: 1, z: 0 }, near: 0.001, far: 1e3 } }, t || {})),
                        (this._camera = new THREE.PerspectiveCamera(t.camera.fov, this.container.clientWidth / this.container.clientHeight, t.camera.near, t.camera.far)),
                        (this._camera.name = "perspective-camera"),
                        (this._camera.up = new THREE.Vector3(t.camera.up.x, t.camera.up.y, t.camera.up.z)),
                        this._scene.add(this._camera),
                        (this._controls = new THREE.OrbitControls(this._camera, this.container));
                        this._controls.maxDistance = 15;
                }
                get camera() {
                    return this._camera;
                }
                set camera(e) {
                    throw new Error('"camera" property is read only!');
                }
                get controls() {
                    return this._controls;
                }
                set controls(e) {
                    throw new Error('"controls" property is read only!');
                }
                resizeToContainer() {
                    super.resizeToContainer();
                    var e = this.container.clientWidth,
                        t = this.container.clientHeight;
                    (this.container.width === e && this.container.height === t) || ((this._camera.aspect = e / t), this._camera.updateProjectionMatrix());
                }
            }
            class g {
                constructor(e, t) {
                    (this._parent = e), (this._name = t.name || "visual"), (this._visible = t.visible || !0), (this._loadingCallback = t.loadingCallback || l), (this._cache = {}), (this._visual = void 0), (this._loading = !1);
                }
                get parent() {
                    return this._parent;
                }
                set parent(e) {
                    null != this._parent && s(this._parent, this._name), (this._parent = e), null != this._visual && this._parent.add(this._visual);
                }
                get name() {
                    return this._name;
                }
                set name(e) {
                    throw new Error('"name" property is read only!');
                }
                get visible() {
                    return this._visible;
                }
                set visible(e) {
                    (this._visible = e),
                        Object.keys(this._cache).forEach(
                            function (t) {
                                this._cache[t].visible = e;
                            }.bind(this)
                        );
                }
                get loadingCallback() {
                    return this._loadingCallback;
                }
                set loadingCallback(e) {
                    this._loadingCallback = e;
                }
                get cache() {
                    return this._cache;
                }
                set cache(e) {
                    throw new Error('"cache" property is read only!');
                }
                get visual() {
                    return this._visual;
                }
                set visual(e) {
                    null != this._parent && s(this._parent, this._name), (this._visual = e), null != this._visual && this._parent.add(this._visual);

                }
                get loading() {
                    return this._loading;
                }
                set loading(e) {
                    throw new Error('"cache" property is read only!');
                }
                route() {
                    throw Error("Method must be reimplemented in subclass!");
                }
                add() {
                    null != this._parent && s(this._parent, this._name);
                    var e = this.route();
                    (this._loading = !0), e in this._cache ? ((this._visual = this._cache[e]), this._parent.add(this._visual), (this._loading = !1)) : this.fetch(e);
                }
                create(e) {
                    throw Error("Method must be reimplemented in subclass!");
                }
                fetch(e) {
                    e = "https://colour-science.org:8020/" + e
                    new THREE.BufferGeometryLoader().load(
                        e,
                        function (t, r) {
                            (this._visual = this.create(t)), (this._cache[e] = this._visual), this._parent.add(this._visual), (this._loading = !1);
                        }.bind(this),
                        this._loadingCallback.bind(this)
                    );
                }
            }
            class _ extends g {
                constructor(e, t) {
                    super(e.camera, i()({ name: "view-axes-visual" }, t || {})), (this._view = e), (this._colourspaceModel = t.colourspaceModel || "CIE Lab");
                }
                get view() {
                    return this._view;
                }
                set view(e) {
                    throw new Error('"view" property is read only!');
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                route() {
                    return o(`/colourspace-models?colourspaceModel=${encodeURIComponent(this._colourspaceModel)}`);
                }
                create(e) {
                    var t = new THREE.AxesHelper();
                    return (
                        t.geometry.attributes.color.array.set([0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0]),
                        (t.name = this.name),
                        (t.visible = this.visible),
                        new THREE.FontLoader().load(
                            "https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json",
                            function (r) {
                                [
                                    { text: e[this._colourspaceModel][0], colour: "#FF0000", position: { x: -0.2, y: -0.2, z: 1.2 } },
                                    { text: e[this._colourspaceModel][1], colour: "#00FF00", position: { x: -0.2, y: 1.2, z: -0.05 } },
                                    { text: e[this._colourspaceModel][2], colour: "#0000FF", position: { x: 1.2, y: -0.2, z: -0.05 } },
                                ].forEach(
                                    function (e) {
                                        var a = new THREE.TextGeometry(e.text, { font: r, size: 0.4, height: 0.1, curveSegments: 8 }),
                                            i = new THREE.MeshBasicMaterial({ color: e.colour }),
                                            o = new THREE.Mesh(a, i);
                                        o.position.set(e.position.x, e.position.y, e.position.z), (o.name = e.text), t.add(o);
                                    }.bind(this)
                                );
                            }.bind(this)
                        ),
                        (t.onBeforeRender = function (e, t, r, a, i, o) {
                            var s = 10 * this._view.camera.near;
                            this.visual.scale.set(s / 20, s / 20, s / 20);
                            var c = this._view.container.clientWidth / this._view.container.clientHeight,
                                n = (this._view.camera.fov * Math.PI) / 180,
                                u = 2 * Math.atan(Math.tan(n / 2) * c),
                                l = 2 * Math.tan(u / 2) * s,
                                h = 2 * Math.tan(n / 2) * s;
                            this.visual.position.set((-l / 2) * 0.85, (-h / 2) * 0.85, -s);
                            var p = (function (e, t) {
                                var r = new THREE.Vector3(),
                                    a = new THREE.Vector3();
                                r.copy(e.position), a.copy(t.target), r.sub(a);
                                var i = Math.sqrt(r.x * r.x + r.y * r.y + r.z * r.z),
                                    o = Math.sqrt(r.x * r.x + r.z * r.z);
                                return { x: Math.acos(o / i) * (r.y > 0 ? 1 : -1), y: Math.acos(r.z / o) * (r.x > 0 ? -1 : 1), z: 0 };
                            })(this._view.camera, this._view.controls);
                            this.visual.rotation.set(p.x, p.y, 0);
                        }.bind(this)),
                        t
                    );
                }
                fetch(e) {
                    e = "https://colour-science.org:8020/" + e
                    console.log(e)
                    var t = new THREE.FileLoader();
                    t.setResponseType("json"),
                        t.load(
                            e,
                            function (t) {
                                (this.visual = this.create(t)), (this.cache[e] = this.visual), this._view.camera.add(this.visual), (this._loading = !1);
                            }.bind(this),
                            l.bind(this)
                        );
                }
            }
            class y extends g {
                constructor(e, t) {
                    super(e, i()({ name: "colourspace-visual" }, t || {})),
                        // (this._colourspace = t.colourspace || "sRGB"),
                        (this._colourspace = t.colourspace || "Adobe"),
                        (this._colourspaceModel = t.colourspaceModel || "CIE Lab"),
                        (this._segments = t.segments || 16),
                        (this._uniformColour = t.uniformColour || void 0),
                        (this._uniformOpacity = t.uniformOpacity || 0.75),
                        (this._wireframe = t.wireframe || !1),
                        (this._wireframeColour = t.wireframeColour || void 0),
                        (this._wireframeOpacity = t.wireframeOpacity || 1);
                }
                get colourspace() {
                    return this._colourspace;
                }
                set colourspace(e) {
                    (this._colourspace = e), this.add();
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                get segments() {
                    return this._segments;
                }
                set segments(e) {
                    (this._segments = e), this.add();
                }
                get uniformColour() {
                    return this._uniformColour;
                }
                set uniformColour(e) {
                    (this._uniformColour = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.color = new THREE.Color(e);
                            }.bind(this)
                        );
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                get wireframe() {
                    return this._wireframe;
                }
                set wireframe(e) {
                    (this._wireframe = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.wireframe = e;
                            }.bind(this)
                        );
                }
                get wireframeColour() {
                    return this._wireframeColour;
                }
                set wireframeColour(e) {
                    throw new Error('"wireframeOpacity" property is read only!');
                }
                get wireframeOpacity() {
                    return this._wireframeOpacity;
                }
                set wireframeOpacity(e) {
                    throw new Error('"wireframeOpacity" property is read only!');
                }
                route() {
                    return o(`/RGB-colourspace-volume-visual?colourspace=${encodeURIComponent(this._colourspace)}&colourspaceModel=${encodeURIComponent(this._colourspaceModel)}&segments=${this._segments}&wireframe=${this._wireframe}&`);
                }
                create(e) {
                    var t = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, transparent: !0, opacity: this._uniformOpacity, wireframe: this._wireframe });
                    t.depthWrite = 1 == this._uniformOpacity;
                    var r = new THREE.Mesh(e, t);
                    return (r.name = this.name), (r.visible = this.visible), r;
                }
            }
            class C extends g {
                constructor(e, t) {
                    super(e, i()({ name: "image-scatter-visual" }, t || {})),
                        (this._image = t.image || "Rose.ProPhoto.jpg"),
                        (this._primaryColourspace = t.primaryColourspace || "sRGB"),
                        (this._secondaryColourspace = t.secondaryColourspace || "DCI-P3"),
                        (this._imageColourspace = t.imageColourspace || "Primary"),
                        (this._imageDecodingCctf = t.imageDecodingCctf || "sRGB"),
                        (this._colourspaceModel = t.colourspaceModel || "CIE Lab"),
                        (this._uniformColour = t.uniformColour || void 0),
                        (this._uniformOpacity = t.uniformOpacity || 0.75),
                        (this._outOfPrimaryColourspaceGamut = t.outOfPrimaryColourspaceGamut || !1),
                        (this._outOfSecondaryColourspaceGamut = t.outOfSecondaryColourspaceGamut || !1),
                        (this._outOfPointerGamut = t.outOfPointerGamut || !1),
                        (this._subSampling = t.subSampling || 25),
                        (this._pointSize = t.pointSize || 0.01),
                        (this._saturate = t.saturate || !1);
                }
                get image() {
                    return this._image;
                }
                set image(e) {
                    (this._image = e), this.add();
                }
                get imageColourspace() {
                    return this._imageColourspace;
                }
                set imageColourspace(e) {
                    (this._imageColourspace = e), this.add();
                }
                get primaryColourspace() {
                    return this._primaryColourspace;
                }
                set primaryColourspace(e) {
                    (this._primaryColourspace = e), this.add();
                }
                get secondaryColourspace() {
                    return this._secondaryColourspace;
                }
                set secondaryColourspace(e) {
                    (this._secondaryColourspace = e), this.add();
                }
                get imageColourspace() {
                    return this._imageColourspace;
                }
                set imageColourspace(e) {
                    if (!["Primary", "Secondary"].includes(e)) throw new Error('"imageColourspace" value must be one of ["Primary", "Secondary"]!');
                    (this._imageColourspace = e), this.add();
                }
                get imageDecodingCctf() {
                    return this._imageDecodingCctf;
                }
                set imageDecodingCctf(e) {
                    (this._imageDecodingCctf = e), this.add();
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                get uniformColour() {
                    return this._uniformColour;
                }
                set uniformColour(e) {
                    (this._uniformColour = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.color = new THREE.Color(e);
                            }.bind(this)
                        );
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                get outOfPrimaryColourspaceGamut() {
                    return this._outOfPrimaryColourspaceGamut;
                }
                set outOfPrimaryColourspaceGamut(e) {
                    (this._outOfPrimaryColourspaceGamut = e), this.add();
                }
                get outOfSecondaryColourspaceGamut() {
                    return this._outOfSecondaryColourspaceGamut;
                }
                set outOfSecondaryColourspaceGamut(e) {
                    (this._outOfSecondaryColourspaceGamut = e), this.add();
                }
                get outOfPointerGamut() {
                    return this._outOfPointerGamut;
                }
                set outOfPointerGamut(e) {
                    (this._outOfPointerGamut = e), this.add();
                }
                get subSampling() {
                    return this._subSampling;
                }
                set subSampling(e) {
                    (this._subSampling = e), this.add();
                }
                get pointSize() {
                    return this._pointSize;
                }
                set pointSize(e) {
                    (this._pointSize = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.size = e;
                            }.bind(this)
                        );
                }
                get saturate() {
                    return this._saturate;
                }
                set saturate(e) {
                    (this._saturate = e), this.add();
                }
                route() {
                    return o(
                        `/RGB-image-scatter-visual/${this._image}?primaryColourspace=${encodeURIComponent(this._primaryColourspace)}&secondaryColourspace=${encodeURIComponent(
                            this._secondaryColourspace
                        )}&imageColourspace=${encodeURIComponent(this._imageColourspace)}&imageDecodingCctf=${encodeURIComponent(this._imageDecodingCctf)}&colourspaceModel=${encodeURIComponent(
                            this._colourspaceModel
                        )}&outOfPrimaryColourspaceGamut=${this._outOfPrimaryColourspaceGamut}&outOfSecondaryColourspaceGamut=${this._outOfSecondaryColourspaceGamut}&outOfPointerGamut=${this._outOfPointerGamut}&subSampling=${this._subSampling
                        }&saturate=${this._saturate}&`
                    );
                }
                create(e) {
                    var t = new THREE.PointsMaterial({ vertexColors: THREE.VertexColors, transparent: !0, opacity: this._uniformOpacity, size: this._pointSize }),
                        r = new THREE.Points(e, t);
                    return (r.name = this.name), (r.visible = this.visible), r;
                }
            }
            class f extends g {
                constructor(e, t) {
                    super(e, i()({ name: "pointer-gamut-visual" }, t || {})),
                        (this._colourspaceModel = t.colourspaceModel || "CIE Lab"),
                        (this._uniformColour = t.uniformColour || 5227511),
                        (this._uniformOpacity = t.uniformOpacity || 0.75);
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                get uniformColour() {
                    return this._uniformColour;
                }
                set uniformColour(e) {
                    (this._uniformColour = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.color = new THREE.Color(e);
                            }.bind(this)
                        );
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                route() {
                    return o(`/pointer-gamut-visual?colourspaceModel=${encodeURIComponent(this._colourspaceModel)}&`);
                }
                create(e) {
                    var t = new THREE.LineBasicMaterial({ color: this._uniformColour, transparent: !0, opacity: this._uniformOpacity }),
                        r = new THREE.LineSegments(e, t);
                    return (r.name = this.name), (r.visible = this.visible), r;
                }
            }
            class v extends g {
                constructor(e, t) {
                    super(e, i()({ name: "spectral-locus-visual" }, t || {})),
                        (this._colourspace = t.colourspace || "sRGB"),
                        (this._colourspaceModel = t.colourspaceModel || "CIE Lab"),
                        (this._uniformColour = t.uniformColour || void 0),
                        (this._uniformOpacity = t.uniformOpacity || 0.75);
                }
                get colourspace() {
                    return this._colourspace;
                }
                set colourspace(e) {
                    (this._colourspace = e), this.add();
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                get uniformColour() {
                    return this._uniformColour;
                }
                set uniformColour(e) {
                    (this._uniformColour = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.color = new THREE.Color(e);
                            }.bind(this)
                        );
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                route() {
                    return o(`/spectral-locus-visual?colourspace=${encodeURIComponent(this._colourspace)}&colourspaceModel=${encodeURIComponent(this._colourspaceModel)}&`);
                }
                create(e) {
                    var t = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, transparent: !0, opacity: this._uniformOpacity }),
                        r = new THREE.Line(e, t);
                    return (r.name = this.name), (r.visible = this.visible), r;
                }
            }
            class w extends g {
                constructor(e, t) {
                    super(e, i()({ name: "visible-spectrum-visual" }, t || {})),
                        (this._colourspaceModel = t.colourspaceModel || "CIE Lab"),
                        (this._uniformColour = t.uniformColour || 16754470),
                        (this._uniformOpacity = t.uniformOpacity || 0.75);
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e), this.add();
                }
                get uniformColour() {
                    return this._uniformColour;
                }
                set uniformColour(e) {
                    (this._uniformColour = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.color = new THREE.Color(e);
                            }.bind(this)
                        );
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                route() {
                    return o(`/visible-spectrum-visual?colourspaceModel=${encodeURIComponent(this._colourspaceModel)}&`);
                }
                create(e) {
                    var t = new THREE.LineBasicMaterial({ color: this._uniformColour, transparent: !0, opacity: this._uniformOpacity }),
                        r = new THREE.LineSegments(e, t);
                    return (r.name = this.name), (r.visible = this.visible), r;
                }
            }
            class O extends d {
                constructor(e, t) {
                    super(e, t),
                        (t = i()(
                            {
                                scene: { background: "#333333" },
                                fog: { enable: !0, color: "#333333", density: 0.05 },
                                camera: { position: { x: -3, y: 3, z: 3 } },
                                controls: { target: { x: 1 / 3, y: 0.5, z: 1 / 3 } },
                                grid: { enable: !0, size: 2, divisions: 20, colorCenterLine: "#111111", colorGrid: "#222222" },
                                axes: { enable: !0 },
                                image: "Rose.ProPhoto.jpg",
                                primaryColourspace: "sRGB",
                                secondaryColourspace: "DCI-P3",
                                imageColourspace: "Primary",
                                imageDecodingCctf: "sRGB",
                                colourspaceModel: "CIE Lab",
                            },
                            t || {}
                        )),
                        (this.renderer.sortObjects = !1),
                        (this.scene.background = new THREE.Color(t.scene.background)),
                        t.fog.enable && (this.scene.fog = new THREE.FogExp2(t.fog.color, t.fog.density)),
                        this.camera.position.copy(new THREE.Vector3(t.camera.position.x, t.camera.position.y, t.camera.position.z)),
                        (this.controls.target = new THREE.Vector3(t.controls.target.x, t.controls.target.y, t.controls.target.z)),
                        t.grid.enable && ((this.grid = new THREE.GridHelper(t.grid.size, t.grid.divisions, t.grid.colorCenterLine, t.grid.colorGrid)), (this.grid.name = "grid"), this.scene.add(this.grid)),
                        t.axes.enable &&
                        ((this.axes = new THREE.AxesHelper()), this.axes.geometry.attributes.color.array.set([0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0]), (this.axes.name = "axes"), this.scene.add(this.axes)),
                        (this._image = t.image),
                        (this._primaryColourspace = t.primaryColourspace),
                        (this._secondaryColourspace = t.secondaryColourspace),
                        (this._imageColourspace = t.imageColourspace),
                        (this._imageDecodingCctf = t.imageDecodingCctf),
                        (this._colourspaceModel = t.colourspaceModel),
                        (this._viewAxesVisual = void 0),
                        (this._visibleSpectrumVisualGroup = new THREE.Group()),
                        (this._visibleSpectrumVisualGroup.name = "visible-spectrum-visual-group"),
                        this._scene.add(this._visibleSpectrumVisualGroup),
                        (this._visibleSpectrumVisual = void 0),
                        (this._spectralLocusVisualGroup = new THREE.Group()),
                        (this._spectralLocusVisualGroup.name = "spectral-locus-visual-group"),
                        this._scene.add(this._spectralLocusVisualGroup),
                        (this._spectralLocusVisual = void 0),
                        (this._pointerGamutVisualGroup = new THREE.Group()),
                        (this._pointerGamutVisualGroup.name = "pointer-gamut-visual-group"),
                        this._scene.add(this._pointerGamutVisualGroup),
                        (this._pointerGamutVisual = void 0),
                        (this._secondaryColourspaceVisualGroup = new THREE.Group()),
                        (this._secondaryColourspaceVisualGroup.name = "secondary-colourspace-visual-group"),
                        this._scene.add(this._secondaryColourspaceVisualGroup),
                        (this._secondaryColourspaceVisual = void 0),
                        (this._primaryColourspaceVisualGroup = new THREE.Group()),
                        (this._primaryColourspaceVisualGroup.name = "primary-colourspace-visual-group"),
                        this._scene.add(this._primaryColourspaceVisualGroup),
                        (this._primaryColourspaceVisual = void 0),
                        (this._imageScatterVisualGroup = new THREE.Group()),
                        (this._imageScatterVisualGroup.name = "image-scatter-visual-group"),
                        this._scene.add(this._imageScatterVisualGroup),
                        (this._imageScatterVisual = void 0),
                        (this._imageScatterOverlayVisualGroup = new THREE.Group()),
                        (this._imageScatterOverlayVisualGroup.name = "image-scatter-overlay-visual-group"),
                        this._scene.add(this._imageScatterOverlayVisualGroup),
                        (this._imageScatterOverlayVisual = void 0);
                }
                get image() {
                    return this._image;
                }
                set image(e) {
                    (this._image = e), null != this._imageScatterVisual && (this._imageScatterVisual.image = e), null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.image = e);
                }
                get primaryColourspace() {
                    return this._primaryColourspace;
                }
                set primaryColourspace(e) {
                    (this._primaryColourspace = e),
                        null != this._primaryColourspaceVisual && (this._primaryColourspaceVisual.colourspace = e),
                        null != this._imageScatterVisual && (this._imageScatterVisual.primaryColourspace = e),
                        null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.primaryColourspace = e);
                }
                get secondaryColourspace() {
                    return this._secondaryColourspace;
                }
                set secondaryColourspace(e) {
                    (this._secondaryColourspace = e),
                        null != this._secondaryColourspaceVisual && (this._secondaryColourspaceVisual.colourspace = e),
                        null != this._imageScatterVisual && (this._imageScatterVisual.secondaryColourspace = e),
                        null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.secondaryColourspace = e);
                }
                get imageColourspace() {
                    return this._imageColourspace;
                }
                set imageColourspace(e) {
                    if (!["Primary", "Secondary"].includes(e)) throw new Error('"imageColourspace" value must be one of ["Primary", "Secondary"]!');
                    (this._imageColourspace = e), null != this._imageScatterVisual && (this._imageScatterVisual.imageColourspace = e), null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.imageColourspace = e);
                }
                get imageDecodingCctf() {
                    return this._imageDecodingCctf;
                }
                set imageDecodingCctf(e) {
                    (this._imageDecodingCctf = e), null != this._imageScatterVisual && (this._imageScatterVisual.imageDecodingCctf = e), null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.imageDecodingCctf = e);
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    (this._colourspaceModel = e),
                        null != this._viewAxesVisual && (this._viewAxesVisual.colourspaceModel = e),
                        null != this._visibleSpectrumVisual && (this._visibleSpectrumVisual.colourspaceModel = e),
                        null != this._spectralLocusVisual && (this._spectralLocusVisual.colourspaceModel = e),
                        null != this._pointerGamutVisual && (this._pointerGamutVisual.colourspaceModel = e),
                        null != this._secondaryColourspaceVisual && (this._secondaryColourspaceVisual.colourspaceModel = e),
                        null != this._primaryColourspaceVisual && (this._primaryColourspaceVisual.colourspaceModel = e),
                        null != this._imageScatterVisual && (this._imageScatterVisual.colourspaceModel = e),
                        null != this._imageScatterOverlayVisual && (this._imageScatterOverlayVisual.colourspaceModel = e);
                }
                get viewAxesVisual() {
                    return this._viewAxesVisual;
                }
                set viewAxesVisual(e) {
                    throw new Error('"viewAxesVisual" property is read only!');
                }
                get visibleSpectrumVisual() {
                    return this._visibleSpectrumVisual;
                }
                set visibleSpectrumVisual(e) {
                    throw new Error('"visibleSpectrumVisual" property is read only!');
                }
                get spectralLocusVisual() {
                    return this._spectralLocusVisual;
                }
                set spectralLocusVisual(e) {
                    throw new Error('"spectralLocusVisual" property is read only!');
                }
                get pointerGamutVisual() {
                    return this._pointerGamutVisual;
                }
                set pointerGamutVisual(e) {
                    throw new Error('"pointerGamutVisual" property is read only!');
                }
                get secondaryColourspaceVisual() {
                    return this._secondaryColourspaceVisual;
                }
                set secondaryColourspaceVisual(e) {
                    throw new Error('"secondaryColourspaceVisual" property is read only!');
                }
                get primaryColourspaceVisual() {
                    return this._primaryColourspaceVisual;
                }
                set primaryColourspaceVisual(e) {
                    throw new Error('"primaryColourspaceVisual" property is read only!');
                }
                get imageScatterVisual() {
                    return this._imageScatterVisual;
                }
                set imageScatterVisual(e) {
                    throw new Error('"imageScatterVisual" property is read only!');
                }
                get imageScatterOverlayVisual() {
                    return this._imageScatterOverlayVisual;
                }
                set imageScatterOverlayVisual(e) {
                    throw new Error('"imageScatterOverlayVisual" property is read only!');
                }
                addViewAxesVisual(e) {
                    (this._viewAxesVisual = new _(this, i()({ colourspaceModel: this._colourspaceModel }, e || {}))), this._viewAxesVisual.add();
                }
                addVisibleSpectrumVisual(e) {
                    (this._visibleSpectrumVisual = new w(this._visibleSpectrumVisualGroup, i()({ colourspaceModel: this._colourspaceModel }, e || {}))), this._visibleSpectrumVisual.add();
                }
                addSpectralLocusVisual(e) {
                    (this._spectralLocusVisual = new v(this._spectralLocusVisualGroup, i()({ colourspace: this._secondaryColourspace, colourspaceModel: this._colourspaceModel }, e || {}))), this._spectralLocusVisual.add();
                }
                addPointerGamutVisual(e) {
                    (this._pointerGamutVisual = new f(this._pointerGamutVisualGroup, i()({ colourspaceModel: this._colourspaceModel }, e || {}))), this._pointerGamutVisual.add();
                }
                addSecondaryColourspaceVisual(e) {
                    (this._secondaryColourspaceVisual = new y(
                        this._secondaryColourspaceVisualGroup,
                        i()({ name: "secondary-colourspace-visual", colourspace: this._secondaryColourspace, colourspaceModel: this._colourspaceModel, wireframe: !0, uniformOpacity: 0.25 }, e || {})
                    )),
                        this._secondaryColourspaceVisual.add();
                }
                addPrimaryColourspaceVisual(e) {
                    (this._primaryColourspaceVisual = new y(this._primaryColourspaceVisualGroup, i()({ name: "primary-colourspace-visual", colourspace: this._primaryColourspace, colourspaceModel: this._colourspaceModel }, e || {}))),
                        this._primaryColourspaceVisual.add();
                    return this._primaryColourspaceVisual
                }
                addImageScatterVisual(e) {
                    (this._imageScatterVisual = new C(
                        this._imageScatterVisualGroup,
                        i()(
                            {
                                image: this._image,
                                primaryColourspace: this._primaryColourspace,
                                secondaryColourspace: this._secondaryColourspace,
                                imageColourspace: this._imageColourspace,
                                imageDecodingCctf: this._imageDecodingCctf,
                                colourspaceModel: this._colourspaceModel,
                            },
                            e || {}
                        )
                    )),
                        this._imageScatterVisual.add();
                }
                addImageScatterOverlayVisual(e) {
                    (this._imageScatterOverlayVisual = new C(
                        this._imageScatterOverlayVisualGroup,
                        i()(
                            {
                                name: "image-scatter-overlay-visual",
                                image: this._image,
                                primaryColourspace: this._primaryColourspace,
                                secondaryColourspace: this._secondaryColourspace,
                                imageColourspace: this._imageColourspace,
                                imageDecodingCctf: this._imageDecodingCctf,
                                colourspaceModel: this._colourspaceModel,
                                uniformOpacity: 0.5,
                            },
                            e || {}
                        )
                    )),
                        this._imageScatterOverlayVisual.add();
                }
                isLoading() {
                    return (
                        this._viewAxesVisual.loading ||
                        this._visibleSpectrumVisual.loading ||
                        this._spectralLocusVisual.loading ||
                        this._pointerGamutVisual.loading ||
                        this._secondaryColourspaceVisual.loading ||
                        this._primaryColourspaceVisual.loading ||
                        this._imageScatterVisual.loading ||
                        this._imageScatterOverlayVisual.loading
                    );
                }
                animate() {
                    null != this._imageScatterOverlayVisual &&
                        null != this._imageScatterOverlayVisual.visual &&
                        (this._imageScatterOverlayVisual.visual.material.opacity = (this._imageScatterOverlayVisual.uniformOpacity * (1 + Math.sin(0.0015 * new Date().getTime()))) / 2),
                        super.animate();
                }
            }
            class V extends m {
                constructor(e, t) {
                    super(e, t), (t = i()({ camera: { up: { x: 0, y: 1, z: 0 }, near: 0.001, far: 1e3 } }, t || {}));
                    var r = this.container.clientWidth / this.container.clientHeight;
                   
                    (this._camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5 / r, -0.5 / r, t.camera.near, t.camera.far)),
                        (this._camera.name = "orthographic-camera"),
                        (this._camera.up = new THREE.Vector3(t.camera.up.x, t.camera.up.y, t.camera.up.z)),
                        this._scene.add(this._camera),
                        (this._controls = new THREE.OrbitControls(this._camera, this.container)),
                        (this._controls.enableRotate = !1);
                }
                get camera() {
                    return this._camera;
                }
                set camera(e) {
                    throw new Error('"camera" property is read only!');
                }
                get controls() {
                    return this._controls;
                }
                set controls(e) {
                    throw new Error('"controls" property is read only!');
                }
                resizeToContainer() {
                    super.resizeToContainer();
                    var e = this.container.clientWidth,
                        t = this.container.clientHeight;
                    if (this.container.width !== e || this.container.height !== t) {
                        this.renderer.setSize(e, t);
                        var r = this.container.clientWidth / this.container.clientHeight;
                        (this._camera.top = 0.5 / r), (this._camera.bottom = -0.5 / r), this._camera.updateProjectionMatrix();
                    }
                }
            }
            class E extends g {
                constructor(e, t) {
                    super(e, i()({ name: "image-visual" }, t || {})),
                        (this._image = t.image || "Rose.ProPhoto.jpg"),
                        (this._primaryColourspace = t.primaryColourspace || "sRGB"),
                        (this._secondaryColourspace = t.secondaryColourspace || "DCI-P3"),
                        (this._imageColourspace = t.imageColourspace || "Primary"),
                        (this._imageDecodingCctf = t.imageDecodingCctf || "sRGB"),
                        (this._uniformOpacity = t.uniformOpacity || 1),
                        (this._outOfPrimaryColourspaceGamut = t.outOfPrimaryColourspaceGamut || !1),
                        (this._outOfSecondaryColourspaceGamut = t.outOfSecondaryColourspaceGamut || !1),
                        (this._outOfPointerGamut = t.outOfPointerGamut || !1),
                        (this._saturate = t.saturate || !1),
                        (this._depth = t.depth || 0);
                }
                get image() {
                    return this._image;
                }
                set image(e) {
                    (this._image = e), this.add();
                }
                get primaryColourspace() {
                    return this._primaryColourspace;
                }
                set primaryColourspace(e) {
                    (this._primaryColourspace = e), this.add();
                }
                get secondaryColourspace() {
                    return this._secondaryColourspace;
                }
                set secondaryColourspace(e) {
                    (this._secondaryColourspace = e), this.add();
                }
                get imageColourspace() {
                    return this._imageColourspace;
                }
                set imageColourspace(e) {
                    if (!["Primary", "Secondary"].includes(e)) throw new Error('"imageColourspace" value must be one of ["Primary", "Secondary"]!');
                    (this._imageColourspace = e), this.add();
                }
                get imageDecodingCctf() {
                    return this._imageDecodingCctf;
                }
                set imageDecodingCctf(e) {
                    (this._imageDecodingCctf = e), this.add();
                }
                get uniformOpacity() {
                    return this._uniformOpacity;
                }
                set uniformOpacity(e) {
                    (this._uniformOpacity = e),
                        Object.keys(this.cache).forEach(
                            function (t) {
                                this.cache[t].material.opacity = e;
                            }.bind(this)
                        );
                }
                get outOfPrimaryColourspaceGamut() {
                    return this._outOfPrimaryColourspaceGamut;
                }
                set outOfPrimaryColourspaceGamut(e) {
                    (this._outOfPrimaryColourspaceGamut = e), this.add();
                }
                get outOfSecondaryColourspaceGamut() {
                    return this._outOfSecondaryColourspaceGamut;
                }
                set outOfSecondaryColourspaceGamut(e) {
                    (this._outOfSecondaryColourspaceGamut = e), this.add();
                }
                get outOfPointerGamut() {
                    return this._outOfPointerGamut;
                }
                set outOfPointerGamut(e) {
                    (this._outOfPointerGamut = e), this.add();
                }
                get saturate() {
                    return this._saturate;
                }
                set saturate(e) {
                    (this._saturate = e), this.add();
                }
                get depth() {
                    return this._depth;
                }
                set depth(e) {
                    throw new Error('"depth" property is read only!');
                }
                route() {
                    return o(
                        `/image-data/${encodeURIComponent(this._image)}?primaryColourspace=${encodeURIComponent(this._primaryColourspace)}&secondaryColourspace=${encodeURIComponent(
                            this._secondaryColourspace
                        )}&imageColourspace=${encodeURIComponent(this._imageColourspace)}&imageDecodingCctf=${encodeURIComponent(this._imageDecodingCctf)}&outOfPrimaryColourspaceGamut=${this._outOfPrimaryColourspaceGamut
                        }&outOfSecondaryColourspaceGamut=${this._outOfSecondaryColourspaceGamut}&outOfPointerGamut=${this._outOfPointerGamut}&saturate=${this._saturate}`
                    );
                }
                create(e) {
                    var t = new THREE.PlaneGeometry(1, e.height / e.width),
                        r = new THREE.DataTexture(Float32Array.from(e.data), e.width, e.height, THREE.RGBFormat, THREE.FloatType);
                    if (((r.needsUpdate = !0), 1 == this._uniformOpacity)) var a = new THREE.MeshBasicMaterial({ map: r });
                    else a = new THREE.MeshBasicMaterial({ map: r, alphaMap: r, transparent: !0, opacity: this._uniformOpacity });
                    var i = new THREE.Mesh(t, a);
                    return (i.name = this.name), (i.visible = this.visible), i.position.set(0, this._depth, 0), i.rotation.set(THREE.Math.degToRad(-90), 0, THREE.Math.degToRad(180)), i.scale.set(-1, 1, 1), i;
                }
                fetch(e) {
                    e = "https://colour-science.org:8020/" + e
                    var t = new THREE.FileLoader();
                    t.setResponseType("json"),
                        t.load(
                            e,
                            function (t) {
                                (this.visual = this.create(t)), (this.cache[e] = this.visual), this.parent.add(this.visual), (this._loading = !1);
                            }.bind(this),
                            l.bind(this)
                        );
                }
            }
            class b extends V {
                constructor(e, t) {
                    super(e, t),
                        (t = i()(
                            {
                                renderer: { gammaOutput: !0 },
                                scene: { background: "#333333" },
                                camera: { position: { x: 0, y: 1, z: 0 } },
                                controls: { target: { x: 0, y: 0, z: 0 } },
                                image: "Rose.ProPhoto.jpg",
                                primaryColourspace: "sRGB",
                                secondaryColourspace: "DCI-P3",
                                imageColourspace: "Primary",
                                imageDecodingCctf: "sRGB",
                                colourspaceModel: "CIE Lab",
                            },
                            t || {}
                        )),
                        (this.renderer.gammaOutput = t.renderer.gammaOutput),
                        (this.scene.background = new THREE.Color(t.scene.background)),
                        this.camera.position.copy(new THREE.Vector3(t.camera.position.x, t.camera.position.y, t.camera.position.z)),
                        (this.controls.target = new THREE.Vector3(t.controls.target.x, t.controls.target.y, t.controls.target.z)),
                        (this._image = t.image),
                        (this._primaryColourspace = t.primaryColourspace),
                        (this._secondaryColourspace = t.secondaryColourspace),
                        (this._imageColourspace = t.imageColourspace),
                        (this._imageDecodingCctf = t.imageDecodingCctf),
                        (this._colourspaceModel = t.colourspaceModel),
                        (this._imageVisualGroup = new THREE.Group()),
                        (this._imageVisualGroup.name = "image-visual-group"),
                        this._scene.add(this._imageVisualGroup),
                        (this._imageVisual = void 0),
                        (this._imageOverlayVisualGroup = new THREE.Group()),
                        (this._imageOverlayVisualGroup.name = "image-overlay-visual-group"),
                        this._scene.add(this._imageOverlayVisualGroup),
                        (this._imageOverlayVisual = void 0);
                }
                get image() {
                    return this._image;
                }
                set image(e) {
                    (this._image = e), null != this._imageVisual && (this._imageVisual.image = e), null != this._imageOverlayVisual && (this._imageOverlayVisual.image = e);
                }
                get primaryColourspace() {
                    return this._primaryColourspace;
                }
                set primaryColourspace(e) {
                    (this._primaryColourspace = e), null != this._imageOverlayVisual && (this._imageOverlayVisual.primaryColourspace = e);
                }
                get secondaryColourspace() {
                    return this._secondaryColourspace;
                }
                set secondaryColourspace(e) {
                    (this._secondaryColourspace = e), null != this._imageOverlayVisual && (this._imageOverlayVisual.secondaryColourspace = e);
                }
                get imageColourspace() {
                    return this._imageColourspace;
                }
                set imageColourspace(e) {
                    if (!["Primary", "Secondary"].includes(e)) throw new Error('"imageColourspace" value must be one of ["Primary", "Secondary"]!');
                    (this._imageColourspace = e), null != this._imageOverlayVisual && (this._imageOverlayVisual.imageColourspace = e);
                }
                get imageDecodingCctf() {
                    return this._imageDecodingCctf;
                }
                set imageDecodingCctf(e) {
                    (this._imageDecodingCctf = e), null != this._imageVisual && (this._imageVisual.imageDecodingCctf = e), null != this._imageOverlayVisual && (this._imageOverlayVisual.imageDecodingCctf = e);
                }
                get colourspaceModel() {
                    return this._colourspaceModel;
                }
                set colourspaceModel(e) {
                    this._colourspaceModel = e;
                }
                get imageVisual() {
                    return this._imageVisual;
                }
                set imageVisual(e) {
                    throw new Error('"imageVisual" property is read only!');
                }
                get imageOverlayVisual() {
                    return this._imageOverlayVisual;
                }
                set imageOverlayVisual(e) {
                    throw new Error('"imageOverlayVisual" property is read only!');
                }
                addImageVisual(e) {
                    (this._imageVisual = new E(
                        this._imageVisualGroup,
                        i()(
                            {
                                name: "image-visual",
                                image: this._image,
                                primaryColourspace: this._primaryColourspace,
                                secondaryColourspace: this._secondaryColourspace,
                                imageColourspace: this._imageColourspace,
                                imageDecodingCctf: this._imageDecodingCctf,
                            },
                            e || {}
                        )
                    )),
                        this._imageVisual.add();
                }
                addImageOverlayVisual(e) {
                    (this._imageOverlayVisual = new E(
                        this._imageOverlayVisualGroup,
                        i()(
                            {
                                name: "image-overlay-visual",
                                image: this._image,
                                primaryColourspace: this._primaryColourspace,
                                secondaryColourspace: this._secondaryColourspace,
                                imageColourspace: this._imageColourspace,
                                imageDecodingCctf: this._imageDecodingCctf,
                                uniformOpacity: 0.5,
                                depth: 0.5,
                            },
                            e || {}
                        )
                    )),
                        this._imageOverlayVisual.add();
                }
                isLoading() {
                    return this._imageVisual.loading || this._imageOverlayVisual.loading;
                }
                animate() {
                    null != this._imageOverlayVisual &&
                        null != this._imageOverlayVisual.visual &&
                        (this._imageOverlayVisual.visual.material.opacity = (this._imageOverlayVisual.uniformOpacity * (1 + Math.sin(0.0015 * new Date().getTime()))) / 2),
                        super.animate();
                }
            }
            function M(e, t, r, a, i) {
                if ("Array" == i.constructor.name) var o = i;
                else "Object" == i.constructor.name && (o = Object.keys(i));
                o.sort();
                for (var s = "<select>\n", c = 0; c < o.length; c++) s += `<option value="${o[c]}">${o[c]}</option>\n`;
                (s += "</select>"), (r.domElement.children[0].innerHTML = s), (r.domElement.children[0].selectedIndex = o.indexOf(a));
            }
            function S(e) {
                e = e.domElement.children[0];
                for (var t = new Array(), r = 0; r < e.options.length; r++) t[r] = e.options[r].value;
                return t;
            }
        },
    },
        t = {};
    function r(a) {
        if (t[a]) return t[a].exports;
        var i = (t[a] = { exports: {} });
        return e[a](i, i.exports, r), i.exports;
    }
    return (
        (r.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return r.d(t, { a: t }), t;
        }),
        (r.d = (e, t) => {
            for (var a in t) r.o(t, a) && !r.o(e, a) && Object.defineProperty(e, a, { enumerable: !0, get: t[a] });
        }),
        (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (r.r = (e) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        r(187)
    );
})();
