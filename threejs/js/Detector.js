var Detector = {
    webgl: (function () {
        try {

            var canvas = document.createElement('canvas');
            // 修正コード開始
            var webGLContext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            return !!( window.WebGLRenderingContext && webGLContext && webGLContext.getShaderPrecisionFormat );
            // return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
            // 修正コード終了

        } catch (e) {

            return false;

        }

    })()
};
