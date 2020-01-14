// initial state
import axios from 'axios'
import { heroValidate } from "../../validates"
const Counter = () => {
    let count = 0
    return () => {
        count += 1
        return count
    }
}
let counter = Counter()

const state = {
    heros: []
}

// getters
const getters = {
    getHero: (state) => (heroId) => {
        if (typeof (heroId) === "number") {
            let hero_list = state.heros.filter(hero => hero.id === heroId)
            if (hero_list.length === 0) {
                return null
            } else {
                let hero = hero_list[0]
                hero = { ...hero }
                return hero
            }
        } else {
            return null
        }
    },
    first5heros: (state) => {
        if (state.heros.length > 0) {
            let heros_copy = [...state.heros]
            return heros_copy.sort((herof, herol) => herol.score - herof.score).slice(0, 5)
        } else {
            return []
        }
    }
}

// actions 定义业务逻辑
const actions = {
    async appendHero(context, payload) {
        let score = Math.floor((Math.random() * 100) + 1);
        let heroObj = Object.assign(payload.heroObj, { score })
        let validated = heroValidate(heroObj)
        if (validated) {
            console.log(heroObj)
            let response = await axios.post(
                'http://localhost:5000/hero',
                JSON.stringify(heroObj),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.status !== 200) {
                console.error(`添加到服务器失败`)
                console.error(response.data)
            } else {
                heroObj = response.data.data
                console.log(heroObj)
                context.commit('appendHero', { heroObj })
            }
        } else {
            console.error(`添加hero失败,验证错误`)
        }
    },
    async updateHero(context, payload) {
        let heroId = payload.heroId
        let source = payload.source
        context.commit('updateHero', payload)
        let response = await axios.put(
            `http://localhost:5000/hero/${heroId}`,
            JSON.stringify(source),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status !== 200) {
            console.error(`更新到服务器失败`)
        }

    },
    async deleteHero(context, payload) {
        let heroId = payload.heroId
        context.commit('deleteHero', payload)
        let response = await axios.delete(
            `http://localhost:5000/hero/${heroId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status !== 200) {
            console.error(`从服务器删除失败`)
        }

    },
    async syncHeros(context) {
        let response = await axios.get('http://localhost:5000/hero')
        let heros = response.data.result
        console.log(heros)
        let payload = { heros }
        context.commit('syncHeros', payload)
    }
}

// mutations 定义数据状态的操作
const mutations = {
    syncHeros(state, payload) {
        let heros = payload.heros
        state.heros = heros
    },
    appendHero(state, payload) {
        let hero = payload.heroObj
        state.heros.push(hero)
    },
    deleteHero(state, payload) {
        state.heros = state.heros.filter((i) => i.id !== payload.heroId)
    },
    updateHero(state, payload) {
        let heros_copy = [...state.heros];
        let hero_list = heros_copy.filter(hero => hero.id === payload.heroId)
        if (hero_list.length !== 0) {
            let hero = hero_list[0]
            Object.assign(hero, payload.source)
            state.heros = heros_copy
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}