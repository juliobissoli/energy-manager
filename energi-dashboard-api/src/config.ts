export interface AppConfig  {
    apiPort: number;
    apiHost: string
}


const apiPort = parseInt(process.env.API_PORT || '3000')
const apiHost = `${process.env.APP_HOST || 'http://localhost'}:${apiPort}` 
const dbName = `${process.env.DB_NAME}` || 'energy-manager'
const dbHost = `postgresql://root:root@localhost:5432/${dbName}` || "postgresql://root:root@localhost:5432/energy-manager"
const config = {
    apiPort,
    apiHost,
    dbHost
}

export default config