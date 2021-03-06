
import Router from 'koa-router'
import sse from 'koa-sse-stream'
// import compose from 'koa-compose'
import Main from './source/main'
import HeroList from './source/herolist'
import HeroProfile from './source/heroprofile'
import HeroListStream from './source/stream'

let apiRouter = new Router()

apiRouter.get('/api', Main.get)
apiRouter.get('/api/hero', HeroList.get)
apiRouter.post('/api/hero', HeroList.post)
apiRouter.get('/api/hero/:id', HeroProfile.get)
apiRouter.put('/api/hero/:id', HeroProfile.put)
apiRouter.delete('/api/hero/:id', HeroProfile.delete)
apiRouter.get('/stream', sse({
    maxClients: 5000,
    pingInterval: 30000
}), HeroListStream.get)


export default apiRouter