import connection from '../../model/index'
import {pub} from '../../pubsub'

const HeroProfile = {
    async get(ctx, id) {
        id = parseInt(id)
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄信息",
            }
        }
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            if (result) {
                ctx.body = JSON.stringify(Object.assign(res, {
                    "result": result
                }))
            } else {
                ctx.response.status = 404
                ctx.body = JSON.stringify({
                    "msg": "404 user not found"
                })
            }
        } catch (error) {
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    },
    async put(ctx, id) {
        id = parseInt(id)
        let pre_ins = ctx.request.body
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            result = await result.update(
                pre_ins
            )
            console.log("#################")
            console.log(result)
            //pub.pubjson({event:"update",hero:result})
            ctx.body = JSON.stringify({
                "result": "done"
            })
        } catch (error) {
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    },
    async delete(ctx, id) {
        id = parseInt(id)
        try {
            let result = await connection.get_table("Hero").findByPk(id)
            await result.destroy()
            pub.pubjson({ event: "delete", hero: { id: id } })
            ctx.body = JSON.stringify({
                "result": "done"
            })
        } catch (error) {
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error"
            })
        }
    }
}
export default HeroProfile