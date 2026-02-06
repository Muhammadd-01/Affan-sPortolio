import * as THREE from 'three';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            group: any;
            mesh: any;
            points: any;
            pointsMaterial: any;
            bufferGeometry: any;
            bufferAttribute: any;
            ambientLight: any;
            pointLight: any;
            spotLight: any;
            directionalLight: any;
        }
    }
}

export { };
