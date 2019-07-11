import io from 'socket.io-client';
import store from '../store'

export const socket = io('http://localhost:3000');

socket.on('user-connected', () => {
    const snackbarContainer = document.querySelector('#user-toast');

    if(snackbarContainer.MaterialSnackbar) {
        const data = {message: 'A new user has connected'};

        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
});

socket.on('new-post', (post) => {
    store.set('posts', [...store.get('posts'), post])
})
