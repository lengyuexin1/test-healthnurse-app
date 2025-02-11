// #ifdef H5
import NERtcEngineWeb from './NERtcEngineWeb';
// #endif
// #ifdef APP-PLUS
import NERtcEngineApp from './NERtcEngineApp';

// #endif
let NERTC;
// #ifdef H5
NERTC = NERtcEngineWeb;
// #endif
// #ifdef APP-PLUS
NERTC = NERtcEngineApp;
// #endif
export default NERTC;

export const pluginVersion = '5.6.34';
