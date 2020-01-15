const heroSchema = {
    "type": "object",
    "required": ["name", "quality"],
    "properties": {
        "name": {
            "type": "string"
        },
        "quality": {
            "type": "object",
            "required": ["速度", "成长性", "持久力", "破坏力", "精密度", "射程距离"],
            "properties": {
                "速度": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "成长性": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "持久力": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "破坏力": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "精密度": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                },
                "射程距离": {
                    "type": "integer",
                    "maximum": 100,
                    "exclusiveMinimum": 0,
                }
            }
        }
    }
}

export {
    heroSchema
}