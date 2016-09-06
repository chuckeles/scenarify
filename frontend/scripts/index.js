/**
 * The entry script for the Scenarify app.
 * Loads and sets up Vue.
 * Also imports the base styles that are not part of any component.
 */


import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '../components/app/app';

import normalize from 'normalize.css';
import base from '../styles/base';


/**
 * Use the Vue router.
 */
Vue.use(VueRouter);

/**
 * Create the Vue router.
 */
const router = new VueRouter({
    hashbang: false,
    history: true
});

/**
 * Start the router.
 */
router.start(App, '#app');
