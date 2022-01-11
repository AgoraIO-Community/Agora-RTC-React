# Agora RTC SDK React Wrapper NextJS Example

This is an example for [Agora RTC SDK React Wrapper](https://github.com/AgoraIO-Community/agora-rtc-react).

## How to use
- Update your Agora App ID (& token) inside `./pages/Videocall.tsx`
- Make sure you're running the bundler for the library in the parent directory
- Execute `npm i && npm run dev`
- Open `localhost:3000` in a modern browser

This project is created using `create-next-app`. The Videocall component is the same as the React only example, `index.tsx` contains the logic to handle SRR with the Agora SDK.

You can use the same dynamic import technique to use the Agora Web SDK in your nextjs project instead of this react wrapper.