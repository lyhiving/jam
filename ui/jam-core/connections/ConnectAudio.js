import {declare, use, useRootState} from '../../lib/state-tree';
import {useStableArray} from '../../lib/state-diff';
import Mediasoup from './Mediasoup';
import P2pAudio from './P2pAudio';
import WebRtcConnections from './WebRtcConnections';

export default function ConnectAudio({roomState, swarm, hasMediasoup}) {
  let {roomId, iAmSpeaker} = roomState;
  let localStream = useRootState('myAudio');

  // send & receive audio via SFU / mediasoup
  let serverRemoteStreams = use(Mediasoup, {
    swarm,
    roomId,
    shouldSend: hasMediasoup && iAmSpeaker,
    shouldReceive: hasMediasoup && !iAmSpeaker,
    localStream,
  });

  // connect to subset of peers directly via webRTC
  declare(WebRtcConnections, {roomState, swarm, hasMediasoup});

  // send & receive audio via p2p webRTC
  let p2pRemoteStreams = use(P2pAudio, {swarm, iAmSpeaker, localStream});

  // merge remote streams from both sources
  let remoteStreams = useStableArray([
    ...p2pRemoteStreams,
    ...serverRemoteStreams.filter(
      ({peerId}) => !p2pRemoteStreams.find(x => x.peerId === peerId)
    ),
  ]);
  return remoteStreams;
}
