import React, { useEffect, useState } from 'react'
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCClient
} from 'agora-rtc-react'

const config: ClientConfig = {
  mode: 'live',
  codec: 'vp8'
}

const appId: string = `${process.env.REACT_APP_AGORA_APP_ID}` // replace with your app id
const token: string | null = null

const App = () => {
  const [inCall, setInCall] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [host, setHost] = useState<boolean>(false)
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([])

  // using the hook to get access to the client object
  const client = useClient()

  useEffect(() => {
    // Client event listeners
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      console.log('subscribe success')
      if (mediaType === 'video') {
        setUsers((prevUsers) => {
          return [...prevUsers, user]
        })
        console.log('user list is ::::::::', user.uid)
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play()
      }
    })

    client.on('user-unpublished', (user, type) => {
      console.log('unpublished', user, type)
      if (type === 'audio') {
        user.audioTrack?.stop()
      }
      if (type === 'video') {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid)
        })
      }
    })
    client.on('user-left', (user) => {
      console.log('leaving', user)
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid)
      })
    })
  }, [client])

  return (
    <div>
      <h1 className='heading'>Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        // Check if user joined as a host or audience and display the appropriate component
        host ? (
          <VideoCallHost
            setInCall={setInCall}
            channelName={channelName}
            host={host}
            users={users}
            client={client}
          />
        ) : (
          <VideoCallAudience
            setInCall={setInCall}
            channelName={channelName}
            host={host}
            users={users}
            client={client}
          />
        )
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
          setHost={setHost}
        />
      )}
    </div>
  )
}

// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config)
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()

// Component for users joining as audience
const VideoCallAudience = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  host: boolean
  channelName: string
  client: IAgoraRTCClient
  users: Array<IAgoraRTCRemoteUser>
}) => {
  const { setInCall, channelName, client, users } = props
  const [start, setStart] = useState<boolean>(false)
  const { host } = props

  useEffect(() => {
    // Confirm if user role is audience
    console.log('role is', host)

    // function to initialise the SDK
    console.log('init ready')
    const joinChannel = async () => {
      await client.join(appId, channelName, token, null)
      await client.setClientRole('audience')
      setStart(true)
    }
    joinChannel()
  }, [channelName, client, host])

  return (
    <div className='App'>
      <Controls setInCall={setInCall} setStart={setStart} host={host} />
      {start && <Videos users={users} host={host} />}
    </div>
  )
}

// Component for users joining as host
const VideoCallHost = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  host: boolean
  channelName: string
  client: IAgoraRTCClient
  users: Array<IAgoraRTCRemoteUser>
}) => {
  const { setInCall, channelName, client, users } = props
  const [start, setStart] = useState<boolean>(false)
  const { host } = props

  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready = false, tracks } = useMicrophoneAndCameraTracks()

  useEffect(() => {
    // Confirm if user role is host
    console.log('role is', host)

    // function to initialise the SDK
    if (ready && tracks) {
      console.log('init ready')
      const joinChannel = async () => {
        await client.join(appId, channelName, token, null)
        await client.setClientRole('host')
        // Publish the host's tracks
        await client.publish([tracks[0], tracks[1]])
        setStart(true)
      }
      joinChannel()
    }
  }, [channelName, client, ready, tracks, host])

  return (
    <div className='App'>
      {/* Show controls only to the host */}
      {ready && tracks && (
        <Controls
          tracks={tracks}
          setStart={setStart}
          setInCall={setInCall}
          host={host}
        />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} host={host} />}
    </div>
  )
}

// Video component which uses the wrapper's video player
const Videos = (props: {
  users: IAgoraRTCRemoteUser[]
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack]
  host: boolean
}) => {
  console.log('users are :::::::::::::', props.users)
  return (
    <div>
      <div id='videos'>
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        {props.host && props.tracks && (
          <AgoraVideoPlayer
            className='vid'
            videoTrack={props.tracks[1]}
            style={{ height: '65%', width: '65%' }}
          />
        )}
        {props.users.length > 0 &&
          props.users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className='vid'
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: '65%', width: '65%' }}
                />
              )
            } else return null
          })}
      </div>
    </div>
  )
}

// Controls component which takes in the start and end call functions
export const Controls = (props: {
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack]
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  host: boolean
}) => {
  const client = useClient()
  const { tracks, host, setStart, setInCall } = props
  const [trackState, setTrackState] = useState({ video: true, audio: true })

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      tracks && (await tracks[0].setEnabled(!trackState.audio))
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio }
      })
    } else if (type === 'video') {
      tracks && (await tracks[1].setEnabled(!trackState.video))
      setTrackState((ps) => {
        return { ...ps, video: !ps.video }
      })
    }
  }

  const leaveChannel = async () => {
    await client.leave()
    client.removeAllListeners()
    // we close the tracks to perform cleanup
    tracks && tracks[0].close()
    tracks && tracks[1].close()
    setStart(false)
    setInCall(false)
  }

  return (
    <div className='controls'>
      {host ? (
        <>
          <p
            className={trackState.audio ? 'on' : ''}
            onClick={() => mute('audio')}
          >
            {trackState.audio ? 'Mute Audio' : 'Unmute Audio'}
          </p>
          <p
            className={trackState.video ? 'on' : ''}
            onClick={() => mute('video')}
          >
            {trackState.video ? 'Mute Video' : 'Unmute Video'}
          </p>
        </>
      ) : null}
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  )
}

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  setChannelName: React.Dispatch<React.SetStateAction<string>>
  setHost: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { setInCall, setChannelName, setHost } = props

  return (
    <form className='join'>
      {appId === '' && (
        <p style={{ color: 'red' }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type='text'
        placeholder='Enter Channel Name'
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          setInCall(true)
          // false sets user role to host
          setHost(true)
        }}
      >
        Join as Host
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          setInCall(true)
          // false sets user role to audience
          setHost(false)
        }}
      >
        Join as Audience
      </button>
    </form>
  )
}

export default App
