/**
 * The entry script for the Scenarify app.
 * Loads and sets up Vue.
 */


import Vue from 'vue';
import App from '../components/app/app';


/**
 * Create Vue instance.
 */
new Vue({
    el: 'body',
    components: {
        app: App
    }
});
