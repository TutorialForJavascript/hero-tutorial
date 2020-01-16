
import router from 'koa-route'
import compose from 'koa-compose'
import Main from './source/main'
import HeroList from './source/herolist'
import HeroProfile from './source/heroprofile'
import HeroListStream from './source/stream'
let routes = compose([
    router.get('/api', Main.get),
    router.get('/api/hero', HeroList.get),
    router.post('/api/hero', HeroList.post),
    router.get('/api/hero/:id', HeroProfile.get),
    router.put('/api/hero/:id', HeroProfile.put),
    router.delete('/api/hero/:id', HeroProfile.delete),
    router.get('/stream',HeroListStream.get)
])

export default routes