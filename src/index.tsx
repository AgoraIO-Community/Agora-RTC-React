/**
 * @module Agora React Wrapper
 */
import React, { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  ScreenVideoTrackInitConfig,
  VideoPlayerConfig
} from 'agora-rtc-sdk-ng'

export default AgoraRTC;
export * from 'agora-rtc-sdk-ng';

/**
 * @ignore
 */
export interface AgoraRTCError {
  code: AgoraRTCErrorCode;
  message: string;
  data?: any;
  name: string;
}

/**
 * @ignore
 */
export enum AgoraRTCErrorCode {
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE",
  TIMEOUT = "TIMEOUT",
  INVALID_PARAMS = "INVALID_PARAMS",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  INVALID_OPERATION = "INVALID_OPERATION",
  OPERATION_ABORTED = "OPERATION_ABORTED",
  WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT",
  NETWORK_ERROR = "NETWORK_ERROR",
  NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
  NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR",
  API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT",
  ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED",
  DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
  ELECTRON_IS_NULL = "ELECTRON_IS_NULL",
  ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR",
  CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE",
  CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL",
  MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED",
  TRACK_IS_DISABLED = "TRACK_IS_DISABLED",
  SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED",
  LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR",
  INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID",
  CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER",
  CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER",
  VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS",
  UID_CONFLICT = "UID_CONFLICT",
  INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK",
  INVALID_TRACK = "INVALID_TRACK",
  SENDER_NOT_FOUND = "SENDER_NOT_FOUND",
  CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED",
  SET_ANSWER_FAILED = "SET_ANSWER_FAILED",
  ICE_FAILED = "ICE_FAILED",
  PC_CLOSED = "PC_CLOSED",
  SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED",
  GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST",
  NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE",
  CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS",
  EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK",
  INVALID_REMOTE_USER = "INVALID_REMOTE_USER",
  REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED",
  CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED",
  CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH",
  FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED",
  READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR",
  DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED",
  WS_ABORT = "WS_ABORT",
  WS_DISCONNECT = "WS_DISCONNECT",
  WS_ERR = "WS_ERR",
  LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT",
  LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT",
  LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR",
  LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED",
  LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED",
  LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR",
  LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM",
  LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT",
  LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE",
  LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST",
  WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR",
  BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR",
  CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR",
  CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC",
  CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST",
  CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST",
  CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE",
  METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE"
}

/**
 * Initializes a Web SDK client and stores the instance for the lifecycle of the application 
 * @param config Configuration for the Web SDK Client instance
 * @returns React hook that gives access to the Web SDK Client instance
 * @category Wrapper
 */
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

/**
 * Creates and stores the camera and microphone tracks
 * @param audioConfig Config for the audio track
 * @param videoConfig Config for the video track
 * @returns React hook that can be used to access the camera and microphone tracks
 * @category Wrapper
 */
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
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(tracks)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((tracks) => {
          ref.current = tracks
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        tracks = null
      }
    }, [])
    return { ready, tracks: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the buffer source audio track
 * @param config Config for the buffer source audio track
 * @returns React hook that can be used to access the buffer source audio track
 * @category Wrapper
 */
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
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the camera track
 * @param config Config for the camera track
 * @returns React hook that can be used to access the camera track
 * @category Wrapper
 */
export function createCameraVideoTrack(config?: CameraVideoTrackInitConfig) {
  let track: ICameraVideoTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCameraVideoTrack(config)
    return track
  }
  return function useCameraVideoTrack() {
    const [ready, setReady] = useState(false)
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the custom audio track
 * @param config Config for the custom audio track
 * @returns React hook that can be used to access the custom audio track
 * @category Wrapper
 */
export function createCustomAudioTrack(config: CustomAudioTrackInitConfig) {
  let track: ILocalAudioTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCustomAudioTrack(config)
    return track
  }
  return function useCustomAudioTrack() {
    const [ready, setReady] = useState(false)
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the custom video track
 * @param config Config for the custom video track
 * @returns React hook that can be used to access the custom video track
 * @category Wrapper
 */
export function createCustomVideoTrack(config: CustomVideoTrackInitConfig) {
  let track: ILocalVideoTrack | null = null
  async function createClosure() {
    track = await AgoraRTC.createCustomVideoTrack(config)
    return track
  }
  return function useCustomVideoTrack() {
    const [ready, setReady] = useState(false)
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the microphone track
 * @param config Config for the microphone track
 * @returns React hook that can be used to access the microphone track
 * @category Wrapper
 */
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
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(track)

    useEffect(() => {
      if (ref.current === null) {
        createClosure().then((track) => {
          ref.current = track
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
      return () => {
        track = null
      }
    }, [])
    return { ready, track: ref.current, error: agoraRTCError }
  }
}

/**
 * Creates and stores the screenshare tracks
 * @param config Config for the screenshare tracks
 * @param withAudio Try and create audio track as well (needs browser support)
 * @returns React hook that can be used to access the screenshare tracks
 * @category Wrapper
 */
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
    const [agoraRTCError, setAgoraRTCError] = useState<null | AgoraRTCError>(null)
    const ref = useRef(tracks)

    useEffect(() => {
      if (ref.current === undefined) {
        createClosure().then((tracks) => {
          ref.current = tracks
          setReady(true)
        }, (e) => {
          setAgoraRTCError(e)
        })
      } else {
        setReady(true)
      }
    }, [])
    return { ready, tracks: ref.current, error: agoraRTCError }
  }
}

/**
 * A React component to render the local or remote videoTrack
 * @param props videoTrack and video config 
 * @returns An HTML div element containing the provided videoTrack
 */
export const AgoraVideoPlayer = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { videoTrack: ILocalVideoTrack | IRemoteVideoTrack | ICameraVideoTrack } & {config?: VideoPlayerConfig}) => {
  const vidDiv: RefObject<HTMLDivElement> = useRef(null)
  const { videoTrack, config, ...other } = props;
  useLayoutEffect(() => {
    if (vidDiv.current !== null) videoTrack.play(vidDiv.current, config)
    return () => {
      videoTrack.stop()
    }
  }, [videoTrack])

  return <div {...other} ref={vidDiv} />
}
