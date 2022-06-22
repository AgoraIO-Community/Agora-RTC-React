/**
 * @module Agora React Wrapper
 */
import React from 'react';
import AgoraRTC, { BufferSourceAudioTrackInitConfig, CameraVideoTrackInitConfig, ClientConfig, CustomAudioTrackInitConfig, CustomVideoTrackInitConfig, IAgoraRTCClient, IBufferSourceAudioTrack, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteVideoTrack, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig, VideoPlayerConfig } from 'agora-rtc-sdk-ng';
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
export declare enum AgoraRTCErrorCode {
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
export declare const createClient: (config: ClientConfig) => () => IAgoraRTCClient;
/**
 * Creates and stores the camera and microphone tracks
 * @param audioConfig Config for the audio track
 * @param videoConfig Config for the video track
 * @returns React hook that can be used to access the camera and microphone tracks
 * @category Wrapper
 */
export declare function createMicrophoneAndCameraTracks(audioConfig?: MicrophoneAudioTrackInitConfig | undefined, videoConfig?: CameraVideoTrackInitConfig | undefined): () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the buffer source audio track
 * @param config Config for the buffer source audio track
 * @returns React hook that can be used to access the buffer source audio track
 * @category Wrapper
 */
export declare function createBufferSourceAudioTrack(config: BufferSourceAudioTrackInitConfig): () => {
    ready: boolean;
    track: IBufferSourceAudioTrack | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the camera track
 * @param config Config for the camera track
 * @returns React hook that can be used to access the camera track
 * @category Wrapper
 */
export declare function createCameraVideoTrack(config?: CameraVideoTrackInitConfig): () => {
    ready: boolean;
    track: ICameraVideoTrack | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the custom audio track
 * @param config Config for the custom audio track
 * @returns React hook that can be used to access the custom audio track
 * @category Wrapper
 */
export declare function createCustomAudioTrack(config: CustomAudioTrackInitConfig): () => {
    ready: boolean;
    track: ILocalAudioTrack | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the custom video track
 * @param config Config for the custom video track
 * @returns React hook that can be used to access the custom video track
 * @category Wrapper
 */
export declare function createCustomVideoTrack(config: CustomVideoTrackInitConfig): () => {
    ready: boolean;
    track: ILocalVideoTrack | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the microphone track
 * @param config Config for the microphone track
 * @returns React hook that can be used to access the microphone track
 * @category Wrapper
 */
export declare function createMicrophoneAudioTrack(config?: MicrophoneAudioTrackInitConfig): () => {
    ready: boolean;
    track: IMicrophoneAudioTrack | null;
    error: AgoraRTCError | null;
};
/**
 * Creates and stores the screenshare tracks
 * @param config Config for the screenshare tracks
 * @param withAudio Try and create audio track as well (needs browser support)
 * @returns React hook that can be used to access the screenshare tracks
 * @category Wrapper
 */
export declare function createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio?: 'enable' | 'disable' | 'auto'): () => {
    ready: boolean;
    tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
    error: AgoraRTCError | null;
};
/**
 * A React component to render the local or remote videoTrack
 * @param props videoTrack and video config
 * @returns An HTML div element containing the provided videoTrack
 */
export declare const AgoraVideoPlayer: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    videoTrack: ILocalVideoTrack | IRemoteVideoTrack | ICameraVideoTrack;
} & {
    config?: VideoPlayerConfig;
}) => JSX.Element;
