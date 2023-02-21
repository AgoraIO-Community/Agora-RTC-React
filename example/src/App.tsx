import React, { useEffect, useState } from 'react'
import AgoraRTC, {
  AgoraVideoPlayer,
  createClient,
  useMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  AgoraProvider
} from 'agora-rtc-react'

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8'
}

const appId: string = '30a6bc89994d4222a71eba01c253cbc7' //ENTER APP ID HERE
const token: string | null = null

const App = () => {
  const [inCall, setInCall] = useState(false)
  const [channelName, setChannelName] = useState('')
  return (
    <div>
      <h1 className='heading'>Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <AgoraProvider>
          <VideoCall setInCall={setInCall} channelName={channelName} />
        </AgoraProvider>
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  )
}

const useClient = createClient(config)

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  channelName: string
}) => {
  const { setInCall, channelName } = props
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([])
  const [start, setStart] = useState<boolean>(false)
  const client = useClient()
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is undefined
  const { isSuccess: ready, data: tracks } =
    useMicrophoneAndCameraTracks('cam-mic-tracks')

  useEffect(() => {
    // function to initialise the SDK
    let init = async () => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        console.log('subscribe success')
        if (mediaType === 'video') {
          setUsers((prevUsers) => {
            return [...prevUsers, user]
          })
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
      setStart(true)
    }
    console.log('init ready')
    init()

    return () => {
      client.removeAllListeners()
    }
  }, [ready])

  useEffect(() => {
    console.log('!!UE')
    const func = async () => {
      if (start && tracks) {
        await client.join(appId, channelName, null, 0)
        await client.publish(tracks)
      }
    }
    func()
    return () => {
      client.leave()
    }
  }, [channelName, tracks])

  return (
    <div className='App'>
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  )
}

const Videos = (props: {
  users: IAgoraRTCRemoteUser[]
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack]
}) => {
  const { users, tracks } = props

  return (
    <div>
      <div id='videos'>
        <AgoraVideoPlayer
          style={{ height: '95%', width: '95%' }}
          className='vid'
          videoTrack={tracks[1]}
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: '95%', width: '95%' }}
                  className='vid'
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              )
            } else return null
          })}
      </div>
    </div>
  )
}

export const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack]
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const client = useClient()
  const { tracks, setStart, setInCall } = props
  const [trackState, setTrackState] = useState({ video: true, audio: true })

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio)
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio }
      })
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video)
      setTrackState((ps) => {
        return { ...ps, video: !ps.video }
      })
    }
  }

  const leaveChannel = async () => {
    setStart(false)
    setInCall(false)
  }

  return (
    <div className='controls'>
      <p className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
        {trackState.audio ? 'MuteAudio' : 'UnmuteAudio'}
      </p>
      <p className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
        {trackState.video ? 'MuteVideo' : 'UnmuteVideo'}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  )
}

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>
  setChannelName: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { setInCall, setChannelName } = props

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
        }}
      >
        Join
      </button>
    </form>
  )
}

export default App
