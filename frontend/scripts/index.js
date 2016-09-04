/**
 * The entry script for the Scenarify app.
 * Loads and sets up Vue.
 * Also imports the base styles that are not part of any component.
 */


import Vue from 'vue';
import App from '../components/app/app';

import normalize from 'normalize.css';
import base from '../styles/base';


/**
 * Create Vue instance.
 */
new Vue({
    el: 'body',
    components: {
        app: App
    }
});
