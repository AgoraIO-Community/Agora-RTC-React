# API Reference

## Wrapper Functions

| Factory Method | Parameters (? = optional)| Return Value | Reference
| ----- | ---- | ---- | ---- |
| createClient | [ClientConfig](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/clientconfig.html) | A hook that gives a [client object](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartcclient.html) | [AgoraRTC.createClient](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) |
| createMicrophoneAndCameraTracks | [AudioConfig?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/microphoneaudiotrackinitconfig.html), [VideoConfig?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/cameravideotrackinitconfig.html) | A hook that gives an object containg tracks ([microphone](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/imicrophoneaudiotrack.html) and [camera](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/icameravideotrack.html)) and a state variable `ready` which is set to true when the feeds are initialised | [createMicrophoneAndCameraTracks](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createmicrophoneandcameratracks) |
| createBufferSourceAudioTrack | [BufferSourceAudioTrackInitConfig](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/buffersourceaudiotrackinitconfig.html) | A hook that gives an object containg the [audio track](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ibuffersourceaudiotrack.html) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createBufferSourceAudioTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createbuffersourceaudiotrack) |
| createCameraVideoTrack | [CameraVideoTrackInitConfig?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/cameravideotrackinitconfig.html)| A hook that gives an object containg the [camera video track](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/icameravideotrack.html) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createCameraVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createcameravideotrack) |
| createCustomAudioTrack |[CustomAudioTrackInitConfig](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/customaudiotrackinitconfig.html)| A hook that gives an object containg the [custom audio track](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ilocalaudiotrack.html) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createCustomAudioTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createcustomaudiotrack) |
| createCustomVideoTrack |[CustomVideoTrackInitConfig](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/customvideotrackinitconfig.html)| A hook that gives an object containg the [custom video track](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ilocalvideotrack.html) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createCustomVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createcustomvideotrack) |
| createMicrophoneAudioTrack |[MicrophoneAudioTrackInitConfig?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/microphoneaudiotrackinitconfig.html)| A hook that gives an object containg the [microphone audio track](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/imicrophoneaudiotrack.html) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createMicrophoneAudioTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createmicrophoneaudiotrack) |
| createScreenVideoTrack |[ScreenVideoTrackInitConfig?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/screenvideotrackinitconfig.html), [withAudio?](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createscreenvideotrack)|  A hook that gives an object containg tracks ([audio](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ilocalaudiotrack.html) and [video](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ilocalvideotrack.html)) and a state variable `ready` which is set to true when the feeds are initialised | [AgoraRTC.createScreenVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html#createscreenvideotrack) |

All methods take in the same parameters as the NG SDK. You can visit the official docs for each methods to know more.

## Components

### AgoraVideoPlayer
This component lets you display a video track in the DOM.
You can pass in the `videoTrack` as prop along with other props that get passed to the rendered div containing your video.

***Note***: You need to pass in the height & width for the video player using the style prop (or className/id) which is applied to the resultant div containig the video, otherwise the renderd div is of size 0px.
#### ***Required Prop***
videoTrack: [ILocalVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/ilocalvideotrack.html) | [IRemoteVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iremotevideotrack.html) | [ICameraVideoTrack](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/icameravideotrack.html)

Example:
```tsx
<AgoraVideoPlayer videoTrack={track} className="video" key={key} style={{height: '100%', width: '100%'}} />
```
## Wrapper Functions Examples

### createClient
```tsx
import React from "react";
import { createClient } from "agora-rtc-react";

const config = {mode: "rtc", codec: "vp8"}
const useClient = createClient(config);

const App = () => {
  const client = useClient();

  useEffect(() => {
    client.join(appId, name, token, null);
  }, [])

  return (
    <p>{client.uid}</p>
  )
}
```

### createMicrophoneAndCameraTracks
```tsx
import React from "react";
import { createMicrophoneAndCameraTracks, AgoraVideoPlayer } from "agora-rtc-react";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const App = () => {
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  return (
    ready && <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '100%', width: '100%'}} />
  )
}
```
All other create methods use a similar pattern.

## Other AgoraRTC Methods

For other RTC SDK methods you can directly use them from the [AgoraRTC](https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartc.html) object. Look at the example using the wrapper for group videocall [here](https://github.com/AgoraIO-Community/agora-rtc-react/wiki/Example) to understand better.
