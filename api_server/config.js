import fs from 'fs'
import path from 'path'
import {
    updateMap
} from "./utils"
export const DEFAULT_CONFIG = {
    "PORT": 5000,
    "HOST": "0.0.0.0",
    "DB_URL": "postgresql://postgres:postgres@localhost:5432/test"
}

export function init_config(options) {
    let config = new Map(Object.entries(DEFAULT_CONFIG))
    let defaultconfigPath = path.resolve("./", "config.json")
    if (fs.existsSync(defaultconfigPath)) {
        let temp_config = new Map(Object.entries(JSON.parse(fs.readFileSync(configPath))))
        config = updateMap(config, temp_config)
    } else {
        console.log("default config file not exist")
    }
    if (options.config) {
        if (fs.existsSync(options.config)) {
            let temp_config = new Map(Object.entries(JSON.parse(fs.readFileSync(options.config))))
            config = updateMap(config, temp_config)
        } else {
            throw "config file not exist"
        }
    }
    return config
}
export function bind_config(options) {
    //console.log(options)
    let config = init_config(options)
    if (options.port) {
        config.set("PORT", options.port)
    }
    if (options.host) {
        config.set("HOST", options.host)
    }
    if (options.dburl) {
        config.set("DB_URL", options.dburl)
    }
    return config
}

export default bind_config