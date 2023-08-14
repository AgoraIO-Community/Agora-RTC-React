# Agora RTC SDK React Wrapper

## Update: 2.x is coming!
We're working on a full featured SDK for React, it's available in Beta right now. It should be a much better experience of using the Agora SDK with React.

### Links for 2.x
- [GitHub Repo](https://github.com/AgoraIO-Extensions/agora-rtc-react/)
- [Beta Docs](https://docs-beta.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-js)
- [API reference](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/index.html)
- [NPM package](https://www.npmjs.com/package/agora-rtc-react/v/2.0.0-beta.0)

---
## 1.x (this repo)
A react (react.js) wrapper for [Agora RTC NG SDK](https://www.npmjs.com/package/agora-rtc-sdk-ng).

This wrapper supports **React >= v16.8**

## Install
```bash
npm install agora-rtc-react
```

## Usage
```tsx
import React from "react";
import { AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const config = {mode: "rtc", codec: "vp8"}

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const App = () => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  return (
    ready && <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '100%', width: '100%'}} />
  )
}

``` 

## Example
A full videocall example using the wrapper can be found [here](https://github.com/AgoraIO-Community/agora-rtc-react/wiki/Example).

## Reference 
You can view the methods in the wrapper [here](https://agoraio-community.github.io/Agora-RTC-React).
