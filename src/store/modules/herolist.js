// initial state
const counter = () => {
    let count = 0
    return () => {
        count += 1
        return count
    }
}

const state = {
    heros: [
        {
            id: 1,
            name: "隐者之紫"
        },
        {
            id: 2,
            name: "红色魔术师"
        },
        {
            id: 3,
            name: "白金之星"
        },
        {
            id: 4,
            name: "法皇"
        },
        {
            id: 5,
            name: "银色战车"
        }
    ]
}

// getters
const getters = {}

// actions
const actions = {
    getAllHeros({ commit }) {
        shop.getProducts(products => {
            commit('setProducts', products)
        })
    }
}

// mutations
const mutations = {
    appendHero(state, heroObj) {
        let maxId =
            let id = len + 1
        let hero = Object.assign(heroObj, { id: id })
        state.heros.push(hero)
    },
    deleteHero(state, heroId) {
        state.heros = state.heros.filter((i) => i.id !== heroId)
    }


    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}