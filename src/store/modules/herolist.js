// initial state
import {heroValidate} from "../../validates"
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
    hero: (state, heroId) => {
        let hero_list = state.heros.filter(hero => hero.id === heroId)
        if (hero_list.length === 0) {
            return null
        } else {
            return hero_list[0]
        }
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    appendHero(state, heroObj) {
        let hero = Object.assign(heroObj, { id: id })
        state.heros.push(hero)
    },
    deleteHero(state, heroId) {
        state.heros = state.heros.filter((i) => i.id !== heroId)
    },
    updateHero(state, heroId, source) {
        let hero_list = state.heros.filter(hero => hero.id === heroId)
        if (hero_list.length === 0) {
            return null
        } else {
            let hero = hero_list[0]
            Object.assign(hero, source)
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