const obj = {
    uuid: '87d1feb8-1464-4a75-aeed-555abb8ab571',
    name: '',
    type: 'Mesh',
    parent: {
        metadata: {
            version: 4.5,
            type: 'Object',
            generator: 'Object3D.toJSON'
        },
        geometries: [
            {
                uuid: 'bec6fa75-4f01-4eea-a77e-628b41923641',
                type: 'SphereGeometry',
                radius: 1,
                widthSegments: 32,
                heightSegments: 16,
                phiStart: 0,
                phiLength: 6.283185307179586,
                thetaStart: 0,
                thetaLength: 3.141592653589793
            },
            {
                uuid: '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                type: 'InstancedBufferGeometry',
                data: {
                    attributes: {
                        position: {
                            itemSize: 3,
                            type: 'Float32Array',
                            array: [
                                0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0,
                                1, 0, 1, 0, 0, 0, 0, 0
                            ],
                            normalized: false
                        },
                        normal: {
                            itemSize: 3,
                            type: 'Float32Array',
                            array: [
                                0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0,
                                0, -1, 0, 0, -1, 0, 0, -1
                            ],
                            normalized: false
                        },
                        uv: {
                            itemSize: 2,
                            type: 'Float32Array',
                            array: [
                                0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0
                            ],
                            normalized: false
                        },
                        aTroikaGlyphBounds: {
                            itemSize: 4,
                            type: 'Float32Array',
                            array: [
                                -0.02759704552590847, -0.04029235988855362,
                                0.02754821814596653, 0.04302673414349556
                            ],
                            normalized: false,
                            meshPerAttribute: 1,
                            isInstancedBufferAttribute: true
                        },
                        aTroikaGlyphIndex: {
                            itemSize: 1,
                            type: 'Uint16Array',
                            array: [5],
                            normalized: false,
                            meshPerAttribute: 1,
                            isInstancedBufferAttribute: true
                        }
                    },
                    index: {
                        type: 'Uint16Array',
                        array: [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5]
                    },
                    groups: [
                        {
                            start: 0,
                            count: null,
                            materialIndex: 0
                        },
                        {
                            start: 0,
                            count: null,
                            materialIndex: 1
                        }
                    ],
                    boundingSphere: {
                        center: [0, 0, 0],
                        radius: 0.06497306338950813
                    }
                },
                instanceCount: 1,
                isInstancedBufferGeometry: true
            }
        ],
        materials: [
            {
                uuid: '532416e0-8c3d-4467-83b1-916615e52d8b',
                type: 'MeshStandardMaterial',
                color: 16711422,
                roughness: 1,
                metalness: 0,
                emissive: 0,
                envMapIntensity: 1,
                depthFunc: 3,
                depthTest: true,
                depthWrite: true,
                colorWrite: true,
                stencilWrite: false,
                stencilWriteMask: 255,
                stencilFunc: 519,
                stencilRef: 0,
                stencilFuncMask: 255,
                stencilFail: 7680,
                stencilZFail: 7680,
                stencilZPass: 7680
            },
            {
                uuid: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9',
                type: 'MeshBasicMaterial',
                color: 0,
                reflectivity: 1,
                refractionRatio: 0.98,
                shadowSide: 2,
                side: 2,
                transparent: true,
                depthFunc: 3,
                depthTest: true,
                depthWrite: true,
                colorWrite: true,
                stencilWrite: false,
                stencilWriteMask: 255,
                stencilFunc: 519,
                stencilRef: 0,
                stencilFuncMask: 255,
                stencilFail: 7680,
                stencilZFail: 7680,
                stencilZPass: 7680
            }
        ],
        object: {
            uuid: 'f3f60552-4463-4b81-9c80-7dfdf406d206',
            type: 'Group',
            layers: 1,
            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            children: [
                {
                    uuid: '87d1feb8-1464-4a75-aeed-555abb8ab571',
                    type: 'Mesh',
                    layers: 1,
                    matrix: [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.0961999598155785,
                        6.077181751101839, 1.5438572996078035, 1
                    ],
                    geometry: 'bec6fa75-4f01-4eea-a77e-628b41923641',
                    material: '532416e0-8c3d-4467-83b1-916615e52d8b',
                    children: [
                        {
                            uuid: '6e11d964-54c7-4665-87fb-c6e576484dbb',
                            type: 'Mesh',
                            layers: 1,
                            matrix: [
                                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1
                            ],
                            geometry: '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                            material: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9'
                        }
                    ]
                }
            ]
        }
    },
    children: [
        {
            metadata: {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON'
            },
            geometries: [
                {
                    uuid: '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                    type: 'InstancedBufferGeometry',
                    data: {
                        attributes: {
                            position: {
                                itemSize: 3,
                                type: 'Float32Array',
                                array: [
                                    0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0,
                                    0, 1, 0, 1, 0, 0, 0, 0, 0
                                ],
                                normalized: false
                            },
                            normal: {
                                itemSize: 3,
                                type: 'Float32Array',
                                array: [
                                    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
                                    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1
                                ],
                                normalized: false
                            },
                            uv: {
                                itemSize: 2,
                                type: 'Float32Array',
                                array: [
                                    0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1,
                                    0
                                ],
                                normalized: false
                            },
                            aTroikaGlyphBounds: {
                                itemSize: 4,
                                type: 'Float32Array',
                                array: [
                                    -0.02759704552590847, -0.04029235988855362,
                                    0.02754821814596653, 0.04302673414349556
                                ],
                                normalized: false,
                                meshPerAttribute: 1,
                                isInstancedBufferAttribute: true
                            },
                            aTroikaGlyphIndex: {
                                itemSize: 1,
                                type: 'Uint16Array',
                                array: [5],
                                normalized: false,
                                meshPerAttribute: 1,
                                isInstancedBufferAttribute: true
                            }
                        },
                        index: {
                            type: 'Uint16Array',
                            array: [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5]
                        },
                        groups: [
                            {
                                start: 0,
                                count: null,
                                materialIndex: 0
                            },
                            {
                                start: 0,
                                count: null,
                                materialIndex: 1
                            }
                        ],
                        boundingSphere: {
                            center: [0, 0, 0],
                            radius: 0.06497306338950813
                        }
                    },
                    instanceCount: 1,
                    isInstancedBufferGeometry: true
                }
            ],
            materials: [
                {
                    uuid: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9',
                    type: 'MeshBasicMaterial',
                    color: 0,
                    reflectivity: 1,
                    refractionRatio: 0.98,
                    shadowSide: 2,
                    side: 2,
                    transparent: true,
                    depthFunc: 3,
                    depthTest: true,
                    depthWrite: true,
                    colorWrite: true,
                    stencilWrite: false,
                    stencilWriteMask: 255,
                    stencilFunc: 519,
                    stencilRef: 0,
                    stencilFuncMask: 255,
                    stencilFail: 7680,
                    stencilZFail: 7680,
                    stencilZPass: 7680
                }
            ],
            object: {
                uuid: '6e11d964-54c7-4665-87fb-c6e576484dbb',
                type: 'Mesh',
                layers: 1,
                matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                geometry: '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                material: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9'
            }
        }
    ],
    up: {
        x: 0,
        y: 1,
        z: 0
    },
    position: {
        x: 0.0961999598155785,
        y: 0.077181751101839,
        z: 0.0438572996078035
    },
    rotation: {
        _x: 0,
        _y: 0,
        _z: 0,
        _order: 'XYZ'
    },
    quaternion: {
        _x: 0,
        _y: 0,
        _z: 0,
        _w: 1
    },
    scale: {
        x: 1,
        y: 1,
        z: 1
    },
    matrix: {
        elements: [
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.0961999598155785,
            6.077181751101839, 1.5438572996078035, 1
        ]
    },
    matrixWorld: {
        elements: [
            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.0961999598155785,
            6.077181751101839, 1.5438572996078035, 1
        ]
    },
    matrixAutoUpdate: true,
    matrixWorldNeedsUpdate: false,
    layers: {
        mask: 1
    },
    visible: true,
    castShadow: false,
    receiveShadow: false,
    frustumCulled: true,
    renderOrder: 0,
    animations: [],
    userData: {},
    geometry: {
        metadata: {
            version: 4.5,
            type: 'BufferGeometry',
            generator: 'BufferGeometry.toJSON'
        },
        uuid: 'e26a73f7-306c-4043-af04-26ccd54f7b64',
        type: 'SphereGeometry',
        radius: 1,
        widthSegments: 32,
        heightSegments: 16,
        phiStart: 0,
        phiLength: 6.283185307179586,
        thetaStart: 0,
        thetaLength: 3.141592653589793
    },
    material: {
        metadata: {
            version: 4.5,
            type: 'Material',
            generator: 'Material.toJSON'
        },
        uuid: '36cafbb3-85e1-4c15-b8cd-8b1a9e66ca40',
        type: 'MeshStandardMaterial',
        color: 16711422,
        roughness: 1,
        metalness: 0,
        emissive: 0,
        envMapIntensity: 1,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        colorWrite: true,
        stencilWrite: false,
        stencilWriteMask: 255,
        stencilFunc: 519,
        stencilRef: 0,
        stencilFuncMask: 255,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680
    },
    __r3f: {
        type: 'mesh',
        previousAttach: null,
        memoizedProps: {
            position: [0, 0, 1],
            rotation: [0, 0, 0],
            geometry: {
                metadata: {
                    version: 4.5,
                    type: 'BufferGeometry',
                    generator: 'BufferGeometry.toJSON'
                },
                uuid: 'bec6fa75-4f01-4eea-a77e-628b41923641',
                type: 'SphereGeometry',
                radius: 1,
                widthSegments: 32,
                heightSegments: 16,
                phiStart: 0,
                phiLength: 6.283185307179586,
                thetaStart: 0,
                thetaLength: 3.141592653589793
            },
            material: {
                metadata: {
                    version: 4.5,
                    type: 'Material',
                    generator: 'Material.toJSON'
                },
                uuid: '532416e0-8c3d-4467-83b1-916615e52d8b',
                type: 'MeshStandardMaterial',
                color: 16711422,
                roughness: 1,
                metalness: 0,
                emissive: 0,
                envMapIntensity: 1,
                depthFunc: 3,
                depthTest: true,
                depthWrite: true,
                colorWrite: true,
                stencilWrite: false,
                stencilWriteMask: 255,
                stencilFunc: 519,
                stencilRef: 0,
                stencilFuncMask: 255,
                stencilFail: 7680,
                stencilZFail: 7680,
                stencilZPass: 7680
            },
            args: []
        },
        eventCount: 0,
        handlers: {},
        objects: [],
        parent: {
            metadata: {
                version: 4.5,
                type: 'Object',
                generator: 'Object3D.toJSON'
            },
            geometries: [
                {
                    uuid: 'bec6fa75-4f01-4eea-a77e-628b41923641',
                    type: 'SphereGeometry',
                    radius: 1,
                    widthSegments: 32,
                    heightSegments: 16,
                    phiStart: 0,
                    phiLength: 6.283185307179586,
                    thetaStart: 0,
                    thetaLength: 3.141592653589793
                },
                {
                    uuid: '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                    type: 'InstancedBufferGeometry',
                    data: {
                        attributes: {
                            position: {
                                itemSize: 3,
                                type: 'Float32Array',
                                array: [
                                    0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0,
                                    0, 1, 0, 1, 0, 0, 0, 0, 0
                                ],
                                normalized: false
                            },
                            normal: {
                                itemSize: 3,
                                type: 'Float32Array',
                                array: [
                                    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
                                    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1
                                ],
                                normalized: false
                            },
                            uv: {
                                itemSize: 2,
                                type: 'Float32Array',
                                array: [
                                    0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1,
                                    0
                                ],
                                normalized: false
                            },
                            aTroikaGlyphBounds: {
                                itemSize: 4,
                                type: 'Float32Array',
                                array: [
                                    -0.02759704552590847, -0.04029235988855362,
                                    0.02754821814596653, 0.04302673414349556
                                ],
                                normalized: false,
                                meshPerAttribute: 1,
                                isInstancedBufferAttribute: true
                            },
                            aTroikaGlyphIndex: {
                                itemSize: 1,
                                type: 'Uint16Array',
                                array: [5],
                                normalized: false,
                                meshPerAttribute: 1,
                                isInstancedBufferAttribute: true
                            }
                        },
                        index: {
                            type: 'Uint16Array',
                            array: [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5]
                        },
                        groups: [
                            {
                                start: 0,
                                count: null,
                                materialIndex: 0
                            },
                            {
                                start: 0,
                                count: null,
                                materialIndex: 1
                            }
                        ],
                        boundingSphere: {
                            center: [0, 0, 0],
                            radius: 0.06497306338950813
                        }
                    },
                    instanceCount: 1,
                    isInstancedBufferGeometry: true
                }
            ],
            materials: [
                {
                    uuid: '532416e0-8c3d-4467-83b1-916615e52d8b',
                    type: 'MeshStandardMaterial',
                    color: 16711422,
                    roughness: 1,
                    metalness: 0,
                    emissive: 0,
                    envMapIntensity: 1,
                    depthFunc: 3,
                    depthTest: true,
                    depthWrite: true,
                    colorWrite: true,
                    stencilWrite: false,
                    stencilWriteMask: 255,
                    stencilFunc: 519,
                    stencilRef: 0,
                    stencilFuncMask: 255,
                    stencilFail: 7680,
                    stencilZFail: 7680,
                    stencilZPass: 7680
                },
                {
                    uuid: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9',
                    type: 'MeshBasicMaterial',
                    color: 0,
                    reflectivity: 1,
                    refractionRatio: 0.98,
                    shadowSide: 2,
                    side: 2,
                    transparent: true,
                    depthFunc: 3,
                    depthTest: true,
                    depthWrite: true,
                    colorWrite: true,
                    stencilWrite: false,
                    stencilWriteMask: 255,
                    stencilFunc: 519,
                    stencilRef: 0,
                    stencilFuncMask: 255,
                    stencilFail: 7680,
                    stencilZFail: 7680,
                    stencilZPass: 7680
                }
            ],
            object: {
                uuid: 'f3f60552-4463-4b81-9c80-7dfdf406d206',
                type: 'Group',
                layers: 1,
                matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                children: [
                    {
                        uuid: '87d1feb8-1464-4a75-aeed-555abb8ab571',
                        type: 'Mesh',
                        layers: 1,
                        matrix: [
                            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
                            3.0961999598155785, 6.077181751101839,
                            1.5438572996078035, 1
                        ],
                        geometry: 'bec6fa75-4f01-4eea-a77e-628b41923641',
                        material: '532416e0-8c3d-4467-83b1-916615e52d8b',
                        children: [
                            {
                                uuid: '6e11d964-54c7-4665-87fb-c6e576484dbb',
                                type: 'Mesh',
                                layers: 1,
                                matrix: [
                                    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0,
                                    1
                                ],
                                geometry:
                                    '5a9ad154-27d6-4bcb-8e09-3378300071ab',
                                material: 'A0783D2E-35F7-4D7F-9205-31985B3C99C9'
                            }
                        ]
                    }
                ]
            }
        }
    }
}

export { obj }
