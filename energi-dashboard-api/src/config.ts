export interface AppConfig  {
    apiPort: number;
    apiHost: string
}


const apiPort = parseInt(process.env.API_PORT || '3000')
const apiHost = `${process.env.APP_HOST || 'http://localhost'}:${apiPort}` 
const config = {
    apiPort,
    apiHost
}

export default config