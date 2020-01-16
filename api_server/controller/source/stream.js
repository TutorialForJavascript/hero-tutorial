import connection from '../../model/index'
import {sub} from '../../pubsub'
const HeroListStream = {
    async get(ctx) {
        let find_par = {
            attributes: ['id', 'name', 'score'],
            order: [['updatedAt', 'DESC']],
        }
        sub.onMessage=(channel,message)=>{
            let result = JSON.parse(message)
            console.log("$$$$$$$$$$$$$$$")
            console.log("message")
            console.log("result")
            ctx.sse.send(JSON.stringify({ status: 201, result }))
        }
        try {
            let result = await connection.get_table("Hero").findAll(find_par)
            ctx.sse.send(JSON.stringify({ status: 200, result }))
            sub.run()
        } catch (error) {
            ctx.sse.send(JSON.stringify({
                status: 500,
                result: { "msg": "500 db error" }
            }))
            ctx.sse.sendEnd()
        }
    }
}
export default HeroListStream