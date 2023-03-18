import Vue from "vue"
import { library, config } from "@fortawesome/fontawesome-svg-core"
import { faAnglesLeft, faBars, faTicket } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import {  } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "@fortawesome/fontawesome-svg-core/styles.css"



config.autoAddCss = false;
library.add( faAnglesLeft,  faHeart, faBars, faTicket)

Vue.component("font-awesome-icon", FontAwesomeIcon)