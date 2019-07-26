export default {
  service: {
    qy: process.env.NODE_ENV === 'production' ? '' : '',
    oss: process.env.NODE_ENV === 'production' ? '' : '',
    admin: process.env.NODE_ENV === 'production' ? '' : '/admin',
    auth: process.env.NODE_ENV === 'production' ? '' : '/authpc',
    code: process.env.NODE_ENV === 'production' ? '' : '/code',
    gen: process.env.NODE_ENV === 'production' ? '' : '/gen',
    daemon: process.env.NODE_ENV === 'production' ? '' : '/daemon',
    tx: process.env.NODE_ENV === 'production' ? '' : '/tx',
    act: process.env.NODE_ENV === 'production' ? '' : '/act',
    api: process.env.NODE_ENV === 'production' ? 'http://39.97.173.248:9091/api' : '/swapi'
  },
  domain: process.env.NODE_ENV === 'production' ? 'http://localhost:9090' : '/act'
}
