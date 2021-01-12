import ApiService from '../services/ApiService';
import AuthorizedApp from '../models/AuthorizedApp';
// import {store} from '../store/store';
// import * as Actions from '../store/constants';
// const fs = window.require('fs');

// import {Popup} from '../models/popups/Popup'
import PopupService from './PopupService';
// import Scatter from '../models/Scatter';
import * as Actions from '../models/api/ApiActions';

let io = null;
let httpServer = null;


let rekeyPromise;
const getNewKey = socket => new Promise((resolve, reject) => {
    rekeyPromise = {resolve, reject};
    socket.emit('rekey');
});

const socketHandler = (socket, actions) => {
    const{
        findApp,
        updateOrPushApp,
        removeApp
    } = actions;

    // const testers = [
    //     'connect_error',
    //     'connect_timeout',
    //     'error',
    //     'disconnect',
    //     'reconnect',
    //     'reconnect_attempt',
    //     'reconnecting',
    //     'reconnect_error',
    //     'reconnect_failed',
    //     'ping',
    //     'pong',
    // ];
    //
    // testers.map(x => {
    //     socket.on(x, e => console.error(x, e))
    // });


    // TODO: Testing the event system.
    // Events are sent to the applications to notify them of changes
    // such as identity changes, key removals, account un-linking
    // and scatter being locked.
    // setInterval(() => {
    //     if(authenticated)
    //         socket.emit('event', 'evented');
    // }, 2000);


    // When something connects we automatically
    // notify it of a successful connection
    socket.emit('connected');

    // All authenticated api requests pass through the 'api' route.
    socket.on('api', async request => {
	    if(!request.plugin || request.plugin.length > 35) return socket.emit('api', {id:request.id, result:null});
	    request.plugin = request.plugin.replace(/\s/g, "");
        
        console.log("API", request);
        // 2 way authentication
        const existingApp = findApp(request.data.payload.origin);

        const updateNonce = async () => {
            existingApp.nextNonce = request.data.nextNonce;
            updateOrPushApp(existingApp);
	    };
 	    const removeAppPermissions = async () => {
            removeApp(existingApp);
        };


 	    if(!existingApp) return;
	    if(!existingApp.checkKey(request.data.appkey)) return;
	    if(existingApp.nextNonce.length && !existingApp.checkNonce(request.data.nonce)) await removeAppPermissions();
	    else await updateNonce();

        socket.emit('api', await ApiService.handler(Object.assign(request.data, {plugin:request.plugin}), actions));
    });

    socket.on('rekeyed', async request => {
        console.log("REKEY");
        rekeyPromise.resolve(request);
    });

    socket.on('pair', async request => {
        console.log("PAIR !!");
        const existingApp = findApp(request.data.origin);
        const linkApp = {
            type:'linkApp',
            payload:request.data
        };

        if(request.data.passthrough)
            return socket.emit('paired', existingApp && existingApp.checkKey(request.data.appkey));

        const addAuthorizedApp = (newKey = null) => {
            const authedApp = new AuthorizedApp(request.data.origin, newKey ? newKey : request.data.appkey);
            updateOrPushApp(authedApp);
            socket.emit('paired', true);
        };

        const repair = async () => {
            getNewKey(socket).then((newKey)=>{
                if(newKey.data.origin !== request.data.origin || newKey.data.appkey.indexOf('appkey:') === -1){
                    return socket.emit('paired', false);
                }
                addAuthorizedApp(newKey.data.appkey)
            }, (err)=>{console.error(err);});
        }

        if(existingApp){
            if(existingApp.checkKey(request.data.appkey)){
                return socket.emit('paired', true);
            } else {
                PopupService.popup({type:Actions.REPAIR, payload:request}, (result) => {
                    if(result){
                        return repair();
                    }
                    socket.emit('paired', false);
                })
            }
        } else {
            return repair();
        }
    });
}

const getCerts = async () => {
    return fetch('https://certs.get-scatter.com').then(res => res.json());
};

export default class SocketService {
    
    static async initialize(actions){
        io = window.require('socket.io')();
        const options = { pingTimeout:100000000000000000 };

        if(httpServer){
            httpServer.close(()=>{console.log("close old listener")});
            setImmediate(function(){httpServer.emit('close')});
            httpServer = null;
        }
        
        const http = window.require('http');
        const https = window.require('https');
        const ip = '127.0.0.1';

        // HTTP protocol (port 50005)
        httpServer = http.createServer();
        httpServer.listen(50005,ip); 

        io.attach(httpServer,options);

        // HTTPS protocol (port 50006)
        const certs = await getCerts();
        if(certs && certs.hasOwnProperty('key') && certs.hasOwnProperty('cert')){
            const httpsServer = https.createServer(certs);
            httpsServer.listen(50006, ip);
            io.attach(httpsServer,options);
        }

        this.open(actions);
    }

    static open(actions){
        const namespace = io.of(`/scatter`);
        namespace.on('connection', socket => socketHandler(socket, actions))
    }

    static async close(){
        // Getting namespace
        if(!io) return;
        const socket = io.of(`/scatter`);

        // Disconnecting all active connections to this namespace
        Object.keys(socket.connected).map(socketId => {
            socket.connected[socketId].disconnect();
        });

        // Removing all event emitter listeners.
        socket.removeAllListeners();

        // Deleting the namespace from the array of
        // available namespaces for connections
        delete io.nsps[`/scatter`];

        httpServer.close(()=>{console.log("close listener")});

        return true;
    }

}
