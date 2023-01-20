export interface JivositeOptions {
  url: string
  debug: boolean
  ignoreBot: boolean
}

export type JivositeCallbackEventNames =
  | 'jivo_onLoadCallback'
  | 'jivo_onOpen'
  | 'jivo_onMessageSent'
  | 'jivo_onAccept'
  | 'jivo_onClose'
  | 'jivo_onIntroduction'
  | 'jivo_onResizeCallback'
  | 'jivo_onCallStart'
  | 'jivo_onCallEnd'
  | 'jivo_onChangeState'

/**
 * Callback functions
 */
export interface JivositeCallbacks {
  jivo_onLoadCallback: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onOpen: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onMessageSent: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onAccept: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onClose: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onIntroduction: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onResizeCallback: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onCallStart: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onCallEnd: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onChangeState: (callback?: (...args: ReturnType<any>) => void) => void
}

/**
 * API functions
 */
export interface JivositeContext {
  jivo_onCallEnd: (callback?: (...args: ReturnType<any>) => void) => void
  jivo_onChangeState: (callback?: (...args: ReturnType<any>) => void) => void
  open: () => {}
  close: (state: string) => {}
  chatMode: (state: string) => {}
  getContactInfo: (state: string) => {}
  getVisitorNumber: (state: string) => {}
  setContactInfo: (params: {
    name?: string | null
    email?: string | null
    phone?: string | null
    description?: string | null
  }) => void
  setCustomData: (
    fields: {
      content: string
      title: string
      link: string
      key: string
    }[]
  ) => {
    result: string | 'fail' | 'ok'
    reason?: string
  }
  setRules: (rules: object) => void
  setUserToken: (token: string) => {
    result: string | 'fail' | 'ok'
    token: string | boolean
  }
  showProactiveInvitation: (
    invitation_text: string,
    department_id: number
  ) => void
  startCall: (phone: string) => {
    result: string | 'fail' | 'ok'
    reason?: string
  }
  isCallbackEnabled: (callback: () => void) => {
    result: string | 'fail' | 'ok'
    reason?: string
  }
  sendOfflineMessage: (params: {
    name: string
    email: string
    phone: string
    description: string
    message: string
  }) => { result: string; error: any }
}

declare global {
  interface Window extends JivositeCallbacks {
    jivo_api: JivositeContext | undefined
  }
}

declare module '@nuxt/types' {
  interface Context {
    $jivo_api: JivositeCallbacks & {
      instance: () => JivositeContext | undefined
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $jivo_api: JivositeCallbacks & {
      instance: () => JivositeContext | undefined
    }
  }
}
