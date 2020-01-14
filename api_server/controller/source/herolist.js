import connection from '../../model/index'

const HeroList = {
    async get(ctx) {
        let findpar = {
            attributes: ['id', 'name'],
            order: ['updatedAt', 'DESC'],
            limit: 10,
        }
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄列表,按更新时间倒序",
            }
        }
        try {
            let result = await connection.get_table("Hero").findAll(find_par)
            res = Object.assign(res, {
                "result": result
            })
            ctx.body = JSON.stringify(res)
        } catch (error) {
            console.log(error)
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error",
            })
        }
    },
    async post(ctx) {
        let pre_ins = ctx.request.body
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄列表,按更新时间倒序",
            }
        }
        if (pre_ins === null) {
            ctx.throw(400, JSON.stringify({ "msg": "request can not be empty" }))
        } else {
            try {
                let ins = pre_ins
                hero, created = await connection.get_table("Hero").findOrCreate(
                    {
                        where: ins,
                    }
                )
                if (created) {
                    ctx.response.status = 200
                    res = Object.assign(res,{
                        "msg": "hero created",
                        "data": hero
                    })
                    ctx.body = JSON.stringify(res)
                } else {
                    ctx.response.status = 200
                    res = Object.assign(res,{
                        "msg": "hero already exists",
                        "data": hero
                    })
                    ctx.body = JSON.stringify(res)
                }
            } catch (error) {
                console.log(error)
                ctx.response.status = 500
                ctx.body = JSON.stringify({
                    "msg": "500 db error",
                })
            }
        }
    },
    async rankfive(ctx) {
        let findpar = {
            attributes: ['id', 'name'],
            limit: 5,
            order: ['score', 'DESC']
        }
        let res = {
            "self": {
                "source": ctx.url,
                "description": "英雄得分前五,按得分倒序",
            }
        }
        try {
            let result = await connection.get_table("Hero").findAll(find_par)
            res = Object.assign(res, {
                "result": result
            })
            ctx.body = JSON.stringify(res)
        } catch (error) {
            console.log(error)
            ctx.response.status = 500
            ctx.body = JSON.stringify({
                "msg": "500 db error",
            })
        }
    }
}
export default HeroList