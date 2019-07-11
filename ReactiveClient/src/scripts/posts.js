import {socket} from './socket';
import * as $ from 'jquery';

import store from '../store';

export const uploadPost = (post) => {
    socket.emit('new-post', post)
};

const displayPosts = (posts) => {
    $('.post-timeline').html(posts.map(
        ({
             body,
             title
         }) => {
            return `
            <div class="demo-card-wide mdl-card mdl-shadow--2dp">
              <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${title}</h2>
              </div>
              <div class="mdl-card__supporting-text">
                ${body}
              </div>
              <div class="mdl-card__menu">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                  <i class="material-icons">share</i>
                </button>
              </div>
            </div>`
        }).join('')
    )
}

const subscription = store
    .state
    .subscribe((state) => {
        displayPosts(state.posts || []);
    });

const notificationSubscription = store
    .state
    .subscribe((state) => {
        $('#notifications').attr('data-badge', state.posts.length);
    });


/**
 * After 10 seconds stop displaying posts, but keep displaying notifications
 */
setTimeout(() => {
    notificationSubscription.unsubscribe();
}, 10000)

