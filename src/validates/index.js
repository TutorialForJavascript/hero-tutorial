import Ajv from "ajv"
import { heroSchema } from "./heroinfo.js"
const ajv = new Ajv()
const heroValidate = ajv.compile(heroSchema)

export {
    heroValidate
}