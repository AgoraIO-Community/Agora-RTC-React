import React, { RefObject, useEffect, useRef, useState } from 'react'
import AgoraRTC, {
  BufferSourceAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  ClientConfig,
  CustomAudioTrackInitConfig,
  CustomVideoTrackInitConfig,
  IAgoraRTCClient,
  IBufferSourceAudioTrack,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteVideoTrack,
  MicrophoneAudioTrackInitConfig,
  ScreenVideoTrackInitConfig
} from 'agora-rtc-sdk-ng'

export const createClient = (config: ClientConfig) => {
  let client: IAgoraRTCClient
  function createClosure() {
    if (!client) {
      client = AgoraRTC.createClient(config)
    }
    return client
  }
  return () => createClosure()
}

export function createMicrophoneAndCameraTracks(
  audioConfig?: MicrophoneAudioTrackInitConfig | undefined,
  videoConfig?: CameraVideoTrackInitConfig | undefined
) {
  let tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null = null
  async function createClosure() {
    tracks = await AgoraRTC.createMicrophoneAndCameraTracks(
      audioConfig,
      videoConfig
    )
    return tracks
  }
  return function useMicrophoneAndCameraTracks() {
    const [ready, setReady] = useState(false)
    const ref = useRef(tracks)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((tracks) => {
          ref.current = tracks
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        tracks = null
      }
    }, [])
    return { ready, tracks: ref.current }
  }
}

export function createBufferSourceAudioTrack(
  config: BufferSourceAudioTrackInitConfig
) {
  let track: IBufferSourceAudioTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createBufferSourceAudioTrack(config)
    return track
  }
  return function useBufferSourceAudioTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current }
  }
}

export function createCameraVideoTrack(config?: CameraVideoTrackInitConfig) {
  let track: ICameraVideoTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCameraVideoTrack(config)
    return track
  }
  return function useCameraVideoTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current }
  }
}

export function createCustomAudioTrack(config: CustomAudioTrackInitConfig) {
  let track: ILocalAudioTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCustomAudioTrack(config)
    return track
  }
  return function useCustomAudioTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current }
  }
}

export function createCustomVideoTrack(config: CustomVideoTrackInitConfig) {
  let track: ILocalVideoTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCustomVideoTrack(config)
    return track
  }
  return function useCustomVideoTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current }
  }
}

export function createMicrophoneAudioTrack(
  config?: MicrophoneAudioTrackInitConfig
) {
  let track: IMicrophoneAudioTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createMicrophoneAudioTrack(config)
    return track
  }
  return function useMicrophoneAudioTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current }
  }
}

export function createScreenVideoTrack(
  config: ScreenVideoTrackInitConfig,
  withAudio?: 'enable' | 'disable' | 'auto'
) {
  let tracks: [ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack
  async function createClosure() {
    tracks = await AgoraRTC.createScreenVideoTrack(config, withAudio)
    return tracks
  }
  return function useScreenVideoTrack() {
    const [ready, setReady] = useState(false)
    const ref = useRef(tracks)

    useEffect(() => {
      if (ref.current === undefined) {
        createClosure().then((tracks) => {
          ref.current = tracks
          setReady(true)
        })
      } else {
        setReady(true)
      }
    }, [])
    return { ready, tracks: ref.current }
  }
}


export const AgoraVideoPlayer = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { videoTrack: ILocalVideoTrack | IRemoteVideoTrack | ICameraVideoTrack }) => {
  const vidDiv: RefObject<HTMLDivElement> = useRef(null)
  const { videoTrack, ...other } = props;
  useEffect(() => {
    if (vidDiv.current !== null) videoTrack.play(vidDiv.current)
    return () => {
      videoTrack.stop()
    }
  }, [videoTrack])

  return <div {...other} ref={vidDiv} />
}
