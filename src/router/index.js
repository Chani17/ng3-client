import Vue from 'vue';
import VueRouter from 'vue-router';
import GalleryView from "@/components/pages/gallery/GalleryView.vue";
Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/gallery',
            component: GalleryView,
        },
    ],
});