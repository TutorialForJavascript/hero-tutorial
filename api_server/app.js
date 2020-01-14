import Koa from 'koa'
import logger from 'koa-pino-logger'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import routes from './controller/index'


const app = new Koa()
app.use(cors())
app.use(logger({level:"warn"}))
app.use(koaBody())
app.use(routes)

export default app