import Vue from 'vue'
import { modalPlugin } from './Plugin'
import { ModalOptions } from './types'

Vue.use<ModalOptions>(modalPlugin)
