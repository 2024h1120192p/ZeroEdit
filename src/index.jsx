import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { Text } from "@automerge/automerge"
import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { RepoContext } from '@automerge/automerge-repo-react-hooks'

import { Peer } from "peerjs";
import { PeerjsNetworkAdapter } from "automerge-repo-network-peerjs";

const peer = new Peer("shreyas-id-1");
const conn = peer.connect("shreyas-id-2");

const peerJsAutomergeNetworkAdapterObject = new PeerjsNetworkAdapter(conn);

const SELF_PEER_ID = "shreyas-id-1";
const PEER_ID = "shreyas-id-2";

peerJsAutomergeNetworkAdapterObject.onData((e) => console.log(`⚡️ ${e.direction}: ${e.bytes} bytes`));

const repo = new Repo({
  network: [
    // new BrowserWebSocketClientAdapter("wss://sync.automerge.org"),
    // new BrowserWebSocketClientAdapter("ws://172.17.48.162:3030/ws/thatroom?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqMTIzIiwiZXhwIjoxNzQ0OTgzODk4fQ.Aj1vieiMwtS4rsh3GFcjxdYHtbWGXXXyiSJGf-3onI0", 300), 
    new PeerjsNetworkAdapter(peerJsAutomergeNetworkAdapterObject),
  ],
  storage: new IndexedDBStorageAdapter(),
});

const rootDocUrl = `${document.location.hash.substring(1)}`;
let handle
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl);
  console.log("Connected to Doc : ", handle);
} else {
  handle = repo.create(() => ({
    fileName: "somethingcool.js",
    fileContent: "console.log('Something Cool')",
  }));
  console.log("Created new Doc : ", handle);
}

const docUrl = document.location.hash = handle.url;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={docUrl} />
    </RepoContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
