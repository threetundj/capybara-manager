import Vue from 'vue'
import { Rate, Progress} from 'element-ui'
import {
    Actionsheet,
    Popup,
    Picker,
    Header,
    Button,
    Cell,
    Field,
    Toast,
    Indicator,
    MessageBox,
    DatetimePicker,
    Swipe, 
    SwipeItem,
    Radio
} from 'mint-ui'


Vue.use(Rate)
Vue.use(Progress)

Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(DatetimePicker.name, DatetimePicker)  
Vue.component(Swipe.name, Swipe)  
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Radio.name, Radio);  
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.prototype.$messagebox = MessageBox

