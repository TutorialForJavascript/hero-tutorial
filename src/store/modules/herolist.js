// initial state
//import axios from 'axios'
import { heroValidate } from "../../validates"
import { random100 } from "../../utils"
const state = {
    heros: []
}

const axios = window.axios

// getters
const getters = {
    getHero: (state) => (heroId) => {
        if (typeof (heroId) === "number") {
            let hero_list = state.heros.filter(hero => hero.id === heroId)
            if (hero_list.length === 0) {
                return {}
            } else {
                let hero = hero_list[0]
                hero = { ...hero }
                return hero
            }
        } else {
            return {}
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

// actions 定义业务逻辑
const actions = {
    async appendHero(context, payload) {
        let score = random100();
        let heroObj = Object.assign(payload.heroObj, { score })
        let validated = heroValidate(heroObj)
        if (validated) {
            let response = await axios.post(
                '/hero',
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
                //context.commit('appendHero', { heroObj })
            }
        } else {
            console.error(`添加hero失败,验证错误`)
        }
    },
    async updateHero(context, payload) {
        let heroId = payload.heroId
        let source = payload.source
        let response = await axios.put(
            `/hero/${heroId}`,
            JSON.stringify(source),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status !== 200) {
            console.error(`更新到服务器失败`)
        } else {
            context.commit('updateHero', payload)
        }
    },
    async deleteHero(context, payload) {
        let heroId = payload.heroId
        let response = await axios.delete(
            `/hero/${heroId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (response.status !== 200) {
            console.error(`从服务器删除失败`)
        } else {
            context.commit('deleteHero', payload)
        }

    },
    syncHeros(context) {
        function initEventSource(url = "http://localhost:5000/stream") {
            let evtSource = new EventSource(url, { withCredentials: true })
            evtSource.onmessage = function (e) {
                let { status, result } = JSON.parse(e.data)
                switch (status) {
                    case 200: {
                        context.commit('syncHeros', { heros: result })
                    } break;
                    case 201: {
                        let { event, hero } = result
                        switch (event) {
                            case "create": {
                                context.commit('appendHero', { heroObj: hero })
                            } break;
                            case "update": {
                                context.commit('updateHero', { heroId: hero.id, source: { name: hero.name } })
                            } break;
                            case "delete": {
                                context.commit('deleteHero', { heroId: hero.id })
                            } break;
                            default: {
                                console.log(`unknown event ${event}`)
                            } break;

                        }
                    } break;
                    default: {
                        console.log(`unknown code ${status}`)
                    } break;
                }
            }
            evtSource.onerror = function (e) {
                if (e.readyState == EventSource.CLOSED) {
                    console.log("Connection lost.")
                    evtSource.close();
                    initEventSource()
                } else{
                    console.log('error', e);
                    evtSource.close();
                }        
                
            }
            evtSource.onopen = function (e) {
                console.log('open', e);
            }
        }
        initEventSource()
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}