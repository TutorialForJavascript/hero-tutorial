
import router from 'koa-route'
import compose from 'koa-compose'
import Main from './source/main'
import HeroList from './source/herolist'
import HeroProfile from './source/heroprofile'

let routes = compose([
    router.get('/', Main.get),
    router.get('/hero', HeroList.get),
    router.post('/hero', HeroList.post),
    router.get('/hero/:id', HeroProfile.get),
    router.put('/hero/:id', HeroProfile.put),
    router.delete('/hero/:id', HeroProfile.delete)
])

export default routes