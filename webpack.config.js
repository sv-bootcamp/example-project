//
// module.exports = {
//     devtool: 'eval-source-map',
//     entry: __dirname + '/app.js',
//     output: {
//         path: __dirname + '/public',
//         filename: 'bundle.js'
//     }
// };

//require함수로 임포트한 모듈들은 const 제한자로 수정을 막는 것이 좋다.
const webpack = require('webpack');
const path = require('path');
//merge함수를 임포트. _.extend와 비슷한 함수이다.
const merge = require('webpack-merge');
//현재 npm이 어떤 모드로 동작 중인지 식별한다.
const TARGET = process.env.npm_lifecycle_event;
/*
 * `__dirname` 은 현재 이 파일이 속한 절대 경로이다.
 * 따라서 repl에서는 직접 사용할 수 없다.
 *
 * `path.join` 메소드는 해당 OS에 맞는 구분자로 path명을 연결한다.
 * */
const PATHS = {
    app: path.join(__dirname,'app'),
    build: path.join(__dirname,'build')
};

//배포용 설정과 빌드용 설정을 분리하기 위해, 공통 설정을 추출한다.
const common = {
    /*
     소스파일 경로 정보.
     **아래와 같이 경로를 넘길 경우에는, 반드시 path에 index.js가 있어야 한다.**
     */
    entry: PATHS.app,
    /*
     출력파일 경로 정보.
     **webpack-dev-server를 사용할 경우에는, 반드시 path에 html 파일이 있어야 한다.**
     * index.html를 놓아두면 자동으로 로드되므로 편리하다.
     * HMR을 사용할 경우에는 index.html을 반드시 위치시킬것.
     */
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    /*소스 맵 작성 옵션
     * 이 옵션을 키면, 자동으로 uglyfy된다.
     * */
    //devtool: 'eval-source-map',
    //resolve 플러그인 활성화
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            //js혹은 jsx를 트랜스파일 함
            test: /\.jsx?$/,
            //`cacheDirectory` : 바벨의 트랜스파일 성능을 끌어올리기위한 캐시 디렉토리 설정
            //시스템의 기본 임시 디렉토리가 기본값
            //`es2015` : es6 트랜스파일 사용
            loaders: [
                'babel?cacheDirectory,presets[]=es2015'
            ],
            include: PATHS.app
        }]
    }
};

if(TARGET === 'start' || !TARGET) {
    //개발용 설정 export
    /*
     `devServer['contentBase']`은 다음 커맨드로 webpack-dev-server를 동작시킨 것과 동일하다.
     `webpack-dev-server --content-base build`
     아래의 설정을 사용하면 HMR을 사용할 수 있다.
     즉 실행중에 소스가 변경되면, 변경된 소스만 교체할 수 있다.
     HMR이 아직 완벽하지 않기 때문에 가끔씩 강제로 새로고침을 해야 할 경우가 생긴다.
     HMR소스가 함께 번들링되기에 출력물이 장황해지는 단점이 있다.
     HMR은 module.export로 익스포트 된 소스만 교체할 수 있다.
     * */
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            //모듈을 사용하지 않을 생각이면 아래의 옵션을 비 활성화 시켜야 한다.
            //hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        /*
         * HMR을 활성화시키려면 아래 플러그인을 기동
         * */
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}
if(TARGET === 'build') {
    //build용 설정 export
    module.exports = merge(common, {});
}