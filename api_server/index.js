import logger from 'pino'
import cmd from './cmd'
import bind_config from './config'
import connect from './model/index'
import { pub, sub } from './pubsub'
import app from './app'

function main(argv) {
    let config = cmd(argv)(bind_config)
    let log = logger({ level: "info" })
    log.info(config)
    app.config = config
    pub.init(app.config.get("REDIS_URL"), app.config.get("REDIS_CHANNEL"))
    sub.init(app.config.get("REDIS_URL"), app.config.get("REDIS_CHANNEL"))
    connect.init_url(app.config.get("DB_URL"), { logging: log.debug })
    connect.create_tables("Hero", true).then(() => {
        return connect.get_table("Hero").count()
    }).then(count => {
        if (count === 0) {
            return connect.mokeHero()
        } else {
            return false
        }
    }).then(() => {
        log.info(`server start @ ${app.config.get("HOST")}:${app.config.get("PORT")}`)
        app.listen(app.config.get("PORT"), app.config.get("HOST"))
    })


}
if (process.mainModule.filename === __filename) {
    main(process.argv)
}