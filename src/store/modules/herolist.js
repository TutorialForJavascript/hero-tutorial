// initial state
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
    hero: (state) => (heroId) => {
        let hero_list = state.heros.filter(hero => hero.id === heroId)
        if (hero_list.length === 0) {
            return null
        } else {
            return hero_list[0]
        }
    }
}

// actions 定义业务逻辑
const actions = {
    appendHero(context, payload) {
        let heroObj = payload.heroObj
        console.log(heroObj)
        let validated = heroValidate(heroObj)
        if (validated) {
            context.commit('appendHero', payload)
        } else {
            console.error(`添加hero失败,验证错误`)
        }
    },
    updateHero(context, payload) {
        context.commit('updateHero', payload)
    }
}

// mutations 定义数据状态的操作
const mutations = {
    appendHero(state, payload) {
        let id = counter()
        let hero = Object.assign(payload.heroObj, { id: id })
        state.heros.push(hero)
    },
    deleteHero(state, payload) {
        state.heros = state.heros.filter((i) => i.id !== payload.heroId)
    },
    updateHero(state, payload) {
        let hero_list = state.heros.filter(hero => hero.id === payload.heroId)
        if (hero_list.length === 0) {
            return null
        } else {
            let hero = hero_list[0]
            Object.assign(hero, payload.source)
            return hero
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