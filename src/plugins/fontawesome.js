import { library, config } from "@fortawesome/fontawesome-svg-core"
import { faAnglesLeft, faBars, faTicket, faComputer, faUser } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import {  } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "@fortawesome/fontawesome-svg-core/styles.css"

export default {
  install(app){
    config.autoAddCss = false;
    library.add( faAnglesLeft,  faHeart, faBars, faTicket, faComputer, faUser)
    app.component("FontAwesomeIcon", FontAwesomeIcon)
  }
}