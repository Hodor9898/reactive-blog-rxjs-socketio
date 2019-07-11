import '../styles/index.scss';

import * as $ from  'jquery';
import { uploadPost } from "./posts";

window.onload = () => {

    const dialog = document.querySelector('dialog');
    const showModalButton = document.querySelector('#create-post');

    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    showModalButton.addEventListener('click', function() {
        dialog.showModal();
    });

    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    $('#create-post-form').on('submit', (e) => {
        e.preventDefault();

        uploadPost($('#create-post-form').serializeArray().reduce((acc, v) => {
            return {
                [v.name]: v.value,
                ...acc
            }
        }, {}));

        dialog.close();

    });
};
