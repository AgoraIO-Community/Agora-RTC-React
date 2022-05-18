function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var AgoraRTC = require('agora-rtc-sdk-ng');
var AgoraRTC__default = _interopDefault(AgoraRTC);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

(function (AgoraRTCErrorCode) {
  AgoraRTCErrorCode["UNEXPECTED_ERROR"] = "UNEXPECTED_ERROR";
  AgoraRTCErrorCode["UNEXPECTED_RESPONSE"] = "UNEXPECTED_RESPONSE";
  AgoraRTCErrorCode["TIMEOUT"] = "TIMEOUT";
  AgoraRTCErrorCode["INVALID_PARAMS"] = "INVALID_PARAMS";
  AgoraRTCErrorCode["NOT_SUPPORTED"] = "NOT_SUPPORTED";
  AgoraRTCErrorCode["INVALID_OPERATION"] = "INVALID_OPERATION";
  AgoraRTCErrorCode["OPERATION_ABORTED"] = "OPERATION_ABORTED";
  AgoraRTCErrorCode["WEB_SECURITY_RESTRICT"] = "WEB_SECURITY_RESTRICT";
  AgoraRTCErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
  AgoraRTCErrorCode["NETWORK_TIMEOUT"] = "NETWORK_TIMEOUT";
  AgoraRTCErrorCode["NETWORK_RESPONSE_ERROR"] = "NETWORK_RESPONSE_ERROR";
  AgoraRTCErrorCode["API_INVOKE_TIMEOUT"] = "API_INVOKE_TIMEOUT";
  AgoraRTCErrorCode["ENUMERATE_DEVICES_FAILED"] = "ENUMERATE_DEVICES_FAILED";
  AgoraRTCErrorCode["DEVICE_NOT_FOUND"] = "DEVICE_NOT_FOUND";
  AgoraRTCErrorCode["ELECTRON_IS_NULL"] = "ELECTRON_IS_NULL";
  AgoraRTCErrorCode["ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR"] = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR";
  AgoraRTCErrorCode["CHROME_PLUGIN_NO_RESPONSE"] = "CHROME_PLUGIN_NO_RESPONSE";
  AgoraRTCErrorCode["CHROME_PLUGIN_NOT_INSTALL"] = "CHROME_PLUGIN_NOT_INSTALL";
  AgoraRTCErrorCode["MEDIA_OPTION_INVALID"] = "MEDIA_OPTION_INVALID";
  AgoraRTCErrorCode["PERMISSION_DENIED"] = "PERMISSION_DENIED";
  AgoraRTCErrorCode["CONSTRAINT_NOT_SATISFIED"] = "CONSTRAINT_NOT_SATISFIED";
  AgoraRTCErrorCode["TRACK_IS_DISABLED"] = "TRACK_IS_DISABLED";
  AgoraRTCErrorCode["SHARE_AUDIO_NOT_ALLOWED"] = "SHARE_AUDIO_NOT_ALLOWED";
  AgoraRTCErrorCode["LOW_STREAM_ENCODING_ERROR"] = "LOW_STREAM_ENCODING_ERROR";
  AgoraRTCErrorCode["INVALID_UINT_UID_FROM_STRING_UID"] = "INVALID_UINT_UID_FROM_STRING_UID";
  AgoraRTCErrorCode["CAN_NOT_GET_PROXY_SERVER"] = "CAN_NOT_GET_PROXY_SERVER";
  AgoraRTCErrorCode["CAN_NOT_GET_GATEWAY_SERVER"] = "CAN_NOT_GET_GATEWAY_SERVER";
  AgoraRTCErrorCode["VOID_GATEWAY_ADDRESS"] = "VOID_GATEWAY_ADDRESS";
  AgoraRTCErrorCode["UID_CONFLICT"] = "UID_CONFLICT";
  AgoraRTCErrorCode["INVALID_LOCAL_TRACK"] = "INVALID_LOCAL_TRACK";
  AgoraRTCErrorCode["INVALID_TRACK"] = "INVALID_TRACK";
  AgoraRTCErrorCode["SENDER_NOT_FOUND"] = "SENDER_NOT_FOUND";
  AgoraRTCErrorCode["CREATE_OFFER_FAILED"] = "CREATE_OFFER_FAILED";
  AgoraRTCErrorCode["SET_ANSWER_FAILED"] = "SET_ANSWER_FAILED";
  AgoraRTCErrorCode["ICE_FAILED"] = "ICE_FAILED";
  AgoraRTCErrorCode["PC_CLOSED"] = "PC_CLOSED";
  AgoraRTCErrorCode["SENDER_REPLACE_FAILED"] = "SENDER_REPLACE_FAILED";
  AgoraRTCErrorCode["GATEWAY_P2P_LOST"] = "GATEWAY_P2P_LOST";
  AgoraRTCErrorCode["NO_ICE_CANDIDATE"] = "NO_ICE_CANDIDATE";
  AgoraRTCErrorCode["CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS"] = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS";
  AgoraRTCErrorCode["EXIST_DISABLED_VIDEO_TRACK"] = "EXIST_DISABLED_VIDEO_TRACK";
  AgoraRTCErrorCode["INVALID_REMOTE_USER"] = "INVALID_REMOTE_USER";
  AgoraRTCErrorCode["REMOTE_USER_IS_NOT_PUBLISHED"] = "REMOTE_USER_IS_NOT_PUBLISHED";
  AgoraRTCErrorCode["CUSTOM_REPORT_SEND_FAILED"] = "CUSTOM_REPORT_SEND_FAILED";
  AgoraRTCErrorCode["CUSTOM_REPORT_FREQUENCY_TOO_HIGH"] = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH";
  AgoraRTCErrorCode["FETCH_AUDIO_FILE_FAILED"] = "FETCH_AUDIO_FILE_FAILED";
  AgoraRTCErrorCode["READ_LOCAL_AUDIO_FILE_ERROR"] = "READ_LOCAL_AUDIO_FILE_ERROR";
  AgoraRTCErrorCode["DECODE_AUDIO_FILE_FAILED"] = "DECODE_AUDIO_FILE_FAILED";
  AgoraRTCErrorCode["WS_ABORT"] = "WS_ABORT";
  AgoraRTCErrorCode["WS_DISCONNECT"] = "WS_DISCONNECT";
  AgoraRTCErrorCode["WS_ERR"] = "WS_ERR";
  AgoraRTCErrorCode["LIVE_STREAMING_TASK_CONFLICT"] = "LIVE_STREAMING_TASK_CONFLICT";
  AgoraRTCErrorCode["LIVE_STREAMING_INVALID_ARGUMENT"] = "LIVE_STREAMING_INVALID_ARGUMENT";
  AgoraRTCErrorCode["LIVE_STREAMING_INTERNAL_SERVER_ERROR"] = "LIVE_STREAMING_INTERNAL_SERVER_ERROR";
  AgoraRTCErrorCode["LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED"] = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED";
  AgoraRTCErrorCode["LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED"] = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED";
  AgoraRTCErrorCode["LIVE_STREAMING_CDN_ERROR"] = "LIVE_STREAMING_CDN_ERROR";
  AgoraRTCErrorCode["LIVE_STREAMING_INVALID_RAW_STREAM"] = "LIVE_STREAMING_INVALID_RAW_STREAM";
  AgoraRTCErrorCode["LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT"] = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT";
  AgoraRTCErrorCode["LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE"] = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE";
  AgoraRTCErrorCode["LIVE_STREAMING_WARN_FREQUENT_REQUEST"] = "LIVE_STREAMING_WARN_FREQUENT_REQUEST";
  AgoraRTCErrorCode["WEBGL_INTERNAL_ERROR"] = "WEBGL_INTERNAL_ERROR";
  AgoraRTCErrorCode["BEAUTY_PROCESSOR_INTERNAL_ERROR"] = "BEAUTY_PROCESSOR_INTERNAL_ERROR";
  AgoraRTCErrorCode["CROSS_CHANNEL_WAIT_STATUS_ERROR"] = "CROSS_CHANNEL_WAIT_STATUS_ERROR";
  AgoraRTCErrorCode["CROSS_CHANNEL_FAILED_JOIN_SRC"] = "CROSS_CHANNEL_FAILED_JOIN_SEC";
  AgoraRTCErrorCode["CROSS_CHANNEL_FAILED_JOIN_DEST"] = "CROSS_CHANNEL_FAILED_JOIN_DEST";
  AgoraRTCErrorCode["CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST"] = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST";
  AgoraRTCErrorCode["CROSS_CHANNEL_SERVER_ERROR_RESPONSE"] = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE";
  AgoraRTCErrorCode["METADATA_OUT_OF_RANGE"] = "METADATA_OUT_OF_RANGE";
})(exports.AgoraRTCErrorCode || (exports.AgoraRTCErrorCode = {}));

var createClient = function createClient(config) {
  var client;

  function createClosure() {
    if (!client) {
      client = AgoraRTC__default.createClient(config);
    }

    return client;
  }

  return function () {
    return createClosure();
  };
};
function createMicrophoneAndCameraTracks(audioConfig, videoConfig) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createMicrophoneAndCameraTracks(audioConfig, videoConfig)).then(function (_AgoraRTC$createMicro) {
        tracks = _AgoraRTC$createMicro;
        return tracks;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var tracks = null;
  return function useMicrophoneAndCameraTracks() {
    var _useState = React.useState(false),
        ready = _useState[0],
        setReady = _useState[1];

    var _useState2 = React.useState(null),
        agoraRTCError = _useState2[0],
        setAgoraRTCError = _useState2[1];

    var ref = React.useRef(tracks);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (tracks) {
          ref.current = tracks;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        tracks = null;
      };
    }, []);
    return {
      ready: ready,
      tracks: ref.current,
      error: agoraRTCError
    };
  };
}
function createBufferSourceAudioTrack(config) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createBufferSourceAudioTrack(config)).then(function (_AgoraRTC$createBuffe) {
        track = _AgoraRTC$createBuffe;
        return track;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var track = null;
  return function useBufferSourceAudioTrack() {
    var _useState3 = React.useState(false),
        ready = _useState3[0],
        setReady = _useState3[1];

    var _useState4 = React.useState(null),
        agoraRTCError = _useState4[0],
        setAgoraRTCError = _useState4[1];

    var ref = React.useRef(track);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (track) {
          ref.current = track;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        track = null;
      };
    }, []);
    return {
      ready: ready,
      track: ref.current,
      error: agoraRTCError
    };
  };
}
function createCameraVideoTrack(config) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createCameraVideoTrack(config)).then(function (_AgoraRTC$createCamer) {
        track = _AgoraRTC$createCamer;
        return track;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var track = null;
  return function useCameraVideoTrack() {
    var _useState5 = React.useState(false),
        ready = _useState5[0],
        setReady = _useState5[1];

    var _useState6 = React.useState(null),
        agoraRTCError = _useState6[0],
        setAgoraRTCError = _useState6[1];

    var ref = React.useRef(track);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (track) {
          ref.current = track;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        track = null;
      };
    }, []);
    return {
      ready: ready,
      track: ref.current,
      error: agoraRTCError
    };
  };
}
function createCustomAudioTrack(config) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createCustomAudioTrack(config)).then(function (_AgoraRTC$createCusto) {
        track = _AgoraRTC$createCusto;
        return track;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var track = null;
  return function useCustomAudioTrack() {
    var _useState7 = React.useState(false),
        ready = _useState7[0],
        setReady = _useState7[1];

    var _useState8 = React.useState(null),
        agoraRTCError = _useState8[0],
        setAgoraRTCError = _useState8[1];

    var ref = React.useRef(track);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (track) {
          ref.current = track;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        track = null;
      };
    }, []);
    return {
      ready: ready,
      track: ref.current,
      error: agoraRTCError
    };
  };
}
function createCustomVideoTrack(config) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createCustomVideoTrack(config)).then(function (_AgoraRTC$createCusto2) {
        track = _AgoraRTC$createCusto2;
        return track;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var track = null;
  return function useCustomVideoTrack() {
    var _useState9 = React.useState(false),
        ready = _useState9[0],
        setReady = _useState9[1];

    var _useState10 = React.useState(null),
        agoraRTCError = _useState10[0],
        setAgoraRTCError = _useState10[1];

    var ref = React.useRef(track);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (track) {
          ref.current = track;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        track = null;
      };
    }, []);
    return {
      ready: ready,
      track: ref.current,
      error: agoraRTCError
    };
  };
}
function createMicrophoneAudioTrack(config) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createMicrophoneAudioTrack(config)).then(function (_AgoraRTC$createMicro2) {
        track = _AgoraRTC$createMicro2;
        return track;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var track = null;
  return function useMicrophoneAudioTrack() {
    var _useState11 = React.useState(false),
        ready = _useState11[0],
        setReady = _useState11[1];

    var _useState12 = React.useState(null),
        agoraRTCError = _useState12[0],
        setAgoraRTCError = _useState12[1];

    var ref = React.useRef(track);
    React.useEffect(function () {
      if (ref.current === null) {
        createClosure().then(function (track) {
          ref.current = track;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }

      return function () {
        track = null;
      };
    }, []);
    return {
      ready: ready,
      track: ref.current,
      error: agoraRTCError
    };
  };
}
function createScreenVideoTrack(config, withAudio) {
  var createClosure = function createClosure() {
    try {
      return Promise.resolve(AgoraRTC__default.createScreenVideoTrack(config, withAudio)).then(function (_AgoraRTC$createScree) {
        tracks = _AgoraRTC$createScree;
        return tracks;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var tracks;
  return function useScreenVideoTrack() {
    var _useState13 = React.useState(false),
        ready = _useState13[0],
        setReady = _useState13[1];

    var _useState14 = React.useState(null),
        agoraRTCError = _useState14[0],
        setAgoraRTCError = _useState14[1];

    var ref = React.useRef(tracks);
    React.useEffect(function () {
      if (ref.current === undefined) {
        createClosure().then(function (tracks) {
          ref.current = tracks;
          setReady(true);
        }, function (e) {
          setAgoraRTCError(e);
        });
      } else {
        setReady(true);
      }
    }, []);
    return {
      ready: ready,
      tracks: ref.current,
      error: agoraRTCError
    };
  };
}
var AgoraVideoPlayer = function AgoraVideoPlayer(props) {
  var vidDiv = React.useRef(null);

  var videoTrack = props.videoTrack,
      config = props.config,
      other = _objectWithoutPropertiesLoose(props, ["videoTrack", "config"]);

  React.useLayoutEffect(function () {
    if (vidDiv.current !== null) videoTrack.play(vidDiv.current, config);
    return function () {
      videoTrack.stop();
    };
  }, [videoTrack]);
  return React__default.createElement("div", Object.assign({}, other, {
    ref: vidDiv
  }));
};

Object.keys(AgoraRTC).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return AgoraRTC[k];
    }
  });
});
exports.AgoraVideoPlayer = AgoraVideoPlayer;
exports.createBufferSourceAudioTrack = createBufferSourceAudioTrack;
exports.createCameraVideoTrack = createCameraVideoTrack;
exports.createClient = createClient;
exports.createCustomAudioTrack = createCustomAudioTrack;
exports.createCustomVideoTrack = createCustomVideoTrack;
exports.createMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks;
exports.createMicrophoneAudioTrack = createMicrophoneAudioTrack;
exports.createScreenVideoTrack = createScreenVideoTrack;
exports.default = AgoraRTC__default;
//# sourceMappingURL=index.js.map
