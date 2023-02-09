import AgoraRTC, { createCameraVideoTrack, ILocalAudioTrack, useCustomAudioTrackv2 } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
} from "agora-rtc-react";

const config: ClientConfig = {
  mode: "rtc", codec: "vp8",
};

console.log('!!!', AgoraRTC.VERSION)

const appId: string = "30a6bc89994d4222a71eba01c253cbc7"; // ENTER APP ID HERE
const token: string | null = null;

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
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
const useMicrophoneAndCameraTracks = createCameraVideoTrack();

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
  const { ready, track } = useMicrophoneAndCameraTracks();
  const { ready: ready2, track: track2, updateTrack } = useCustomAudioTrackv2()
  const swap = async () => {
    if(track2) {
      await client.unpublish(track2)
      const d =  await navigator.mediaDevices.enumerateDevices()
      console.log('!', d[1])
      const t =  await navigator.mediaDevices.getUserMedia({audio: {deviceId: d[1].deviceId}})
      const t2 = t.getAudioTracks()
      if(t2) updateTrack({mediaStreamTrack: t2[0]})
      await client.publish(track2)
    }
  }
  useEffect(() => {
    console.log('!', ready, track)
  }, [ready, track])
  useEffect(() => {
    const func =async () => {
      const t = await navigator.mediaDevices.getUserMedia({audio: true})
      const t2 = t.getAudioTracks()
      if(t2) updateTrack({mediaStreamTrack: t2[0]})
    }    
    func()
  },[])

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
      console.log('!track', track)
      try{
        if (track) await client.publish(track);
      } catch(e) {
        console.error(e)
      }
      console.log('!track2', track2)
      try{
        if (track2) await client.publish(track2);
      } catch(e) { 
        console.error(e)
      }
      setStart(true);

    };

    if (ready && track && track2 && ready2) {
      console.log("init ready");
      init(channelName);
    }

    return () => {
      client.removeAllListeners()
      client.leave()
    }

  }, [channelName, client, ready, track, ready2, track2]);


  return (
    <div className="App">
      <button onClick={()=>swap()}>hi</button>
      {ready && track && track2 && ready2 && (
        <Controls tracks={[track2, track]} setStart={setStart} setInCall={setInCall} />
      )}
      {start && track && track2 && ready2 && <Videos users={users} tracks={[track2, track]} />}
    </div>
  );
};

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [ILocalAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid' videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid' videoTrack={user.videoTrack} key={user.uid} />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props: {
  tracks: [ILocalAudioTrack, ICameraVideoTrack];
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
      {appId === '' && <p style={{color: 'red'}}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={(e) => {
        e.preventDefault();
        setInCall(true);
      }}>
        Join
      </button>
    </form>
  );
};

export default App;
