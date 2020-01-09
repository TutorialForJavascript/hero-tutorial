import Ajv from "ajv"
import heroSchema from "./heroinfo.json"
let ajv = new Ajv()
let heroValidate= ajv.compile(heroSchema)

export default {
    heroValidate
}