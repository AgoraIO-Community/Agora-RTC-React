import React, { useEffect, useState, useRef } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ILocalVideoTrack,
  ILocalAudioTrack,
  createScreenVideoTrack,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";

const config: ClientConfig = {
  mode: "rtc", codec: "vp8",
};

// Create screen client
const useScreenVideoClient = createClient({
  mode: 'rtc',
  codec: 'vp8',
})

// Screenshare props
interface Props {
  screenshareConfig: ScreenShareConfig
  onScreenSharingStopped(): void
}

// Setting the config for screenshare
interface ScreenShareConfig {
  appId: string
  channelName: string
  token: string | null
  uid: string | number | null
}

const appId: string = `${process.env.REACT_APP_AGORA_APP_ID}`; // replace with your app id
const token: string | null = null;

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  // Screenshare config for the interface created
  const screenshareConfig: ScreenShareConfig = {
    appId,
    channelName,
    token,
    uid: null,
  };

  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <>
          <VideoCall setInCall={setInCall} channelName={channelName} />
          {/* Screensharing component */}
          <ScreenSharing screenshareConfig={screenshareConfig} onScreenSharingStopped={() => console.log("Screensharing stopped.")} />
        </>
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);

    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }

  }, [channelName, client, ready, tracks]);

  return (
    <div className="App">
      {ready && tracks && (
        <>
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        </>
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className='vid' videoTrack={user.videoTrack} key={user.uid} />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

const getScreenSharingVideoTrack = (tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack]) => {
  if (Array.isArray(tracks)) {
    return tracks[0]
  } else {
    return tracks
  }
}

// ScreenSharing component
const ScreenSharing = (props: Props) => {
  const useScreenVideoTrack = createScreenVideoTrack({
    encoderConfig: '1080p_1',
    optimizationMode: 'detail',
  })
  // Using the screen client hook
  const screenVideoClient = useScreenVideoClient()
  const { ready, tracks, error } = useScreenVideoTrack()
  const tracksRef = useRef(tracks)
  const [toggleState, setToggleState] = useState<boolean>(false)

  const { onScreenSharingStopped } = props

  useEffect(() => {
    tracksRef.current = tracks
  }, [tracks])

  useEffect(() => {
    if (error !== null) {
      console.error('An error occurred while sharing the screen.', error)
      onScreenSharingStopped()
    }
  }, [error, onScreenSharingStopped])

  useEffect(() => {
    const init = async (channelName: string) => {
      if (!props.screenshareConfig) return

      try {
        await screenVideoClient.join(
          props.screenshareConfig.appId,
          channelName,
          props.screenshareConfig.token,
          props.screenshareConfig.uid,
        )
        const videoTrack = getScreenSharingVideoTrack(tracks)
        if (tracks) await screenVideoClient.publish(videoTrack)
      } catch (e) {
        console.error(e)
      }
    }

    if (props.screenshareConfig && ready && tracks) {
      init(props.screenshareConfig.channelName)
    }

  }, [props.screenshareConfig, screenVideoClient, ready, tracks])

  useEffect(() => {
    const videoTrack = getScreenSharingVideoTrack(tracks)
    if (videoTrack) {
      videoTrack.on('track-ended', () => {
        onScreenSharingStopped()
        stopScreenshare()
        setToggleState(false)
      })
    }
    // Stop and remove all tracks for screenshared client
    function stopScreenshare() {
      if (tracksRef.current) {
        const track = getScreenSharingVideoTrack(tracksRef.current)
        track.close()
        track.removeAllListeners()
      }; (async () => {
        await screenVideoClient.leave()
        screenVideoClient.removeAllListeners()
      })()
    }
  }, [onScreenSharingStopped, tracks, screenVideoClient])

  useEffect(() => {
    return () => {
      if (tracksRef.current) {
        const track = getScreenSharingVideoTrack(tracksRef.current)
        track.close()
        track.removeAllListeners()
      }; (async () => {
        await screenVideoClient.leave()
        screenVideoClient.removeAllListeners()
      })()
    }
  }, [tracks, screenVideoClient])

  if (!ready) {
    return null
  }

  // Toggle tracks for screenshared client
  if (toggleState) {
    // If on then turn it off
    if (tracksRef.current) {
      const track = getScreenSharingVideoTrack(tracksRef.current)
      track.close()
      track.removeAllListeners()
    }; (async () => {
      await screenVideoClient.leave()
      screenVideoClient.removeAllListeners()
    })()
  } else {
    // If off then turn it on
    (async () => {
      await screenVideoClient.join(
        props.screenshareConfig.appId,
        props.screenshareConfig.channelName,
        props.screenshareConfig.token,
        props.screenshareConfig.uid,
      )
      // Using the screen client hook
      if (!null) {
        const videoTrack = getScreenSharingVideoTrack(tracks)
        if (tracks) await screenVideoClient.publish(videoTrack)
      }
    })()
  }

  const videoTrack = getScreenSharingVideoTrack(tracks)

  return (
    <>
      {/* Agora video player for screenshare */}
      <AgoraVideoPlayer className="video" videoTrack={videoTrack} />
      {/* Toggle Screenshare Button */}
      <div id="screenshare-controls">
        <button onClick={() => setToggleState(!toggleState)} id="toggle-screenshare-btn">{toggleState ? ("Start Screen Sharing") : ("Stop Screen Sharing")}</button>
      </div>
    </>
  )
}

export const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""}
        onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""}
        onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {appId === '' && <p style={{ color: 'red' }}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={(e) => {
        e.preventDefault();
        setInCall(true);
      }}>
        Join and Screenshare
      </button>
    </form>
  );
};

export default App;
