import React from 'react';
import AgoraRTC, { BufferSourceAudioTrackInitConfig, CameraVideoTrackInitConfig, ClientConfig, CustomAudioTrackInitConfig, CustomVideoTrackInitConfig, IAgoraRTCClient, IBufferSourceAudioTrack, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack, IRemoteVideoTrack, MicrophoneAudioTrackInitConfig, ScreenVideoTrackInitConfig } from 'agora-rtc-sdk-ng';
export default AgoraRTC;
export * from 'agora-rtc-sdk-ng';
export declare const createClient: (config: ClientConfig) => () => IAgoraRTCClient;
export declare function createMicrophoneAndCameraTracks(audioConfig?: MicrophoneAudioTrackInitConfig | undefined, videoConfig?: CameraVideoTrackInitConfig | undefined): () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
};
export declare function createBufferSourceAudioTrack(config: BufferSourceAudioTrackInitConfig): () => {
    ready: boolean;
    track: IBufferSourceAudioTrack | null;
};
export declare function createCameraVideoTrack(config?: CameraVideoTrackInitConfig): () => {
    ready: boolean;
    track: ICameraVideoTrack | null;
};
export declare function createCustomAudioTrack(config: CustomAudioTrackInitConfig): () => {
    ready: boolean;
    track: ILocalAudioTrack | null;
};
export declare function createCustomVideoTrack(config: CustomVideoTrackInitConfig): () => {
    ready: boolean;
    track: ILocalVideoTrack | null;
};
export declare function createMicrophoneAudioTrack(config?: MicrophoneAudioTrackInitConfig): () => {
    ready: boolean;
    track: IMicrophoneAudioTrack | null;
};
export declare function createScreenVideoTrack(config: ScreenVideoTrackInitConfig, withAudio?: 'enable' | 'disable' | 'auto'): () => {
    ready: boolean;
    tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
};
export declare const AgoraVideoPlayer: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    videoTrack: ILocalVideoTrack | IRemoteVideoTrack | ICameraVideoTrack;
}) => JSX.Element;
