## Agora RTC SDK React Wrapper (Archive)

### Agora now offers an official React SDK!
The React SDK (2.x) repo is available [here](https://github.com/AgoraIO-Extensions/agora-rtc-react/).  
It's released as v2.x under the same [npm package](https://www.npmjs.com/package/agora-rtc-react/v/2.0.0-beta.0). 

### Links for 2.x
- [Docs](https://docs-beta.agora.io/en/video-calling/get-started/get-started-sdk?platform=react-js)
- [API Reference](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/index.html)
- [NPM Package](https://www.npmjs.com/package/agora-rtc-react/v/2.0.0-beta.0)
- [GitHub Repo](https://github.com/AgoraIO-Extensions/agora-rtc-react/)

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
