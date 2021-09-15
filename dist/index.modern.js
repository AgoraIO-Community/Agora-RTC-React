import React, { useState, useRef, useEffect } from 'react';
import AgoraRTC__default from 'agora-rtc-sdk-ng';
export * from 'agora-rtc-sdk-ng';

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
    var _useState = useState(false),
        ready = _useState[0],
        setReady = _useState[1];

    var _useState2 = useState(null),
        agoraRTCError = _useState2[0],
        setAgoraRTCError = _useState2[1];

    var ref = useRef(tracks);
    useEffect(function () {
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
    var _useState3 = useState(false),
        ready = _useState3[0],
        setReady = _useState3[1];

    var _useState4 = useState(null),
        agoraRTCError = _useState4[0],
        setAgoraRTCError = _useState4[1];

    var ref = useRef(track);
    useEffect(function () {
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
    var _useState5 = useState(false),
        ready = _useState5[0],
        setReady = _useState5[1];

    var _useState6 = useState(null),
        agoraRTCError = _useState6[0],
        setAgoraRTCError = _useState6[1];

    var ref = useRef(track);
    useEffect(function () {
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
    var _useState7 = useState(false),
        ready = _useState7[0],
        setReady = _useState7[1];

    var _useState8 = useState(null),
        agoraRTCError = _useState8[0],
        setAgoraRTCError = _useState8[1];

    var ref = useRef(track);
    useEffect(function () {
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
    var _useState9 = useState(false),
        ready = _useState9[0],
        setReady = _useState9[1];

    var _useState10 = useState(null),
        agoraRTCError = _useState10[0],
        setAgoraRTCError = _useState10[1];

    var ref = useRef(track);
    useEffect(function () {
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
    var _useState11 = useState(false),
        ready = _useState11[0],
        setReady = _useState11[1];

    var _useState12 = useState(null),
        agoraRTCError = _useState12[0],
        setAgoraRTCError = _useState12[1];

    var ref = useRef(track);
    useEffect(function () {
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
    var _useState13 = useState(false),
        ready = _useState13[0],
        setReady = _useState13[1];

    var _useState14 = useState(null),
        agoraRTCError = _useState14[0],
        setAgoraRTCError = _useState14[1];

    var ref = useRef(tracks);
    useEffect(function () {
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
  var vidDiv = useRef(null);

  var videoTrack = props.videoTrack,
      config = props.config,
      other = _objectWithoutPropertiesLoose(props, ["videoTrack", "config"]);

  useEffect(function () {
    if (vidDiv.current !== null) videoTrack.play(vidDiv.current, config);
    return function () {
      videoTrack.stop();
    };
  }, [videoTrack]);
  return React.createElement("div", Object.assign({}, other, {
    ref: vidDiv
  }));
};

export default AgoraRTC__default;
export { AgoraVideoPlayer, createBufferSourceAudioTrack, createCameraVideoTrack, createClient, createCustomAudioTrack, createCustomVideoTrack, createMicrophoneAndCameraTracks, createMicrophoneAudioTrack, createScreenVideoTrack };
//# sourceMappingURL=index.modern.js.map
