/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

import './index.css'

const worker = new Worker()
const promiseWorker = new PromiseWorker(worker)

function postRecord(text) {
  return promiseWorker.postMessage({
    type: 'post',
    text,
  })
}

function getRecord(id) {
  return promiseWorker.postMessage({
    type: 'get',
    id,
  })
}

async function main() {
  const id = await postRecord('Hello World')
  const record = await getRecord(id)

  console.log(record)
}

main()
